db.collection('user_databse')
.get()
.then((snapshot)=>{
    //console.log(snapshot.docs);

    snapshot.docs.array.forEach(doc => {
        console.log(doc.data())
        
    });
});

