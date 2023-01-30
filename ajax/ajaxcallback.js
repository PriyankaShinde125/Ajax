let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs : " + date.getMinutes() + "Mins : " + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200 || xhr.status === 201){
                callback(xhr.responseText);
            }
            else if(xhr.status >= 400){
                console.log("Handle 400 Client Error or 500 Sever Error at "+showTime());
            }
        }
    }
    xhr.open(methodType, url, async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType+" request sent to the server at " + showTime());
}

const getURL = "http://localhost:3000/employees/";
function getUserDetails(data){
    console.log("Get all User Data at: " + showTime() + " data: " + data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to Server at " + showTime());

const getByIdURL = "http://localhost:3000/employees/1";
function getUserDetailsById(data){
    console.log("Get User Data By Id at: " + showTime() + " data: " + data);
}
makeAJAXCall("GET", getByIdURL, getUserDetailsById, true);
console.log("Made GET AJAX Call to Server at " + showTime());

const deleteURL = "http://localhost:3000/employees/4";
function deleteUserDetails(data){
    console.log("User deleted at: " + showTime() + " data: " + data);
}
makeAJAXCall("DELETE", deleteURL, deleteUserDetails, true);
console.log("Made Delete AJAX Call to Server at " + showTime());

const postURL = "http://localhost:3000/employees";
const empData = {"name":"Priyanka", "salary":"15000"};
function userAdded(data){
    console.log("User Added at: " + showTime() + " data: " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, empData);
console.log("Made POST AJAX Call to Server at " + showTime());