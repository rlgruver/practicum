<?php
//This page creates the input.txt file that will be fed into the solver


$myfile = fopen("txt/input.txt", "w") or die("Unable to open file!");

//POST variables from the GUI
$variables = $_POST["myVars"];
$lowerBounds = $_POST["myDoms1"];
$upperBounds = $_POST["myDoms2"];
$constants = $_POST["constants"];
$constraints = $_POST["constraints"];
$objectiveFunction = $_POST["objFnc"];

//CONSTANTS Section
//Creating header
if(!empty($constants)){
	$txt = "CONSTANTS\n";
	fwrite($myfile, $txt);

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
		}
		//if not last constant, just add a comma
		else{
			$txt = $pieces[$count].",\n";
			fwrite($myfile, $txt);
			$count++;
		}
	}
}

//VARIABLES Section
//Creating header
$txt = "VARIABLES\n";
fwrite($myfile, $txt);

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
   	}
   	//else add a , for the next variable in the array
 	else{
  		$txt = $variables[$count]." in [".$lowerBounds[$count].",".$upperBounds[$count]."],\n";
   		fwrite($myfile, $txt);
   		$count ++;
 	}

}

//OBJECTIVE FUNCTION Section
//Creating header
$txt = "\nOBJECTIVE\n";
fwrite($myfile, $txt);

//Replace all white space and add the objective function with a semicolon
$txt = str_replace(" ", "", $objectiveFunction).";";
fwrite($myfile, $txt);

//CONSTRAINTS Section
//Creating header if there is input
if(!empty($constraints)){
 	$txt = "\n\nCONSTRAINTS\n";
 	fwrite($myfile, $txt);

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
		}
		//if not last constant, just add a comma
		else{
			$txt = $pieces[$count].",\n";
			fwrite($myfile, $txt);
			$count++;
		}
	}
}


fclose($myfile);
?>