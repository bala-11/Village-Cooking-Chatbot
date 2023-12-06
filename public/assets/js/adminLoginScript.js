function check(){
    const name = document.querySelector("#name").value;
    const pwd = document.querySelector("#password").value;

    
    if(name == "admin" && pwd == "admin@123" ){
        alert("Welcome admin");
    }
    else{
        alert("Invalid Credentials...");
        event.preventDefault();
    }
};