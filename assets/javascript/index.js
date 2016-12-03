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

    var database = firebase.database();

    //set global variables
    var name = "";
    var destination = "";
    var startTime = "";
    var frequency = "";
    var minutesAway = "";

    //capture the value of the input boxes on click of the submit button and set equal to the global variables
    $("#add-train").on("click", function() {
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        startTime = $("#start-time").val();
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

    database.ref().on("child_added", function(childSnapshot) {

            // Log everything that's coming out of snapshot
            console.log(childSnapshot.val().name);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().startTime);
            console.log(childSnapshot.val().frequency);

            var row = $('<tr>');

            $(row).append('<td>').text(childSnapshot.val().name);
            $(row).append('<td>').text(childSnapshot.val().destination);
            $(row).append('<td>').text(childSnapshot.val().startTime);
            $(row).append('<td>').text(childSnapshot.val().frequency);
            $(row).append('<td>').text(nextArrival(childSnapshot.val().startTime, childSnapshot.val().frequency));
            $(row).append('<td>').text(childSnapshot.val().minutesAway);
            $('#table-body').append(row);

            // Handle the errors
        },
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    function nextArrival(startTime, frequency) {
        var currentTime = moment();
        var numberOfTrains = Math.floor((currentTime - startTime) / frequency);
        var lastTrainTime = (numberOfTrains * frequency) + startTime;
        var nextArrival = lastTrainTime + frequency;
    }

});
