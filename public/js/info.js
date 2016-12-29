var db;
// Initialize PouchDB database
function initDB() {
  db = new PouchDB("practice_details");
  db.info(function(error, result) {
    if(!error) {
      console.log(result);
    } else {
      console.log(error);
    }
  });
  return db;
} //END initDB()
      
initDB();
var Time = "1";
      
// Functionality to add a user
$("#btnAddNames").on("click", addUsers);
function addUsers() {         
  var uFirst   = $("#inputFirst").val(),
    uLast  = $("#inputLast").val(),
    uEmail  = $("#inputEmail").val();
    uTime = Time;
    uLocation = " ";
  var aUser = {
    "_id"   : uTime,
    "nameFirst" : uFirst,
    "nameLast" : uLast,
    "nameEmail"  : uEmail,
    "userLocation" : uLocation,
  };
  
  db.put(aUser, function(error, result) {
    if(!error) {
      $("#divResults").html("<p>Saved!</p>");
      showUsers();
      console.log(result);
      clearFields();
    } else {
      $("#divResults").html("<p>&iexcl;Error!</p>");
      console.log(error);
    }
   db.replicate.to('https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details');
 
  });
} //END addUsers();
// var remoteCouch = 'https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details';
      
// To clear fields
function clearFields() {
  $("#formUser")[0].reset();
} //END clearFields()
      
// Get the database of user names ready
$("#btnShowNames").on("click", showUsers);
function showUsers() {
  db.allDocs({"include_docs" : true, "ascending" : true}, function(error, result) {
    showTableOfUsers(result.rows);
  });
} //END showUsers()
      
// Display the user names in a table
function showTableOfUsers(data) {
  var str  = "<p><table border='1' id='userTable'>";
    str += "<tr><th>Time</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Location</th></tr>";
      for(var i = 0; i < data.length; i++) {
        str += "<tr><td>" + data[i].id + 
          "</td><td>" + data[i].doc.nameFirst + 
          "</td><td>" + data[i].doc.nameLast + 
          "</td><td>" + data[i].doc.nameEmail + 
          "</td><td>" + data[i].doc.userLocation + 
          "</td></tr>";
      }
    str += "</table></p>";
          
         
  $("#divResults").html(str);
} //END showTableOfUsers();
$("#btnUpdateLocations").on("click", updateLocation);
function updateLocation(){
  db.get(Time).then(function(doc){
   return db.put({
      _id : doc._id,
      _rev : doc._rev,
      nameFirst : doc.nameFirst,
      nameLast : doc.nameLast,
      nameEmail : doc.nameEmail,
      userLocation : doc.userLocation + "<br>" + $("#choose_location").val(),
    });
    }).catch(function (err) {
      console.log(err);
  })
}





// $("#btnUpdateLocations").on("click", updateLocation);
// function updateLocation(){
//   db.get(Time).then(function(doc){
//    return db.put({
//       _id : doc._id,
//       _rev : doc._rev,
//       nameFirst : doc.nameFirst,
//       nameLast : doc.nameLast,
//       nameEmail : doc.nameEmail,
//       userLocation : doc.userLocation + "<br>" + $("#choose_location").val(),
//     });
//     }).catch(function (err) {
//       console.log(err);
//   })
// }



// var db;
//       // Initialize PouchDB database
//       function initDB() {
//         db = new PouchDB("practice_details");
//         db.info(function(error, result) {
//           if(!error) {
//             console.log(result);
//           } else {
//             console.log(error);
//           }
//         });
//         return db;
//       } //END initDB()
      
//       initDB();
      
//       // Functionality to add a user
//       $("#btnAddNames").on("click", addUsers);
//       function addUsers() {         
//         var uFirst   = $("#inputFirst").val(),
//           uLast  = $("#inputLast").val(),
//           uEmail  = $("#inputEmail").val();
//           uTime = new Date().toISOString();
//         var aUser = {
//           "_id"   : uTime,
//           "nameFirst" : uFirst,
//           "nameLast" : uLast,
//           "nameEmail"  : uEmail
//         };
        
//         db.put(aUser, function(error, result) {
//           if(!error) {
//             $("#divResults").html("<p>Saved!</p>");
//             showUsers();
//             console.log(result);
//             clearFields();
//           } else {
//             $("#divResults").html("<p>&iexcl;Error!</p>");
//             console.log(error);
//           }
//          db.replicate.to('https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details');
 
//         });
//       } //END addUsers();
//       // var remoteCouch = 'https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details';
      
//       // To clear fields
//       function clearFields() {
//         $("#formUser")[0].reset();
//       } //END clearFields()
      
//       // Get the database of user names ready
//       $("#btnShowNames").on("click", showUsers);
//       function showUsers() {
//         db.allDocs({"include_docs" : true, "ascending" : true}, function(error, result) {
//           showTableOfUsers(result.rows);
//         });
//       } //END showUsers()
      
//       // Display the user names in a table
//       function showTableOfUsers(data) {
//         var str  = "<p><table border='1' id='userTable'>";
//           str += "<tr><th>Time</th><th>First Name</th><th>Last Name</th><th>Email</th></tr>";
//             for(var i = 0; i < data.length; i++) {
//               str += "<tr><td>" + data[i].id + 
//                 "</td><td>" + data[i].doc.nameFirst + 
//                 "</td><td>" + data[i].doc.nameLast + 
//                 "</td><td>" + data[i].doc.nameEmail 
//                 "</td></tr>";
//             }
//           str += "</table></p>";
          
         
//         $("#divResults").html(str);
//       } //END showTableOfUsers();
      
//       