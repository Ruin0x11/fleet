var http = require('http');
var net = require('net');
var ProxyAgent = require('proxy-agent');
var zlib = require('zlib');
var ruta3 = require('ruta3');
var fs = require('fs');
const { ipcRenderer } = require('electron');

var debugging = 0;
var server = null;
var port = 5555;
var router = ruta3();

var low = require('lowdb');
const db = low('settings.json');

var proxyBase = db.get('settings.proxy').value();
var proxyProtocol = db.get('settings.proxyProtocol').value();
var proxyPort = db.get('settings.proxyPort').value();

var proxy = proxyProtocol + "://" + proxyBase + ":" + proxyPort;

var regex_hostport = /^([^:]+)(:([0-9]+))?$/;

function parametersToHash(params) {
    var query = decodeURIComponent(params);
    var match;
    var pl = /\+/g;  // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };

    var urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams;
}

function decompress(response) {
    var gunzipped;
    try {
        gunzipped = zlib.gunzipSync(response).toString();
    } catch (e) {
        // data wasn't gzipped, try as plaintext
        return getSvdata(response.toString());
    }
    return getSvdata(gunzipped);
}

function getSvdata(data) {
    // get the JSON object from a string like "svdata={...}"
    var svdata = data.substring(7);
    return JSON.parse(svdata);
}

