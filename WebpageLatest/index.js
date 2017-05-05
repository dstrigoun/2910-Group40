var itemName = document.getElementById("itemName");
var expiryName = document.getElementById("expiryDate");
var firebaseRef = firebase.database().ref();
var itemNumber = 0; 

function submitClick() {
	
	
	//alert("working");
	
	
	var itemText = itemName.value;
	var expiryText = expiryName.value;
	
	firebaseRef.push({
		'expiry': expiryText,
		'name': itemText,
		'itemNumber': ++itemNumber
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

	var html = '<tr id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');	
	/*
	
	$("#table_body").append("<tr id =snap.key()><td>" + name + "</td><td>" + expiry + "</td><td><button>Remove</button></td></tr>" );
	*/

})