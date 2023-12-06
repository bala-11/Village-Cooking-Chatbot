// var userLoggedData = [];

function userCheck(){

    const data=  document.getElementById("name").value;
	// const data1=  document.getElementById("email").value;
	const data2=  document.getElementById("password").value;
    const r = "user";

    const http = new XMLHttpRequest();
	http.open("POST",`http://localhost:5000/login`,true);
	http.setRequestHeader("Content-Type","application/json");
	http.send(JSON.stringify({username:data,role:r,password:data2}));
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
            userLoggedData = JSON.parse(this.responseText);
            // window.location.href="main.html"
            localStorage.setItem("Token",userLoggedData);
            loadUser();
			// console.log(userLoggedData);
		}
	}
    event.preventDefault();
    }
}

function loadUser(){
    const http = new XMLHttpRequest();
	http.open("GET",`http://localhost:5000/auth-user`,true);
	http.setRequestHeader("Content-Type","application/json");
    http.setRequestHeader("x-auth-user",localStorage.getItem("Token"));
	http.send()
	http.onreadystatechange = function(){
		if(this.readyState == 4){
        	if(this.status == 200){
            userLoggedData = JSON.parse(this.responseText);
            window.location.href="main.html"
            // checkUser();
		}
	}
    event.preventDefault();
    }
	
}

// function checkUser(){
//     const name = document.querySelector("#name").value;
//     const pwd = document.querySelector("#password").value;

//     console.log(name,pwd);
    
//     var flag = false;
//     for(let key in userLoggedData){
//         if(name == userLoggedData[key].username && pwd == userLoggedData[key].password ){
//             flag = true;
//         }
//     }
//     if(flag) {
//         // alert(`Welcome ${name}`)
//         location.replace("http://localhost:5000/main.html");
//     }
//     else{
//         alert(`Invalid Credentials`);
//         event.preventDefault();
//     }
// }