
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

//Function to parse an entire text file and populate input fields in GUI
window.onload = function() {
  var fileInput = document.getElementById('fileInput');
  var constraintInput = document.getElementById('constraintFile');
  var variableInput = document.getElementById('varFile');
  var objectiveDisplayArea = document.getElementById('objFunction');
  var constantDisplayArea = document.getElementById('constants');
  var constraintDisplayArea = document.getElementById('constraints');

  constraintInput.addEventListener('change', function(e){
    alert("ayyLmao");
  });
  fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var text = reader.result;
          //*********************************************************CONSTANTS**************
          //boolean to keep track if constant section exists
          var constantExists = false;
          //split text by searching for the 'CONSTANTS' tag
          var constantSplit = text.split("CONSTANTS");

          //Check if the constants section exists
          if(constantSplit[1] != undefined){
            constantExists = true;

            //split further to single only the constant values
            var getConstants = constantSplit[1].split("VARIABLES");
            //strip whitespaces and newlines
            getConstants[0] = getConstants[0].replace(/\s/g, "");
            constantDisplayArea.value = getConstants[0];
          }

          //***********************************************************CONSTRAINTS**********
          //same principles applied to constraints that are present in constants section
          var constraintExists = false;
          var constraintSplit = text.split("CONSTRAINTS");
          if(constraintSplit[1] != undefined){
            constraintExists = true;
            constraintSplit[1] = constraintSplit[1].replace(/\s/g,"");
            constraintDisplayArea.value = constraintSplit[1];
          }

          //***********************************************************OBJECTIVE**********
          var firstSplit = text.split("VARIABLES");
          var secondSplit = firstSplit[1].split("OBJECTIVE");
          if(constraintExists){
            var getObjective = secondSplit[1].split("CONSTRAINTS");
            getObjective[0] = getObjective[0].replace(/\s/g,"");
            objectiveDisplayArea.value = getObjective[0];
          }
          else{
            secondSplit[0] = secondSplit[0].replace(/\s/g,"");
            objectiveDisplayArea.value = secondSplit[0];
          }


          //************************************************************VARIABLES**********
          var getVariableList = secondSplit[0].split("OBJECTIVE");
          getVariableList[0] = getVariableList[0].replace(/\s/g,"");
          getVariableList[0] = getVariableList[0].replace(/in[[\]]/gi,"SPLITHERE");
          getVariableList[0] = getVariableList[0].replace(/[\]],/g,"SPLITHERE");
          getVariableList[0] = getVariableList[0].replace(/[\]]/g,"SPLITHERE");

          var getVarNames = getVariableList[0].split("SPLITHERE");
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
      } else {
        alert("File not supported!");
      }
    });
}

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });


