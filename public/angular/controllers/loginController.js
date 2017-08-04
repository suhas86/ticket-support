myApp.controller('loginController', ['$http', 'TicketService', '$location', '$cookies','authFactory',
    function ($http, TicketService, $location, $cookies,authFactory) {
        //Create a context
        var main = this;
        this.response={};
        this.emailFormat =  /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        this.mobileFormat=/^[0-9]{10,10}$/;
        this.login = function () {
            //Login form data
            var myData = {
                email: main.email,
                password: main.password
            }

            TicketService.checkLogin(myData).
                then(function successCallback(response) {
                    main.response=response;
                    var user = response.data.data;
                    if(response.data.error){

                    } else {
                    user.password = "";
                    $cookies.putObject("auth", user);
                   
                    $cookies.put("token", response.data.token);
                    if(user.userType==2)
                    $location.path('/raise-ticket')
                    else 
                       $location.path('/tickets-all') 
                    }
                    
                    
                }, function errorCallback(response) {
                    main.response=response;
                    main.response.message="Oops something gone wrong";
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
                    main.response=response;
                    var user = response.data.data;
                    if(response.data.error){

                    } else {
                    user.password = "";
                    $cookies.putObject("auth", user);
                    if(user.userType==2)
                    $location.path('/raise-ticket')
                    else 
                       $location.path('/tickets-all') 
                    }
                    
                }, (function errorCallback(response) {
                    main.response=response;
                    main.response.message="Oops something gone wrong";
                }))
        }
        this.logout = function () {
           authFactory.doUserLogout();
           $location.path('/');
        }

    //    this.checkUserType=function()
        {
            this.user=$cookies.getObject("auth");
        }
    }])