var moment = require('moment');

var get_transactions = function get_transactions(app) {
    
    app.post('/transactions', function(request, response, next) {
        // Pull transactions for the Item for the last 30 days
        var access_token = request.body.bank_access_token; // doesn't exist yet
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD');
        PLAID_CLIENT.getTransactions(access_token, startDate, endDate, {
        count: 250,
        offset: 0,
        }, function(error, transactionsResponse) {
            if (error != null) {
                console.log(JSON.stringify(error));
                return response.json({
                    error: error
                });
            }
            console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
            response.json(transactionsResponse);
        });
    });
}

module.exports = get_transactions;