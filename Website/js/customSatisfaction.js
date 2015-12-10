function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);

    if(elements.length > 0){
        document.getElementById("varSection").innerHTML = "";
        replaceHtml();
    }
}

var counter = 1;  

var dyBoxListRT = ["initialChoiceRT"];
var dyBoxListFO = ["initialChoiceFO"];

function CountChecks(whichlist,maxchecked,latestcheck) {
  var rtlist = dyBoxListRT;
  var folist = dyBoxListFO;
  var iterationlist;
  eval("iterationlist="+whichlist);
  var count = 0;

  for(var i=0; i<iterationlist.length; i++ ) {
    if(document.getElementById(iterationlist[i]).checked == true) { 
      count++; 
    } 
    if(count > maxchecked) { 
      latestcheck.checked = false; 
    }
  }
  if(count > maxchecked) {
    alert('Sorry, only ' + maxchecked + ' may be checked.');
  }
}  

function replaceHtml(){
    var newdiv = document.createElement('div');
    newdiv.innerHTML = '<div class="input-field col s2 " id="dynamicVariables"><input type="text"class="validate center-align" name="myVars[]" placeholder="x" form="form1" id="initialVariable">'
    +'</div><div class="input-field col s1 right-align" id="inText"><div class="inz">IN</div></div><div class="input-field col s1 right-align" id="leftBracket">'
    +'<div class="varText">[</div></div><div class="input-field col s2" id="dynamicLowerBounds"><input type="text" class="validate center-align" name="myLower[]" placeholder="-8" id="initialLowerBound">'
    +'</div><div class="input-field col s1 right-align" id="commaText"><div class="varText"> ,</div></div><div class="input-field col s2" id="dynamicUpperBounds">'
    +'<input type="text" class="validate center-align" name="myUpper[]" placeholder="8" id="initialUpperBound"></div>'
    +'<div class="input-field col s1 left-align" id="rightBracket"><div class="varText">]</div></div><div class ="col s1" id="dynamicChoices1"><div class ="checkWrapper">'
    +'<input class="filled-in" name="rtVizChoices[]" type="checkbox" value = "0" id ="initialChoiceRT " onclick="CountChecks('+'rtlist'+',3,this)" />'
    +'<label for="initialChoiceRT"></label></div></div><div class="col s1" id="dynamicChoices2"><div class="checkWrapper">'
    +'<input class="filled-in" name="foVizChoices[]" type="checkbox" value = "0" id ="initialChoiceFO " onclick="CountChecks('+'folist'+',10,this)" />'
    +'<label for="initialChoiceFO"></label></div>';
    document.getElementById("varSection").appendChild(newdiv);
    counter = 1;
}

 
function addBox(divName){
  if(divName=='dynamicChoices1'){
    var newdiv = document.createElement('div');
    newdiv.className = "checkWrapper1";
    newdiv.innerHTML = "<input class='filled-in' name='rtVizChoices[]' type='checkbox' id='dyBoxRT"+counter+"' onclick='CountChecks("+'"rtlist"'+",3,this)' value="+counter+"><label for='dyBoxRT"+counter+"'></label>";
    document.getElementById(divName).appendChild(newdiv);
    dyBoxListRT.push("dyBoxRT"+counter);
    counter ++;
  }
  else{
    var newdiv = document.createElement('div');
    newdiv.className = "checkWrapper1";
    newdiv.innerHTML = "<input class='filled-in' name='foVizChoices[]' type='checkbox' id='dyBoxFO"+counter+"' onclick='CountChecks("+'"folist"'+",10,this)' value="+counter+"><label for='dyBoxFO"+counter+"'></label>";
    document.getElementById(divName).appendChild(newdiv);
    dyBoxListFO.push("dyBoxFO"+counter);
    counter ++;
  }
}

