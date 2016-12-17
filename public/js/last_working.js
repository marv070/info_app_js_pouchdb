//Creating the database object

        var first_name = document.getElementById('first_name').value,
        last_name = document.getElementById('last_name').value,
        email = document.getElementById('email').value;

    

  db = new PouchDB('info_details');
 // db =  PouchDB('info_details');

//db.info brings back to info.erb by the <pre> tags
db.info().then(function (info) {
  document.getElementById('display').innerHTML = 'We updated a kitten: ' + JSON.stringify(doc);
});

// returns database info to inspect console
db.info().then(function (info) {
  console.log(info);
});

// var remoteCouch = 'https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details';


var doc = {
  "_id": new Date().toISOString(),
  first_name: first_name,
  last_name:  last_name,
  email: email,
  
};
// db insert to db = new PouchDB('info_details');
// function submit(){db.put(doc)};

var remoteCouch = 'https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details';

function submitExposure () {
  db.put(doc);
  
   // sendToLocalPouch();
   // loadIt();
}

// function sendToLocalPouch(){
//   db.put(doc);
// }

db.replicate.to('https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details');

// function loadIt() {
// db.replicate.to('https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details');
// }

// }
// function sync() {
//   var opts = {live: true};
//       db.sync(remoteCouch, opts);
// }
  // if (remoteCouch) {
  //   sync();
  // }
