var plaid = require('plaid');

var save_access_token = function save_access_token(app) {
    app.use(function(req, res, next) { 
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    app.post('/save_access_token', function(request, response, next) {
        var public_token = request.body.public_token;
        PLAID_CLIENT.exchangePublicToken(public_token, function(error, tokenResponse) {
            if (error != null) {
                var msg = 'Could not exchange public_token!';
                console.log(msg + '\n' + error);
                return response.json({
                    error: msg
                });
            }
            
            var access_token = tokenResponse.access_token;
            var item_id = tokenResponse.item_id;
            console.log('Access Token: ' + access_token);
            console.log('Item ID: ' + item_id);
            response.json({
                'error': false,
                'bank_access_token': access_token,
                'bank_account_id': item_id
            });
        });
    });
}

module.exports = save_access_token;