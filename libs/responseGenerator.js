exports.generate = function (error, message, status, data) {

    var myResponse = {
        error: error,
        message: message,
        status: status,
        data: data
    };

    return myResponse;

}

exports.getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

exports.cookieExtractor = function(req) {
    var token = null;
    
    if (req && req.headers.cookie)
    {
        //console.log(req.headers.cookie);
      //  token = req.headers.cookie['token'];
    }
    return token;
};