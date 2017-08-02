myApp.controller('adminTicketController', ['$http', 'TicketService', '$cookies',
    function ($http, TicketService, $cookies) {
        var main=this;
        var caseList=[];
        TicketService.getAllList().then((response)=>{
            main.caseList=response.data.data;
        },((err)=>{

        }))

    }])