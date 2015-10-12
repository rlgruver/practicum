<?php
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

$precision = $_POST["precision"];
$consistency = $_POST["consis"];
$intervalEval = $_POST["eval"];
$localOpt = $_POST["optimization"];
$speculation = $_POST["speculation"];



$myfile = fopen("writable/input.txt", "w") or die("Unable to open file!");

//OPTIONS Section
//Creating header
$txt = "OPTIONS\n";
fwrite($myfile, $txt);

//Check if default using the consistency var, if it returns empty, it means that the GUI elements are disabled which 
//only happens when the default button is selected in the options pane

if(empty($consistency)){
	$txt = "Precision = 1e-6\nConsistency = default\nInterval Eval = natural\nLocal Opt = yes\nSpeculation = yes\n\n";
	fwrite($myfile, $txt);
}
//If not empty, then check each field
else{
	//Precision
	$txt = str_replace(" ", "", $precision);
	$txt = "Precision = ".$txt."\n";
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
		$txt = "Speculation = yes\n\n";
	}
	else{
		$txt = "Speculation = no\n\n";
	}
	fwrite($myfile, $txt);

}


//Downloadable file begins here
$userfile = fopen("txt/upload.txt", "w") or die("Unable to open 'upload.txt' file!");


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
			$txt = $pieces[$count].";\n\n";
			fwrite($myfile, $txt);
			fwrite($userfile, $txt);
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
$last_index = count($variables) -1;
foreach ($variables as $value){
	//removing all white spaces
	$variables[$count] = str_replace(" ", "", $variables[$count]);
	$lowerBounds[$count] = str_replace(" ", "", $lowerBounds[$count]);
	$upperBounds[$count] = str_replace(" ", "", $upperBounds[$count]);

	//if last variable add a ; 
	if($count ==  $last_index){
		$txt = $variables[$count]." in [".$lowerBounds[$count].",".$upperBounds[$count]."];\n";
   		fwrite($myfile, $txt);
   		fwrite($userfile, $txt);
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
$txt = "\nOBJECTIVE\n";
fwrite($myfile, $txt);
fwrite($userfile, $txt);

//Replace all white space and add the objective function with a semicolon
$txt = str_replace(" ", "", $objectiveFunction).";";
fwrite($myfile, $txt);
fwrite($userfile, $txt);

//CONSTRAINTS Section
//Creating header if there is input
if(!empty($constraints)){
 	$txt = "\n\nCONSTRAINTS\n";
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

		//checking for last constant to add the ';' character
		if($count == $last_index){
			$txt = $pieces[$count].";";
			fwrite($myfile, $txt);
			fwrite($userfile, $txt);
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


fclose($myfile);
fclose($userfile);
?>