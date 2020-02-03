/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/always-return */
/* eslint-disable no-alert */

var usr;
var dbRootRef=firebase.firestore();
var number;
//var otp;

window.onload=function(){
    window.recaptchVerifier=new firebase.auth.RecaptchaVerifier('r1',{
      'size':'normal',
      'callback':function(response){
        document.getElementById('r1').style.display="none";
       // var appverifier=window.recaptchVerifier;
      },
      'expired-callback': function() {
        console.log("expired-callback");
      }
    });
    recaptchVerifier.render();

}

function sendOTP(){
  number=document.getElementById('number').value;
  

        firebase.auth().signInWithPhoneNumber("+91"+number,window.recaptchVerifier)
        .then(function(confirmationResult){
          window.confirmationResult=confirmationResult;
          console.log("OTP sent");
         // otp=prompt("Enter the OTP");
         document.getElementById('beforeotp').style.display="none";
          document.getElementById('otp').style.display="block";


        })
        .catch(function(error){
          //OTP sending error ........... Give a alert of error.message
          alert('You have consumed max try of OTP verification \n Please try after some time');
          console.log(error.message);
          window.location.href="/";
        });
     
   // recaptchaVerifier.render().then(function(widgetId) {
    //  window.recaptchaWidgetId = widgetId;
  //});

}

function codeVerify(){
  var otp=document.getElementById('code').value;
  confirmationResult.confirm(otp)
  .then(function(result){
    var user=result.user;
    
    
       dbRootRef.collection('inhouse_database')
        .doc(user.uid)
      .get()
      .then( doc =>{
        if(doc.exists){
            console.log("Logged In");
            window.location.href="/Dash/Dash.html";
        }
           else
           {
                alert("Proceed to Fill the Form");
                document.getElementById('otp').style.display="none";
                document.getElementById('inhouse').style.display="block";
           }
   
  })
  
})
.catch(function(error){
  alert("wrong Otp"); // add a route to login_inhouse.html
  console.log(error.message);
});
}

 function registerUser(){

  console.log("In register user");

 // console.log(firebase.auth().currentUser);

 // var id1=prompt("gaandu");
  this.Unsubscribe=firebase.auth().onAuthStateChanged(function(user){
  //  var id2=prompt("gaandu");
    console.log(user);
  //  var id3=prompt("gaandu");
  //  console.log(firebase.auth().currentUser);
    if(user){
      var user_uid=user.uid;
      //window.localStorage.setItem("usr",user_uid);

      console.log(user_uid);
     // var id=prompt("gaandu");

  var mobile =document.getElementById('number').value;
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var gender=document.getElementById('gender').value;
  var dob=document.getElementById('DOB').value;
  var college_name = "Haldia Institute of Technology";
  var dept=document.getElementById('dept').value;
  var college_roll = document.getElementById('roll').value;
  var college_code = document.getElementById('CID').value;
  var tshirt_size = document.getElementById('tshirt').value;
     // dbRootRef.collection('inhouse_database')
     // .where("user_mobile", "==" , mobile)
     // .where("user_email", "==" , email)
     // .get()
      //.then( snapshot =>{
       // if(snapshot.empty){
          //User can register
          //post user data to database

          //console.log("Snap is Empty");

          var userDocData = {
            user_name: name,
            user_email: email,
            user_uid: user_uid,
            user_mobile:mobile,
            gender:gender,
           // user_profile_img: user_profile_img,
            user_college : college_name,
            user_roll: college_roll,
            user_dept:dept,
            user_dob:dob,
           // college_session: session,
            college_id: college_code,
            tshirt_size : tshirt_size
          //  t_shirt_type : t_shirt_type,
            //"timestamp": Date.now
          };
          console.log(userDocData);
          dbRootRef
            .collection("inhouse_database")
            .doc(user_uid)
            .set(userDocData)
            .then(function() {
             // res.send({status: 200})
              console.log("User Added to Database Succesfully");
              window.location.href="/Dash/Dash.html";


            })
            .catch(function(error) {
              console.log("Error writing document: ", error);
            });

      //  }
        //else{
          //user alreday exist in database 
          //res.send({status :400 , errorMessage : "User already exist in database"})
          //res.render('/Dash/Dash.html')
       // }

//end posting database 

} 
else {
// User is signed out.
// ...
console.log("user already signed out");
}
})
.catch(err =>{
  console.log("ErrInternal Server Error is +" +err);
});
event.preventDefault();
}

