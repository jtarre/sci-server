var Client = require('coinbase').Client; 

var buy = function buy(app) {
    app.get('/buy', function(request, response) {
        console.log('access token...\n', COINBASE_ACCESS_TOKEN);
        console.log('refresh token...\n', COINBASE_REFRESH_TOKEN);
        var client = new Client( {
            'accessToken': COINBASE_ACCESS_TOKEN, 
            'refreshToken': COINBASE_REFRESH_TOKEN
        });
        
        client.getAccounts('primary', function(err, account) {
            account.forEach(function(acct) {
                console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
            });
        });

        // client.getAccount('2bbf394c-193b-5b2a-9155-3b4732659ede', function(err, account) {
        //   account.buy({"amount": "10",
        //                "currency": "BTC",
        //                "payment_method": "83562370-3e5c-51db-87da-752af5ab9559"}, function(err, tx) {
        //     console.log(tx);
        //   });
        // });

        response.json({'status': 200, 'message': 'successs!'});
            
    });
}

module.exports = buy;