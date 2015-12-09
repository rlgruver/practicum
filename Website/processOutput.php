<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

//contains functions used for real time discarded solutions
include 'parseDiscarded.php';
//contains functions used to parse the output of solutions
include 'parseOutput.php';

//store current session
$session = $_POST['session_id'];
$vars = $_POST['vars'];
$lower = $_POST['lowerBounds'];
$upper = $_POST['upperBounds'];



//local path variables to files
$localInputFile = "sessions/".$session."/input.txt"; 
$localOutputFile = "sessions/".$session."/output.txt"; 
$localSolutionsFile = "sessions/".$session."/realtime_solutions.txt";
$localDiscardedFile = "sessions/".$session."/realtime_discarded.txt";

//remote path variables to files
$remoteInputFile = "/code/spopt-stable/tests/".$session."/input.txt";
$remoteOutputFile = "/code/spopt-stable/tests/".$session."/input.txt.out"; 
$remoteSolutionsFile = "/code/spopt-stable/tests/".$session."/input.txt.solutions";
$remoteDiscardedFile = "/code/spopt-stable/tests/".$session."/input.txt.discarded";


//ssh2 and sftp used to remotely connect
set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
include('Net/SSH2.php');
include('Net/SFTP.php');

//ssh connect to cr2g server 
$ssh = new Net_SSH2('cr2g01.cs.utep.edu',22);
if (!$ssh->login('rlgruver', 'utep$2015')) { 
  exit('ssh Login Failed');
}
//attempted to set an ssh timeout, not allowed on UTEP server
$ssh->setTimeout(7200);

//sftp connect to cr2g server
$sftp = new Net_SFTP('cr2g01.cs.utep.edu',22);
if (!$sftp->login('rlgruver', 'utep$2015')) { 
  exit('sftp Login Failed');
}

//send input file to cr2g server
$sftp->mkdir('/code/spopt-stable/tests/'.$session); 
$sftp->put($remoteInputFile, $localInputFile,  NET_SFTP_LOCAL_FILE);
$sftp->chmod(0777, $remoteInputFile);


//execute python script in this order to run the Solver:
//1. change to directory where solver script is located
$ssh->write("cd /code/spopt-stable\n");
//2. 'read' command to ensure script is called from the proper directory
$ssh->read('rlgruver@cr2g01:/code/spopt-stable$');
//3. run the solver script with the test from the current session
$ssh->write("python SpOpt.py tests/".$session."/input.txt\n");

//start timerin case anything gets stuck, will break within 120 minutes (7200 sec)
$starttime = time();
//ssh will break within 120 minutes (7200 sec) regardless of execution status
while ($ssh->isConnected()) {
  $now = time()-$starttime;
  if($now >7200){
    break;
  } 

  sleep(3);

  //retrieve all solutions/discarded from cr2g and store in local
  $sftp->get($remoteSolutionsFile, $localSolutionsFile);
  $sftp->get($remoteDiscardedFile, $localDiscardedFile);

  //function to provide discarded solutions during session
  parseDiscarded($session);

  //if final output file gets created from the cr2g sever, store it in local and complete
  if($sftp->get($remoteOutputFile, $localOutputFile)){
    $done = "true";
    break;
  }
}

//function to delete old session directories to reduce clutter 
function deleteDirectory($dir) {
    if (!file_exists($dir)) {
        return true;
    }

    if (!is_dir($dir)) {
        return unlink($dir);
    }

    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }

        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }

    }
    return rmdir($dir);
}

//loop through all directories in sessions to see if they are older than 24 hours
foreach (glob("sessions/*") as $filename) {
    //86400 seconds is 24 hours
    if(filemtime($filename) < time() - 86400){
      deleteDirectory($filename);
    }
}

//loop through all directories in cr2g server to see if they are older than 24 hours 
//executes script on cr2g to do the clean up of all old sessions
$ssh->exec("cd /code/spopt-stable; python cleanup.py 1 tests/\n");


//function to parse final output file
 parseOutput($session); 


?>