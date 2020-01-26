//signup_hit--->

const before_otp=document.querySelector("#beforeotp")
const send_otp=document.querySelector("#b1")
before_otp.send_otp.addEventListener('SEND OTP', (e)=>{
    e.preventDefault();

    //Invisible recaptcha--->
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        }
      });
      


    //get phonenumber-->
    var phoneNumber = getPhoneNumberFromUserInput();

    
    //sending verification code to user-->

    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        }).catch(function (error) {
        // Error; SMS not sent
        // ...
        alert("sms not sent")
        });

});

const after_otp=document.querySelector("#otp")
const login=document.querySelector("#b2")
after_otp.login.addEventListener('LOGIN', (e)=>{
    e.preventDefault();

    //get code--->
    var code = getCodeFromUserInput();


    //sign in user with the code--->
    confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user;
        // ...
      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
        alert("error message");
      });
      

})

