var Client = require('coinbase').Client; 

var buy = function buy(app) {
    app.post('/buy', function(request, response) {
        var loose_change = request.body.loose_change;
        var access_token = request.body.bitcoin_access_token;
        var refresh_token = request.body.bitcoin_refresh_token;
        console.log('access token...\n', access_token);
        console.log('refresh token...\n', refresh_token);
        console.log('loose change...\n', loose_change);
        var client = new Client( {
            'accessToken': access_token,
            'refreshToken': refresh_token
        });
        
        client.getAccount('primary', function(err, account) {
            account.buy({
                "amount": loose_change,
                "currency": "USD"
                }, function(err, tx) {
                    if(err) {
                        console.log('error...\n', err.message);
                        response.json({err: err.message, client: client, account: account});
                    } else {
                        var status;
                        var message;
                        if(err) {
                            console.error(err);
                            status = 400;
                            message = err;
                        } else {
                            console.log("--- Transaction ---\n", tx);
                            status = 200;
                            message = `Transaction success!\n${tx}`;
                        }
                        response.json({tx: tx, status: status, message: message, client: client, account: account});
                    }
                        
                })
        });
    });
}

module.exports = buy;