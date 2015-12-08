function validate_form(){
	var valid = true;
	
	var constants = constantsValidate();
	var constraints = constraintsValidate();
	var varsAndDomains = varsDomainValidate();
	var matchVars = matchVarsValidate();
	var timeOut = timeOutValidate();
	var precision = precisionValidate();

	//if all vars are true, valid will be true and will pass
	var valid = constants && constraints && varsAndDomains && matchVars && timeOut && precisionValidate;

	if(valid == false){
		alert("Please fix errors then try submitting again.");
	}

	return valid;
}

////////////////////////////
//VALIDATE BY SECTION

//validate constants section follows all rules, can only be a variable equaling to a constant number
function constantsValidate(){
	var valid = true;
	document.getElementById("error10").style.visibility = "hidden";
	var constants = document.getElementById("constants").value;

	if(constants!=""){
		var strip = constants.replace(/[\w\s]/gi, "");
		for (var x = 0; x < strip.length; x++){
		    var c = strip.charAt(x);
		    if (c!="," && c!="="){
		    	document.getElementById("error10").style.visibility = "visible";
				valid = false;
				break;
		    }
		}
	}

	return valid;
}


//validate constraints section follows all rules
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

//validate variables and domain section follows all rules
 function varsDomainValidate(){
 	var valid = true;
 	document.getElementById("error3").style.visibility = "hidden";
	document.getElementById("error8").style.visibility = "hidden";

	//create variable and lower/upper bound arrays
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
	

	//check same amount of variables, upper domain, and lower domain
	if(!(arrayVar.length == arrayLower.length && arrayVar.length == arrayUpper.length && arrayUpper.length == arrayLower.length)){
		document.getElementById("error3").style.visibility = "visible";
		valid=false;
	}


	//upper and lower bound cases that are invalid
	for (var i=0; i<arrayVar.length; i++){
		if (isNaN(arrayLower[i].valueOf()) && arrayLower[i]!="-oo" && arrayLower[i]!="+oo"){
				document.getElementById("error8").style.visibility = "visible";
				valid=false;
				break;
			}

		if (isNaN(arrayUpper[i].valueOf()) && arrayUpper[i]!="-oo" && arrayUpper[i]!="+oo"){
				document.getElementById("error8").style.visibility = "visible";
				valid=false;
				break;
			}

		if(arrayLower[i]=="oo" || arrayUpper[i]=="oo") {
			document.getElementById("error8").style.visibility = "visible";
			valid=false;
			break;
		}


		if(arrayLower[i]=="-oo"){
			if (isNaN(arrayUpper[i].valueOf()) && arrayUpper[i]!="+oo" && arrayUpper[i]!="-oo"){
				document.getElementById("error8").style.visibility = "visible";
				valid=false;
				break;
			}
		}


		if(arrayUpper[i]=="-oo"){
			if (arrayLower[i]!="-oo"){
				document.getElementById("error8").style.visibility = "visible";
				valid=false;
				break;
			}
		}

		if(arrayUpper[i]=="+oo"){
			if (isNaN(arrayLower[i].valueOf()) && arrayLower[i]!="-oo" && arrayLower[i]!="+oo"){
				document.getElementById("error8").style.visibility = "visible";
				valid=false;
				break;
			}
		}

		if(arrayLower[i]=="+oo"){
			if (arrayUpper[i]!="+oo"){
				document.getElementById("error8").style.visibility = "visible";
				valid=false;
				break;
			}
		}

		if( Number(arrayLower[i]) > Number(arrayUpper[i])){
			document.getElementById("error8").style.visibility = "visible";
			valid=false;
			break;
		}
	}

	
	return valid;
}

//validate all variables found in constants, obj function, and constraints 
//match with the variables found in the variables and domain section
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

//validate timeout number provided by user
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

//validate precision value provided by user
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

//create array of variables found in constants
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

//create array of variables found in constraints
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

//create array of variables found in variables section
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

//create array of lower bound values in domain
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

//create array of upper bound values in domain
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

//validate parenthesis are matching
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
 
//validate brackets are matching
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


//validate match expression is valid to the fullest potential possible
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



