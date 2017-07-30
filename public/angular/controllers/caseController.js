myApp.controller('caseController', ['$http', 'TicketService', function ($http,
    TicketService) {
        var main =this;
        var caseList=[];
        TicketService.getUserCaseList('597cc46ab6f8f433808c1358').
        then(function successCallback(response){
            main.caseList=response.data.data;
        },function errorCallback(response){
            console.log(response);
        })
}])