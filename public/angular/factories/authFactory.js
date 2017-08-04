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

    user.checkAdmin=function(){
        
        var status=$cookies.getObject('auth');
        console.log(status)
        if(status.userType== 1){
            
            return true;
        } else {
            return false;
        }
    }

    user.doUserLogout=function(){
        $cookies.remove('auth');
        $cookies.remove('token');
    }
    return user;
}])