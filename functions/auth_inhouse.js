/* eslint-disable promise/catch-or-return */
/* eslint-disable no-alert */
/* eslint-disable promise/always-return */
/* eslint-disable prefer-arrow-callback */



function render(){
    // console.log('chutiya');
     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('r1', {
         'size': 'normal',
         'callback': function(response) {
             document.getElementById("b1").style.display="block";
             document.getElementById("r1").style.display="none";
         },
         'expired-callback': function() {
           // Response expired. Ask user to solve reCAPTCHA again.
           // ...
           alert("recaptcha failed")
         }
       });
     recaptchaVerifier.render();
    // recaptchaVerifier.render();
 
 }
 
 function phoneAuth(){
     //get the number
     var number=document.getElementById('number').value;
     console.log(number);
 
     //phone number authentication function of firebase
     //
 
     firebase.auth().signInWithPhoneNumber("+91"+number,window.recaptchaVerifier)
     .then(function(confirmationResult){
         //
 
         window.confirmationResult=confirmationResult;
         coderesult=confirmationResult;
         console.log(coderesult);
         alert("Message sent");
     })
     .catch(function(error){
         alert(error.message);
     });
     recaptchaVerifier.render()
     .then(function(widgetId) {
         window.recaptchaWidgetId = widgetId;
     });
 
 }
 
 
 function codeVerify(){
     //get code value
      code=document.getElementById('code').value;
      
     console.log("chutiya");
     console.log("1"+number+" 1 "+code+"2");
 
     coderesult.confirm(code)
     .then(function(result){
         //alert("Successfully registered")
         document.getElementById('login').innerHTML = document.getElementById('inhouse').innerHTML;
         var user=result.user;
         console.log(user);
 
 
         //VerifyUser();
 
     })
     .catch(function(error){
         alert(error.message)
     })
 
 }
 
 
 