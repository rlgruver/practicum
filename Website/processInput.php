<?php
//CREATE UNIQUE SESSION DIRECTORY
$makeDir = mkdir("sessions/".session_id()) or die("Unable to create user directory!");
//HAVE TO INCLUDE REAL TIME OUTPUT FILE
$realtimeFile = fopen("sessions/".session_id()."/realtime_output.txt", "w");
fclose($realtimeFile);

//This page creates the input.txt file that will be fed into the solver, it also creates the file upload.txt that contains the text file
//without the options to allow the user to download it and use it for later use.
//
//POST variables from the GUI
$variables = $_POST["myVars"];
$lowerBounds = $_POST["myLower"];
$upperBounds = $_POST["myUpper"];
$constants = $_POST["constants"];
$constraints = $_POST["constraints"];
$objectiveFunction = $_POST["objFunction"];
$checkboxes = $_POST["vizChoices"];

$satisfaction = isset($_POST['isSatisfaction']) ? $_POST['isSatisfaction'] : '';
$precision = isset($_POST['precision']) ? $_POST['precision'] : '';
$consistency = isset($_POST['consis']) ? $_POST['consis'] : '';
$intervalEval = isset($_POST['eval']) ? $_POST['eval'] : '';
$localOpt = isset($_POST['optimization']) ? $_POST['optimization'] : '';
$speculation = isset($_POST['speculation']) ? $_POST['speculation'] : '';
$domain = isset($_POST['domain']) ? $_POST['domain'] : '';
$function = isset($_POST['function']) ? $_POST['function'] : '';
$timeout = isset($_POST['timeout']) ? $_POST['timeout'] : '';


$myfile = fopen("sessions/".session_id()."/input.txt", "w") or die("Unable to open file!");


//OPTIONS Section
//Creating header
$txt = "OPTIONS\n";
fwrite($myfile, $txt);

//Check if default using the consistency var, if it returns empty, it means that the GUI elements are disabled which 
//only happens when the default button is selected in the options pane

if($consistency == ''){
	if($satisfaction == "yes"){
		$txt = "Precision = 1e-6D\nConsistency = default\nInterval Eval = natural\nTimeout = 7200\n\n";
	}
	else{
		$txt = "Precision = 1e-6D\nConsistency = default\nInterval Eval = natural\nLocal Opt = yes\nSpeculation = yes\nTimeout = 7200\n\n";
	}
	
	fwrite($myfile, $txt);
}
//If not empty, then check each field
else{
	//Precision
	$txt = str_replace(" ", "", $precision);
	$txt = "Precision = ".$txt.$domain.$function."\n";
	fwrite($myfile, $txt);

	//Consistency 
	$txt = "Consistency = ".$consistency."\n";
	fwrite($myfile, $txt);

	//Interval Evaluation
	$txt = "Interval Eval = ".$intervalEval."\n";
	fwrite($myfile, $txt);

	//Local Optimization option
	if(!empty($localOpt)){
		$txt = "Local Opt = yes\n";
	}
	else{
		$txt = "Local Opt = no\n";
	}
	fwrite($myfile, $txt);

	//Speculation option
	if(!empty($speculation)){
		$txt = "Speculation = yes\n";
	}
	else{
		$txt = "Speculation = no\n";
	}
	fwrite($myfile, $txt);

	//Timeout
	$timeout = $timeout*60;
	$txt = "Timeout = ".$timeout."\n\n";
	fwrite($myfile, $txt);

}


//Downloadable file begins here
$userfile = fopen("sessions/".session_id()."/upload.txt", "w") or die("Unable to open 'upload.txt' file!");
$parsefile = fopen("sessions/".session_id()."/parse.txt", "w") or die("Unable to open 'parse.txt' file!");


//CONSTANTS Section
//Creating header
if(!empty($constants)){
	$txt = "CONSTANTS\n";
	fwrite($myfile, $txt);
	fwrite($userfile, $txt);

	//Split each constant by comma, and store into pieces array, also strip all white space to minimize errors
	$constants = str_replace(" ", "", $constants);
	$pieces = explode(",", $constants);

	//loop through the pieces array to write each constant on a new line
	$count = 0;
	$last_index = count($pieces) - 1;
	foreach ($pieces as $value) {
		//checking for last constant to add the ';' character
		if($count == $last_index){

			//this stops from adding the ; character to the user file
			$txt = $pieces[$count]."\n\n";
			fwrite($userfile, $txt);

			$txt = $pieces[$count].";\n\n";
			fwrite($myfile, $txt);

		}
		//if not last constant, just add a comma
		else{
			$txt = $pieces[$count].",\n";
			fwrite($myfile, $txt);
			fwrite($userfile, $txt);
			$count++;
		}
	}
}

//VARIABLES Section
//Creating header
$txt = "VARIABLES\n";
fwrite($myfile, $txt);
fwrite($userfile, $txt);

