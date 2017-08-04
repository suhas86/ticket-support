myApp.controller('ticketController', ['$http', 'TicketService','$cookies',
    function ($http, TicketService,$cookies) {
        var main = this;
        this.file = {};
        var user={};
        this.response={}
        this.user=$cookies.getObject('auth');
        //Default Values
        main.userName=this.user.firstName +' '+this.user.lastName;
        main.email=this.user.email;
        main.mobileNumber=this.user.mobileNumber
        this.emailFormat =  /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        this.mobileFormat=/^[0-9]{10,10}$/;
       
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
                    main.response=response;
                    if(response.data.error){
                        
                    } else {
                    if (!(main.file.upload==undefined || main.file.upload=="")) {
                        main.submitFile(response.data.data._id);
                    } else {
                        main.userName="";
                        main.email="";
                        main.mobileNumber="";
                        main.querySubject="";
                        main.queryContent="";
                    }
                    }
                    
                }, function errorCallback(response) {
                    if (err.status == 401)
                        alert("Oops something went wrong. Please login again");
                    else
                        alert("Oops something went wrong");
                })

        }

        //Temp code for file upload    
        this.submitFile = function (id) {
            console.log(main.file);
            main.uploading = true;

            TicketService.upload(main.file, id).then((response) => {
                main.uploading = false;
                console.log(response);
                main.userName="";
                main.email="";
                main.mobileNumber="";
                main.querySubject="";
                main.queryContent="";
            }, (error) => {
                if (err.status == 401)
                        alert("Oops something went wrong. Please login again");
                    else
                        alert("Oops something went wrong");
            })
        }

        //Remove file
        this.removeFile=function(){
            console.log("Inside remove file");
            main.file.upload="";
        }
    }])