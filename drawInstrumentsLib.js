



// drawDigit: used by other functions. Draws a single digit in a 'rolling digit' display.

/*
function drawDigit (v, args)
{

  var args = args || {};
  var size = args.size || 100; // height of digit
  var x = args.x || 20;
  var y = args.y || 20;
  var unit = args.unit || 1;
  var maskSize = args.maskSize || 1;

  var W = size / 1.4;
  var H = size;
  var fontSize = size * 1;

  v = Math.abs(v);
  var num1 = v % 1;
  var myNumber = (v % (unit * 10)) / unit;

  c.rect(x, y, x + W, y + H, { fillStyle:'#000000' } );

  var yOffset = 0;
  var changeSize = 1 / (unit * 1.0);

  if (unit == 1) {
    yOffset = size * (num1 % 1);
  } else if (myNumber % 1 >= (1 - changeSize)) {
      yOffset = size * ((myNumber % 1) - (1 - changeSize)) * unit;
  }

  var nLL = Math.floor(myNumber) -2 < 0 ? Math.floor(Math.abs(myNumber) - 2) + 10 : Math.floor(Math.abs(myNumber) - 2);
  var nL = Math.floor(myNumber - 1) < 0 ? Math.floor(myNumber - 1) + 10 : Math.floor(myNumber - 1);
  var vv = Math.floor(myNumber);
  var nH = Math.floor(myNumber + 1) < 10 ? Math.floor(myNumber + 1) : 0;
  var nHH = Math.floor(myNumber + 2) < 10 ? Math.floor(myNumber + 2) : 0;

  c.context().save();
  c.clip(x, y - ((maskSize - 1) * size), x + W, y + H + ((maskSize - 1) * size));

  c.text(x + (W / 2), y + H - (size * 0.14) - yOffset - (size * 2), nLL, { fillStyle:'#ffffff', fontSize:fontSize });
  c.text(x + (W / 2), y + H - (size * 0.14) - yOffset - size, nL, { fillStyle:'#ffffff', fontSize:fontSize });
  c.text(x + (W / 2), y + H - (size * 0.14) - yOffset, vv, { fillStyle:'#ffffff', fontSize:fontSize });
  c.text(x + (W / 2), y + H - (size * 0.14) - yOffset + size, nH, { fillStyle:'#ffffff', fontSize:fontSize });
  c.text(x + (W / 2), y + H - (size * 0.14) - yOffset + (size * 2), nHH, { fillStyle:'#ffffff', fontSize:fontSize });

  c.context().restore();

}
*/


/*
function drawFuelGauge (args)
{

  var args = args || {};
  var x = args.x || 0;
  var y = args.y || 0;
  var W = args.width || 100;
  var H = args.height || W * 1.6;
  var nums = args.nums || [28, 24, 20, 16, 12, 8, 4, 0];

  var fuelL = args.fuelL || 0;
  var fuelR = args.fuelR || 0;
  var fuelMax = args.fuelMax || nums[0];

  c.rect(x, y, x + W, y + H, { fillStyle:'#000000' });
  c.text(x + (W * 0.5), y + (H * 0.06), 'FUEL QTY', { fillStyle:'#ffffff', fontSize:(W / 10) });
  c.text(x + (W * 0.5), y + (H * 0.124), 'GAL', { fillStyle:'#ffffff', fontSize:(W / 10) });
  c.text(x + (W * 0.15), y + (H * 0.16), 'L', { fillStyle:'#ffffff', fontSize:(W / 8)});
  c.text(x + (W * 0.85), y + (H * 0.16), 'R', { fillStyle:'#ffffff', fontSize:(W / 8)});

  var yTop = y + (H * 0.18);
  var yBot = y + (H * 0.8);
  var yInc = (yBot - yTop) / (nums.length - 1);

  // colored bars
  var x1 = x + (W * 0.25);
  var x2 = x + (W * 0.3);
  var x3 = x + (W * 0.7);
  var x4 = x + (W * 0.75);

  c.rect(x1, yTop, x2, yBot, { fillStyle:'#00c389', lineWidth:0 });
  c.rect(x1, yTop + ((yBot - yTop) * 0.75), x2, yBot, { fillStyle:'#ffef0f', lineWidth:0 });
  c.rect(x1, yTop + ((yBot - yTop) * 0.9), x2, yBot, { fillStyle:'#f9423a', lineWidth:false });

  c.rect(x3, yTop, x4, yBot, { fillStyle:'#00c389', lineWidth:0 });
  c.rect(x3, yTop + ((yBot - yTop) * 0.75), x4, yBot, { fillStyle:'#ffef0f', lineWidth:0 });
  c.rect(x3, yTop + ((yBot - yTop) * 0.9), x4, yBot, { fillStyle:'#f9423a', lineWidth:false });

  // central numbers and lines
  var x1 = x + (W * 0.22);
  var x4 = x + (W * 0.78);
  c.line(x2, yTop, x2, yBot, { strokeStyle:'#ffffff' });
  c.line(x3, yTop, x3, yBot, { strokeStyle:'#ffffff' });

  for (var i = 0; i < nums.length; i++) {
    var tY = yTop + (yInc * i);
    c.text(x + (W * 0.5), tY, nums[i], { fillStyle:'#ffffff', fontSize:(W / 20) });
    c.line(x1, tY, x2, tY, { strokeStyle:'#ffffff' });
    c.line(x3, tY, x4, tY, { strokeStyle:'#ffffff' });
  }

  // fuel indications
  var x1 = x + (W * 0.1);
  var x2 = x + (W * 0.16);
  var x3 = x + (W * 0.84);
  var x4 = x + (W * 0.9);

  fuelL = Math.max(0, Math.min(fuelL, fuelMax));
  var yL = yBot - ((yBot - yTop) * (fuelL / fuelMax));
  c.rect(x1, yL, x2, yBot, { fillStyle:'#ffffff' });
  c.polyline([[x1, yL], [x1 + (W / 8), yL], [x1, yL + (H / 18)]], { fillStyle:"#ffffff", lineWidth:0, closePath:true});

  fuelR = Math.max(0, Math.min(fuelR, fuelMax));
  var yR = yBot - ((yBot - yTop) * (fuelR / fuelMax));
  c.rect(x3, yR, x4, yBot, { fillStyle:'#ffffff' });
  c.polyline([[x4, yR], [x4 - (W / 8), yR], [x4, yR + (H / 18)]], { fillStyle:"#ffffff", lineWidth:0, closePath:true});

  // fuel text
  fuelL = Math.round(fuelL);
  fuelR = Math.round(fuelR);
  var fuelTotal = fuelL + fuelR;
  var x1 = x + (W * 0.15);
  var x2 = x + (W * 0.5);
  var x3 = x + (W * 0.85);
  var y1 = y + (H * 0.9);
  var y2 = y + (H * 0.94);

  c.text(x1, y1, Math.round(fuelL), { fillStyle:'#00df00', fontSize:(W / 14) });
  c.text(x3, y1, Math.round(fuelR), { fillStyle:'#00df00', fontSize:(W / 14) });
  c.text(x2, y2 + (H * 0.02), fuelTotal, { fillStyle:'#00df00', fontSize:(W / 14) });

  c.polyline([[x1,y1 + (H * 0.01)], [x1,y2], [x2 - (W * 0.07), y2]], { lineWidth:1, strokeStyle:'#ffffff' })
  c.polyline([[x3,y1 + (H * 0.01)], [x3,y2], [x2 + (W * 0.07), y2]], { lineWidth:1, strokeStyle:'#ffffff' })

}
*/



/*
function drawAltitudeIndicator (args)
{

  var args = args || {};
  var x = args.x || 500;
  var y = args.y || 100;
  var alt = args.altitude || 0;
  var size = args.size || 200;

  var W = size / 3;
  var H = size;
  var range = 600; // how many feet fit into display
  var lineEvery = 200;
  var lineColor = "#edeae6";
  var fontS = size / 20.0;

  c.context().save();
  c.clip(x, y, x + W, y + H);

  c.rect(x, y, x + W, y + H, { strokeStyle:lineColor, lineWidth:1 });

  var x1 = x;

  var pxPerFt = size / range;
  var yO = y + (size / 2.0);

  var altMin = Math.round((alt - (range / 2.0)) / 20) * 20;
  var altMax = Math.round((alt + (range / 2.0)) / 20) * 20;

  for (var i = altMin; i <= altMax; i += 20) {

    var x2 = x1 + (size / 40.0);
    var mY = yO - ((i - alt) * pxPerFt);

    if (i % 100 == 0) {
      // increase line length
      x2 = x + (size / 20.0);
      // draw text
      c.text(x2 + (size / 16.0), mY + (size / 50.0), i, { fillStyle:lineColor, fontSize:fontS });
    }

    c.line(x1, mY, x2, mY, { strokeStyle:lineColor });

  }

  c.context().restore();

  // draw black arrow thing
  var pointL = size / 20.0;
  var boxH = size / 20.0;

  var x1 = x;
  var x2 = x + pointL;
  var x3 = x2 + ((W - pointL) / 1.38);
  var x4 = x + W;

  var y1 = yO - boxH;
  var y2 = y1 - boxH;
  var y3 = yO + boxH;
  var y4 = y3 + boxH;

  var points = [ [x,yO], [x2,y1], [x3,y1], [x3,y2], [x4,y2], [x4,y4], [x3,y4], [x3, y3], [x2,y3]  ];
  c.polyline(points, { strokeStyle:lineColor, lineWidth:1, fillStyle:"#000000", closePath:true});

  // add numbers
  var s = size * 0.056;
  drawDigit(alt, { x:(x + W) - (s * 1), y:yO - (s / 2), size:s, unit:1, maskSize:2 });
  drawDigit(alt, { x:(x + W) - (s * 2), y:yO - (s / 2), size:s, unit:10 });
  drawDigit(alt, { x:(x + W) - (s * 3), y:yO - (s / 2), size:s, unit:100 });
  drawDigit(alt, { x:(x + W) - (s * 4), y:yO - (s / 2), size:s, unit:1000 });
  drawDigit(alt, { x:(x + W) - (s * 5), y:yO - (s / 2), size:s, unit:10000 });


}
*/




/*
function drawCompassDial (args)
{

  var args = args || {};
  var x = args.x || 300;
  var y = args.y || 300;
  var rotation = args.heading || 0;
  var size = args.siz || 100;

  var lineEvery = 5;
  var lineColor = "#edeae6";
  var lineLength = size / 8;

  var dialText = [
    ["N", 0, true],
    ["3", 30, false],
    ["6", 60, false],
    ["E", 90, true],
    ["12", 120, false],
    ["15", 150, false],
    ["S", 180, true],
    ["21", 210, false],
    ["24", 240, false],
    ["W", 270, true],
    ["30", 300, false],
    ["33", 330, false]
  ];

  // draw outer lines
  for (var i = 0; i < 360; i += 45) {
    var l = size / 10;
    var x1 = x + ((size + 2) * mySin(i));
    var y1 = y + ((size + 2) * myCos(i));
    var x2 = x + ((size + l) * mySin(i));
    var y2 = y + ((size + l) * myCos(i));
    c.line(x1, y1, x2, y2, { strokeStyle:lineColor });
  }

  // draw compass lines
  for (var i = 0; i < 360; i += lineEvery) {
    var myAng = i - rotation;
    var myLength = lineLength;
    if (i % (lineEvery * 2)) { myLength = myLength * 0.5; }
    var x1 = x + ((size - myLength) * mySin(myAng));
    var y1 = y + ((size - myLength) * myCos(myAng));
    var x2 = x + ((size) * mySin(myAng));
    var y2 = y + ((size) * myCos(myAng));
    c.line(x1, y1, x2, y2, { strokeStyle:lineColor });
  }

  // add text
  for (var i = 0; i < dialText.length; i++) {
    myData = dialText[i];
    var myAng = rotation - myData[1];
    var myRadius = size * 0.74;
    if (myData[2]) { myRadius = size * 0.68; }
    var x1 = x + (myRadius * mySin(myAng));
    var y1 = y - (myRadius * myCos(myAng));
    var fontS = size / 7;
    if (myData[2]) (fontS = fontS * 1.5);
    c.text(x1, y1, myData[0], { fillStyle:lineColor, fontSize:fontS, rotate:(myAng) });
  }

}
*/



function drawDial ()
{
  var x = 400;
  var y = 300;
  var ang = -20;
  var size = 100;
  var lineLength = 20;
  var lineEvery = 45;

  c.circle(x, y, size);

  for (var i = 0; i < 360; i += lineEvery) {

    var myAng = i - ang;
    var x1 = x + ((size - lineLength) * mySin(myAng));
    var y1 = y + ((size - lineLength) * myCos(myAng));
    var x2 = x + ((size) * mySin(myAng));
    var y2 = y + ((size) * myCos(myAng));

    c.line(x1, y1, x2, y2, { strokeStyle:'#ffffff' });

  }

}
