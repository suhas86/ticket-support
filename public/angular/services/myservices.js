myApp.service('TicketService', function ($http) {
    var main = this;
    this.baseUrl = "http:://localhost:3000/"

    //Login Api
    this.checkLogin = function (data) {
        return $http({
            method: 'POST',
            data:data,
            url: '/users/login'
        })
    }

    //Sign up API
    this.signupUser=function(data){
        return $http({
            method:"POST",
            data:data,
            url:'/users/signup'
        })
    }
})