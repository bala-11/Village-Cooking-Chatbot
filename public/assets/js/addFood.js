function Show(){
    const foodName = document.getElementById("name").value  
    const foodPrice = document.getElementById("number").value 
    const foodPicUrl = document.getElementById("imageUrl").value

    console.log(foodName,foodPicUrl,foodPrice);

    const http = new XMLHttpRequest();
	http.open("POST",`http://localhost:5000/createItem`,true);
	http.setRequestHeader("Content-Type","application/json");
	http.send(JSON.stringify({food_name:foodName,food_price:foodPrice,food_picture:foodPicUrl}));
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 201){
            location.replace("http://localhost:5000/adminHomeView.html");
		}
	}
    // event.preventDefault();
    }

    event.preventDefault();
}