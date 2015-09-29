<?php

$myfile = fopen("txt/input.txt", "w") or die("Unable to open file!");

$txt = "Variables\n";
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
   $txt = $variables[$count]." in [".$lowerBound[$count].", ".$upperBound[$count]."],\n";
   fwrite($myfile, $txt);
   $count ++;
 }

}

$txt = "\nObjective\n";
fwrite($myfile, $txt);

$objective = $_POST["objFnc"];

$pieces = explode("range", $objective);
$function = $pieces[0].trim("");
$range = $pieces[1].trim("");

$txt = $function."\n";
fwrite($myfile, $txt);
$txt = "range".$range."\n";
fwrite($myfile, $txt);


if(!empty($_POST["constraints"])){
 $txt = "CONSTRAINTS\n";
 fwrite($myfile, $txt);

 $txt = $_POST["constraints"];
 fwrite($myfile, $txt);
}
else{

}


fclose($myfile);
?>