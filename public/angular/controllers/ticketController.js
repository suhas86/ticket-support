myApp.controller('ticketController', ['$http', 'TicketService','$cookies',
    function ($http, TicketService,$cookies) {
        var main = this;
        this.file = {};
        var user={};
        this.user=$cookies.getObject('auth');
        //Default Values
        main.userName=this.user.firstName +' '+this.user.lastName;
        main.email=this.user.email;
        main.mobileNumber=this.user.mobileNumber
       
        this.raiseTicket = function () {
            
            var myData = {
                name: main.userName,
                email: main.email,
                userId: main.user._id,
                mobileNumber: main.mobileNumber,
                querySubject: main.querySubject,
                queryContent: main.queryContent
            }
            TicketService.createTicket(myData).
                then(function successCallback(response) {
                    console.log(response);
                    console.log("File ",main.file);
                    if (!(main.file.upload==undefined || main.file.upload=="")) {
                        main.submitFile(response.data.data._id);
                    } else {
                        main.userName="";
                        main.email="";
                        main.mobileNumber="";
                        main.querySubject="";
                        main.queryContent="";
                    }
                }, function errorCallback(response) {
                    console.log(response)
                })

        }

        //Temp code for file upload    
        this.submitFile = function (id) {
            console.log(main.file);
            main.uploading = true;

            TicketService.upload(main.file, id).then((response) => {
                main.uploading = false;
                console.log(response);
            }, (error) => {
                console.log(error);
            })
        }

        //Remove file
        this.removeFile=function(){
            console.log("Inside remove file");
            main.file.upload="";
        }
    }])