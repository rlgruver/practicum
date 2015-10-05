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

$localInputFile = "txt/input.txt"; 
$localOutputFile = "txt/output.txt"; 
$remoteInputFile = "/code/spopt-stable/tests/input.txt";
$remoteOutputFile = "/code/spopt-stable/tests/input.txt.out"; 

set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
include('Net/SSH2.php');
include('Net/SFTP.php');

//ssh connect to cr2g server 
$ssh = new Net_SSH2('cr2g01.cs.utep.edu',22);
if (!$ssh->login('rlgruver', 'utep$2015')) { 
  exit('ssh Login Failed');
}

//sftp connect to cr2g server
$sftp = new Net_SFTP('cr2g01.cs.utep.edu',22);
if (!$sftp->login('tamcgarity', 'utep$2015')) { 
  exit('sftp Login Failed');
}



  //send input file to cr2g server 
$sftp->put($remoteInputFile, $localInputFile,  NET_SFTP_LOCAL_FILE);
$sftp->chmod(0777, $remoteInputFile);

  //execute python script
if(!$ssh->exec('cd /code/spopt-stable; python SpOpt.py tests/input.txt')){
  throw new Exception('Unable to execute command.');
}

else{
      //get output contents
  if(!$sftp->get($remoteOutputFile, $localOutputFile)){
    throw new Exception('Unable to get output file.');
  }
  else{
    echo "<script>redirectPage();</script>";
  }
  
}




?>