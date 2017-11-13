var Client = require('coinbase').Client; 

var buy = function buy(app) {
    app.get('/buy', function(request, response) {
        console.log('access token...\n', COINBASE_ACCESS_TOKEN);
        console.log('refresh token...\n', COINBASE_REFRESH_TOKEN);
        var client = new Client( {
            'accessToken': COINBASE_ACCESS_TOKEN, 
            'refreshToken': COINBASE_REFRESH_TOKEN
        });
        
        // client.getAccount('primary', function(err, account) {
        //     account.buy({
        //         "amount": loose_change,
        //         "currency": "USD"
        //         }, function(err, tx) {
        //             var status;
        //             var message;
        //             if(err) {
        //                 console.error(err);
        //                 status = 400;
        //                 message = err;
        //             } else {
        //                 console.log("--- Transaction ---\n", tx);
        //                 status = 200;
        //                 message = `Transaction success!\n${tx}`;
        //             }
        //             response.json({ 'status': status, 'message': message });
        //         })
        // });
    });
}

module.exports = buy;