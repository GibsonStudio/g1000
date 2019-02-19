// JW Canvas Class
// v1.7: 6th Feb 2019: Chnaged shapes to have default lineWidth of 0
// v1.61: 29th Sept 2017: Updated colours
// v1.6: 8th August 2017 - Added imageData()
// v1.5: 7th July 2017 - Added rotation to image drawing
// v1.4: 26th June 2017
// v1.3: 22/3/2017
//    - Added this.toRadians and this.toDegrees (removes dependance on another library)
//    - Adder this.wedge function
// v1.2: 23/11/2016 - Added c.pixel and c.image
// v1.1: 23/11/2016 - Added get pixel
// v1.0: Added polyline

function Canvas (args) {

  var args = args || {};

  this.id = args.id || 'my-canvas';
  this.width = args.width || 500;
  this.height = args.height || 500;
  this.css = args.css || '';
  this.autoDrawCanvas = (typeof args.autoDrawCanvas === 'undefined') ? true : args.autoDrawCanvas;

  this.images = [];
  this.imagesLoadedCallback = args.imagesLoadedCallback || false;


  // default colors
  this.default = '#000000';
  this.black = '#000000';
  this.white = '#FFFFFF';
  this.red = '#F9423A';
  this.green = '#00C389';
  this.blue = '#005EB8';
  this.orange = '#FF5C39';
  this.yellow = '#FFEF0F';
  this.purple = '#772583';
  this.brown = '#855B4F';
  this.transparent = 'rgba(0,0,0,0)';

  //default values
  this.lineWidth = args.lineWidth || 0;
  this.strokeStyle = args.strokeStyle || this.default;
  this.fillStyle = args.fillStyle || 'rgba(0,0,0,0)';
  this.end = 'butt'; //butt, round, square
  this.font = args.font || 'Arial';
  this.fontSize = args.fontSize || 20;
  this.dash = args.dash || [];






  this.drawCanvas = function () {
    document.write(this.html());
  }


  this.html = function ()
  {
    var html = '<canvas id="' + this.id + '" width="' + this.width +'" height="' + this.height + '" style="' + this.css + '"></canvas>';
    return html;
  }


  if (this.autoDrawCanvas) {
    this.drawCanvas();
  }


  this.clear = function (color)
  {
    var context = this.context();
  	context.clearRect(0, 0, this.width, this.height);
    if (color) {
    	context.beginPath();
    	context.rect(0,0, this.width, this.height);
    	context.fillStyle = color;
    	context.fill();
    }
  }


  this.context = function () { return document.getElementById(this.id).getContext('2d'); }


  this.imageData = function (imageData)
  {
    if (imageData) {
      this.context().putImageData(imageData, 0, 0);
    } else {
      return this.context().getImageData(0, 0, this.width, this.height);
    }
  }


  this.line = function (sX, sY, eX, eY, args)
  {

  	var args = args || {};
    var strokeStyle = args.strokeStyle || this.strokeStyle;
  	var lineWidth = args.lineWidth || 0;
  	var lineCap	= args.end || this.end; //butt, round, square
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.moveTo(sX, sY);
  	context.lineTo(eX, eY);
  	context.lineWidth = lineWidth;
  	context.strokeStyle = strokeStyle;
  	context.lineCap = lineCap;
  	context.stroke();

  }



  this.polyline = function (points, args)
  {

    var args = args || {};
    var strokeStyle = args.strokeStyle || this.strokeStyle;
    var fillStyle	= args.fillStyle || this.fillStyle;
  	var lineWidth = args.lineWidth || 0; //this.lineWidth;
  	var lineCap	= args.end || this.end; //butt, round, square
    var dash = args.dash || this.dash; //array of [dash length, gap length]
    var closePath = args.closePath || false;

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();

    context.moveTo(points[0][0], points[0][1]);

    for (var i = 1; i < points.length; i++) {
      context.lineTo(points[i][0], points[i][1]);
    }

    context.lineWidth = lineWidth;
  	context.strokeStyle = strokeStyle;
  	context.lineCap = lineCap;
    if (closePath) { context.closePath(); }
  	if (lineWidth) { context.stroke(); }

    context.fillStyle = fillStyle;
    context.fill();

  }



  this.box = function (cX, cY, width, height, args)
  {

  	var args = args || {};
    var lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || this.lineWidth;
  	var strokeStyle = args.strokeStyle || this.strokeStyle;
  	var fillStyle	= args.fillStyle || this.fillStyle;
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.rect(cX - (width/2), cY - (height/2), width, height);
  	context.fillStyle = fillStyle;
  	context.fill();
    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.stroke();
    }

  }


  this.clip = function (x1, y1, x2, y2)
  {
    var context = this.context();
    context.beginPath();
    width = x2 - x1;
    height = y2 - y1;
  	context.rect(x1, y1, width, height);
    context.clip();
  }

  this.rect = function (x1, y1, x2, y2, args)
  {

  	var
    args = args || {};
    var lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || 0;
  	var strokeStyle = args.strokeStyle || this.strokeStyle;
  	var fillStyle	= args.fillStyle || this.fillStyle;
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
    width = x2 - x1;
    height = y2 - y1;
  	context.rect(x1, y1, width, height);
  	context.fillStyle = fillStyle;
  	context.fill();
    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.stroke();
    }

  }


  this.circle = function (oX, oY, radius, args)
  {

  	var args = args || {};
    var lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || 0; //this.lineWidth;
  	var strokeStyle = args.strokeStyle || this.strokeStyle;
  	var fillStyle	= args.fillStyle || this.fillStyle;
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.arc(oX, oY, radius, 0, (2 * Math.PI), false);
  	context.fillStyle = fillStyle;
  	context.fill();
    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.stroke();
    }

  }


  this.ellipse = function (oX, oY, width, height, args)
  {

    var args = args || {};
    var lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || 0; //this.lineWidth;
  	var strokeStyle = args.strokeStyle || this.strokeStyle;
  	var fillStyle	= args.fillStyle || this.fillStyle;
    var rotation = (args.rotation / 180) * Math.PI || 0;
    var dash = args.dash || this.dash; //array of [dash length, gap length]

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.ellipse(oX, oY, width, height, rotation, 0, (2 * Math.PI), false);
  	context.fillStyle = fillStyle;
  	context.fill();
    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.stroke();
    }

  }



  this.arc = function (oX, oY, radius, startAngle, endAngle, args)
  {

  	args = args || {};
    lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || 0; //this.lineWidth;
  	strokeStyle = args.strokeStyle || this.strokeStyle;
  	fillStyle	= args.fillStyle || this.fillStyle;
  	lineCap 	= args.end || this.end; //butt, round, square
  	closePath	= args.closePath || false;
  	counterClockwise = args.counterClockwise || false;
    dash = args.dash || this.dash;

  	//convert angles to radians
  	startAngle = this.toRadians(startAngle);
  	endAngle = this.toRadians(endAngle);

    var context = this.context();

    context.setLineDash(dash);
  	context.beginPath();
  	context.arc(oX, oY, radius, startAngle, endAngle, counterClockwise);

  	if (closePath) {
  		context.closePath();
  	}

  	if (fillStyle != '') {
  		context.fillStyle = fillStyle;
  		context.fill();
  	}

    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.lineCap = lineCap;
      context.stroke();
    }

  }




  this.wedge = function (oX, oY, radius, startAngle, endAngle, args)
  {

    args = args || {};
    lineWidth = (args.lineWidth == 0) ? 0 : args.lineWidth || 0; //this.lineWidth;
  	strokeStyle = args.strokeStyle || this.strokeStyle;
  	fillStyle	= args.fillStyle || this.fillStyle;
  	lineCap 	= args.end || this.end; //butt, round, square
  	closePath	= args.closePath || false;
  	counterClockwise = args.counterClockwise || false;
    dash = args.dash || this.dash;

    //convert angles to radians
  	startAngle = this.toRadians(startAngle);
  	endAngle = this.toRadians(endAngle);

    var context = this.context();

    context.lineWidth = lineWidth;
  	context.strokeStyle = strokeStyle;
  	context.lineCap = lineCap;

    context.setLineDash(dash);
  	context.beginPath();

    //line
  	context.moveTo(oX, oY);
    var dX = radius * Math.cos(startAngle);
    var dY = radius * Math.sin(startAngle);
  	context.lineTo(oX + dX, oY + dY);

    //arc
    context.arc(oX, oY, radius, startAngle, endAngle, false);

    //line
    context.lineTo(oX, oY);

    //draw
    if (closePath) {
  		context.closePath();
  	}

  	if (fillStyle != '') {
  		context.fillStyle = fillStyle;
  		context.fill();
  	}

    if (lineWidth) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.lineCap = lineCap;
      context.stroke();
    }

  }



  this.text = function (oX, oY, text, args)
  {

  	args = args || {};
  	lineWidth = args.lineWidth || 0;
  	strokeStyle = args.strokeStyle || this.fillStyle;
  	fillStyle = args.fillStyle || this.strokeStyle;
  	font = args.font || this.font;
  	fontSize = args.fontSize || this.fontSize;
    align = args.align || 'center';
    rotate = (args.rotate / 180) * Math.PI || false;
    dash = args.dash || this.dash;

    var context = this.context();

    context.strokeStyle = strokeStyle;
  	context.fillStyle = fillStyle;
    context.textAlign = align;
  	context.lineWidth = lineWidth;
  	context.font = fontSize + 'px ' + font;
    context.setLineDash(dash);

    if (rotate !== false) {
      context.save();
      context.translate(oX, oY);
      context.rotate(rotate);
      context.translate(-oX, -oY);
    }

    context.strokeText(text, oX, oY);
  	context.fillText(text, oX, oY);

    if (rotate !== false) { context.restore(); }

  }





  this.pixel = function (x, y, args)
  {

    var args = args || {};
    fillStyle = args.fillStyle || this.default;

    var context = this.context();
    context.beginPath();
    context.rect(x, y, 1, 1);
  	context.fillStyle = fillStyle;
  	context.fill();

  }


  this.getPixel = function (x, y) {
    return this.context().getImageData(x, y, 1, 1).data;
  }




  this.randomColor = function (alpha)
  {

    var alpha = alpha || 1;
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var color = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha +')';
    return color;

  }



  this.toRadians = function (ang) { return (ang / 180) * Math.PI; }
  this.toDegrees = function (ang) { return (ang / Math.PI) * 180; }





  /******** image function ******** */

  this.newImage = function (args)
  {
    var args = args || {};
    args.id = args.id || 'img';
    args.src = args.src || '';
    args.canvas = this;
    var img = new CanvasImage(args);
    this.images.push(img);
  }


  this.allImagesLoaded = function ()
  {
    for (var i = 0; i < this.images.length; i++) {
      if (!this.images[i].loaded) { return false; }
    }
    return true;
  }


  this.loadImage = function ()
  {

    // this function is for reference only, it does not do anyting !!!
    var img = new Image();
    img.src = src;

    img.onload = function () {
    }

  }



  this.image = function (img, x, y, args)
  {

    var args = args || {};
    var rotation = this.toRadians(args.rotation) || false;
    var context = this.context();

    if (args.rotation) {
      context.save();
      context.translate(x+(img.width/2), y+(img.height/2));
      context.rotate(rotation);
      context.translate(-x-(img.width/2), -y-(img.height/2));
    }

    context.drawImage(img, x, y);

    if (args.rotation) { context.restore(); }

  }







}







/* ******** CanvasImage Class ******** */

function CanvasImage (args) {
  var args = args || {};
  this.id = args.id || 'img';
  this.src = args.src || '';
  this.canvas = args.canvas || false;
  this.loaded = false;
  window[this.id] = new Image();
  var myThis = this;
  window[this.id].src = this.src;
  window[this.id].onload = function () { myThis.loaded = true; if (myThis.canvas.allImagesLoaded()) { var s = myThis.canvas.imagesLoadedCallback; if (s) { eval(s); } } }
}
