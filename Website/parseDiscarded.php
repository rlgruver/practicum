<?php
//get session id
parse_str($_SERVER["QUERY_STRING"], $_GET);
$session = $argv[1];


$text = file_get_contents('sessions/'.$session.'/realtime_discarded.txt');

//The specific variables that will be chosen to be parsed will be stored in this input array
$input = array("x1","x2");

//create a new csv file that will be used for visualizations
$myfile = fopen('sessions/'.$session.'/disarded.csv', 'w') or die("Unable to open file!");

//Explode the realtime discarded solutions to get ready for parsing
$solutions = explode("OBJECTIVE FUNCTION", $text);

$varWrite = false;
$count = 1;

//Each iteration of the for loop goes through a discarded set of an objective function with its corresponding variables
for($j=0; $j < count($solutions); $j++){

	//These will store all values that we want to see
	$nameArray = [];
	$lowerArray = [];
	$upperArray = [];

	//These will store all values that we want to keep
	$lowerOutput = [];
	$upperOutput = [];

	//Parsing to single out variable names, positions of occurance, lower and upper bounds. Also parsing objective function bounds
	$objective = explode("DOMAIN", $solutions[$count]);

	$objective[0] = str_replace("[", "", $objective[0]);
	$objective[0] = str_replace("]", "", $objective[0]);
	$objRanges = explode(",", $objective[0]);
	$lowerArray[] = $objRanges[0];
	$upperArray[] = $objRanges[1];

	$objective[1] = preg_replace('/\s+/','', $objective[1]);
	$objective[1] = preg_replace('/=\[/', 'SPLITHERE', $objective[1]);
	$objective[1] = preg_replace('/]/', 'SPLITHERE', $objective[1]);
	$getVarNames = explode("SPLITHERE", $objective[1]);

	array_pop($getVarNames);
	$i = 0;

	//While loop to discern between variables and their lower and upper bounds
	while($i < count($getVarNames)){
		$name = $getVarNames[$i];
		$i ++;
		$nameArray [] = $name;
		$bounds = explode(",", $getVarNames[$i]);
		$lower = $bounds[0];
		$upper = $bounds[1];
		$lowerArray[] = $lower;
		$upperArray[] = $upper;
		$i ++;
	}

	//Always store the objective function of a discarded set in the first position of the output arrays
	$i = 0;
	//$lowerOutput[] = preg_replace('/\s+/','', $lowerArray[0]);
	//$upperOutput[] = preg_replace('/\s+/','', $upperArray[0]);

	//While loop to go through each variable and its bounds to determine which ones should be placed in the output arrays
	while($i < count($input)){

		for($x = 0; $x < count($nameArray); $x ++){

			if($input[$i] == $nameArray[$x]){

				$lowerOutput[] = preg_replace('/\s+/','', $lowerArray[$x+1]);

				$upperOutput[] = preg_replace('/\s+/','', $upperArray[$x+1]);
			}
		}
		$i ++;

	}

//First line will always have inputs 

//Discarded #1
//Lower bounds will always be put first: [objective function, lower bound x1, lowerbound x2, ...]
//Upper bounds will go next line: [objective function, upper bound x1, upperbound x2, ...]

//Discarded #2
//Same format as above and so on for each discarded set


	if(!$varWrite){

		$varWrite = true;
		fputcsv($myfile, $input);
	}

	fputcsv($myfile, $lowerOutput);
	
	fputcsv($myfile, $upperOutput);

	$count ++;

}

fclose($myfile);
?>