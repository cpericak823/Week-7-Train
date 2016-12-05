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
            startTime: moment(startTime, "HH:mm").format("HH:mm"),
            frequency: +frequency

        });
        //allows for the page to not be refreshed
        return false;
    });

    database.ref().on("child_added", function(childSnapshot) {

            // Log everything that's coming out of snapshot
            // console.log(childSnapshot.val().name);
            // console.log(childSnapshot.val().destination);
            // console.log(childSnapshot.val().startTime);
            console.log(childSnapshot.val());


            var row = $('<tr>');
            var minsAway = minutesAway(childSnapshot.val().startTime, childSnapshot.val().frequency);

            $(row).append($('<td>').text(childSnapshot.val().name));
            $(row).append($('<td>').text(childSnapshot.val().destination));
            $(row).append($('<td>').text(childSnapshot.val().frequency));
            $(row).append($('<td>').text(nextArrival(minsAway)));
            $(row).append($('<td>').text(minsAway));
            $('#table-body').append(row);

            // Handle the errors
        },
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    function minutesAway(startTime, frequency) {
        //set the current time
        var currentTime = moment();

        var startTimeMinutes = currentTime.diff(moment(startTime, "HH:mm"), "minutes");

        console.log(startTimeMinutes, frequency);

        //calculate the number of trains bu subtracting the currentTime from the startTime and dividing by the frequency and get a whole number
        var numberOfTrains = Math.floor(startTimeMinutes / frequency);

        //calculate the lastTrainTime multiplied by the frequency and add to the startTime
        var lastTrainTime = (numberOfTrains * frequency);

        //calculate the next arrival by taking the lastTrainTime plus the frequency
        var nextArrivalMinutesPastStartTime = lastTrainTime + frequency;

        console.log(numberOfTrains, lastTrainTime, nextArrivalMinutesPastStartTime);

        console.log(moment(startTime, "HH:mm").add(nextArrivalMinutesPastStartTime, "minutes").format("HH:mm"));

        var minutesAway = -currentTime.diff(moment(startTime, "HH:mm").add(nextArrivalMinutesPastStartTime, "minutes"), "minutes");
        // var minutesAway = moment(startTime, "HH:mm").add(nextArrivalMinutesPastStartTime, "minutes").diff(currentTime);

        return minutesAway + 1;
    }

    function nextArrival(minsAway) {
        return moment().add(minsAway, "minutes").format("HH:mm");
    }

});