/*
function codeVerify(){
  var otp=document.getElementById('code').value;
  confirmationResult.confirm(otp)
  .then(function(result){
    var user=result.user;
    console.log("Logged In");
    alert("Proceed to Fill the Form");
    document.getElementById('otp').style.display="none";
    document.getElementById('inhouse').style.display="block";
   
  })
  .catch(function(error){
    alert("wrong Otp"); // add a route to login_inhouse.html
    console.log(error.message);
  });
}

function registerUser(){

  console.log("In register user");

 // console.log(firebase.auth().currentUser);

 // var id1=prompt("gaandu");
  this.Unsubscribe=firebase.auth().onAuthStateChanged(function(user){
  //  var id2=prompt("gaandu");
    console.log(user);
  //  var id3=prompt("gaandu");
  //  console.log(firebase.auth().currentUser);
    if(user){
      var user_uid=user.uid;
      console.log(user_uid);
     // var id=prompt("gaandu");

  var mobile =document.getElementById('number').value;
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var gender=document.getElementById('gender').value;
  var dob=document.getElementById('DOB').value;
  var college_name = "Haldia Institute of Technology";
  var dept=document.getElementById('dept').value;
  var college_roll = document.getElementById('roll').value;
  var college_code = document.getElementById('CID').value;
  var tshirt_size = document.getElementById('tshirt').value;
      dbRootRef.collection('inhouse_database')
      .where("user_mobile", "==" , mobile)
      .where("user_email", "==" , email)
      .get()
      .then( snapshot =>{
        if(snapshot.empty){
          //User can register
          //post user data to database

          console.log("Snap is Empty");

          var userDocData = {
            user_name: name,
            user_email: email,
            user_uid: user_uid,
            user_mobile:mobile,
            gender:gender,
           // user_profile_img: user_profile_img,
            user_college : college_name,
            user_roll: college_roll,
            user_dept:dept,
            user_dob:dob,
           // college_session: session,
            college_id: college_code,
            tshirt_size : tshirt_size
          //  t_shirt_type : t_shirt_type,
            //"timestamp": Date.now
          };
          console.log(userDocData);
          dbRootRef
            .collection("inhouse_database")
            .doc(user_uid)
            .set(userDocData)
            .then(function() {
             // res.send({status: 200})
              console.log("User Added to Database Succesfully");
              window.location.href="/Dash/Dash.html";
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });

        }
        else{
          //user alreday exist in database 
          //res.send({status :400 , errorMessage : "User already exist in database"})
          res.render('/Dash/Dash.html')
        }

  })
  .catch(err =>{
    console.log("ErrInternal Server Error is +" +err);
  });

//end posting database 

} else {
// User is signed out.
// ...
console.log("user already signed out");
}
})
event.preventDefault();
}*/

console.log(localStorage.getItem("usr"))

function dashrender(){
  //console.log("inside dashboard")
  //console.log(doc.data())
  //console.log(firebase.auth().currentUser.uid);
  //console.log(user.uid)
  firebase.auth().onAuthStateChanged(function(user){

    //prompt("hello!")
    if(user){
            var user_uid=user.uid;
            console.log(user_uid)
            console.log(user)
            console.log(user.user_name)
            console.log(firebase.auth().currentUser.uid)
      dbRootRef.collection('inhouse_database').doc(user_uid).get()
      .then(doc=>{
        if(doc.exists)
        console.log(doc.data());
        else
        console.log("some error in fetching");
      })

    }
    else
    {
      alert("Server side error");
    }
  })
}