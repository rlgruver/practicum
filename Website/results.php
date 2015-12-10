<?php 
session_start();
session_regenerate_id();

//creates input file from website from to send to the solver
include 'processInput.php'; 
?>


<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<html>
<head>
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" type="text/css" href="css/theme.css" >
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css"/>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!--Let browser know website is optimized for mobile-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!--Import jQuery before materialize.js-->
  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/js/materialize.min.js"></script>

<script>

//store session id in javascript
var session_id = '<?php echo session_id(); ?>';

$(document).ready(function(){
var data = {session_id:session_id};
    // using ajax to run processOutput.php in the background
    $.ajax({
        type: "POST",
        url: 'processOutput.php', 
        data: data,
        success: function(response){
            complete(); //when process output completes, perform the function called
        }
    })
});

//while processOutput.php runs in the background, showing the loading gif and set the realtime output file to the iframe
  function loading(){
      document.getElementById('loading').style.visibility = 'visible'; 
      document.getElementById('output').src ="sessions/"+session_id+"/realtime_solutions.txt";
    }

//when process output completes from ajax call do the following: 1. remove load bar 2. stop refreshing realtime output 3. show final output file
  function complete(){
      document.getElementById('loadingPic').src= "img/loadbar.png"; 
      stopRefresh();
      showOutputFile();
  }

//refresh iframe window to refresh real time output in 3 seconds
  interval = window.setInterval("reloadIFrame(3000);", 3000);
  
  //after relaoding the iframe... clear the original interval and call to set a new one
  function reloadIFrame(milliseconds) {
   document.getElementById('output').contentWindow.location.reload('true');
   clearInterval(interval);
   setNewInterval(milliseconds);
  }

//new interval... adds 2 seconds to query time of the realtime output 
  function setNewInterval(milliseconds){
    milliseconds = milliseconds + 2000;
    interval = window.setInterval("reloadIFrame("+milliseconds+");", milliseconds);
  }

//on complete stop querying the realtime output in the iframe
  function stopRefresh() {
    clearInterval(interval);
    document.getElementById('output').src = "sessions/"+session_id+"/output.txt";
  }

//on complete show the final output file and option to graph the solutions
   function showOutputFile() {
    document.getElementById('downloadOutputFile').style.visibility = 'visible';
    document.getElementById('graphFinalSolutions').style.visibility = 'visible'; 
  }

  function OpenInNewTab() {
   var win = window.open("finalviz.php?s1=" + session_id, '_blank');
   win.focus();

  }

  </script>



</head>

<body class="teal" style = "background-image: url(img/background.png)">


  <nav class="grey darken-2">
    <div class="nav-wrapper">
      <a href="index.html" class="brand-logo" style="padding-left: 1cm"><img src="img/cr2g.png"></a>
      <a href="index.html" class="brand-logo center">NumConSol</a>
      <ul class="right hide-on-med-and-down" style="padding-right: 2cm">
        <li><a href="optimization.html">Optimization</a></li>
        <li><a href="satisfaction.html">Satisfaction</a></li>
      </ul>
    </div>
  </nav>

  <div class="row">
    <div class="col s12">
      <h3 class="center-align">Solutions</h3>

      <div class='row col s12 center-align'>
        <div id ="loading" style="visibility:hidden;"> <img src="img/loadbar.gif" id="loadingPic" width="9%" height="auto"> </div>
        <div id="frameHolder">
          <iframe id="output" name="output" src="" class="white" style="inline border:1.5px solid #99CC00" width="49%" height="400"></iframe>
          <iframe id="rtviz" name="rtviz" src="rtviz/rtviz.html" class="white" style="inline border:1.5px solid #99CC00" width="49%" height="400"></iframe>
        </div>
      </div>

    </div>
  </div>

  <div class='row col s12 center-align'>
    <a href="sessions/<?php echo htmlspecialchars(session_id()); ?>/input.txt" class='modal-action waves-effect waves-green btn' download>Download Input File</a>
    <br><br>
    <a href='sessions/<?php echo htmlspecialchars(session_id()); ?>/output.txt' style="visibility:hidden;" id="downloadOutputFile" class='modal-action waves-effect waves-green btn' download>Download Output File</a>
    <br><br>
    <a href="" onclick = "OpenInNewTab(); return false;" style="visibility:hidden;" id="graphFinalSolutions" class='modal-action waves-effect waves-green btn'>Graph Final Solutions</a>
  </div>
  <br>

  <footer class="page-footer grey darken-2">
    <div class="container">
      <div class="row">
        <div class="col s1">
          <img src="img/logo.png">
        </div>
        <div class="col s6 offset-s2">
          <h5 class="white-text">CR2G</h5>
          <p class="grey-text text-lighten-4">We are a group of people who share interests in all aspects of constraint solving and optimization. We do research on applications of constraints and on discovering new constraint solving and optimization algorithms. We are also involved in educational activities, and in outreach activities.</p>
        </div>
        <div class="col s3">
          <h5 class="white-text">Useful Links</h5>
          <ul>
            <li><a class="grey-text text-lighten-3" href="http://cr2g.constraintsolving.com/" target="_blank">CR2G Website</a></li>
            <li><a class="grey-text text-lighten-3" href="http://www.cs.utep.edu/" target="_blank">UTEP Computer Science</a></li>
            <li><a class="grey-text text-lighten-3" href="http://www.cs.utep.edu/mceberio/research/" target="_blank">Martine Ceberio</a></li>
          </ul>
        </div>

      </div>
    </div>
    <div class="footer-copyright grey darken-3">
      <div class="container">
        © 2015 Mohandeseen
      </div>
    </div>
  </footer>

</body>
</html>



<?php
//calling javascript method to show the loading gif and set the iframe to real time output 
echo "<script> loading(); </script>";

?>

