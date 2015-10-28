<?php

$text = file_get_contents('txt/test.txt');

$input = array("x1","x2","x3");
$myfile = fopen("writable/kek.txt", "w") or die("Unable to open file!");
$solutions = explode("OBJECTIVE FUNCTION", $text);

$varWrite = false;
$count = 1;


for($j=0; $j < count($solutions); $j++){

	$nameArray = [];
	$lowerArray = [];
	$upperArray = [];

	$lowerOutput = [];
	$upperOutput = [];

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

	$i = 0;
	$lowerOutput[] = $lowerArray[0];
	$upperOutput[] = $upperArray[0];

	while($i < count($input)){

		for($x = 0; $x < count($nameArray); $x ++){

			if($input[$i] == $nameArray[$x]){
				$lowerOutput[] = $lowerArray[$x+1];
				$upperOutput[] = $upperArray[$x+1];
			}
		}
		$i ++;

	}

//LOWEROUTPUT HAS OBJ FUNCTION FIRST POSITION OF ARRAY THEN THE VARIABLE LOWER BOUNDS IN ORDER 


	if(!$varWrite){
		$varString = "";
		for($i = 0; $i < count($input); $i++){
			$varString .= $input[$i].',';
		}
		$varString = substr($varString, 0, -1);
		$varWrite = true;
		fwrite($myfile, $varString."\n");
	}

	$txt ="";
	for($i = 0; $i <count($lowerOutput); $i++){
		$txt .= $lowerOutput[$i].',';
	}
	$txt = substr($txt, 0, -1);
	$txt = preg_replace('/\s+/','', $txt);
	fwrite($myfile, $txt."\n");
	
	$txt ="";
	for($i = 0; $i <count($upperOutput); $i++){
		$txt .= $upperOutput[$i].',';
	}
	$txt = substr($txt, 0, -1);
	$txt = preg_replace('/\s+/','', $txt);
	fwrite($myfile, $txt."\n");
	$count ++;
}

fclose($myfile);
?>