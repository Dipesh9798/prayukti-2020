

/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-alert */
window.onload=function(){
    render();
};

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
    .then((confirmationResult) => {
        //

        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        console.log(coderesult);
        alert("Message sent");
    })
    // eslint-disable-next-line prefer-arrow-callback
    .catch(function(error){
        alert(error.message);
    });
    recaptchaVerifier.render()
    // eslint-disable-next-line prefer-arrow-callback
    .then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
    });
   

}

function codeVerify(){
    //get code value
    var code=document.getElementById('code').value;
    console.log("chutiya");
    console.log("1"+number+" 1 "+code+"2");

    coderesult.confirm(code)
    // eslint-disable-next-line prefer-arrow-callback
    .then(function(result){
        //alert("Successfully registered")

       // document.getElementById("inhouse").style.display="block";

document.getElementById('').style.visibility="hidden";
document.getElementById('login').innerHTML = document.getElementById('inhouse').innerHTML;
        var user=result.user;
        console.log(user);

        

    })
    // eslint-disable-next-line prefer-arrow-callback
    .catch(function(error){
        alert(error.message)
    })
}


