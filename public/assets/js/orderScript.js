var orderitemJson = [];

function ordersPage(){
	const http = new XMLHttpRequest();
	http.open("GET",`http://localhost:5000/getorder`,true);
	http.setRequestHeader("Content-Type","application/json");
	// console.log(typeof(users_json));
	http.send();
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
		     orderitemJson = JSON.parse(this.responseText);
			 console.log(orderitemJson);
             orderDetailsPage();
			}
	}
    }
};

function orderDetailsPage(){
    // console.log("landed in final fc",orderitemJson);
	let data  = `<div class="row">
    <div class="col-lg-7 mx-auto">
        <div class="card border-0 shadow">
            <div class="card-body p-5">
                <div class="table-responsive">
                    <table class="table m-0">
                    <thead>
    <tr>
        <th scope="col">Item</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price(INR)</th>
        <th scope="col"></th>
    </tr>
</thead>
<tbody>`

	for(let key in orderitemJson){
		data += `<tr>
        
		<td>${orderitemJson[key].ordereditem}</td>
		<td>${orderitemJson[key].quantity}</td>
		<td>${orderitemJson[key].price}</td>
		<td>
			<ul class="list-inline m-0">
				<li class="list-inline-item">
					<button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Make payment" onClick=makePayment()><i class="fa fa-trash"></i>Make payment</button>
				</li>
                <li class="list-inline-item">
					<button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" onClick=deleteOrder(${key}) title="Cancel order"><i class="fa fa-trash"></i>Cancel</button>
				</li>
			</ul>
		</td>
	</tr>`
	}
	document.getElementById("orderTable").innerHTML = data + `</tbody>
    </table>`
};


function deleteOrder(id) {
    console.log(orderitemJson[id]._id);
    const http = new XMLHttpRequest();
	http.open("DELETE",`http://localhost:5000/deleteorder/${orderitemJson[id]._id}`,true);
	http.setRequestHeader("Content-Type","application/json");
	http.send();
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
		    //  orderitemJson = JSON.parse(this.responseText);
			//  console.log(orderitemJson);
			alert("Delete order?")
             ordersPage();
			}
	}
    }
	event.preventDefault();
}

function makePayment(){
    location.replace("http://localhost:5000/payment.html");
}


window.onload = ordersPage;