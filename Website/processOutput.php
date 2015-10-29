<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

//local
$localInputFile = "writable/input.txt"; 
$localOutputFile = "writable/output.txt"; 
$localSolutionsFile = "txt/realtime_output.txt";
$localDiscardedFile = "txt/realtime_discarded.txt";   
//remote
$remoteInputFile = "/code/spopt-stable/tests/input.txt";
$remoteOutputFile = "/code/spopt-stable/tests/input.txt.out"; 
$remoteSolutionsFile = "/code/spopt-stable/tests/input.txt.solutions";
$remoteDiscardedFile = "/code/spopt-stable/tests/input.txt.discarded";


set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
include('Net/SSH2.php');
include('Net/SFTP.php');

// ssh connect to cr2g server 
$connection = ssh2_connect('cr2g01.cs.utep.edu', 22);
ssh2_auth_password($connection, 'rlgruver', 'utep$2015');


//sftp connect to cr2g server
$sftp = new Net_SFTP('cr2g01.cs.utep.edu',22);
if (!$sftp->login('rlgruver', 'utep$2015')) { 
  exit('sftp Login Failed');
}


//send input file to cr2g server 
$sftp->put($remoteInputFile, $localInputFile,  NET_SFTP_LOCAL_FILE);
$sftp->chmod(0777, $remoteInputFile);




$stream = ssh2_exec($connection, "cd /code/spopt-stable; python SpOpt.py tests/input.txt" );

// collect returning data from command
stream_set_blocking($stream, false); 
$output = stream_get_contents($stream); 

while (!(preg_match('/Done/',$output))) {
  echo "running";
  sleep(1);
  $output = stream_get_contents($stream); 

  $sftp->get($remoteSolutionsFile, $localSolutionsFile);
  $sftp->get($remoteDiscardedFile, $localDiscardedFile);

  exec("php parseDiscarded.php");
}
fclose($stream);


if(!$sftp->get($remoteOutputFile, $localOutputFile)){
  throw new Exception('Unable to get output file.');
}


return;
?>