function writeResponse(url, response) {
    var filename = "./".concat(url.replace(/\//g, '_').concat(".json"));

    var wstream = fs.createWriteStream(filename);
    var json = JSON.stringify(response)
    wstream.write(json);
    wstream.end();
    console.log("Saved ".concat(filename));
}

function dispatch(type, response) {
    ipcRenderer.send('dispatch',
                     {
                         type: type,
                         data: decompress(response.response),
                         params: parametersToHash(response.params)
                     });
}

function dispatchShipInfo(response) {
    dispatch('shipInfo', response)
}

function dispatchPort(response) {
    dispatch('port', response)
}

function dispatchBattle(response) {
    dispatch('battle', response)
}

function dispatchBattleResult(response) {
    dispatch('battleResult', response)
}

function dispatchSortieStart(response) {
    dispatch('sortieStart', response)
}

function dispatchSortieNext(response) {
    dispatch('sortieNext', response)
}

function dispatchDock(response) {
    dispatch('dock', response)
}

router.addRoute('/kcsapi/api_start2', dispatchShipInfo);
router.addRoute('/kcsapi/api_port/port', dispatchPort);
router.addRoute('/kcsapi/api_req_sortie/battle', dispatchBattle);
router.addRoute('/kcsapi/api_req_practice/battle', dispatchBattle);
router.addRoute('/kcsapi/api_req_sortie/battleresult', dispatchBattleResult);
router.addRoute('/kcsapi/api_req_practice/battle_result', dispatchBattleResult);
router.addRoute('/kcsapi/api_req_map/start', dispatchSortieStart);
router.addRoute('/kcsapi/api_req_map/next', dispatchSortieNext);
router.addRoute('/kcsapi/api_get_member/ndock', dispatchDock);

function getHostPortFromString( hostString, defaultPort ) {
    var host = hostString;
    var port = defaultPort;

    var result = regex_hostport.exec( hostString );
    if ( result != null ) {
        host = result[1];
        if ( result[2] != null ) {
            port = result[3];
        }
    }

    return( [ host, port ] );
}

// handle a HTTP proxy request
function httpUserRequest( userRequest, userResponse ) {
    if ( debugging ) {
        console.log( '  > request: %s', userRequest.url );
    }

    var httpVersion = userRequest['httpVersion'];
    var hostport = getHostPortFromString( userRequest.headers['host'], 80 );

    // have to extract the path from the requested URL
    var path = userRequest.url;
    var result = /^[a-zA-Z]+:\/\/[^\/]+(\/.*)?$/.exec( userRequest.url );
    if ( result ) {
        if ( result[1].length > 0 ) {
            path = result[1];
        } else {
            path = "/";
        }
    }

    var agent;

    // don't make the proxy look for bundle.js
    // don't proxy if none was provided
    if(hostport[0] == "localhost" || proxy == "") {
        agent = userRequest.agent;
    } else {
        agent = new ProxyAgent(proxy)
    }

    console.log(hostport[0] + path);

    var options = {
        'host': hostport[0],
        'port': hostport[1],
        'method': userRequest.method,
        'path': path,
        'agent': agent,
        'auth': userRequest.auth,
        'headers': userRequest.headers
    };

    if ( debugging ) {
        console.log( '  > options: %s', JSON.stringify( options, null, 2 ) );
    }

    var userData = Buffer.alloc(0);

    var proxyRequest = http.request(
        options,
        function ( proxyResponse ) {
            if ( debugging ) {
                console.log( '  > request headers: %s', JSON.stringify( options['headers'], null, 2 ) );
            }

            if ( debugging ) {
                console.log( '  < response %d headers: %s', proxyResponse.statusCode, JSON.stringify( proxyResponse.headers, null, 2 ) );
            }

            userResponse.writeHead(
                proxyResponse.statusCode,
                proxyResponse.headers
            );

            var buf = Buffer.alloc(0);

            proxyResponse.on(
                'data',
                function (chunk) {
                    if ( debugging ) {
                        console.log( '  < chunk = %d bytes', chunk.length );
                    }
                    buf = Buffer.concat([buf, chunk]);
                    userResponse.write( chunk );
                }
            );

            proxyResponse.on(
                'end',
                function () {
                    if ( debugging ) {
                        console.log( '  < END' );
                    }
                    userResponse.end();

                    if(path.includes("kcsapi")) {
                        var res = decompress(buf);
                        writeResponse(path, res);
                    }

                    // check if the path being requested matches a 艦これ API call
                    var args = router.match(path);

                    if(args) {
                        console.log("hit");
                        var response = { response: buf, params: userData.toString() }
                        args.action(response);
                    }
                }
            );
        });

    proxyRequest.on(
        'error',
        function ( error ) {
            userResponse.writeHead( 500 );
            userResponse.write(
                "<h1>500 Error</h1>\r\n" +
                "<p>Error was <pre>" + error + "</pre></p>\r\n" +
                "</body></html>\r\n"
            );
            userResponse.end();
        }
    );

    userRequest.addListener(
        'data',
        function (chunk) {
            if ( debugging ) {
                console.log( '  > chunk = %d bytes', chunk.length );
            }
            userData = Buffer.concat([userData, chunk]);
            proxyRequest.write( chunk );
        }
    );

    userRequest.addListener(
        'end',
        function () {
            proxyRequest.end();
        }
    );
};

function startServer() {
    if ( debugging ) {
        console.log( 'server listening on port ' + port );
    }

    console.log("using proxy " + proxy)

    // start HTTP server with custom request handler callback function
    server = http.createServer( httpUserRequest ).listen(port);

    // add handler for HTTPS (which issues a CONNECT to the proxy)
    server.addListener(
        'connect',
        function ( request, socketRequest, bodyhead ) {
            var url = request['url'];
            var httpVersion = request['httpVersion'];

            console.log(url);

            var hostport = getHostPortFromString( url, 443 );

            if ( debugging )
                console.log( '  = will connect to %s:%s', hostport[0], hostport[1] );

            // set up TCP connection
            var proxySocket = new net.Socket();
            proxySocket.connect(
                parseInt( hostport[1] ), hostport[0],
                function () {
                    if ( debugging )
                        console.log( '  < connected to %s/%s', hostport[0], hostport[1] );

                    if ( debugging )
                        console.log( '  > writing head of length %d', bodyhead.length );

                    proxySocket.write( bodyhead );

                    // tell the caller the connection was successfully established
                    socketRequest.write( "HTTP/" + httpVersion + " 200 Connection established\r\n\r\n" );
                }
            );

            proxySocket.on(
                'data',
                function ( chunk ) {
                    if ( debugging )
                        console.log( '  < data length = %d', chunk.length );

                    socketRequest.write( chunk );
                }
            );

            proxySocket.on(
                'end',
                function () {
                    if ( debugging )
                        console.log( '  < end' );

                    socketRequest.end();
                }
            );

            socketRequest.on(
                'data',
                function ( chunk ) {
                    if ( debugging )
                        console.log( '  > data length = %d', chunk.length );

                    proxySocket.write( chunk );
                }
            );

            socketRequest.on(
                'end',
                function () {
                    if ( debugging )
                        console.log( '  > end' );

                    proxySocket.end();
                }
            );

            proxySocket.on(
                'error',
                function ( err ) {
                    socketRequest.write( "HTTP/" + httpVersion + " 500 Connection error\r\n\r\n" );
                    if ( debugging ) {
                        console.log( '  < ERR: %s', err );
                    }
                    socketRequest.end();
                }
            );

            socketRequest.on(
                'error',
                function ( err ) {
                    if ( debugging ) {
                        console.log( '  > ERR: %s', err );
                    }
                    proxySocket.end();
                }
            );
        }
    ); // HTTPS connect listener
};

startServer();
