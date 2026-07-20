const form = document.getElementById("myForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    document.getElementById("nameError").textContent="";
    document.getElementById("emailError").textContent="";
    document.getElementById("passwordError").textContent="";
    document.getElementById("success").textContent="";

    let valid=true;

    const name=document.getElementById("name").value.trim();
    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value;

    if(name===""){
        document.getElementById("nameError").textContent="Name is required";
        valid=false;
    }

    if(!email.includes("@") || !email.includes(".")){
        document.getElementById("emailError").textContent="Enter a valid email";
        valid=false;
    }

    if(password.length<6){
        document.getElementById("passwordError").textContent="Password must be at least 6 characters";
        valid=false;
    }

    if(valid){
        document.getElementById("success").textContent="Form submitted successfully!";
    }

});