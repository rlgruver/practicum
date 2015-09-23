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

?>

</body>
</html>