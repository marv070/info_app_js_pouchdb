// var db;
var url;
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
// var Time = new Date().toISOString();
var Time = "1";
      
// Functionality to add a user
$("#btnAddNames").on("click", addUsers);
function addUsers() {         
  var uFirst   = $("#inputFirst").val(),
    uLast  = $("#inputLast").val(),
    uEmail  = $("#inputEmail").val();
    uTime = Time;
    // uLocation = " ";
    uLink = " ";
  var aUser = {
    "_id"   : uTime,
    "nameFirst" : uFirst,
    "nameLast" : uLast,
    "nameEmail"  : uEmail,
    "userLocation" : " ",
    "link" : uLink,
  };
  
  db.put(aUser, function(error, result) {
    if(!error) {
      $("#divResults").html("<p>Saved!</p>");
      // showUsers();
      console.log(result);
      clearFields();
    } else {
      $("#divResults").html("<p>&iexcl;Error!</p>");
      console.log(error);
    }
   db.replicate.to('https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details');
 
  });
} //END addUsers();
  var remoteCouch = 'https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/info_details';
      
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
function showTableOfUsers(result) {
  if(result.length>0) {
      var html = '<table class="primary">';
      html += '<thead><tr>';
      html += '<th>Time</th>';
      html += '<th>First Name</th>';
      html += '<th>Last Name</th>';
      html += '<th>Email</th>';
      // html += '<th>Location</th>';
      html += '</tr></thead>';
      html += '<tbody>';
      for(var i in result) {
        var d = result[i].doc;
        if (d) {
          html += '<tr>';
          html += '<td>' + d.id + '</td>';
          html += '<td>' + d.nameFirst + '</td>';
          html += '<td>' + d.nameLast + '</td>';
          html += '<td>' + d.nameEmail + '</td>';
          // html += '<td>' + d.userLocation + '</td>';
          html += '</tr>';
          // html += '<tr>';
          var i;
          for (i=0; i<d.userLocation.length; i++){
           html += '<tr>' + '<th>Location</th>' + '</tr>';
           html +=  '<tr>' +'<td>' + d.userLocation[i]   + '</td>' + '</tr>' ;
        }
          // html += '</tr>';
        }
      }    
      html += '</tbody></table>';
    } else {
      html = "nothing here";
    }
         
  $("#divResults").html(html);
} //END showTableOfUsers();

   
  $("#btnUpdateLocations").on("click", updateLocation);
function updateLocation(){
  db.get(Time).then(function(doc){
 var i;
    var string = doc.userLocation + ',' + $("#choose_location").val();
    // var string = string;
    var arr1 = string.split(",");
    // var arr1 = arr1.chomp(" ");
   
    var arr2 = [];
    for (i = 0; i < arr1.length; i++) {
        arr2[i]=arr1[i].split(",");
}
   

  return db.put({
      _id : doc._id,
      _rev : doc._rev,
      nameFirst : doc.nameFirst,
      nameLast : doc.nameLast,
      nameEmail : doc.nameEmail,
      //userLocation : doc.userLocation + "<br>" + $("#choose_location").val(),
      userLocation : arr2,
      link : "pizza",

    });
    }).catch(function (err) {
      console.log(err);
  })
}

$("#btnUpdatePhoto").on("click", updateLink);
function updateLink(){
   // url = URL.createObjectURL(blob)


   db.get(Time).then(function(doc){
    return db.put({
      _id : doc._id,
      _rev : doc._rev,
      nameFirst : doc.nameFirst,
      nameLast : doc.nameLast,
      nameEmail : doc.nameEmail,
      userLocation : doc.userLocation,
      link : "url" ,

    });
    }).catch(function (err) {
      console.log(err);
  })
}


