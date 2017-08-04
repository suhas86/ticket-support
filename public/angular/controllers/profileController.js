myApp.controller('profileController', ['$http', 'TicketService', '$location', '$cookies', 'authFactory',
    function ($http, TicketService, $location, $cookies, authFactory) {
        //Create a context
        var main = this;
        this.profile = {};
        profile = $cookies.getObject('auth');
        this.emailFormat =  /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        this.mobileFormat=/^[0-9]{10,10}$/;
        this.response={};
        TicketService.getProfile(profile._id)
            .then((response) => {
                main.profile = response.data.data
            }, ((err) => {
                if (err.status == 401)
                    alert("Oops something went wrong. Please login again");
                else
                    alert("Oops something went wrong");
            }))
        //update profile
        this.update = function () {
            TicketService.updateProfile(main.profile, main.profile._id)
                .then((response) => {
                    this.response=response;
                    if(response.data.error){

                    } else {
                         main.profile = response.data.data;
                    }
                   
                    //  $cookies.putObject("auth", main.profile);
                }, (err) => {
                    if (err.status == 401)
                        alert("Oops something went wrong. Please login again");
                    else
                        alert("Oops something went wrong");
                });
        }
    }
])