<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$session = $_POST['session_id'];

//local
$localInputFile = "sessions/".$session."/input.txt"; 
$localOutputFile = "sessions/".$session."/output.txt"; 
$localSolutionsFile = "sessions/".$session."/realtime_output.txt";
$localDiscardedFile = "sessions/".$session."/realtime_discarded.txt";

//remote
$remoteInputFile = "/code/spopt-stable/tests/".$session."/input.txt";
$remoteOutputFile = "/code/spopt-stable/tests/".$session."/input.txt.out"; 
$remoteSolutionsFile = "/code/spopt-stable/tests/".$session."/input.txt.solutions";
$remoteDiscardedFile = "/code/spopt-stable/tests/".$session."/input.txt.discarded";


//truncate Done text 

set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
include('Net/SSH2.php');
include('Net/SFTP.php');

// ssh connect to cr2g server 
$ssh = new Net_SSH2('cr2g01.cs.utep.edu',22);
if (!$ssh->login('rlgruver', 'utep$2015')) { 
  exit('ssh Login Failed');
}

//sftp connect to cr2g server
$sftp = new Net_SFTP('cr2g01.cs.utep.edu',22);
if (!$sftp->login('rlgruver', 'utep$2015')) { 
  exit('sftp Login Failed');
}
//send input file to cr2g server
$sftp->mkdir('/code/spopt-stable/tests/'.$session); 
$sftp->put($remoteInputFile, $localInputFile,  NET_SFTP_LOCAL_FILE);
$sftp->chmod(0777, $remoteInputFile);


 //execute python script 
$ssh->write("cd /code/spopt-stable\n");
$ssh->read('rlgruver@cr2g01:/code/spopt-stable$');
$ssh->write("python SpOpt.py tests/".$session."/input.txt\n");


$starttime = time();

while ($ssh->isConnected()) {
  $now = time()-$starttime;
  if($now >7200){
    break;
  } 

  sleep(3);

  //retrieve all information from remote server
  $sftp->get($remoteSolutionsFile, $localSolutionsFile);
  $sftp->get($remoteDiscardedFile, $localDiscardedFile);

  exec("php parseDiscarded.php {$session}");

  if($sftp->get($remoteOutputFile, $localOutputFile)){
    $done = "true";
    break;
  }
}


   exec("php createOutput.php {$session}");


?>