myApp.controller('profileController', ['$http', 'TicketService', '$location', '$cookies', 'authFactory',
    function ($http, TicketService, $location, $cookies, authFactory) {
        //Create a context
        var main = this;
        this.profile = {};
        profile = $cookies.getObject('auth');
        TicketService.getProfile(profile._id)
            .then((response) => {
                main.profile = response.data.data
            }, ((err) => {
                console.log(err);
            }))
        //update profile
        this.update = function () {
            TicketService.updateProfile(main.profile, main.profile._id)
                .then((response) => {
                    main.profile = response.data.data;
                  //  $cookies.putObject("auth", main.profile);
                }, (err) => {
                    console.log(err);
                });
        }
    }])