document.addEventListener('DOMContentLoaded', function () {
  var inputFile = document.querySelector('#inputFile');
  // var imageMetaData = document.querySelector('#img_meta_data');
  var uploadedFile = {};
  var syncDom = document.getElementById('inputFile');
  var db1 = new PouchDB('photos');
  var remoteCouch = 'https://minedmindstestdb:minedmindstestdb123@minedmindstestdb.cloudant.com/photos';
  
  function fileUpload() {
    document.body.innerHTML += '<div>Storing file...</div>';
  var file = inputFile.files[0],
   date = new Date().toISOString(),
   mydocnew = 'mydoc' + date + 1,
   company = "Mined Minds",
   jobsite_location = "Woods ",
   info = company +'-'+ jobsite_location;
      // url = URL.createObjectURL(document),
      // link = document.body.innerHTML += '<div>Download link: <a href="' + url + '">' + url + '</div>';
       
      return db1.putAttachment(date, mydocnew, file, file.type).then(function () {
        document.body.innerHTML += '<div>Stored file.</div>';
        return db1.getAttachment(date,mydocnew);
      
      }).then(function (blob) {
         url = URL.createObjectURL(blob);
         console.log(url)
        document.body.innerHTML += '<div>Filesize: ' + JSON.stringify(Math.floor(blob.size/1024)) + 'KB, Content-Type: ' + JSON.stringify(blob.type) + "</div>";
        document.body.innerHTML += '<div>Download link: <a href="' + url + '">' + url + '</div>';
        return db1.get(date);


      }).then(function (doc) {
        document.body.innerHTML += '<div>PouchDB document looks like this:</div><div><pre>' + JSON.stringify(doc, null, '  ') + '</pre></div>';
      }).catch(function (err) {
        console.log(err);
      });
      //
      // IMPORTANT CODE ENDS HERE
      //

  }
  function sync() {
      console.log(url)
      syncDom.setAttribute('data-sync-state','syncing');
      var opts = {live: true};
      db1.sync(remoteCouch, opts,syncError);
  }
  if (remoteCouch) {
    sync();
  }
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }

     document.getElementById("ec").addEventListener('click', fileUpload, false);
     //inputFile.addEventListener('change', fileUpload, false);
  });
 ///////

   function toggleHide(num) { 
    // get the clock 
    console.log(num);
    var myClock = document.getElementById('no_show');
    var myClock2 = document.getElementById('formUser2');
    var myClock3 = document.getElementById('formUser3');
    // get the current value of the clock's display property 
    var displaySetting = myClock.style.display;

    // also get the clock button, so we can change what it says 
    var clockButton = document.getElementById('clockButton');
        
    // now toggle the clock and the button text, depending on current state
    // if (displaySetting == 'block') { 
      if (num == 2) {
      // clock is visible. hide it
      myClock.style.display = 'none',
      myClock2.style.display = 'block',
      myClock3.style.display = 'none',
      // change button text
       clockButton.innerHTML = 'Show Form';
    }
    else if (num == 3) { 
      // clock is hidden. show it 
      myClock.style.display = 'none',
      myClock2.style.display = 'none',
      myClock3.style.display = 'block',
      // change button text
      clockButton.innerHTML = 'Hide Form';
    }
     else   { 
      // clock is hidden. show it 
      myClock.style.display = 'block',
      myClock2.style.display = 'none',
      myClock3.style.display = 'none',
      // change button text
      clockButton.innerHTML = 'Hide Form';
    }
  }  

// window.onscroll = function () {
// window.scrollTo(0,0);
// }











// //example of returning image to screen(cat)
// new PouchDB('sample').destroy().then(function () {
//   return new PouchDB('sample');
// }).then(function (db) {
//   //
//   // IMPORTANT CODE STARTS HERE
//   //
//   db.put({
//     _id: 'meowth', 
//     _attachments: {
//       'meowth.png': {
//         content_type: 'image/png',
//         data: 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAIAAAB0Xu9BAAAABGdBTUEAALGPC/xhBQAAAuNJREFUWEetmD1WHDEQhDdxRMYlnBFyBIccgdQhKVcgJeQMpE5JSTd2uqnvIGpVUqmm9TPrffD0eLMzUn+qVnXPwiFd/PP6eLh47v7EaazbmxsOxjhTT88z9hV7GoNF1cUCvN7TTPv/gf/+uQPm862MWTL6fff4HfDx4S79/oVAlAUwqOmYR0rnazuFnhfOy/ErMKkcBFOr1vOjUi2MFn4nuMil6OPh5eGANLhW3y6u3aH7ijEDCxgCvzFmimvc95TekZLyMSeJC68Bkw0kqUy1K87FlpGZqsGFCyqEtQNDdFUtFctTiuhnPKNysid/WFEFLE2O102XJdEE+8IgeuGsjeJyGHm/xHvQ3JtKVsGGp85g9rK6xMHtvHO9+WACYjk5vkVM6XQ6OZubCJvTfPicYPeHO2AKFl5NuF5UK1VDUbeLxh2BcRGKTQE3irHm3+vPj6cfCod50Eqv5QxtwBQUGhZhbrGVuRia1B4MNp6edwBxld2sl1splfHCwfsvCZfrCQyWmX10djjOlWJSSy3VQlS6LmfrgNvaieRWx1LZ6s9co+P0DLsy3OdLU3lWRclQsVcHJBcUQ0k9/WVVrmpRzYQzpgAdQcAXxZzUnFX3proannrYH+Vq6KkLi+UkarH09mC8YPr2RMWOlEqFkQClsykGEv7CqCUbXcG8+SaGvJ4a8d4y6epND+pEhxoN0vWUu5ntXlFb5/JT7JfJJqoTdy9u9qc7ax3xJRHqJLADWEl23cFWl4K9fvoaCJ2BHpmJ3s3z+O0U/DmzdMjB9alWZtg4e3yxzPa7lUR7nkvxLHO9+tvJX3mtSDpwX8GajB283I8R8a7D2MhUZr1iNWdny256yYLd52DwRYBtRMvE7rsmtxIUE+zLKQCDO4jlxB6CZ8M17GhuY+XTE8vNhQiIiSE82ZsGwk1pht4ZSpT0YVpon6EvevOXXH8JxVR78QzNuamupW/7UB7wO/+7sG5V4ekXb4cL5Lyv+4IAAAAASUVORK5CYII='
//       }
//     }
//   }).then(function () {
//     return db.getAttachment('meowth', 'meowth.png');
//   }).then(function (blob) {
//     var url = URL.createObjectURL(blob);
//     var img = document.createElement('img');
//     img.src = url;
//     document.body.appendChild(img);
//   }).catch(function (err) {
//     console.log(err);
//   });
//   //
//   // IMPORTANT CODE ENDS HERE
//   //
// });






