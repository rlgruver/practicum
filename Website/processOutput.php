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
$sftp->put($remoteInputFile, $localInputFile,  NET_SFTP_LOCAL_FILE);
$sftp->chmod(0777, $remoteInputFile);


 //execute python script 
$ssh->write("cd /code/spopt-stable\n");
$ssh->read('rlgruver@cr2g01:/code/spopt-stable$');
$ssh->write("python SpOpt.py tests/input.txt\n");

$starttime = time();
 
while ($ssh->isConnected()) {
        $now = time()-$starttime;
        if($now >30){
          break;
        } 
 echo "in";
        sleep(3);
        $sftp->get($remoteSolutionsFile, $localSolutionsFile);
        $sftp->get($remoteDiscardedFile, $localDiscardedFile);

  exec("php parseDiscarded.php");
        
}
echo "done";
print_r($_SERVER["argv"]);

if(!$sftp->get($remoteOutputFile, $localOutputFile)){
  throw new Exception('Unable to get output file.');
}
return;
?>