/* eslint-disable no-alert */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prefer-arrow-callback */
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var firebase = require("firebase");
var functions=require("firebase-functions");
//const cors = require('cors');

require('firebase/auth');
require('firebase/messaging');
require("firebase/firestore");
// const router = express.Router();
// loc=require('./auth_inhouse');

var Config = {
    apiKey: "AIzaSyADZQRPKYxN9gbbkI_BzKQZm_0DwxAJtJQ",
    authDomain: "prayukti2020-b7c3d.firebaseapp.com",
    databaseURL: "https://prayukti2020-b7c3d.firebaseio.com",
    projectId: "prayukti2020-b7c3d",
    storageBucket: "prayukti2020-b7c3d.appspot.com",
    messagingSenderId: "876252785433",
    appId: "1:876252785433:web:69778553d22e6f5ddbf388",
    measurementId: "G-W0W8BTD4DD"
  };
  
  firebase.initializeApp(Config);
  
  var dbRootRef = firebase.firestore();
  
  
  let app = express();
  


//current user information
var ID;
var college;
window.onload=function(){
    prompt("hold")
    console.log(firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged(function(user){


        if(user){
            console.log(user);
            var user_uid=user.uid;
            console.log(user);

            if(user_uid.user_college==="Haldia Institute of Technology")
            {
                ID="H"+user_uid.user_mobile;
                //college='H';
                dbRootRef
                 .collection("inhouse_database")
                 .doc(user.uid)
                 .get()
                 .then(doc=>{
                     if (!doc.exists){
                         console.log("Not exist in outhouse_db");
                     }

                     else{
                         dbRootRef
                         .collection("inhouse_database")
                         .doc(user.uid)
                         .get()
                         .then(snapshot => {
                             if (snapshot.empty){
                                 console.log("Snapshot is empty")
                                 json_response={
                                     user_data: doc.data()

                                 };
                                 console.log(json_response)
                                 document.getElementById('ID').innerHTML=ID;
                                 document.getElementById('name').innerHTML=
                                 json_response.user_uid.user_name
                                 console.log(json_response.user_uid.user_name);
                                 document.getElementById('college').innerHTML=
                                 json_response.user_uid.user_college;
                                 document.getElementById("tshirt").innerHTML =
                                    json_response.user_data.tshirt_size;
                                 /*document.getElementById("cost").innerHTML =
						            json_response.user_data.tshirt_size; */
                                 document.getElementById("roll").innerHTML =
						            json_response.user_data.user_roll;
                             }

                         })
                     }
                 })

            }
            
            else
            {
                ID="O"+user_uid.user_mobile;
                //college='O';
                dbRootRef
                .collection("outhouse_database")
                .doc(user.uid)
                .get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log("Not exist in outhouse_db");
                        //document.getElementById('p_bar').style.display='none';
                        
                        

                    } else {
                        dbRootRef
                        .collection("event_registration_data")
                        .where("user_uid", "==", user.uid)
                        .get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                console.log("Snapshot is empty");
                                json_response = {
                                    user_data: doc.data()
                                    //reg_data: docReg.data()
                                };
                                console.log(json_response);
                                document.getElementById('p_bar').style.display='none';

                                //start display data

                                document.getElementById("user_name").innerHTML =
                                json_response.user_data.user_name;
                                document.getElementById("userid").innerHTML =
                                json_response.user_data.user_mboile;
                                document.getElementById("tshirt").innerHTML =
                                json_response.user_data.t_shirt_size;
                                let events = json_response.reg_data.event_id;
                                let table = document.getElementById("dataTable");
                                let cost = 80 * events.length + 480;
                                document.getElementById("cost").innerHTML = cost;
                            }
                        })
                    } 
                })                   
            }

		
            if(user_uid.gender==='m')
            {
                document.getElementById('image').src="../img/male.png";
            }
            else
            {
                document.getElementById('image').src="../img/female.png";
            }

            //document.getElementById('ID').innerHTML=ID;

            //document.getElementById('college').innerHTML=user_uid.user_college;

            //document.getElementById('name').innerHTML=user_uid.user_name;

            document.getElementById('roll').innerHTML=user_uid.user_roll;

            document.getElementById('tshirt').innerHTML=user_uid.tshirt_size;
        }
        else
        {
            alert("You are Signed Out");
            window.location.href="/login.html"; // CHANGE THIS LINK
        }

    })
}

function signout(){
    firebase.auth().signOut().then(function() {
		// Sign-out successful.
		window.location.href="/";
    })
    .catch(function(error) {
		// An error happened.
		alert("Problem in signing out");
		console.log(error);
	});

}

function payment(){
    if(college==='H')
    {
        alert("Visit Chemical department 1 st Floor");
    }
    else if(college==='O')
    {

        window.location.href="google.com";
    }
    else{
        alert("Some error occured !\n Retry after some time");
        window.location.href="/";
    }
}