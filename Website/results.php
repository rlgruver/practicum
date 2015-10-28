<?php include 'processInput.php'; ?>


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

  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/js/materialize.min.js"></script>

  <script>
  function displays(){
    document.getElementById('loadImg').style.display='none';
    document.getElementById('frameHolder').style.display='inline';

  }
  </script>

  <script>
  function loading(){
    document.getElementById('loading').style.visibility = 'visible'; 
  }
  </script>

  <script>
  window.setInterval("reloadIFrame();", 5000);

  function reloadIFrame() {
   document.getElementById('output').contentWindow.location.reload(true);
 }
 </script>

</head>

<body class="teal" style = "background-image: url(img/background.png)" onload="rofl()">


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
        <div id ="loading" style="visibility:hidden;"> <img src="img/loadbar.gif" width="9%" height="auto"> </div>
        <div id="frameHolder">
          <iframe id="output" name="output" src= "txt/realtime_output.txt" class="white" style="border:1.5px solid #99CC00" width="700" height="400"></iframe>
        </div>
      </div>

    </div>
  </div>

  <div class='row col s12 center-align'>
    <a href='txt/upload.txt' class='modal-action waves-effect waves-green btn' download>Download Input File</a>
    <a href='writable/output.txt' class='modal-action waves-effect waves-green btn' download>Download Output File</a>
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

//remove old files
$localOutputFile = "writable/output.txt"; 
$localSolutionsFile = "txt/realtime_output.txt"; 

$f = @fopen($localOutputFile, "r+");
if ($f !== false) {
  ftruncate($f, 0);
  fclose($f);
}

$f = @fopen($localSolutionsFile, "r+");
if ($f !== false) {
  ftruncate($f, 0);
  fclose($f);
}


$pid = exec( "php processOutput.php > /dev/null &" );
while(exec("ps $pid")){

  echo "<script> 
  loading();
  </script>";
}


?>

