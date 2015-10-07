function validate_form(){
	var valid = true;
	var varConstants = varArrayConstants();
	var varObjective = varArrayObjective();
	var varConstraints = varArrayConstraints();
	var varVariables = varArrayVariables();
	var comboVarAndConstants = _.union(varVariables,varConstants);
	var comboObjAndConstraints = _.union(varObjective,varConstraints);


	var match1 = (comboVarAndConstants.length == comboObjAndConstraints.length) && comboVarAndConstants.every(function(element, index) {
		return element === comboObjAndConstraints[index]; 
	});

	alert(match1);

	if(!match1){
		document.getElementById("errorMatch").style.visibility = "visible";

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
	 return varArr;
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
	 return varArr;
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
      
          
         