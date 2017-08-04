myApp.controller('caseController', ['$http', 'TicketService', '$cookies', function ($http,
    TicketService, $cookies) {
    var main = this;
    var caseList = [];
    var user = {};
    this.response = {}
    this.user = $cookies.getObject('auth');
    TicketService.getUserCaseList(this.user._id).
    then(function successCallback(response) {
        main.response=response;
        if (response.data.error) {

        } else {
            main.caseList = response.data.data;
        }

    }, function errorCallback(response) {
        if (err.status == 401)
            alert("Oops something went wrong. Please login again");
        else
            alert("Oops something went wrong");
    })
}])