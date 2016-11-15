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

    //on click of add train button, add a row to the table and add 5 cells per row
    $("#add-train").on("click", function() {
        var row = $('#table').insertRow(table);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
    });

    //log any errors
    // function(errorObject) {
    //     console.log("Errors handled: " + errorObject.code);
    // }

    //update table with results


});
