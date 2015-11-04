function validate_form(){
	var valid = true;
	
	var constraints = constraintsValidate();
	var varsAndDomains = varsDomainValidate();
	var matchVars = matchVarsValidate();
	var timeOut = timeOutValidate();
	var precision = precisionValidate();

	var valid = constraints && varsAndDomains && matchVars && timeOut && precisionValidate;

	if(valid == false){
		alert("Please fix errors then try submitting again.");
	}

	return valid;
}

////////////////////////////
//VALIDATE BY SECTION
function constraintsValidate(){
	var valid = true;
	var con = document.getElementById("constraints").value;

	document.getElementById("error9").style.visibility = "hidden";
	document.getElementById("error5").style.visibility = "hidden";
	document.getElementById("error7").style.visibility = "hidden";

	if(con == "" || con == null){
		document.getElementById("error9").style.visibility = "visible";
		return false;
	}

	if(!(parenthesesBalanced(con))||!(bracketsBalanced(con))){
		document.getElementById("error5").style.visibility = "visible";
		valid = false;
	}

	if(!(mathExp(con))){
		document.getElementById("error7").style.visibility = "visible";
		valid = false;
	}

	return valid;
}

 function varsDomainValidate(){
	var varTmp = varArrayVariables();
	var lowerTmp = varArrayLower();
	var upperTmp = varArrayUpper();
	
	var arrayVar = new Array();
	var arrayLower = new Array();
	var arrayUpper = new Array();

	for (var i=0; i<varTmp.length; i++){
			if(!(varTmp[i]=='')){
				arrayVar.push(varTmp[i]);
			}
	}

	for (var i=0; i<lowerTmp.length; i++){
			if(!(lowerTmp[i]=='')){

				arrayLower.push(lowerTmp[i]);
			}
	}

	for (var i=0; i<upperTmp.length; i++){
			if(!(upperTmp[i]=='')){
				arrayUpper.push(upperTmp[i]);
			}
	}
	

	if(!(arrayVar.length == arrayLower.length && arrayVar.length == arrayUpper.length && arrayUpper.length == arrayLower.length)){
		document.getElementById("error3").style.visibility = "visible";
		return false;
	}


	document.getElementById("error3").style.visibility = "hidden";
	return true;
}


function matchVarsValidate(){
	var comboVarAndConstants = _.union(varArrayVariables(),varArrayConstants());
	var constraints = _.uniq(varArrayConstraints());

	var match = _.isMatch(comboVarAndConstants.sort(),constraints.sort());

	if(!match){
		document.getElementById("error1").style.visibility = "visible";
		return false;
	}

	document.getElementById("error1").style.visibility = "hidden";
	return true;
}

function timeOutValidate(){
	var timeOut = document.getElementById("timeout").value;
	var check = isNaN(timeOut);
	if(check){
		document.getElementById("errorTimeOut").style.visibility = "visible";
		document.getElementById("errorTimeOutLimit").style.visibility = "hidden";
		return false;
	}
	else if(timeOut > 120){
		document.getElementById("errorTimeOutLimit").style.visibility = "visible";
		document.getElementById("errorTimeOut").style.visibility = "hidden";
		return false;
	}
	document.getElementById("errorTimeOutLimit").style.visibility = "hidden";
	document.getElementById("errorTimeOut").style.visibility = "hidden";
	return true;
}

function precisionValidate(){
	var precision = document.getElementById("precision").value;
	precision = precision.replace(/e|\-|\./g, "");
	var check = isNaN(precision);
	if(check){
		document.getElementById("errorPrecision").style.visibility = "visible";
		return false;
	}
	document.getElementById("errorPrecision").style.visibility = "hidden";
	return true;
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


function varArrayConstraints(){
	var constraints = document.getElementById("constraints").value;
	var clean = constraints.replace(/abs|sin|cos|tan|cot|sec|csc|sqrt|exp|e/g, "");
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

function mathExp(exp){
	var valid = true; 
	var firstChar = exp.charAt(0);
	var lastChar = exp.charAt(exp.length-1);
	var firstValid = /^[a-zA-Z0-9]+$/.test(firstChar);
	var lastValid = /^[a-zA-Z0-9]+$/.test(lastChar);

	if (firstValid == '1' && lastValid == '1'){
		valid = true;
	}

	if (firstValid == '0'){
		if (firstChar != '(' && firstChar != '[' && firstChar != '-' && firstChar != '.'){
			valid = false;
		}
	}

	if (lastValid == '0'){
		if (lastChar!=')' && lastChar!=']' && lastChar!=';' ){
			valid = false;
		}
	} 

	return valid;
}


