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
      
      // Functionality to add a user
      $("#btnAddLocations").on("click", addLocations);
      function addLocations() {         
        var myTime   = new Date().toISOString();
          myLocation = $("#choose_location").val();
          
          
        var aUser = {
          "_id"   : myTime,
          "location" : myLocation
        };
        
        db.put(aUser, function(error, result) {
          if(!error) {
            $("#divResultsLocation").html("<p>Saved!</p>");
            showLocation();
            console.log(result);
            clearFields();
          } else {
            $("#divResultsLocation").html("<p>&iexcl;Error!</p>");
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
      $("#btnShowLocation").on("click", showLocation);
      function showLocation() {
        db.allDocs({"include_docs" : true, "ascending" : true}, function(error, result) {
          showTableOfLocation(result.rows);
        });
      } //END showUsers()
      
      // Display the user names in a table
      function showTableOfLocation(data) {
        var str  = "<p><table border='1' id='userTable'>";
          str += "<tr><th>Location</th><th>Time</th></tr>";
            for(var i = 0; i < data.length; i++) {
              str += "<tr><td>" + data[i].doc.location + 
                "</td><td>" + data[i].id 
                "</td></tr>";
            }
          str += "</table></p>";
          
         
        $("#divResultsLocation").html(str);
      } //END showTableOfUsers();
      
      