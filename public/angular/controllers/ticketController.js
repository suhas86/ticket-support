myApp.controller('ticketController', ['$http', 'TicketService',
    function ($http, TicketService) {
        var main = this;
        this.file = {};
        this.raiseTicket = function () {
            var myData = {
                name: main.userName,
                email: main.email,
                userId: '597cc46ab6f8f433808c1358',
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