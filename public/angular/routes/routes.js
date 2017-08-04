//var myApp = angular.module('blogApp', ['ngRoute']); 

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './views/login-view.html',
            controller: 'loginController',
            // what is the alias of that controller.
            controllerAs: 'loginPage'
        })
        .when('/raise-ticket', {
            templateUrl: './views/raise-ticket.html',
            controller: 'ticketController',
            controllerAs: 'raiseTicketPage',
            authenticated: true
        })
        .when('/my-cases', {
            templateUrl: './views/my-cases.html',
            controller: 'caseController',
            controllerAs: 'myCasePage',
            authenticated: true
        })
        .when('/view-case/:id', {
            templateUrl: './views/view-case.html',
            controller: 'viewCaseController',
            controllerAs: 'viewCasePage',
            authenticated: true
        })
        .when('/profile', {
            templateUrl: './views/profile-view.html',
            controller: 'profileController',
            controllerAs: 'profilePage',
            authenticated: true
        })
        .when('/tickets-all', {
            templateUrl: './views/tickets-view.html',
            controller: 'adminTicketController',
            controllerAs: 'adminTicketPage',
            authenticated: true,
            isAdmin:true
        })
        .otherwise(
        {
            //redirectTo:'/'
            template: '<h1>404 page not found</h1>'
        }
        );
}]);

myApp.run(["$rootScope", "$location", "authFactory",
    function ($rootScope, $location, authFactory) {
        $rootScope.$on("$routeChangeStart",
            function (event, next, current) {
                //If user tries to access route which are authenticated 
                //condition will allow only if he is logged in else 
                //redirect him back to login page
                if (next.$$route.authenticated) {
                    if (!authFactory.getAuthStatus()) {
                        $location.path("/");
                    }
                }
                //Only Admin can acess these pages
                if (next.$$route.isAdmin) {
                    if (!authFactory.checkAdmin()) {
                        $location.path(current.$$route.originalPath);
                    }
                }
                //If user is logged in and try to access login page
                //redirect him back to original page
                if (next.$$route.originalPath == "/") {
                    if (authFactory.getAuthStatus()) {
                        console.log("Current route ",current);
                        console.log("Event route ",next);
                        $location.path(current.$$route.originalPath);
                    }
                }
            })
    }]);