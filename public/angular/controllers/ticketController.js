myApp.controller('ticketController', ['$http', 'TicketService', function ($http,
    TicketService) {
    var main = this;

    this.raiseTicket = function () {
        var myData = {
            name: main.userName,
            email: main.email,
            userId: '597cc46ab6f8f433808c1358',
            mobileNumber: main.mobileNumber,
            querySubject: main.querySubject,
            queryContent: main.queryContent
        }
        TicketService.createTicket(myData).
            then(function successCallback(response) {
                console.log(response)
            }, function errorCallback(response) {
                console.log(response)
            })
    }
}])