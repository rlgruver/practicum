
var counter = 1;   
function addVars(divName,value){
  var newdiv = document.createElement('div');
  newdiv.innerHTML = " <br><input type='text' name='myVars[]' class='validate center-align' value='"+value+"'>";
  document.getElementById(divName).appendChild(newdiv);
}
function addLower(divName,value){
  var newdiv = document.createElement('div');
  newdiv.innerHTML =  " <br><input type='text' name='myLower[]' class='validate center-align'value='"+value+"'>";
  document.getElementById(divName).appendChild(newdiv);
} 
function addUpper(divName,value){
  var newdiv = document.createElement('div');
  newdiv.innerHTML =  " <br><input type='text' name='myUpper[]' class='validate center-align'value='"+value+"'>";
  document.getElementById(divName).appendChild(newdiv);
  counter++;
}     

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
} 

document.onkeypress = stopRKey; 


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
  document.getElementById('optimization').disabled=true;
  document.getElementById('speculation').disabled=true;
  document.getElementById('domain').disabled=true;
  document.getElementById('function').disabled=true;

} 
function enable() {
  document.getElementById('precision').disabled=false;
  document.getElementById('consistency').disabled=false;
  document.getElementById('evaluation').disabled=false;
  document.getElementById('optimization').disabled=false;
  document.getElementById('speculation').disabled=false;
  document.getElementById('domain').disabled=false;
  document.getElementById('function').disabled=false;
} 

function populateInput(value, type){
  
  var objectiveDisplayArea = document.getElementById('objFunction');
  var constantDisplayArea = document.getElementById('constants');
  var constraintDisplayArea = document.getElementById('constraints');

  if(type == "VARIABLES"){
    value = value.replace(/\s/g,"");
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

      addVars('dynamicVariables',name); 
      addLower('dynamicLowerBounds',lower);
      addUpper('dynamicUpperBounds',upper);
      addText('inText','leftBracket','commaText','rightBracket');
      i++;
    }
  }

  if(type == "OBJECTIVE"){
    value = value.replace(/\s/g, "");
    objectiveDisplayArea.value = value;
  }
  if(type == "CONSTRAINTS"){
    value = value.replace(/\s/g, "");
    constraintDisplayArea.value = value;
  }
  if(type == "CONSTANTS"){
    value = value.replace(/\s/g, "");
    constantDisplayArea.value = value;
  }
}

//Function to parse an entire text file and populate input fields in GUI
window.onload = function() {
  var fileInput = document.getElementById('fileInput');
  var constraintInput = document.getElementById('constraintFile');
  var variableInput = document.getElementById('varFile');
  var objectiveDisplayArea = document.getElementById('objFunction');
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

//**************************************ALL INPUTS**********************
  fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = 'text/plain';

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function(e) {

        var text = reader.result;

        var variablePosition = text.indexOf("VARIABLES");
        var objectivePosition = text.indexOf("OBJECTIVE");
        var constraintPosition = text.indexOf("CONSTRAINTS");
        var constantPosition = text.indexOf("CONSTANTS");

        var positionArray = [];
        positionArray.push(variablePosition);
        positionArray.push(objectivePosition);
        positionArray.push(constraintPosition);
        positionArray.push(constantPosition);
        positionArray.sort();

        var index = positionArray.indexOf(variablePosition);
        positionArray[index] = "VARIABLES";

        index = positionArray.indexOf(objectivePosition);
        positionArray[index] = "OBJECTIVE";

        index = positionArray.indexOf(constraintPosition);
        if(positionArray[index] == -1){
          positionArray.splice(index,1);
        }
        else{
          positionArray[index] = "CONSTRAINTS";
        }

        index = positionArray.indexOf(constantPosition);
        if(positionArray[index] == -1){
          positionArray.splice(index,1);
        }
        else{
          positionArray[index] = "CONSTANTS";
        }

        text = text.replace(/VARIABLES|OBJECTIVE|CONSTRAINTS|CONSTANTS/g,"*****");
        var stripped = text.split("*****");
        stripped.shift();


        for(var i = 0; i< stripped.length; i++){
          populateInput(stripped[i], positionArray[i]);
          alert(stripped[i]);
          alert(positionArray[i]);
        }

        }

        reader.readAsText(file);  
      } else {
        alert("File not supported!");
      }
    });
}

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });


