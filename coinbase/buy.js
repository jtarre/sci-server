var Client = require('coinbase').Client; 

var buy = function buy(app) {
    app.get('/buy', function(request, response) {
        console.log('access token...\n', COINBASE_ACCESS_TOKEN);
        console.log('refresh token...\n', COINBASE_REFRESH_TOKEN);
        var client = new Client( {
            'accessToken': COINBASE_ACCESS_TOKEN, 
            'refreshToken': COINBASE_REFRESH_TOKEN
        });
        
        client.getAccounts({}, function(err, accounts) {
            accounts.forEach(function(acct) {
                console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
            });
        });

        response.json({'status': 200, 'message': 'successs!'});
            
    });
}

module.exports = buy;