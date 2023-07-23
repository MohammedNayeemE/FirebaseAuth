// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , sendEmailVerification} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxCXt5EgVxV93dOj5BWS8yNxQUbH2oFH8",
  authDomain: "shopping-83179.firebaseapp.com",
  projectId: "shopping-83179",
  storageBucket: "shopping-83179.appspot.com",
  messagingSenderId: "16446052460",
  appId: "1:16446052460:web:539b99bfeb29cc34aea049",
  measurementId: "G-VPFTP7VZ1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);









let PasswordField = document.getElementById('password');
let CheckBoxField = document.getElementById('checkBot');

CheckBoxField.addEventListener('change', ()=>{
    if(CheckBoxField.checked){
        PasswordField.type = 'text';
    }
    else{
        PasswordField.type = 'password';
    }
})



const btn = document.querySelectorAll('button');
btn.forEach(button =>{
    button.addEventListener('click',handler);
})
let validate = () =>{
    let Name = document.getElementById('Name').value;
    let Password = document.getElementById('password').value;
    let Email = document.getElementById('email').value;
    const passwordRegex = new RegExp('^(?=.*[a-zA-Z]).{8,}$');
    if(Name.length === 0 || Password.length === 0 || Email.length === 0){
        alert("Fill All The Details");
        return false;
    }
    if(!passwordRegex.test(Password)){
        alert("Password should Have eight characters and an alphabet");
        return false;
    }
    if(!(Email.includes(".") && Email.includes("@"))){
        alert("Enter valid email");
        return false;
    }


    return true;

    

}

let signup = () =>{
    let Name = document.getElementById('Name').value;
    let Password = document.getElementById('password').value;
    let Email = document.getElementById('email').value;

    if(!validate()){
        return;
    }
    else{
        createUserWithEmailAndPassword(auth , Email , Password)
        .then((usercredential) =>{
        const user = usercredential.user;
        console.log(user);
        verifyEmail();

        })
       
        .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
    })


    console.log("Signed UP");

    
    }
}
let login = ()=>{
    let Password = document.getElementById('password').value;
    let Email = document.getElementById('email').value;

    signInWithEmailAndPassword(auth , Email , Password)
    .then((usercredential) =>{
        const user = usercredential.user;
        console.log(user);
        
    })
    
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
    })
    alert('logged in');

    
}
let lvalidate = ()=>{
    let Password = document.getElementById('password').value;
    let Email = document.getElementById('email').value;

    if(Password.length === 0 || Email.length === 0){
        alert('fill the details');
        return false;

    }
    return true;
}

let Out = () =>{
    signOut(auth)
    .then(()=>{
        alert("Signed Out");
    })
    .catch((error)=>{
        alert("An error occured");
    })
}

let lclear = ()=>{
     document.getElementById('password').value = "";
     document.getElementById('email').value = "";
}
let clear = ()=>{
    document.getElementById('Name').value = "";
    document.getElementById('password').value = "";
    document.getElementById('email').value = "";


}

let verifyEmail = ()=>{
    
    sendEmailVerification(auth.currentUser)
    .then(() => {
   alert("Verification Email Sent");
 })
}

function handler(event){


    if(event.target.textContent === 'Login'){
        if(!lvalidate()) {
            return;
        }
        else{
            login();
            lclear();
        }
        }

   if(event.target.textContent === 'SignUp'){
      if(!validate()){
        return;
      }
      else{
        signup();
        //verifyEmail();
        clear();
       
       // window.location.href = "login.html";
      }
   }
}






