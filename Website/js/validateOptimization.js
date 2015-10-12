function validate_form(){
	var valid = true;
	
	var objFunction = objFunctionValidate();
	var constraints = constraintsValidate();
	var varsAndDomains = varsDomainValidate();
	var matchVars = matchVarsValidate();

	var valid = objFunction && constraints && varsAndDomains && matchVars;

	if(valid == false){
		alert("Please fix errors then try submitting again.");
	}

	return valid;
}

////////////////////////////
//VALIDATE BY SECTION
function objFunctionValidate(){
	var valid = true;
	var objF = document.getElementById("objFunction").value;

	if(objF == "" | objF == null){
		document.getElementById("error2").style.visibility = "visible";
		valid = false;
	}
	else if(!(parenthesesBalanced(objF))||!(bracketsBalanced(objF))){
		document.getElementById("error4").style.visibility = "visible";
		valid = false;
	}

	// if(!(mathExp(objF))){
	// 	document.getElementById("error6").style.visibility = "visible";
	// 	valid = false;
	// }

	return valid;
}

function constraintsValidate(){
	valid = true;
	var con = document.getElementById("constraints").value;

	if(!(parenthesesBalanced(con))||!(bracketsBalanced(con))){
		document.getElementById("error5").style.visibility = "visible";
		valid = false;
	}

	// if(!(mathExp(con))){
	// 	document.getElementById("error7").style.visibility = "visible";
	// 	valid = false;
	// }

	return valid;
}

 function varsDomainValidate(){
	var valid = true;
	var varTmp = varArrayVariables();
	var lowerTmp = varArrayLower();
	var upperTmp = varArrayUpper();
	
	var arrayVar = new Array();
	var arrayLower = new Array();
	var arrayUpper = new Array();

	for (var i=0; i<varTmp.length ;i++){
			if(!(varTmp[i]==''))
			{
				arrayVar[i]=varTmp[i].value;
			}
		}

	for (var i=0; i<lowerTmp.length ;i++){
			if(!(lowerTmp[i]==''))
			{
				arrayLower[i]=lowerTmp[i].value;
			}
		}

	for (var i=0; i<upperTmp.length ;i++){
			if(!(upperTmp[i]==''))
			{
				arrayUpper[i]=upperTmp[i].value;
			}
		}

	if(!(arrayVar.length == arrayLower.length && arrayVar.length == arrayUpper.length && arrayUpper.length == arrayLower.length)){
		valid = false;
	}

	if(valid==false){
		document.getElementById("error3").style.visibility = "visible";
	}

	return valid;
}


function matchVarsValidate(){
	var valid = true;
	var comboVarAndConstants = _.union(varArrayVariables(),varArrayConstants());
	var comboObjAndConstraints = _.union(varArrayObjective(),varArrayConstraints());

	var match = _.isMatch(comboVarAndConstants.sort(),comboObjAndConstraints.sort());

	if(!match){
		document.getElementById("error1").style.visibility = "visible";
		valid = false;
	}

	return valid;
}


/////////////////////////////////
//VALIDATION SETUP

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
	var clean = objFunction.replace(/abs|sin|cos|tan|cot|sec|csc|sqrt|exp/g, "");
	var tmpArr = clean.split(/[^a-zA-Z0-9']+/g);
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
	var clean = constraints.replace(/abs|sin|cos|tan|cot|sec|csc|sqrt|exp/g, "");
	var tmpArr = clean.split(/[^a-zA-Z0-9']+/g);
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
	var varNames = document.forms.form1.elements['myVars[]'];
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

function varArrayLower(){
	var varArr = new Array();
	var lowerTmp = document.forms.form1.elements['myLower[]'];
	var varLength = lowerTmp.length;

	if (varLength == undefined){

		varArr = [lowerTmp.value];
	}
	else{
		for (var i=0; i<lowerTmp.length ;i++)
		{
			varArr[i]=lowerTmp[i].value;
		}

	}
	return varArr;
}

function varArrayUpper(){
	var varArr = new Array();
	var upperTmp = document.forms.form1.elements['myUpper[]'];
	var varLength = upperTmp.length;

	if (varLength == undefined){

		varArr = [upperTmp.value];
	}
	else{
		for (var i=0; i<upperTmp.length ;i++)
		{
			varArr[i]=upperTmp[i].value;
		}

	}
	return varArr;
}


function parenthesesBalanced(s){
  var open = (arguments.length > 1) ? arguments[1] : '(';
  var close = (arguments.length > 2) ? arguments[2] : ')';  
  var c = 0;
  for(var i = 0; i < s.length; i++)
  {
    var ch = s.charAt(i);
    if ( ch == open )
    {
      c++;
    }
    else if ( ch == close )
    {
      c--;
      if ( c < 0 ) return false;
    }
  }
  return c == 0;
}
 
function bracketsBalanced(s){
  var open = (arguments.length > 1) ? arguments[1] : '[';
  var close = (arguments.length > 2) ? arguments[2] : ']';  
  var c = 0;
  for(var i = 0; i < s.length; i++)
  {
    var ch = s.charAt(i);
    if ( ch == open )
    {
      c++;
    }
    else if ( ch == close )
    {
      c--;
      if ( c < 0 ) return false;
    }
  }
  return c == 0;
}

function mathExp (exp) {
	var firstChar = /^[a-zA-Z0-9]+$/.test(exp.charAt(0));
	var lastChar = /^[a-zA-Z0-9]+$/.test(exp.charAt(exp.length-1));
	return (firstChar && lastChar);
}
