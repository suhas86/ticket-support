//var myApp = angular.module('blogApp', ['ngRoute']); 

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
        	templateUrl		: './views/login-view.html', 
            controller 		: 'loginController',
            // what is the alias of that controller.
            controllerAs 	: 'loginPage'
        })
        .when('/raise-ticket',{
            templateUrl:'./views/raise-ticket.html',
            controller: 'ticketController',
            controllerAs: 'raiseTicketPage'
        })
         .when('/my-cases',{
            templateUrl:'./views/my-cases.html',
            controller: 'caseController',
            controllerAs: 'myCasePage'
        })
        .when('/view-case',{
            templateUrl:'./views/view-case.html',
            controller: 'viewCaseController',
            controllerAs: 'viewCasePage'
        })
        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);