function validate_form(){

	var varObjective = varArrayObjective();
	//var varConstraints =function varArrayConstraints();
	var varVariables = varArrayVariables();
	var varConstants = varArrayConstants();
	var valid = true;

	var match1 = (varObjective.length == varVariables.length) && varObjective.every(function(element, index) {
		return element === varVariables[index]; 
	});


	if(!match1){
		document.getElementById("errorMatch1").style.visibility = "visible";
		valid = false;
	}

	if(valid == false){
		alert("Please fix errors before submitting again.");
	}

	return valid;

}

function varArrayObjective(){
	 var objFunction = document.getElementById("objFunction").value;
	 var tmpArr = objFunction.split(/[^a-zA-Z0-9']+/g);
	 var varArr = new Array();
	 var count = 0;

	 for (var i=0; i<tmpArr.length; i++){
	 	if(/[a-zA-Z]/.test(tmpArr[i])){
	 		varArr[count]=tmpArr[i];
	 		count++;
	 	}
	 }
	 
	 varArrUnique = $.unique(varArr);
	 return varArrUnique;
}

function varArrayVariables(){
	var varArr = new Array();
	var form = document.forms.form1;
	var varNames = form.elements['myVars[]'];
	var varLength = varNames.length;

	if (varLength == undefined){

		varArr = [varNames.value];
	}
	else{
		for (var i=0; i<varNames.length ;i++)
		{
			varArr[i]=varNames[i].value;
		}

	}
	alert(varArr.toString());
	return varArr;
}

function varArrayConstants(){
	var constants = document.getElementById("constants").value;
	var tmpArr = constants.split(/[^a-zA-Z0-9']+/g);
	var varArr = new Array();
	var count = 0;

	 for (var i=0; i<tmpArr.length; i++){
	 	if(/[a-zA-Z]/.test(tmpArr[i])){
	 		varArr[count]=tmpArr[i];
	 		count++;
	 	}
	 }

	 return varArr;
}
          
          
         