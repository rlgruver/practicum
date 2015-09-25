
  var counter = 1;   
  function addVars(divName){
    var newdiv = document.createElement('div');
    newdiv.innerHTML = " <br><input type='text' name='myVars[]' class='validate'>";
    document.getElementById(divName).appendChild(newdiv);
  }
  function addDoms1(divName){
    var newdiv = document.createElement('div');
    newdiv.innerHTML =  " <br><input type='text' name='myDoms1[]' class='validate'>";
    document.getElementById(divName).appendChild(newdiv);
  } 
  function addDoms2(divName){
    var newdiv = document.createElement('div');
    newdiv.innerHTML =  " <br><input type='text' name='myDoms2[]' class='validate'>";
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

  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });


