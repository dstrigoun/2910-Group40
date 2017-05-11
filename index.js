var firebaseRef = firebase.database().ref();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	/*
	//var username = $("#signUpUser").val();
	var loginUser = snap.child("username").val();
	var username = firebase.auth().currentUser.email;
	//var yup = firebase.auth().currentUser.username;
	
	var childAuthor = snap.child("author").val();
    var thisAuthor = firebase.auth().currentUser.uid;
    var writeUsername;
    
     firebaseRef.on("child_added", snap =>  { 
            
                var username = snap.child("username").val();
                
            
            if (childAuthor == thisAuthor) {
                writeUsername = username;
				alert(writeUsername);
            }
            
        
        }
		*/

	$("#signOutBtn").text("Welcome . Click to logout");

  } else {

    

    // No user is signed in.
    $("#signOutBtn").text("Sign in / Sign Up");
	$("#signOutBtn").click(
  function(){

    
	window.location = 'http://students.bcitdev.com/A00983479/Wasted/form.html'

	
  }
);


  }
});



var itemName = document.getElementById("itemName");
var expiryName = document.getElementById("datepicker");
var firebaseRef = firebase.database().ref();
var itemNumber = 0; 

function submitClick() {
	
	
	
	
	var itemText = itemName.value;
	var expiryText = expiryName.value;
	var author = firebase.auth().currentUser.uid;
	var email = firebase.auth().currentUser.email;
	
	
	firebaseRef.push({
		'expiry': expiryText,
		'name': itemText,
		'author': author,
		'email': email
	});
}

function removeClick(obj) {
	var id = obj.id;
	//alert(id);
	firebaseRef.child(id).remove();
	window.location.reload();
}


firebaseRef.on("child_added", snap => {
	var name = snap.child("name").val();
	var expiry = snap.child("expiry").val();
	var id = snap.key;
	var childAuthor = snap.child("author").val();
	var thisAuthor = firebase.auth().currentUser.uid;
	
	if (childAuthor == thisAuthor) {
	var html = '<tr id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');	
	}
	/*
	
	$("#table_body").append("<tr id =snap.key()><td>" + name + "</td><td>" + expiry + "</td><td><button>Remove</button></td></tr>" );
	*/

	
});





/* LOGOUT PROCESS */

$("#signOutBtn").click(
  function(){

    
	
	firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

	window.location.reload();
	
  }
);