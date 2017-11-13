var axios = require('axios');
var config = require('../config');

var auth_redirect = function auth_redirect(app) {
    app.get(`/coinbase/oauth/auth_redirect`, function(request, response) {
        // todo: check that the url contains the coinbase code. 
        // todo: post request for access token
        // todo: get access token and refresh token
        // todo: put scope in appropriate place. 
        var hostname = request.hostname;
        console.log("--- HOSTNAME ---\n", hostname);
        var coinbase_code = request.query.code;
        
        var body = { 
            grant_type: 'authorization_code', 
            code: coinbase_code,
            client_id: process.env.COINBASE_CLIENT_ID,
            client_secret: process.env.COINBASE_CLIENT_SECRET,
            redirect_uri: 
                `${config.server_url}/${process.env.COINBASE_AUTH_REDIRECT}`
        };

        var handleResponse = handleResponse.bind(null, response);
        axios.post('https://api.coinbase.com/oauth/token', body)

        .then(handleResponse)
        .catch(handleError);
        // response.send('heyo!');
    
        function handleResponse(server_response, response) {
            console.log('--- RESPONSE HANDLING ---\n', response, server_response);
            if(response.data.access_token) 
                var coinbase_access_token = response.data.access_token;
            else 
                console.error('unable to retrieve access token...');
            
            if(response.data.refresh_token) 
                var coinbase_refresh_token = response.data.refresh_token;
            else 
                console.error('unable to retrieve refresh token...');
            
            console.log({
                access_token: coinbase_access_token, 
                refresh_token: coinbase_refresh_token
            });

            server_response.redirect(`${config.client_url}/?access_token=${coinbase_access_token}&refresh_token=${coinbase_refresh_token}`);
        }

        function handleError(error) {
            console.error('error from coinbase auth...\n', error);
        }

    })
}

module.exports = auth_redirect;
