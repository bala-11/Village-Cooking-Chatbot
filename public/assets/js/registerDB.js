function Show()
{
    var req = new XMLHttpRequest();
	req.open("POST", "http://localhost:5000/adduser", true);
	req.setRequestHeader("Content-type", "application/json");
	const data=  document.getElementById("name").value;
	const data1=  document.getElementById("email").value;
	const data2=  document.getElementById("password").value;
	const r = "user";
	req.send(JSON.stringify({username:data,email:data1,role:r,password:data2}));
	req.onreadystatechange = function(){
		if(req.readyState == 4)
		{
			if(req.status == 201){
				
			} 
		}
    }
	alert("User registered Successfully");
	location.replace("http://localhost:5000/index.html");
	event.preventDefault();
}
