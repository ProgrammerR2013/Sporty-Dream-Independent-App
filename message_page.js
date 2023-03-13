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

// Get the username and room name and store it in a variable

username = localStorage.getItem("Username");
room_name = localStorage.getItem("room_name");

// Function send to send messages in the server

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: username,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

// Function getData

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data ['name'];
    message = message_data ['message'];
    like = message_data ['like'];
    name_with_tag = "<h4>"+ name + "<img class = 'user_tick' src = 'tick.png'></h4>";
    message_with_tag = "<h4 class = 'message_h4'> " + message + "</h4>";
    like_button = "<button class = 'btn btn-warning' id ="+firebase_message_id+" value = "+like+" onclick = 'updateLike(this.id)'>";
    span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
 } });  }); }
getData();

// Function updateLike so when someone likes, it gets stored and updated in firebase realtime database

function updateLike(message_id){
    console.log("Clicked on like button" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;

    // Add the updated likes number to firebase realtime database
    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}

// Function logout so when the user wants to logout, they can at anytime

function logout(){
    localStorage.removeItem("Username");
    localStorage.removeItem("room_name");
    window.location = "login_page.html";
}
