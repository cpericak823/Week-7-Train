//load the document
$(document).ready(function() {

    //initalize firebase
    var config = {
        apiKey: "AIzaSyCY4Py0GyYljXFx7ynNupYB4B9QAaFyL0c",
        authDomain: "train-project-1e220.firebaseapp.com",
        databaseURL: "https://train-project-1e220.firebaseio.com",
        storageBucket: "train-project-1e220.appspot.com",
        messagingSenderId: "60993928239"
    };
    firebase.initializeApp(config);

    //set global variables
    var database = firebase.database();
    var table = 0;
    var name = "";
    var destination = "";
    var startTime = "";
    var frequency = "";
    var nextArrival = "";
    var minutesAway = "";

    //capture the value of the input boxes on click of the submit button and set equal to the global variables
    $("#add-train").on("click", function() {
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        startTime = $("#start-time").val();
        // date = new Date;
        // hours = startTime.split(':')[0];
        // minutes = startTime.split(":")[1];
        // date.setHours(hours);
        // date.setMinutes(minutes);

        frequency = $("#frequency").val().trim();

        //push the input values to firebase as an object
        database.ref().push({
            name: name,
            destination: destination,
            startTime: moment(startTime, "HH:mm").format("LTS"),
            frequency: frequency

        });
        //allows for the page to not be refreshed
        return false;
    });

    //log any errors
    // function(errorObject) {
    //     console.log("Errors handled: " + errorObject.code);
    // }

    //update table with results


});
