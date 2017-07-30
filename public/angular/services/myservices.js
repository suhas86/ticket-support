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

    //Raise a ticket
    this.createTicket=function(data){
        return $http({
            method:"POST",
            data:data,
            url:'/query/create'
        })
    }

    //Get User case list
    this.getUserCaseList=function(id){
        return $http({
            method:"GET",
            url:'query/list/'+id
        })
    }
})