// created firebase data for the train "app" activity, and by useing Firebase to host a globally
// available set of data that is retrieved and manipulated using Moment.js to provide up-to-date 
//information about various trains' arrival times and minutes to arrival (using %)
//the app saves the user's input as an object in the particular firebase created for the occasion

var config = {
    apiKey: "AIzaSyCEeu7NnsFEv0SYBP2k95M3lCNodbOgtII",
    authDomain: "train-39e91.firebaseapp.com",
    databaseURL: "https://train-39e91.firebaseio.com",
    projectId: "train-39e91",
    storageBucket: "",
    //storageBucket: "train-39e91.appspot.com",
    messagingSenderId: "1029295291222"
  };
  firebase.initializeApp(config);




// <script src="https://www.gstatic.com/firebasejs/4.12.0/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCEeu7NnsFEv0SYBP2k95M3lCNodbOgtII",
//     authDomain: "train-39e91.firebaseapp.com",
//     databaseURL: "https://train-39e91.firebaseio.com",
//     projectId: "train-39e91",
//     storageBucket: "train-39e91.appspot.com",
//     messagingSenderId: "1029295291222"
//   };
//   firebase.initializeApp(config);
// </script>
// putting database into a var to work with it
var database = firebase.database();
 
 //creating globals 
 //making a list with our vars for the main info from the board, they need to be empty so to fill in the gabs 
var trainName = '';
var destination = '';
var frequency = '';
var nextArrival = '';
var firstTrainTime = '';
//using moment.js to calculate the next arrival time and minutes until arrival, and creates a dynamic table
var currentTime = moment();
  console.log("current time: " + currentTime);
// var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
// var firstTimeConvert = moment(firstTime, "HH:mm").subtract(1,"years");

//making submit button and function
//keeping it clean with .trim()
//btn for adding trains AND PUSHING OBJECTS INTO FIREBASE
$("#submit").on("click", function(event){
  //The event.preventDefault() method stops the default action of an element from happening.
//For example;Prevent a submit button from submitting a form
//Prevent a link from following the URL

  event.preventDefault();

  //grabs user input and assign to vars
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrainTime = $("#first-train-time").val().trim();
//  currentTime = moment($("#currentTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
  frequency = $("#frequency").val().trim();
//pushing to databse

  database.ref().push({
    trainName : trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
  });
  //assinging an empty val 
  $("#train-name").val(" ");
  $("#destination").val(" ");
  $("#first-train-time").val('');
  $("#frequency").val(" ");

});
//adding a funtion to populate a table with OBJECT vals from Firebase:
//on child_added  , fn snapshot
database.ref().on("child_added", function(childSnapshot){

 console.log(childSnapshot.val().trainName);
 console.log(childSnapshot.val().destination);
 console.log(childSnapshot.val().firstTrainTime);
 console.log(childSnapshot.val().frequency);
 trainName = childSnapshot.val().trainName;

//mking locals in order to use for math
var tFrequency = childSnapshot.val().frequency;
var firstTime = childSnapshot.val().firstTrainTime;

//moment() (moment.js) in order to calculate time according to the world on from 1970, in order to be added to the table
// converting time into number to calculate total of minutes
var firstTimeConvert = moment(firstTime, "HH:mm").subtract(1,"years");
console.log(firstTimeConvert);
var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
console.log(diffTime);
//using the % method of calculating that is allowing us to see how many times we fit within100%
var tripRemainder = diffTime % tFrequency;
console.log(tripRemainder);
// how many mins is left to the train since the start of counting down the frequency
var minutesTilTrain = tFrequency - tripRemainder;
console.log(minutesTilTrain);
//var to hold the info, created(or calculated_) from the moment() function
//will calculate time until next and convert time .format in Military
var nextTrain = moment().add(minutesTilTrain, "minutes").format("HH: mm");
//to present the time value for nextTrain in console
console.log("Next Train Arrives at: " + nextTrain);

//with ..append we push the value up to our table (` <tr> td${.val().tranName}, td </tr> `)
 
$("#main-table").append(`
            <tr>
                    <td>${childSnapshot.val().trainName}</td>
                    <td>${childSnapshot.val().destination}</td> 
                    <td>${childSnapshot.val().frequency}</td> 
                    <td>${nextTrain}</td>
                    <td>${minutesTilTrain}</td> 
                    
                   
            </tr> 
            `);

})
// Test for variables entered
		console.log(trainName);
		console.log(lineName);
		console.log(destination);
		console.log(trainTime);
		console.log(frequency);