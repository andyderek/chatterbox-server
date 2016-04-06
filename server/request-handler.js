var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/JSON"
};


var messages = [];

var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode;
  // See the note below about CORS headers.

  if(request.url === '/classes/messages' || request.url === '/classes/room1'){
    if(request.method === 'POST'){
    statusCode = 201;
    response.writeHead(statusCode, headers);
    var body = '';
    request.on('data', function(newPost) {
      body += newPost;
    });
    request.on('end', function() {
      messages.push(JSON.parse(body));
    })
    response.end(JSON.stringify('Hello, World'));
  } else if (request.method === 'GET'){
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: messages}));
  } else if (request.method === 'OPTIONS'){
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: messages}));
  }
} else {
  response.writeHead(404, headers);
  response.end(JSON.stringify("Nice try suckah - but you still didn't make the cut"));
};

//   if(request.method === 'POST'){
//     statusCode = 201;
//     } else {
//     response.end(JSON.stringify({results: []}));
//   };

};


exports.requestHandler = requestHandler;  
