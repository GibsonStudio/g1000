
var c; // canvas object
var garmin; //
var clearColor = '#212121';



var sim = new Simulation();

function init ()
{
  setSliders();
  c = new Canvas({ id:'g1000-display', width:720, height:524, autoDrawCanvas:false, lineWidth:0 });
  c.clear(clearColor);
  garmin = new Garmin1000({ canvas:c, sim:sim, fuelGaugeVisible:true, altitudeIndicatorVisible:true, headingVisible:true });
  addSoftKeyButtons();
  animate();
}


function addSoftKeyButtons ()
{

  var html = '';
  var oX = 146;
  var oY = 588;
  var xInc = 740 / 12;

  for (var i = 0; i < 12; i++) {
    var myX = oX + (i * xInc);
    html += '<div class="buSoftKey" onclick="softKeyPressed(' + i + ');" style="left:' + myX + 'px; top:' + oY + 'px;"></div>';
  }

  $('#g1000-container').append(html);

}


function softKeyPressed (index) {
  garmin.softKeyPressed(index);
}


function mapZoom (zoom) {
  var zoom = zoom || 'in';
  var zoomInc = 20;
  var currentZoom = $("#g1000-map").css("background-size");
  var newZoom = (zoom == "in") ? parseFloat(currentZoom) + zoomInc : parseFloat(currentZoom) - zoomInc;
  $("#g1000-map").css("background-size", newZoom + "%");
}


function mapPan (dir) {

  var dir = dir || 'left';
  var moveInc = 20;
  var p = $("#g1000-map").css("background-position").split(" ");
  var x = parseFloat(p[0]);
  var y = parseFloat(p[1]);
  if (dir == "left") { x -= moveInc; }
  if (dir == "right") { x += moveInc; }
  if (dir == "up") { y -= moveInc; }
  if (dir == "down") { y += moveInc; }

  $("#g1000-map").css("background-position", x + "px " + y + "px");

}






function setSliders ()
{
  document.getElementById('sAlt').value = sim.altitude;
  document.getElementById('sHeading').value = sim.heading;
  document.getElementById('sFuelL').value = sim.fuelL;
  document.getElementById('sFuelR').value = sim.fuelR;
}


function updateVar (v, varName)
{
  if (varName == 'alt') { sim.altitude = parseFloat(v); }
  if (varName == 'heading') { sim.heading = parseFloat(v); }
  if (varName == 'fuelL') { sim.fuelL = parseFloat(v); }
  if (varName == 'fuelR') { sim.fuelR = parseFloat(v); }
}



function animate ()
{

  requestAnimationFrame(animate);
  //c.clear(clearColor);

  //TO DO change all default positions

  //drawCompassDial({ heading:sim.heading });
  //drawAltitudeIndicator({ altitude:sim.altitude });
  //drawFuelGauge({ fuelL:sim.fuelL, fuelR:sim.fuelR });

  garmin.draw();

}





function mySin (angInDegrees) { return Math.sin((Math.PI / 180.0) * angInDegrees); }
function myCos (angInDegrees) { return Math.cos((Math.PI / 180.0) * angInDegrees); }
