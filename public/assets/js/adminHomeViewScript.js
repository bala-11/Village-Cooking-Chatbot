var displayJson = [];

function readFormData() {
    const http = new XMLHttpRequest();
	http.open("GET",`http://localhost:5000/getitems`,true);
	http.setRequestHeader("Content-Type","application/json");
	http.send();
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
		    displayJson = JSON.parse(this.responseText);
			console.log(displayJson)
			display();
		}
	}
    event.preventDefault();
    }
}

function display() {
    let data = `<div class="row">
    <div class="col-lg-7 mx-auto">
        <div class="card border-0 shadow">
            <div class="card-body p-5">
                <div class="table-responsive">
                    <table class="table m-0">
                    <thead>
    <tr>
        <th scope="col">Item</th>
        <th scope="col">Price</th>
        <th scope="col">Picture Url</th>
    </tr>
</thead>
<tbody>`
    for(let key in displayJson){

        data += `<tr>
		<td contenteditable="false">${displayJson[key].food_name}</td>
		<td contenteditable="false">${displayJson[key].food_price}</td>
		<td contenteditable="false">${displayJson[key].food_picture}</td>
		<td>
        <button class="btn btn-primary" type="button"  onclick=editFood(${key}) ><a href="editFood.html">Update</button>
		</td>
		<td>		
		<button class="btn btn-danger" type="button"  onclick=deleteFood(${key})>Delete</button>
		</td>
	</tr>`
	}
	document.getElementById("tableId").innerHTML = data + `</tbody>
    </table>`
}

function deleteFood(id){
    
    console.log(displayJson[id]._id)
    const http = new XMLHttpRequest();
	http.open("DELETE",`http://localhost:5000/deleteitem/${displayJson[id]._id}`,true);
	http.setRequestHeader("Content-Type","application/json");
	http.send();
    http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
            readFormData();
		}
	}
    event.preventDefault();
    }
}

var specificItem = [];

function editFood(key){
    console.log(displayJson[key]._id);
	const http = new XMLHttpRequest();
	http.open("GET",`http://localhost:5000/getitem/${displayJson[key]._id}`,true);
	http.setRequestHeader("Content-Type","application/json");
	http.send();
    http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
			specificItem = JSON.parse(this.responseText);
			localStorage.setItem("updateItem",JSON.stringify(specificItem));
		}
	}
    }
}


window.onload = readFormData();