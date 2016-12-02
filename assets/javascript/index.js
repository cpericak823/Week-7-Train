//load the document
$(document).ready(function() {

    //on click of add train button, add a row to the table and add 5 cells per row
    var table = 0;
    $("#add-train").on("click", function() {
        var row = $('#table').insertRow(table);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
    });

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
    var nextArrival = "";
    var minutesAway = "";
    var currentTime = moment();

    //capture the value of the input boxes on click of the submit button and set equal to the global variables
    $("#add-train").on("click", function() {
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        startTime = $("#start-time").val();
        frequency = $("#frequency").val().trim();
        // nextArrival = startTime + frequency;

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
        console.log(childSnapshot.val().nextArrival);
        console.log(childSnapshot.val().minutesAway);


        var row = $('<tr>');

        $(row).append($('<td>').text(childSnapshot.val().name));
        $(row).append($('<td>').text(childSnapshot.val().destination));
        $(row).append($('<td>').text(childSnapshot.val().startTime));
        $(row).append($('<td>').text(childSnapshot.val().frequency));
        $(row).append($('<td>').text("$" + childSnapshot.val().nextArrival));
        $(row).append($('<td>').text("$" + childSnapshot.val().minutesAway));
        $('#table-body').append(row);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});

//for next arrival, write a for a loop that adds the frequency to the start time and loop through continuously comparing to the current time. 
//Once the next arrival is greater than the current time, display that time as the next arrival.
// for (var i = 0; i < currentTime; i++) {
// if (nextArrival >= currentTime) {
//     return false;
// }

//nextArrival: (currentTime- startTime)%frequency

//for minutes away subtract the current time from minutes away using moment and .diff
//append to dom in minutes as minutes away


//log any errors
// function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// }

//update table with results
//use a while loop to display database results for all train schedule
