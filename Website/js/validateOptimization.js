function validate_form(){
	var valid = true;

	var comboVarAndConstants = _.union(varArrayVariables(),varArrayConstants());
	var comboObjAndConstraints = _.union(varArrayObjective(),varArrayConstraints());
	var varsAndDomains = checkVarsAndDomains();

	var objFunction = document.getElementById("objFunction").value;
	var constraints = document.getElementById("constraints").value;
	var match = _.isMatch(comboVarAndConstants.sort(),comboObjAndConstraints.sort());
	
	if(!match){
		document.getElementById("error1").style.visibility = "visible";
		valid = false;
	}

	if(objFunction == "" | objFunction == null){
		document.getElementById("error2").style.visibility = "visible";
		valid = false;
	}

	if(!varsAndDomains){
		document.getElementById("error3").style.visibility = "visible";
		valid = false;
	}

	if(!(parenthesesBalanced(objFunction))||!(bracketsBalanced(objFunction))){
		document.getElementById("error4").style.visibility = "visible";
		valid = false;
	}

	if(!(parenthesesBalanced(constraints))||!(bracketsBalanced(constraints))){
		document.getElementById("error5").style.visibility = "visible";
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

function checkVarsAndDomains(){
	var pass = true;
	var varTmp = varArrayVariables();
	var lowerTmp = document.forms.form1.elements['myLower[]'];
	var upperTmp = document.forms.form1.elements['myUpper[]'];
	var arrayVar = new Array();
	var arrayLower = new Array();
	var arrayUpper = new Array();

	for (var i=0; i<varTmp.length ;i++){
			if(!(varTmp[i].value==''))
			{
				arrayVar[i]=varTmp[i].value;
			}
		}

	for (var i=0; i<lowerTmp.length ;i++){
			if(!(lowerTmp[i].value==''))
			{
				arrayLower[i]=lowerTmp[i].value;
			}
		}

	for (var i=0; i<upperTmp.length ;i++){
			if(!(upperTmp[i].value==''))
			{
				arrayUpper[i]=upperTmp[i].value;
			}
		}

	if(!(arrayVar.length = arrayLower.length = arrayUpper.length)){
		pass = false;
	}

	return pass;
}



function parenthesesBalanced(s)
{
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
 
function bracketsBalanced(s)
{
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