function addVars(divName,value){
  var newdiv = document.createElement('div');
  newdiv.innerHTML = " <br><input type='text' name='myVars[]' class='validate center-align dyVar' id='dyVar' value="+value+">";
  document.getElementById(divName).appendChild(newdiv);
}
function addLower(divName,value){
  var newdiv = document.createElement('div');
  newdiv.innerHTML =  " <br><input type='text' name='myLower[]' class='validate center-align dyVar'  id='dyVar' value='"+value+"'>";
  document.getElementById(divName).appendChild(newdiv);
} 
function addUpper(divName,value){
  var newdiv = document.createElement('div');
  newdiv.innerHTML =  " <br><input type='text' name='myUpper[]' class='validate center-align dyVar'  id='dyVar' value='"+value+"'>";
  document.getElementById(divName).appendChild(newdiv);
}     

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
} 

document.onkeypress = stopRKey; 

function sortNumber(a,b){
  return a - b;
}

function addText(inz,lez,coz,riz){
  var newdiv = document.createElement('div');
  newdiv.innerHTML = "<div class='inz1'>IN</div>";
  document.getElementById(inz).appendChild(newdiv);

  var newdiv = document.createElement('div');
  newdiv.innerHTML = "<div class='varText1'>[</div>";
  document.getElementById(lez).appendChild(newdiv);

  var newdiv = document.createElement('div');
  newdiv.innerHTML = "<div class='varText1'>,</div>";
  document.getElementById(coz).appendChild(newdiv);

  var newdiv = document.createElement('div');
  newdiv.innerHTML = "<div class='varText1'>]</div>";
  document.getElementById(riz).appendChild(newdiv);
}


function disable() {
  document.getElementById('precision').disabled=true;
  document.getElementById('consistency').disabled=true;
  document.getElementById('evaluation').disabled=true;
  document.getElementById('domain').disabled=true;
  document.getElementById('function').disabled=true;
  document.getElementById('timeout').disabled=true;

} 
function enable() {
  document.getElementById('precision').disabled=false;
  document.getElementById('consistency').disabled=false;
  document.getElementById('evaluation').disabled=false;
  document.getElementById('domain').disabled=false;
  document.getElementById('function').disabled=false;
  document.getElementById('timeout').disabled=false;
} 

function populateInput(value, type){
  
  var constantDisplayArea = document.getElementById('constants');
  var constraintDisplayArea = document.getElementById('constraints');

  if(type == "VARIABLES"){

    removeElementsByClass("dyVar");
    value = value.replace(/\s/g,"");
    value = value.replace(/;/g,"");
    value = value.replace(/in[[\]]/gi,"SPLITHERE");
    value = value.replace(/[\]],/g,"SPLITHERE");
    value = value.replace(/[\]]/g,"SPLITHERE");

    var getVarNames = value.split("SPLITHERE");
    getVarNames.pop();

    var i = 0;
    var name = getVarNames[i];
    i++;

    //lower and upper bounds
    var bounds = getVarNames[i].split(",");
    var lower = bounds[0];
    var upper = bounds[1];
    document.getElementById('initialVariable').value = name; 
    document.getElementById('initialLowerBound').value = lower;
    document.getElementById('initialUpperBound').value = upper;
    i++;

    while(i < getVarNames.length){
      //Variable Name
      var name = getVarNames[i];
      i++;

      //lower and upper bounds
      var bounds = getVarNames[i].split(",");
      var lower = bounds[0];
      var upper = bounds[1];

      addBox('dynamicChoices1');
      addBox('dynamicChoices2');
      addVars('dynamicVariables',name); 
      addLower('dynamicLowerBounds',lower);
      addUpper('dynamicUpperBounds',upper);
      addText('inText','leftBracket','commaText','rightBracket');
      i++;
    }
  }

  if(type == "CONSTRAINTS"){
    value = value.replace(/\s/g, "");
    value = value.replace(/;/g,"");
    value = value.replace(/,/g,",\n");
    constraintDisplayArea.value = value;
  }
  if(type == "CONSTANTS"){
    value = value.replace(/\s/g, "");
    value = value.replace(/;/g,"");
    constantDisplayArea.value = value;
  }
}

