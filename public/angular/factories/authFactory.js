myApp.factory('authFactory',['$cookies',function($cookies){
    var user={};
    user.getAuthStatus=function(){
        var status=$cookies.get('auth');
        if(status){
            return true;
        } else {
            return false;
        }
    }

    user.doUserLogout=function(){
        $cookies.remove('auth');
    }
    return user;
}])