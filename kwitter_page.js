
//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyBuQJ90X2bJ-kPykL3ernj0UkXDrxU8OVo",
      authDomain: "kwitter-296cc.firebaseapp.com",
      databaseURL: "https://kwitter-296cc-default-rtdb.firebaseio.com",
      projectId: "kwitter-296cc",
      storageBucket: "kwitter-296cc.appspot.com",
      messagingSenderId: "1009301178610",
      appId: "1:1009301178610:web:9bd9b58efb69ace5b9686b"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

room_name = localStorage.getItem("room_name")
user_name = localStorage.getItem("user_name")

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
uname = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>"+ uname +"<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'>"+ message +"</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+ like +" onclick='updateLike(this.id)'>"
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

row = name_with_tag +message_with_tag +like_button + span_with_tag;
document.getElementById("output").inerHTML += row;
//End code
      } });  }); }
getData();

function send()
{
      msg = document.getElementById("msg").value;
      console.log(msg);
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });

      document.getElementById("msg").value = "";
}

function updateLike(message_id)
{
      console.log("clicked on like button - " + message_id);
      button_id =message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}