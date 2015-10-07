function validate_form(){
	var valid = true;
	var varConstants = varArrayConstants();
	var varObjective = varArrayObjective();
	var varConstraints = varArrayConstraints();
	var varVariables = varArrayVariables();
	var combinedVar = varVariables.concat(varConstants);

alert(combinedVar.toString());

	var match1 = (varObjective.length == varVariables.length) && varObjective.every(function(element, index) {
		return element === varVariables[index]; 
	});

	var match2 = (varConstraints.length == combinedVar.length) && varConstraints.every(function(element, index) {
		return element === combinedVar[index]; 
	});

	if(!match1){
		document.getElementById("errorMatch1").style.visibility = "visible";
		if(!match2){
			document.getElementById("errorMatch2").style.visibility = "visible";
		}

		valid = false;
	}

	if(valid == false){
		alert("Please fix errors then try submitting again.");
	}

	return valid;
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
	 
	 var varArrUnique = $.unique(varArr);
	 return varArrUnique;
}

function varArrayConstraints(){
	 var constraints = document.getElementById("constraints").value;
	 var tmpArr = constraints.split(/[^a-zA-Z0-9']+/g);
	 var varArr = new Array();
	 var count = 0;

	 for (var i=0; i<tmpArr.length; i++){
	 	if(/[a-zA-Z]/.test(tmpArr[i])){
	 		varArr[count]=tmpArr[i];
	 		count++;
	 	}
	 }
	
	 var varArrUnique = $.unique(varArr);
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
	return varArr;
}
      
          
         