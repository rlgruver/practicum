<html>
<head>
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" type="text/css" href="css/theme.css" >
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css"/>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/js/materialize.min.js"></script>

  <script>
  function redirectPage()
    {
     parent.document.getElementById("frame1").src = "txt/output.txt";
    }
  </script>
</head>

</html>

<?php
//send File to cr2g server
//write to file

     $inputFile = "txt/input.txt"; 
     $remoteOutputFile = "input.txt.solution"; 
     $localOutputFile = "txt/output.txt"; 
     $remoteDir="/code/spopt/tests/";

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
        ssh2_scp_send($con, 'txt/input.txt', '/code/spopt/tests/input.txt', 0644);
        //change to directory and run python script
        if(!$stream1 = ssh2_exec($con, 'cd /code/spopt; python SpOpt.py tests/input.txt')){
          throw new Exception('Unable to execute command.');
        }

        else{
          
          stream_set_blocking($stream1, true);
          // The command may not finish properly if the stream is not read to end
          $output = stream_get_contents($stream1);
        }

          // Create our SFTP resource
          if (!$sftp = ssh2_sftp($con)) {
            throw new Exception('Unable to create SFTP connection.');
          }

          // Remote stream
          if (!$remoteStream = @fopen("ssh2.sftp://{$sftp}{$remoteDir}{$remoteOutputFile}", 'r')) {
            throw new Exception("1 Unable to open remote file: $outputFile");
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
              echo "<script>redirectPage();</script>";
            }
          }

          // Close our streams
          fclose($localStream);
          fclose($remoteStream);


          ssh2_exec($con, 'exit');

      }
    }

    ?>