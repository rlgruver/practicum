<html>
<body>


<?php

$myfile = fopen("input.txt", "w") or die("Unable to open file!");

$txt = "CONSTANTS\n";
fwrite($myfile, $txt);

$objective = $_POST["objFnc"];
$txt = "objfunct = ".$objective."\n";
fwrite($myfile, $txt);

$txt = "VARIABLES\n";
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
 		$txt = $variables[$count]." in [".$lowerBound[$count].", ".$upperBound[$count]."],";
 		fwrite($myfile, $txt);
 		$count ++;
 	}

}

$txt = "CONSTRAINTS\n";
fwrite($myfile, $txt);

$txt = $_POST["constraints"];
fwrite($myfile, $txt);


fclose($myfile);

//go back and input error checking

//send File to cr2g server
//write to file
$inputFile = "input.txt"; 
$remoteOutputFile = "input.txt.tmp.solution"; 
$localOutputFile = "output.txt"; 
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
        echo "okay: logged in...\n";


        // send a file
        ssh2_scp_send($con, 'input.txt', '/code/spec/src/tests/input.txt', 0644);
        //change to directory and run python script
        if(!$stream = ssh2_exec($con, 'cd /code/spec/src; python Solver.py tests/input.txt'))
        {
        	throw new Exception('Unable to execute command.');
        }

        else{
	        // Create our SFTP resource
	        if (!$sftp = ssh2_sftp($con)) {
	            throw new Exception('Unable to create SFTP connection.');
	        }

	        // Remote stream
	        if (!$remoteStream = @fopen("ssh2.sftp://{$sftp}{$remoteDir}{$remoteOutputFile}", 'r')) {
	            throw new Exception("Unable to open remote file: $remoteOutputFile");
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
	        }

	        // Close our streams
	        fclose($localStream);
	        fclose($remoteStream);
        }


        ssh2_exec($con, 'exit');

    }
}


?>

</body>
</html>