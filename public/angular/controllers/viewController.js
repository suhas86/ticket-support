myApp.controller('viewCaseController', ['$http', 'TicketService', '$routeParams', '$cookies',
    function ($http, TicketService, $routeParams, $cookies) {
        var main = this;
        this.id = $routeParams.id;
        var response = {}
        var buttonText = "";
        var user = {};
        this.user = $cookies.getObject('auth');
        //Get Case by ID
        TicketService.getUserCaseDetail(this.id).then((response) => {
            this.response = response.data.data;
            if (main.response.ticketStatus == "Open") {
                main.buttonText = "Close Ticket";
            } else {
                main.buttonText = "Re-Open Ticket";
            }
        }, (error) => {
            console.log(errpr);
        })

        //Add Comment
        this.addComment = function () {
            var newComment = {
                "userName": main.user.firstName+' '+main.user.lastName,
                "queryText": main.comment
            }
            var sendData = main.response.comment;
            sendData.push(newComment);
            console.log(sendData);
            TicketService.updateCase({ "comment": sendData }, main.id)
                .then((response) => {
                    main.comment = "";
                    this.response = response.data.data;
                }, (error) => {
                    console.log(error);
                })
        }

        //Update Status
        this.updateStatus = function () {
            var sendData = {}
            if (main.response.ticketStatus == "Open") {
                sendData.ticketStatus = "Closed"
            } else {
                sendData.ticketStatus = "Open"
            }

            TicketService.updateCase(sendData, main.id)
                .then((response) => {
                    this.response = response.data.data;
                    if (main.response.ticketStatus == "Open") {
                        main.buttonText = "Close Ticket";
                    } else {
                        main.buttonText = "Re-Open Ticket";
                    }
                }, (error) => {
                    console.log(error);
                })
        }
    }])