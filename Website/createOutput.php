<?php


$text = file_get_contents('txt/test.txt');

$myfile = fopen("writable/troy.txt", "w") or die("Unable to open file!");

$solutionList = explode("SOLUTIONS", $text);
$solutionIndividual = explode("SOLUTION", $solutionList[1]);


$varWrite = false;
$count = 1;
foreach($solutionIndividual as $value){

	$nameArray = [];
	$lowerArray = [];
	$upperArray = [];

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

	if(!$varWrite){
		$varString = "";
		for($i = 0; $i < count($nameArray); $i++){
			$varString .= $nameArray[$i].',';
		}
		$varString = substr($varString, 0, -1);
		$varWrite = true;
		fwrite($myfile, $varString."\n");
	}

	$txt ="";
	for($i = 0; $i <count($lowerArray); $i++){
		$txt .= $lowerArray[$i].',';
	}
	$txt = substr($txt, 0, -1);
	$txt = preg_replace('/\s+/','', $txt);
	fwrite($myfile, $txt."\n");

	$txt ="";
	for($i = 0; $i <count($upperArray); $i++){
		$txt .= $upperArray[$i].',';
	}
	$txt = substr($txt, 0, -1);
	$txt = preg_replace('/\s+/','', $txt);
	fwrite($myfile, $txt."\n");
	$count ++;
}
echo "It worked!";
fclose($myfile);

?>