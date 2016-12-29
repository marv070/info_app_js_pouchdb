<html>
 <head>
  <%= include_gon(:int => true) %>
 </head>
  <body>
    <center>
    <!-- pre id returns data base info to view -->
    <pre id="display"></pre>
    <h1>Welcome to this page</h1>
    <h3>Please enter your details!!</h3>
    <br><br>
    <form method="post" action="details">
      <h3>Please Enter Your First Name</h3>
        <input type="text" name="first_name"  autofocus="autofocus" required>
      <h3>Please Enter Your Last Name</h3>
        <input type="text" name="last_name" required>
        <h3>Please Enter Your Email </h3>
        <input type="text" name="email" required>
      <br><br><br>
      <input type="submit">
      </form>
     
    </center>
   <script src="//cdn.jsdelivr.net/pouchdb/latest/pouchdb.min.js"></script>
   <script src="js/info.js"></script>
  </body>
</html>









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





  <!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>PouchDB Intro</title>
  </head>
  <body>
    <center><h1>INFO DETAILS</h1>
    <!-- Collect user input -->
    <form id="formUser">
      <p><label for="inputLast">First Name  </label><input type="text" placeholder="First Name"   name="inputFirst"   id="inputFirst"> </p>
      <p><label for="inputFirst">Last Name: </label><input type="text" placeholder="Last Name"  name="inputLast"  id="inputLast"></p>
      <p><label for="inputEmail">Email:   </label><input type="text" placeholder="Email"  name="inputEmail"   id="inputEmail">  </p>
      <input type="button" value="Save Name"  id="btnAddNames">
      <input type="reset"  value="Clear fields">
      <input type="button" value="Show Names" id="btnShowNames">
    </form></center>
    <!-- Display results -->
    <center><div id="divResults"></div></center>
    
    <!-- JavaScript libraries -->
    <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
    <script src="//cdn.jsdelivr.net/pouchdb/latest/pouchdb.min.js"></script>
        <script src="js/info.js"></script>
    
    
  

  </body>
</html>





var db;
      // Initialize PouchDB database
      function initDB() {
        db = new PouchDB("info_details");
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
      
      // Functionality to add a user
      $("#btnAddNames").on("click", addUsers);
      function addUsers() {         
        var uFirst   = $("#inputFirst").val(),
          uLast  = $("#inputLast").val(),
          uEmail  = $("#inputEmail").val();
          
        var aUser = {
          "_id"   : uLast,
          "nameFirst" : uFirst,
          "nameEmail"  : uEmail
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
        });
      } //END addUsers();
      
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
          str += "<tr><th>First Name</th><th>Last Name</th><th>Email</th></tr>";
            for(var i = 0; i < data.length; i++) {
              str += "<tr><td>" + data[i].doc.nameFirst + 
                "</td><td>" + data[i].id + 
                "</td><td>" + data[i].doc.nameEmail 
                "</td></tr>";
            }
          str += "</table></p>";
          
          // Set up delete user button/field
          // str += "<hr>";
          // str += "<input type='text' placeholder='Lastname' id='inputDeleteName'><button id='btnDeleteNames'>Delete Name</button>";
          
          // Set up modify user button/fields
          // str += "<hr>";
          // str += "<button id='btnUpdateName'>Update Name</button><br><input type='text' placeholder='Last Name' id='updateLName'><br><input type='text' placeholder='First Name' id='updateFName'><br><input type='text' placeholder='Username' id='updateUID'>";
          
          // Set up delete database button
          // str += "<hr><hr>";
        $("#divResults").html(str);
      } //END showTableOfUsers();
      
      // Functionality to delete a user
      // $("body").on("click", "#btnDeleteNames", deleteUsers);
      // function deleteUsers() {
      //   var theUser = $("#inputDeleteName").val();
      //   db.get(theUser, function(error, result) {
      //     db.remove(result, function(error, result) {
      //       if(result) {
      //         console.log(result);
      //         showUsers();
      //       } else {
      //         console.log(error);
      //         $("#inputDeleteName").val("");
      //         alert("The user '" + theUser + "' does not exist!");
      //       }
      //     });
      //   });
      // } //END deleteUsers()
      
      // Functionality to prepare to edit a user
      // $("#divResults").on("click", ".editPencil", function() { updateNamePrep($(this).parent()) });
      // function updateNamePrep(thisObj) {
      //   var tmpLName = thisObj.find("td:eq(0)").text(),
      //     tmpFName = thisObj.find("td:eq(1)").text(),
      //     tmpUID   = thisObj.find("td:eq(2)").text();
      //   $("#updateLName").val(tmpLName);
      //   $("#updateFName").val(tmpFName);
      //   $("#updateUID").val(tmpUID);
      // } //END updateNamePrep()
      
      // // Functionality to edit a user
      // $("body").on("click", "#btnUpdateName", updateName);
      // function updateName() {
      //   var newLName = $("#updateLName").val(),
      //     newFName = $("#updateFName").val(),
      //     newUID   = $("#updateUID").val();
      //   db.get(newLName, function(error, result) {
      //     if(error) {
      //       console.log(error);
      //       $("#updateLName").val(""),
      //       $("#updateFName").val(""),
      //       $("#updateUID").val("");
      //       alert("The user '" + newLName + "' does not exist!");
      //     } else {
      //       console.log(result);
      //       db.put({
      //         "_id"   : newLName,
      //         "nameFirst" : newFName,
      //         "nameUID" : newUID,
      //         "_rev"    : result._rev
      //       }, function(error, result) { showUsers()} );
      //     }
      //   });
      // } //END updateName()
      
      


