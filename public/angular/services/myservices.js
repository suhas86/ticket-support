myApp.service('TicketService', function ($http) {
    var main = this;
    this.baseUrl = "http:://localhost:3000/"

    //Login Api
    this.checkLogin = function (data) {
        return $http({
            method: 'POST',
            data: data,
            url: '/users/login'
        })
    }

    //Sign up API
    this.signupUser = function (data) {
        return $http({
            method: "POST",
            data: data,
            url: '/users/signup'
        })
    }

    //Raise a ticket
    this.createTicket = function (data) {
        return $http({
            method: "POST",
            data: data,
            url: '/query/create'
        })
    }

    //Get User case list
    this.getUserCaseList = function (id) {
        return $http({
            method: "GET",
            url: 'query/list/' + id
        })
    }
    //Get Case by id
    this.getUserCaseDetail = function (id) {
        return $http({
            method: "GET",
            url: 'query/case/' + id
        })
    }
    //Add Comment
    this.updateCase = function (data, id) {
        return $http({
            method: "PUT",
            url: 'query/case/' + id + '/update',
            data: data
        })
    }
})