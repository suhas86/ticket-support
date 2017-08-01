myApp.controller('caseController', ['$http', 'TicketService','$cookies', function ($http,
    TicketService,$cookies) {
        var main =this;
        var caseList=[];
        var user={};
        this.user=$cookies.getObject('auth');
        TicketService.getUserCaseList(this.user._id).
        then(function successCallback(response){
            main.caseList=response.data.data;
        },function errorCallback(response){
            console.log(response);
        })
}])