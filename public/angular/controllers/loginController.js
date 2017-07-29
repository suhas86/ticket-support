myApp.controller('loginController', ['$http', 'TicketService','$location',function ($http,
    TicketService,$location) {
    //Create a context
    var main = this;
    this.login = function () {
        //Login form data
        var myData = {
            email: main.email,
            password: main.password
        }

        TicketService.checkLogin(myData).
            then(function successCallback(response) {
                console.log(response);
                $location.path('/raise-ticket')
            }, function errorCallback(response) {
                console.log(response);
            })
    }

    this.signup = function () {
        var myData = {
            firstName: main.firstName,
            lastName: main.lastName,
            email: main.newEmail,
            mobileNumber: main.mobileNumber,
            password: main.newPassword
        }

        TicketService.signupUser(myData).
            then(function successCallback(response) {
                console.log(response);
            }, (function errorCallback(response) {
                console.log(response);
            }))
    }
}])