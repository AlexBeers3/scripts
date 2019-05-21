#target photoshop
#targetengine "main"

//prototype to add, name and change blendmode of layers
function ChannelLayer(layerName, blendMode, hue, sat, val) {
	return {
    name: layerName,
    blend: blendMode,
    h: hue,
    s: sat,
    v: val
  };
};
//copies channels into corresponding layers
function splitChannels(layersToBuild) {
  for(var i = 0; i < layersToBuild.length; i++) {
    var layerProps = layersToBuild[i];
    var layer = doc.artLayers.add();
    layer.name = layerProps.name;
    layer.blendMode = layerProps.blend;

    doc.activeLayer = doc.artLayers.getByName("Background");
    doc.activeChannels = [doc.channels.getByName(layer.name)];
    doc.selection.selectAll();
    doc.selection.copy();
    doc.activeLayer = doc.artLayers.getByName(layer.name);
    doc.paste();
  };
};
function createAdjustmentLayers(layers) {
  for(var i = 0; i < layers.length; i++) {
    var props = layers[i];
    //add levels adj layer
    doc.activeLayer = doc.artLayers.getByName(props.name);
    var c2t = function(s) {
      return app.charIDToTypeID(s);
    };
    var s2t = function(s) {
      return app.stringIDToTypeID(s);
    };
    var levelsDes1 = new ActionDescriptor();
    var levelsDes2 = new ActionDescriptor();
    var levelsDes3 = new ActionDescriptor();
    var levelsRef = new ActionReference();

    levelsRef.putClass(s2t("adjustmentLayer"));
    levelsDes1.putReference(c2t("null"), levelsRef);
    levelsDes2.putString(s2t("name"), (props.name) + """ Levels""");
    levelsDes2.putBoolean(s2t("group"), true);
    levelsDes3.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    levelsDes2.putObject(s2t("type"), s2t("levels"), levelsDes3);
    levelsDes1.putObject(s2t("using"), s2t("adjustmentLayer"), levelsDes2);
    executeAction(s2t("make"), levelsDes1, DialogModes.NO);
  //add hue sat adj layer - if statement is so Black doesnt get a hue adj layer
    if(props.name != 'Black') {
      var addHueSatDes1 = new ActionDescriptor();
      var addHueSatDes2 = new ActionDescriptor();
      var addHueSatDes3 = new ActionDescriptor();
      var addHueSatRef = new ActionReference();

      addHueSatRef.putClass(s2t("adjustmentLayer"));
      addHueSatDes3.putReference(c2t("null"), addHueSatRef);
      addHueSatDes1.putString(s2t("name"), (props.name) + """ color adjust""");
      addHueSatDes1.putBoolean(s2t("group"), true );
      addHueSatDes2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
      addHueSatDes2.putBoolean(s2t("colorize"), true);
      addHueSatDes1.putObject(s2t("type"), s2t("hueSaturation"), addHueSatDes2);
      addHueSatDes3.putObject(s2t("using"), s2t("adjustmentLayer"), addHueSatDes1);
      executeAction(s2t("make"), addHueSatDes3, DialogModes.NO);
      //sets hue, sat, lightness
      var setHueSatDes1 = new ActionDescriptor();
      var setHueSatDes2 = new ActionDescriptor();
      var setHueSatDes3 = new ActionDescriptor();
      var setHueSatList = new ActionList();
      var setHueSatRef = new ActionReference();

      setHueSatRef.putEnumerated(s2t("adjustmentLayer"), s2t("ordinal"), s2t("targetEnum"));
      setHueSatDes1.putReference(c2t("null"), setHueSatRef);
      setHueSatDes2.putEnumerated(s2t("presetKind"), s2t("presetKindType"), s2t("presetKindCustom"));
      setHueSatDes3.putEnumerated(s2t("channel"), s2t("channel"), s2t("composite"));
      setHueSatDes3.putInteger(s2t("hue"), props.h);
      setHueSatDes3.putInteger(c2t("Strt"), props.s);
      setHueSatDes3.putInteger(s2t("lightness"), props.v);
      setHueSatList.putObject(s2t("hueSatAdjustmentV2"), setHueSatDes3);
      setHueSatDes2.putList(s2t("adjustment"), setHueSatList);
      setHueSatDes1.putObject(s2t("to"), s2t("hueSaturation"), setHueSatDes2);
      executeAction(s2t("set"), setHueSatDes1, DialogModes.NO);
    }; else {return};
  };
};
function runScript() {
  var CYAN_LAYER = new ChannelLayer('Cyan', BlendMode.NORMAL, 174, 50, 20);
  var MAGENTA_LAYER = new ChannelLayer('Magenta', BlendMode.MULTIPLY, 300, 50, 20);
  var YELLOW_LAYER = new ChannelLayer('Yellow', BlendMode.MULTIPLY, 50, 50, 20);
  var BLACK_LAYER = new ChannelLayer('Black', BlendMode.MULTIPLY, 0, 0, 0);
  var layers = [CYAN_LAYER, MAGENTA_LAYER, YELLOW_LAYER, BLACK_LAYER];

  doc.changeMode(ChangeMode.CMYK);
  splitChannels(layers);
  doc.changeMode(ChangeMode.RGB);
  createAdjustmentLayers(layers);
  app.refresh();
  alert("Split to CMYK\n* Use Hue/Saturation Adjustment layers to lighten, darken, change color\n* Use Levels adjustment layer for best contrast\n* Use Layer masks to mask out content");
}
var doc = app.activeDocument;
doc.duplicate();
activeDocument = doc;
doc.flatten();
runScript();
