<?php

function parseOutput($session){

	$txt = file_get_contents('sessions/'.$session.'/parse.txt');
	$input = [];

	$outputs = explode("SPLITHERE", $txt);

	$commaSplit = explode(",", $outputs[0]);
	for ($i=0; $i < count($commaSplit) ; $i++) { 
		$input[] = preg_replace('/\s+/','', $commaSplit[$i]);
	}

	$firstLine = [];
	$firstLine [] = "data1";
	$count = 2;
	for($i = 0; $i < count($input); $i++){
		$firstLine [] = "data".($i+$count);
	}

	$secondLine = [];
	$secondLine [] = "objfunc";
	for($i = 0; $i < count($input); $i++){
		$secondLine [] = $input[$i];
	}

	$text = file_get_contents('sessions/'.$session.'/output.txt') or die("Output.txt does not exist!");

	//create a new csv file that will be used for visualizations
	$myfile = fopen("sessions/".$session."/solutions.csv", "w") or die("Unable to open file!");

	//Explode the solutions to get ready for parsing
	$solutionList = explode("SOLUTIONS", $text);

	$solutionIndividual = explode("SOLUTION", $solutionList[1]);
	$varWrite = false;
	$count = 1;

	//Each iteration of the for loop goes through a solution set of an objective function with its corresponding variables
	foreach($solutionIndividual as $value){
		
		//These will store all values that we want to see
		$nameArray = [];
		$lowerArray = [];
		$upperArray = [];

		//These will store all values that we want to keep
		$lowerOutput = [];
		$upperOutput = [];
		
		//Parsing to single out variable names, positions of occurance, lower and upper bounds. Also parsing objective function bounds
		$objective = explode("OBJECTIVE FUNCTION", $solutionIndividual[$count]);
		
		$range = explode("Precision",$objective[1]);
		$range[0] = str_replace("[", "", $range[0]);
		$range[0] = str_replace("]", "", $range[0]);
		
		$objRanges = explode(",", $range[0]);
		$lowerArray[] = $objRanges[0];
		$upperArray[] = $objRanges[1];
		
		$domList = explode("DOMAIN", $range[1]);
		
		$doms = explode("Precision", $domList[1]);
		$doms[0] = preg_replace('/\s+/','', $doms[0]);
		$doms[0] = preg_replace('/in\[/', 'SPLITHERE', $doms[0]);
		$doms[0] = preg_replace('/]/', 'SPLITHERE', $doms[0]);
		
		$getVarNames = explode("SPLITHERE", $doms[0]);
		
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
		$lowerOutput[] = preg_replace('/\s+/','', $lowerArray[0]);
		$upperOutput[] = preg_replace('/\s+/','', $upperArray[0]);

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
			fputcsv($myfile, $firstLine);
			fputcsv($myfile, $secondLine);
		}

		fputcsv($myfile, $lowerOutput);
		fputcsv($myfile, $upperOutput);
		$count ++;
	}

	fclose($myfile);

}
?>