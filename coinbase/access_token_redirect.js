var axios = require('axios');

var access_token_redirect = function access_token_redirect(app) {
    app.get(`/coinbase/oauth/access_token_redirect`, function(request, response) {
        //todo: improve error catching
        if(request.access_token) 
            var coinbase_access_token = request.access_token;
        else 
            console.error('Failed to save coinbase access token...');
        
        if(request.refresh_token) 
            var coinbase_refresh_token = request.refresh_token;
        else 
            console.error('Failed to save coinbase refresh token...');
        
        response.json({ 
            response: 'completed', 
            access_token: coinbase_access_token,
            refresh_token: coinbase_access_token
        });
    })
}

module.exports = access_token_redirect;