username = localStorage.getItem("Username");
document.getElementById("welcome_tag").innerHTML = "Welcome to Sporty Dream, " + username;

// Linking the web-app to firebase by configuration
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBEg0FpC4jHZOOpjFrqM-HG19YcEbg-CUQ",
    authDomain: "sporty-dream.firebaseapp.com",
    databaseURL: "https://sporty-dream-default-rtdb.firebaseio.com",
    projectId: "sporty-dream",
    storageBucket: "sporty-dream.appspot.com",
    messagingSenderId: "1006507124446",
    appId: "1:1006507124446:web:638a3a9527362b1383844f"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Add room function to get chatting options to discuss sports practice

function addRoom() {
    console.log("Added room")

    // Creating the variable to store the room name
    room_name = document.getElementById("room_name_input").value;
    console.log("Room_name variable defined")

    // Adding the room name and data storer for our new room in firebase
    console.log("Adding room data in database...")
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room"
    })
    console.log("Added room data in database")
    
    // Adding the data in Local Storage so when firebase is down, we can use local storage
    localStorage.setItem("room_name", room_name);
    console.log("Added room data in Local Storage")

    // Changing webpage location
    console.log("Changed webpage location")
    window.location = "message_page.html";
}

// Get data function

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("trending_rooms_list").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    Room_names = childKey;
   //Start code
   console.log("Room name - " + Room_names);
   row = "<div class = 'room_name' id = "+Room_names+" onclick = 'redirectToRoomName(this.id)'> #"+Room_names+"</div> <hr>"
   document.getElementById("trending_rooms_list").innerHTML += row;
   //End code
   console.log("Got data in firebase...")
   console.log("Added data in trending_rooms_list")
   });});}
getData();

// Redirect to room name function

function redirectToRoomName(name) {
    console.log(name + " is the new room name");
    localStorage.setItem("room_name", name);
    window.location = "message_page.html"; 
    console.log("Redirected to next room");
}

// Function logout

function logout() {
    localStorage.removeItem("Username");
    localStorage.removeItem("room_name");
    window.location = "login_page.html";
    console.log("Logged out from website.")
}