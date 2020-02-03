/* eslint-disable no-alert */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prefer-arrow-callback */


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
console.log("Hello")   
window.onload=function(){
        prompt("hold");
        console.log(firebase.auth().currentUser);
        firebase.auth().onAuthStateChanged(function(user){
            

            if(user){
                console.log(user);
                var user_uid=user.uid;
                console.log(user);
                dbRootRef.collection('inhouse_database')
                .doc(user_uid).get()
                .then(doc=>{
                    if(doc.exists)
                    {
                        var values=doc.data();
                        console.log(values);
                    }
                    else
                    {
                        console.log('Cant fetch data due to some internal error');
                    }
                })

            }
        })
}