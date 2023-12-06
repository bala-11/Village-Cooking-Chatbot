window.onload = display;

var Item = [];

function display(){
    Item = JSON.parse(localStorage.getItem("updateItem"));
    console.log(Item);
    document.getElementById("name").value = Item.food_name;
    document.getElementById("number").value = Item.food_price;
    document.getElementById("imageUrl").value = Item.food_picture;
    setTimeout(editItem,10000);
}

function editItem(){

    let newItem = Item._id;

    let newName = document.getElementById("name").value
    let newPrice = document.getElementById("number").value
    let newImage = document.getElementById("imageUrl").value

    console.log(newItem,newName,newPrice,newImage);

    const http = new XMLHttpRequest();
	http.open("PUT",`http://localhost:5000/updateitem/${newItem}`,true);
	http.setRequestHeader("Content-Type","application/json");
	// console.log(typeof(users_json));
	http.send(JSON.stringify({food_name:newName,food_price:newPrice,food_picture:newImage}));
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
			alert("Update successfull");
		}
	}
    event.preventDefault();
    }


}