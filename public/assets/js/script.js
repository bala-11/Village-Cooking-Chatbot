var itemJson =[];

function getItems(){

    const http = new XMLHttpRequest();
	http.open("GET",`http://localhost:5000/getitems`,true);
	http.setRequestHeader("Content-Type","application/json");
	http.send();
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
		     itemJson = JSON.parse(this.responseText);
			 console.log(itemJson)
			display();
		}
	}
    event.preventDefault();
    }	
}

function display(){

	let modifiedContent = `<div class="container">
	<div class="row h-100">
	  <div class="col-lg-7 mx-auto text-center mt-7 mb-5">
		<h5 class="fw-bold fs-3 fs-lg-5 lh-sm">Make your order</h5>
	  </div>
	  <div class="col-12">
		<div class="carousel slide" id="carouselPopularItems" data-bs-touch="false" data-bs-interval="false">
		  <div class="carousel-inner">
			<div class="carousel-item active" data-bs-interval="10000">
			  <div class="row gx-3 h-100 align-items-center">`;

	for(let key in itemJson){

		modifiedContent += `
		<div class="col-sm-6 col-md-4 col-xl mb-5 h-100">
		<div class="card card-span h-100 rounded-3"><img class="img-fluid rounded-3 h-100" src="${itemJson[key].food_picture}" alt="..." />
		  <div class="card-body ps-0">
			<h5 class="fw-bold text-1000 text-truncate mb-1">${itemJson[key].food_name}</h5>
			<div><label for="quantity"><b>Qty</b></label>
			  <input type="number" class="quantity${key}" name="quantity" min="1" max="5"></div><span class="text-1000 fw-bold">INR ${itemJson[key].food_price}</span>
		  </div>
		</div>
		<div class="d-grid gap-2"><a class="btn btn-lg btn-danger" href="" onClick=orderDetails(${key}) role="button">Order now</a></div>
	  </div>`
	}
	document.getElementById("orderItem").innerHTML = modifiedContent + `</div></div></div>
</div>
</div>
</div>
</div>`;
}

function orderDetails(order){

	// console.log("order", order);
	var quan = document.querySelector(`.quantity${order}`).value;
	// console.log("Quantity",quan);
	let orderDetails = itemJson[order];
	// console.log("orderDetails",orderDetails);
	let totalprice = quan * orderDetails.food_price;
	// console.log(totalprice);

	const http = new XMLHttpRequest();
	http.open("POST",`http://localhost:5000/addorders`,true);
	http.setRequestHeader("Content-Type","application/json");
	// console.log(typeof(users_json));
	http.send(JSON.stringify({ordereditem:orderDetails.food_name,quantity:quan,price:totalprice}));
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 201){
			alert("Orders added to your cart");
			location.replace("http://localhost:5000/main.html")
		}
	}
    event.preventDefault();
    }
}

window.onload = getItems;