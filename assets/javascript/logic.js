var config = {
  apiKey: "AIzaSyBKO0YEfNLC62xiWkbZxXlznkmitMhOmW0",
  authDomain: "advanced-929a5.firebaseapp.com",
  databaseURL: "https://advanced-929a5.firebaseio.com/",
  projectId: "advanced-929a5",
  storageBucket: "",
  messagingSenderId: "291432338857"
};

firebase.initializeApp(config);

var database = firebase.database();

  // Initial Values
  var train = "";
  var destination = "";
  var frequency = 0;
  var arrival = "";
  var minutes = 0;
 

  // Capture Button Click
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    train = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    arrival = $("#arrival-input").val().trim();

    database.ref("Trains").push({
      train: train,
      destination: destination,
      frequency: frequency,
      arrival: arrival,
    });
  });

//Call to database, check for additional child
database.ref("Trains").orderByChild("dataAdded").on("child_added", function(data) {
   console.log(data.val().train);
   console.log(data.val().destination);
   console.log(data.val().frequency);
   console.log(data.val().arrival);

   var mCurrent = moment();
   var mArrival = moment(data.val().arrival, 'LTS');
   var countDown= Math.floor(mArrival.diff(mCurrent, 'minutes'));
   
   console.log(mCurrent)
   console.log(mArrival) 
   console.log(countDown);

   //Append train data to the table
   $('#train-table').append('<tr>' + '<td>' + data.val().train + '<td>' + data.val().destination  + '<td>' + data.val().frequency + '<td>' + data.val().arrival + '<td>' + countDown)
})