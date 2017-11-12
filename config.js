var client_url = function client_url() {
    console.log('--- Config ---');
    console.log('node environment', process.env.APP_ENV);
    var client_url = "";
    if (process.env.APP_ENV === "local" || process.env.APP_ENV === "c9")
        client_url = "http://localhost:8080";
    else
        client_url = process.env.SCI_CLIENT_URL;

    console.log('client_url:', client_url);
    return client_url; 
}

var server_url = function server_url() {
    console.log('--- Config ---');
    console.log('node environment', process.env.APP_ENV);
    var server_url = "";
    if(process.env.APP_ENV === "c9")
        server_url = "localhost:8080";
    else if (process.env.APP_ENV === "local")
        server_url = "http://localhost:3000";
    else
        server_url = process.env.SCI_SERVER_URL;

    console.log('server_url:', server_url);
    return server_url; 
}


var config = {
    client_url: client_url(),
    server_url: server_url()
}

module.exports = config;