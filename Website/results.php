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

</head>

<body class="teal">


  <nav class="grey darken-2">
    <div class="nav-wrapper">
      <a href="index.html" class="brand-logo" style="padding-left: 1cm"><img src="img/cr2g.png"></a>
      <a href="index.html" class="brand-logo center">NumConSol</a>
      <ul class="right hide-on-med-and-down" style="padding-right: 2cm">
        <li><a href="index.html">Optimization</a></li>
        <li><a href="satisfaction.html">Satisfaction</a></li>
      </ul>
    </div>
  </nav>

  <div class="row">
    <div class="col s12">
      <h3 class="center-align">Solutions</h3>

      <?php

      $myfile = fopen("txt/input.txt", "w") or die("Unable to open file!");

      $txt = "Variables\n";
      fwrite($myfile, $txt);


      $variables = $_POST["myVars"];
      $lowerBound = $_POST["myDoms1"];
      $upperBound = $_POST["myDoms2"];
      $count = 0;

      $last_index = count($variables) -1;

      foreach ($variables as $value) {
        if($count ==  $last_index){
         $txt = $variables[$count]." in [".$lowerBound[$count].", ".$upperBound[$count]."];\n";
         fwrite($myfile, $txt);
         $count ++;
       }
       else{
         $txt = $variables[$count]." in [".$lowerBound[$count].", ".$upperBound[$count]."],\n";
         fwrite($myfile, $txt);
         $count ++;
       }

     }

      $txt = "\nObjective\n";
      fwrite($myfile, $txt);

     $objective = $_POST["objFnc"];

     $pieces = explode("range", $objective);
     $function = $pieces[0].trim("");
     $range = $pieces[1].trim("");

     $txt = $function."\n";
     fwrite($myfile, $txt);
     $txt = "range".$range."\n";
     fwrite($myfile, $txt);


     if(!empty($_POST["constraints"])){
       $txt = "CONSTRAINTS\n";
       fwrite($myfile, $txt);

       $txt = $_POST["constraints"];
       fwrite($myfile, $txt);
     }
     else{

     }


     fclose($myfile);

//go back and input error checking

//send File to cr2g server
//write to file
     $inputFile = "txt/input.txt"; 
     $remoteOutputFile = "input.txt.tmp.solution"; 
     $localOutputFile = "txt/output.txt"; 
     $remoteDir="/code/spec/src/tests/";

     if (!function_exists("ssh2_connect")) die("function ssh2_connect doesn't exist");

// log in at server1.example.com on port 22
     if(!($con = ssh2_connect("cr2g01.cs.utep.edu", 22))){
      echo "fail: unable to establish connection\n";
    } else {
    // try to authenticate with username root, password secretpassword
      if(!ssh2_auth_password($con, "tamcgarity", "utep$2015")) {
        echo "fail: unable to authenticate user\n";
      } else {
        // allright, we're in!

        // send a file
        ssh2_scp_send($con, 'txt/input.txt', '/code/spec/src/tests/input.txt', 0644);
        //change to directory and run python script
        $stream = ssh2_exec($con, 'cd /code/spec/src; python Solver.py tests/input.txt');

        // Create our SFTP resource
        if (!$sftp = ssh2_sftp($con)) {
          throw new Exception('Unable to create SFTP connection.');
        }

        // Remote stream
        if (!$remoteStream = @fopen("ssh2.sftp://{$sftp}{$remoteDir}{$remoteOutputFile}", 'r')) {
          throw new Exception("Unable to open remote file: $outputFile");
        } 

        // Local stream
        if (!$localStream = @fopen("{$localOutputFile}", 'w')) {
          throw new Exception("Unable to open local file for writing: $localOutputFile");
        }

        // Write from our remote stream to our local stream
        $read = 0;
        $fileSize = filesize("ssh2.sftp://{$sftp}{$remoteDir}{$remoteOutputFile}");
        while ($read < $fileSize && ($buffer = fread($remoteStream, $fileSize - $read))) {
                    // Increase our bytes read
          $read += strlen($buffer);

                    // Write to our local file
          if (fwrite($localStream, $buffer) === FALSE) {
            throw new Exception("Unable to write to local file: $localOutputFile");
          }
          else
          {
            echo "<div class='row col s12 center-align'>
            <object data='txt/output.txt' class='white' style='border:1.5px solid #99CC00' width='700' height='400'>
            <embed src='txt/output.txt' width='700' height='400'> </embed>
            Error: Embedded data could not be displayed.
            </object>  
            </div>
            <div class='row col s12 center-align'>
            <a href='txt/output.txt' class='modal-action waves-effect waves-green btn' download>Download</a>
            </div>";
          }
        }

        // Close our streams
        fclose($localStream);
        fclose($remoteStream);


        ssh2_exec($con, 'exit');

      }
    }

    ?>


  </div>
</div>



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
          <li><a class="grey-text text-lighten-3" href="#!">CR2G Website</a></li>
          <li><a class="grey-text text-lighten-3" href="#!">UTEP Computer Science</a></li>
          <li><a class="grey-text text-lighten-3" href="#!">Martine Ceberio</a></li>
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


