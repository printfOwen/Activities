function loginUser  (){
let old_user = localStorage.getItem("userRecord");
if(old_user === null) {
    document.getElementById("loginMessage").innerHTML = "<h2>No User record found. Kindly Register first";
    return;
}
//split value of the local storage

let userData = old_user.split(" | "); //this is an array 


//retrieve username and oassword at the location of that array
let old_name = userData[0];
let old_uname = userData[3];
let old_pword = userData[5];

//retrieve iser input via the login form
let loginuname = document.getElementById("login_uname").value;
let loginpword = document.getElementById("login_pword").value;

//conditional statement - checking old vs login data
if(loginuname === old_uname && loginpword == old_pword){
    document.getElementById("loginMessage").innerHTML = "Welcome" + old_name + "! You may now add an item."

    //Move to next page
    window.location.href = "list.html";

} else {
    document.getElementById("loginMessage").innerHTML = "<h2>Invalid User Credentials!</h2>"
}}