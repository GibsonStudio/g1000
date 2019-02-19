
var tSoftKeys = [];

// index 0
tSoftKeys.push([
  ['FUEL','garmin.softKeysIndex = 1'],
  ['HDG','garmin.softKeysIndex = 2'],
  ['ALT','garmin.softKeysIndex = 3'],
  ['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''],['MAP','garmin.softKeysIndex = 4'] ]);


// index 1 - fuel gauge controls
tSoftKeys.push([
  ['BACK', 'garmin.softKeysIndex = 0'],
  ['', ''],
  ['ON','garmin.fuelGaugeVisible = 1'],
  ['OFF','garmin.fuelGaugeVisible = 0'],
  ['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''] ]);

// index 2 - heading controls
tSoftKeys.push([
  ['BACK', 'garmin.softKeysIndex = 0'],
  ['', ''],
  ['ON','garmin.headingVisible = 1;garmin.softKeysIndex = 0;'],
  ['OFF','garmin.headingVisible = 0;garmin.softKeysIndex = 0;'],
  ['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''] ]);

// index 3 - altitude indicator controls
tSoftKeys.push([
    ['BACK', 'garmin.softKeysIndex = 0'],
    ['', ''],
    ['ON','garmin.altitudeIndicatorVisible = 1;garmin.softKeysIndex = 0;'],
    ['OFF','garmin.altitudeIndicatorVisible = 0;garmin.softKeysIndex = 0;'],
    ['',''],['',''],['',''],['',''],['',''],['',''],['',''],['',''] ]);

// index 4 - map controls
tSoftKeys.push([
    ['BACK', 'garmin.softKeysIndex = 0'],
    ['', ''],
    ['ON','$("#g1000-map").show()'],
    ['OFF','$("#g1000-map").hide()'],
    ['+','mapZoom("in")'],['-','mapZoom("out")'],
    ['LFT','mapPan("left")'],['RGT','mapPan("right")'],['UP','mapPan("up")'],['DWN','mapPan("down")'],
    ['',''],['',''] ]);