//Function to parse an entire text file and populate input fields in GUI
window.onload = function() {
  var fileInput = document.getElementById('fileInput');
  var constraintInput = document.getElementById('constraintFile');
  var variableInput = document.getElementById('varFile');
  var constantDisplayArea = document.getElementById('constants');
  var constraintDisplayArea = document.getElementById('constraints');

//**********************************CONSTRAINTS ONLY*************
  constraintInput.addEventListener('change', function(e){

    var file = constraintInput.files[0];
    var textType = 'text/plain';

    if(file.type.match(textType)){
      var reader = new FileReader();

      reader.onload = function(e) {
        var text = reader.result;
        var constraintSplit = text.split("CONSTRAINTS");
        constraintSplit[1] = constraintSplit[1].replace(/\s/g,"");
        constraintDisplayArea.value = constraintSplit[1];
      }
      reader.readAsText(file); 
    }

    else{
      alert("File not supported!");
    }
  });

//*****************************VARIABLES ONLY****************
  variableInput.addEventListener('change', function(e){
    var file = variableInput.files[0];
    var textType = 'text/plain';

    if(file.type.match(textType)){
      var reader = new FileReader();

      reader.onload = function(e) {
        removeElementsByClass("dyVar");
        var text = reader.result;
        var getVariableList = text.split("VARIABLES");
        getVariableList[1] = getVariableList[1].replace(/\s/g,"");
        getVariableList[1] = getVariableList[1].replace(/in[[\]]/gi,"SPLITHERE");
        getVariableList[1] = getVariableList[1].replace(/[\]],/g,"SPLITHERE");
        getVariableList[1] = getVariableList[1].replace(/[\]]/g,"SPLITHERE");

        var getVarNames = getVariableList[1].split("SPLITHERE");
        getVarNames.pop();

        var i = 0;
        var name = getVarNames[i];
        i++;

          //lower and upper bounds
        var bounds = getVarNames[i].split(",");
        var lower = bounds[0];
        var upper = bounds[1];
        document.getElementById('initialVariable').value = name;
        document.getElementById('initialLowerBound').value = lower;
        document.getElementById('initialUpperBound').value = upper;
        i++;

        while(i < getVarNames.length){
            //Variable Name
          var name = getVarNames[i];
          i++;

            //lower and upper bounds
          var bounds = getVarNames[i].split(",");
          var lower = bounds[0];
          var upper = bounds[1];

          addBox('dynamicChoices1');
          addBox('dynamicChoices2');
          addVars('dynamicVariables',name); 
          addLower('dynamicLowerBounds',lower);
          addUpper('dynamicUpperBounds',upper);
          addText('inText','leftBracket','commaText','rightBracket');
          i++;
        }
      }
      reader.readAsText(file); 
    }

    else{
      alert("File not supported!");
    }
  });

//**************************************ALL INPUTS************************
  fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = 'text/plain';

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function(e) {

        var text = reader.result;

        var variablePosition = text.indexOf("VARIABLES");
        var constraintPosition = text.indexOf("CONSTRAINTS");
        var constantPosition = text.indexOf("CONSTANTS");

        var positionArray = [];
        positionArray.push(variablePosition);
        positionArray.push(constraintPosition);
        positionArray.push(constantPosition);
        positionArray.sort(sortNumber);

        var index = positionArray.indexOf(variablePosition);
        if(positionArray[index] == -1){
          positionArray.splice(index,1);
        }
        else{
          positionArray[index] = "VARIABLES";
        }

        index = positionArray.indexOf(constraintPosition);
        if(positionArray[index] == -1){
          positionArray.splice(index,1);

          var constraintDisplayArea = document.getElementById('constraints');
          constraintDisplayArea.value = "";
        }
        else{
          positionArray[index] = "CONSTRAINTS";
        }

        index = positionArray.indexOf(constantPosition);
        if(positionArray[index] == -1){
          positionArray.splice(index,1);

          var constantDisplayArea = document.getElementById('constants');
          constantDisplayArea.value = "";
        }
        else{
          positionArray[index] = "CONSTANTS";
        }

        text = text.replace(/VARIABLES|OBJECTIVE|CONSTRAINTS|CONSTANTS/g,"*****");
        var stripped = text.split("*****");
        stripped.shift();


        for(var i = 0; i< stripped.length; i++){
          populateInput(stripped[i], positionArray[i]);
        }

        }

        reader.readAsText(file);  
        fileInput.value = "";
      } else {
        alert("File not supported!");
      }
    });
}

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });


