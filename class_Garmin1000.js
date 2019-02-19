

function Garmin1000 (args) {

  var args = args || {};

  this.canvas = args.canvas || false;
  this.sim = args.sim || false;
  this.lineColor = args.lineColor || '#f9f9f9';
  this.backgroundColor = args.backgroundColor || '#121212';

  // fuel gauge props
  this.fuelGaugeVisible = args.fuelGaugeVisible || false;
  this.fuelGaugeX = 0; this.fuelGaugeY = 0; this.fuelGaugeW = 100;
  this.fuelGaugeNums = [28, 24, 20, 16, 12, 8, 4, 0];

  // altitude indicator props
  this.altitudeIndicatorVisible = args.altitudeIndicatorVisible || false;
  this.altitudeIndicatorX = 520; this.altitudeIndicatorY = 120; this.altitudeIndicatorSize = 220;

  // heading indicator
  this.headingVisible = args.headingVisible || false;
  this.headingX = 320; this.headingY = 320; this.headingSize = 140;

  this.softKeys = tSoftKeys;
  this.softKeysIndex = 0;



  this.draw = function () {

    this.canvas.clear(); //"#21212100");
    this.drawSoftKeys();
    if (this.fuelGaugeVisible) { this.drawFuel(); }
    if (this.altitudeIndicatorVisible) { this.drawAltitudeIndicator(); }
    if (this.headingVisible) { this.drawHeading(); }

  }



  this.softKeyPressed = function (index)
  {
    var myFunction = this.softKeys[this.softKeysIndex][index][1];
    if (myFunction) {
      eval(myFunction);
    }
  }




  this.drawSoftKeys = function () {

    this.canvas.rect(0, 502, 720, 524, { fillStyle:this.backgroundColor })
    this.canvas.line(0, 502, 720, 502, { strokeStyle:this.lineColor });

    for (var i = 0; i < 12; i++) {
      var myInc = 720 / 12;
      var myX = myInc * (i + 1);
      var myText = this.softKeys[this.softKeysIndex][i][0];
      var myFunction = this.softKeys[this.softKeysIndex][i][1];
      var textColor = myFunction ? this.lineColor : '#888888'
      this.canvas.line(myX, 502, myX, 524, { strokeStyle:this.lineColor });
      this.canvas.text(myX - (720 / 24), 518, myText, { fillStyle:textColor, fontSize:14 });
    }

  }



  this.drawHeading = function () {

    var x = this.headingX; var y = this.headingY; var size = this.headingSize;
    var rotation = this.sim.heading;

    var lineEvery = 5; var lineLength = size / 8;

    var dialText = [ ["N", 0, true], ["3", 30, false], ["6", 60, false], ["E", 90, true], ["12", 120, false], ["15", 150, false],
      ["S", 180, true], ["21", 210, false], ["24", 240, false], ["W", 270, true], ["30", 300, false], ["33", 330, false] ];

    // draw outer lines
    for (var i = 0; i < 360; i += 45) {
      var l = size / 10;
      var x1 = x + ((size + 2) * mySin(i)); var y1 = y + ((size + 2) * myCos(i));
      var x2 = x + ((size + l) * mySin(i)); var y2 = y + ((size + l) * myCos(i));
      this.canvas.line(x1, y1, x2, y2, { strokeStyle:this.lineColor });
    }

    // draw compass lines
    for (var i = 0; i < 360; i += lineEvery) {
      var myAng = i - rotation;
      var myLength = lineLength;
      if (i % (lineEvery * 2)) { myLength = myLength * 0.5; }
      var x1 = x + ((size - myLength) * mySin(myAng)); var y1 = y + ((size - myLength) * myCos(myAng));
      var x2 = x + ((size) * mySin(myAng)); var y2 = y + ((size) * myCos(myAng));
      this.canvas.line(x1, y1, x2, y2, { strokeStyle:this.lineColor });
    }

    // add text
    for (var i = 0; i < dialText.length; i++) {
      myData = dialText[i];
      var myAng = rotation - myData[1];
      var myRadius = size * 0.74;
      if (myData[2]) { myRadius = size * 0.68; }
      var x1 = x + (myRadius * mySin(myAng)); var y1 = y - (myRadius * myCos(myAng));
      var fontS = size / 7;
      if (myData[2]) (fontS = fontS * 1.5);
      this.canvas.text(x1, y1, myData[0], { fillStyle:this.lineColor, fontSize:fontS, rotate:(myAng) });
    }

  }




  this.drawAltitudeIndicator = function () {

    var x = this.altitudeIndicatorX; var y = this.altitudeIndicatorY; var size = this.altitudeIndicatorSize;
    var alt = this.sim.altitude;

    var W = size / 3; var H = size;
    var range = 600; // how many feet fit into display
    var lineEvery = 200; var fontS = size / 20.0;

    this.canvas.context().save();
    this.canvas.clip(x, y, x + W, y + H);
    this.canvas.rect(x, y, x + W, y + H, { fillStyle:this.backgroundColor, strokeStyle:this.lineColor, lineWidth:1 });

    var x1 = x; var pxPerFt = size / range; var yO = y + (size / 2.0);

    var altMin = Math.round((alt - (range / 2.0)) / 20) * 20;
    var altMax = Math.round((alt + (range / 2.0)) / 20) * 20;

    for (var i = altMin; i <= altMax; i += 20) {

      var x2 = x1 + (size / 40.0);
      var mY = yO - ((i - alt) * pxPerFt);

      if (i % 100 == 0) {
        // increase line length
        x2 = x + (size / 20.0);
        // draw text
        this.canvas.text(x2 + (size / 16.0), mY + (size / 50.0), i, { fillStyle:this.lineColor, fontSize:fontS });
      }
      this.canvas.line(x1, mY, x2, mY, { strokeStyle:this.lineColor });
    }

    this.canvas.context().restore();

    // draw black arrow thing
    var pointL = size / 20.0; var boxH = size / 20.0;
    var x1 = x; var x2 = x + pointL; var x3 = x2 + ((W - pointL) / 1.38); var x4 = x + W;
    var y1 = yO - boxH; var y2 = y1 - boxH; var y3 = yO + boxH; var y4 = y3 + boxH;
    var points = [ [x,yO], [x2,y1], [x3,y1], [x3,y2], [x4,y2], [x4,y4], [x3,y4], [x3, y3], [x2,y3]  ];
    this.canvas.polyline(points, { strokeStyle:this.lineColor, lineWidth:1, fillStyle:this.backgroundColor, closePath:true});

    // add numbers
    var s = size * 0.056;
    this.drawDigit(alt, { x:(x + W) - (s * 1), y:yO - (s / 2), size:s, unit:1, maskSize:2 });
    this.drawDigit(alt, { x:(x + W) - (s * 2), y:yO - (s / 2), size:s, unit:10 });
    this.drawDigit(alt, { x:(x + W) - (s * 3), y:yO - (s / 2), size:s, unit:100 });
    this.drawDigit(alt, { x:(x + W) - (s * 4), y:yO - (s / 2), size:s, unit:1000 });
    this.drawDigit(alt, { x:(x + W) - (s * 5), y:yO - (s / 2), size:s, unit:10000 });

  }



  this.drawDigit = function (v, args)
  {

    var args = args || {}; var size = args.size || 100; // height of digit
    var x = args.x || 20; var y = args.y || 20;
    var unit = args.unit || 1; var maskSize = args.maskSize || 1;
    var W = size / 1.4; var H = size; var fontSize = size * 1;

    v = Math.abs(v); var num1 = v % 1;
    var myNumber = (v % (unit * 10)) / unit;

    this.canvas.rect(x, y, x + W, y + H, { fillStyle:this.backgroundColor } );

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

    this.canvas.context().save();
    this.canvas.clip(x, y - ((maskSize - 1) * size), x + W, y + H + ((maskSize - 1) * size));

    this.canvas.text(x + (W / 2), y + H - (size * 0.14) - yOffset - (size * 2), nLL, { fillStyle:this.lineColor, fontSize:fontSize });
    this.canvas.text(x + (W / 2), y + H - (size * 0.14) - yOffset - size, nL, { fillStyle:this.lineColor, fontSize:fontSize });
    this.canvas.text(x + (W / 2), y + H - (size * 0.14) - yOffset, vv, { fillStyle:this.lineColor, fontSize:fontSize });
    this.canvas.text(x + (W / 2), y + H - (size * 0.14) - yOffset + size, nH, { fillStyle:this.lineColor, fontSize:fontSize });
    this.canvas.text(x + (W / 2), y + H - (size * 0.14) - yOffset + (size * 2), nHH, { fillStyle:this.lineColor, fontSize:fontSize });

    this.canvas.context().restore();

  }




  this.drawFuel = function ()
  {

    var x = this.fuelGaugeX; var y = this.fuelGaugeY;
    var W = this.fuelGaugeW; var H = this.fuelGaugeW * 1.6;
    var nums = this.fuelGaugeNums;
    var fuelL = this.sim.fuelL; var fuelR = this.sim.fuelR; var fuelMax = this.fuelGaugeNums[0];

    this.canvas.rect(x, y, x + W, y + H, { fillStyle:this.backgroundColor });
    this.canvas.text(x + (W * 0.5), y + (H * 0.06), 'FUEL QTY', { fillStyle:this.lineColor, fontSize:(W / 10) });
    this.canvas.text(x + (W * 0.5), y + (H * 0.124), 'GAL', { fillStyle:this.lineColor, fontSize:(W / 10) });
    this.canvas.text(x + (W * 0.15), y + (H * 0.16), 'L', { fillStyle:this.lineColor, fontSize:(W / 8)});
    this.canvas.text(x + (W * 0.85), y + (H * 0.16), 'R', { fillStyle:this.lineColor, fontSize:(W / 8)});

    var yTop = y + (H * 0.18); var yBot = y + (H * 0.8); var yInc = (yBot - yTop) / (nums.length - 1);

    // colored bars
    var x1 = x + (W * 0.25); var x2 = x + (W * 0.3); var x3 = x + (W * 0.7); var x4 = x + (W * 0.75);

    this.canvas.rect(x1, yTop, x2, yBot, { fillStyle:'#00c389', lineWidth:0 });
    this.canvas.rect(x1, yTop + ((yBot - yTop) * 0.75), x2, yBot, { fillStyle:'#ffef0f', lineWidth:0 });
    this.canvas.rect(x1, yTop + ((yBot - yTop) * 0.9), x2, yBot, { fillStyle:'#f9423a', lineWidth:false });

    this.canvas.rect(x3, yTop, x4, yBot, { fillStyle:'#00c389', lineWidth:0 });
    this.canvas.rect(x3, yTop + ((yBot - yTop) * 0.75), x4, yBot, { fillStyle:'#ffef0f', lineWidth:0 });
    this.canvas.rect(x3, yTop + ((yBot - yTop) * 0.9), x4, yBot, { fillStyle:'#f9423a', lineWidth:false });

    // central numbers and lines
    var x1 = x + (W * 0.22);  var x4 = x + (W * 0.78);
    this.canvas.line(x2, yTop, x2, yBot, { strokeStyle:this.lineColor });
    this.canvas.line(x3, yTop, x3, yBot, { strokeStyle:this.lineColor });

    for (var i = 0; i < nums.length; i++) {
      var tY = yTop + (yInc * i);
      this.canvas.text(x + (W * 0.5), tY, nums[i], { fillStyle:this.lineColor, fontSize:(W / 20) });
      this.canvas.line(x1, tY, x2, tY, { strokeStyle:this.lineColor });
      this.canvas.line(x3, tY, x4, tY, { strokeStyle:this.lineColor });
    }

    // fuel indications
    var x1 = x + (W * 0.1); var x2 = x + (W * 0.16); var x3 = x + (W * 0.84); var x4 = x + (W * 0.9);
    fuelL = Math.max(0, Math.min(fuelL, fuelMax));
    var yL = yBot - ((yBot - yTop) * (fuelL / fuelMax));
    this.canvas.rect(x1, yL, x2, yBot, { fillStyle:this.lineColor });
    this.canvas.polyline([[x1, yL], [x1 + (W / 8), yL], [x1, yL + (H / 18)]], { fillStyle:this.lineColor, lineWidth:0, closePath:true});

    fuelR = Math.max(0, Math.min(fuelR, fuelMax));
    var yR = yBot - ((yBot - yTop) * (fuelR / fuelMax));
    this.canvas.rect(x3, yR, x4, yBot, { fillStyle:this.lineColor });
    this.canvas.polyline([[x4, yR], [x4 - (W / 8), yR], [x4, yR + (H / 18)]], { fillStyle:this.lineColor, lineWidth:0, closePath:true});

    // fuel text
    fuelL = Math.round(fuelL); fuelR = Math.round(fuelR); var fuelTotal = fuelL + fuelR;
    var x1 = x + (W * 0.15); var x2 = x + (W * 0.5); var x3 = x + (W * 0.85);
    var y1 = y + (H * 0.9); var y2 = y + (H * 0.94);

    this.canvas.text(x1, y1, Math.round(fuelL), { fillStyle:'#00df00', fontSize:(W / 14) });
    this.canvas.text(x3, y1, Math.round(fuelR), { fillStyle:'#00df00', fontSize:(W / 14) });
    this.canvas.text(x2, y2 + (H * 0.02), fuelTotal, { fillStyle:'#00df00', fontSize:(W / 14) });
    this.canvas.polyline([[x1,y1 + (H * 0.01)], [x1,y2], [x2 - (W * 0.07), y2]], { lineWidth:1, strokeStyle:this.lineColor })
    this.canvas.polyline([[x3,y1 + (H * 0.01)], [x3,y2], [x2 + (W * 0.07), y2]], { lineWidth:1, strokeStyle:this.lineColor })

  }





}