//loop through the variable, and domain arrays to write to file
$count = 0;

//To keep track of chosen variables to visualize
$boxCount = 0;
$chosenVars = [];
$chosenLowerBounds = [];
$chosenUpperBounds = [];


for($i = 0; $i < count($variables); $i++){

	if($i == $checkboxes[$boxCount]){
		$chosenVars [] = $variables[$i];
		$chosenLowerBounds [] = $lowerBounds[$i];
		$chosenUpperBounds [] = $upperBounds[$i];
		$boxCount ++;
	}

}
	$txt ="";
	for($i = 0; $i <count($chosenVars); $i++){
		$txt .= $chosenVars[$i].',';
	}
	$txt = substr($txt, 0, -1);
	$txt = preg_replace('/\s+/','', $txt);
	fwrite($parsefile, $txt."\n");

	fwrite($parsefile, "SPLITHERE\n");

	$txt ="";
	for($i = 0; $i <count($chosenLowerBounds); $i++){
		$txt .= $chosenLowerBounds[$i].',';
	}
	$txt = substr($txt, 0, -1);
	$txt = preg_replace('/\s+/','', $txt);
	fwrite($parsefile, $txt."\n");

	fwrite($parsefile, "SPLITHERE\n");

	$txt ="";
	for($i = 0; $i <count($chosenUpperBounds); $i++){
		$txt .= $chosenUpperBounds[$i].',';
	}
	$txt = substr($txt, 0, -1);
	$txt = preg_replace('/\s+/','', $txt);
	fwrite($parsefile, $txt."\n");

fclose($parsefile);



$last_index = count($variables) -1;
foreach ($variables as $value){
	//removing all white spaces
	$variables[$count] = str_replace(" ", "", $variables[$count]);
	$lowerBounds[$count] = str_replace(" ", "", $lowerBounds[$count]);
	$upperBounds[$count] = str_replace(" ", "", $upperBounds[$count]);

	//if last variable add a ; 
	if($count ==  $last_index){
		
		$txt = $variables[$count]." in [".$lowerBounds[$count].",".$upperBounds[$count]."]\n";
		fwrite($userfile, $txt);

		$txt = $variables[$count]." in [".$lowerBounds[$count].",".$upperBounds[$count]."];\n";
   		fwrite($myfile, $txt);
   	}
   	//else add a , for the next variable in the array
 	else{
  		$txt = $variables[$count]." in [".$lowerBounds[$count].",".$upperBounds[$count]."],\n";
   		fwrite($myfile, $txt);
   		fwrite($userfile, $txt);
   		$count ++;
 	}

}

//OBJECTIVE FUNCTION Section
//Creating header

if(!empty($objectiveFunction)){
	$txt = "\nOBJECTIVE\n";
	fwrite($myfile, $txt);
	fwrite($userfile, $txt);

	//Replace all white space and add the objective function with a semicolon
	$clean = str_replace(" ", "", $objectiveFunction);

	$txt = $clean."\n";
	fwrite($userfile, $txt);

	$txt = $clean.";\n";
	fwrite($myfile, $txt);

}

//CONSTRAINTS Section
//Creating header if there is input
if(!empty($constraints)){
 	$txt = "\nCONSTRAINTS\n";
 	fwrite($myfile, $txt);
 	fwrite($userfile, $txt);

 	//explode into pieces by using the "," character
	$pieces = explode(",", $constraints);

	$count = 0;
	$last_index = count($pieces) - 1;
	foreach ($pieces as $value) {

		//trim away any whitespace or newline characters
		$pieces[$count] = trim($pieces[$count]," ");
		$pieces[$count] = trim((preg_replace('/\s+/', '', $pieces[$count])));

		//Switching any occurance of > or => with opposite
		if(strpos($pieces[$count], "=>") !== false){
			$operatorSplit = explode("=>", $pieces[$count]);
			$pieces[$count] = $operatorSplit[1]."<=".$operatorSplit[0];
		}

		if(strpos($pieces[$count], ">=") !== false){
			$operatorSplit = explode(">=", $pieces[$count]);
			$pieces[$count] = $operatorSplit[1]."<=".$operatorSplit[0];
		}

		if(strpos($pieces[$count], ">") !== false){
			$operatorSplit = explode(">", $pieces[$count]);
			$pieces[$count] = $operatorSplit[1]."<".$operatorSplit[0];
		}

		//checking for last constraint to add the ';' character
		if($count == $last_index){

			$txt = $pieces[$count];
			fwrite($userfile, $txt);

			$txt = $pieces[$count].";";
			fwrite($myfile, $txt);

		}
		//if not last constraint, just add a comma
		else{
			$txt = $pieces[$count].",\n";
			fwrite($myfile, $txt);
			fwrite($userfile, $txt);
			$count++;
		}
	}
}


fclose($myfile);
fclose($userfile);
?>