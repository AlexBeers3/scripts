#target photoshop
#targetengine "main"

//prototype to add, name and change blendmode of layers
function channelLayer(layerName,blendMode) {
	var layer = doc.artLayers.add();
		layer.name = layerName;
		layer.blendMode = blendMode;
	return layer;
	}
//reverse order of var layerK - layerC so layers appear in proper order in PS
function makeLayers() {
	var layerK = channelLayer('Black', BlendMode.NORMAL);
	var layerY = channelLayer('Yellow', BlendMode.MULTIPLY);
	var layerM = channelLayer('Magenta', BlendMode.MULTIPLY);
	var layerC = channelLayer('Cyan', BlendMode.MULTIPLY);
}
 //used in splitChannels function
function selectCopy() {
    doc.selection.selectAll();
    doc.selection.copy();
}
//copies channels into corresponding layers
function splitChannels(targetChannel) {
    doc.activeLayer = doc.artLayers.getByName("Background");
    doc.activeChannels = [doc.channels.getByName(targetChannel)];
    selectCopy();
    doc.activeLayer = doc.artLayers.getByName(targetChannel);
    doc.paste();
}
function addLevelsHueSat(layerName, hue, sat, light) {
//add levels adj layer
    doc.activeLayer = doc.artLayers.getByName(layerName);
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };
    var levelsDes1 = new ActionDescriptor();
    var levelsDes2 = new ActionDescriptor();
    var levelsDes3 = new ActionDescriptor();
    var levelsRef = new ActionReference();

    levelsRef.putClass( s2t("adjustmentLayer"));
    levelsDes1.putReference( c2t("null"), levelsRef);
    levelsDes2.putString( s2t("name"), (layerName) + """ Levels""");
    levelsDes2.putBoolean( s2t("group"), true );
    levelsDes3.putEnumerated( s2t("presetKind"), s2t("presetKindType"), s2t("presetKindDefault"));
    levelsDes2.putObject( s2t("type"), s2t("levels"), levelsDes3);
    levelsDes1.putObject( s2t("using"), s2t("adjustmentLayer"), levelsDes2);
    executeAction( s2t("make"), levelsDes1, DialogModes.NO);
//add hue sat adj layer - if statement is so Black doesnt get a hue adj layer
    if (layerName != 'Black') {
        var addHueSatDes1 = new ActionDescriptor();
        var addHueSatDes2 = new ActionDescriptor();
        var addHueSatDes3 = new ActionDescriptor();
        var addHueSatRef = new ActionReference();

    addHueSatRef.putClass(s2t("adjustmentLayer"));
    addHueSatDes3.putReference(c2t("null"), addHueSatRef);
    addHueSatDes1.putString(s2t("name"), (layerName) + """ color adjust""");
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
    setHueSatDes3.putInteger(s2t("hue"), hue);
    setHueSatDes3.putInteger(c2t("Strt"), sat);
    setHueSatDes3.putInteger(s2t("lightness"), light);
    setHueSatList.putObject(s2t("hueSatAdjustmentV2"), setHueSatDes3);
    setHueSatDes2.putList(s2t("adjustment"), setHueSatList);
    setHueSatDes1.putObject(s2t("to"), s2t("hueSaturation"), setHueSatDes2);
    executeAction(s2t("set"), setHueSatDes1, DialogModes.NO);
    } else {return}
}
function runScript() {
        doc.changeMode(ChangeMode.CMYK);
    makeLayers();
    splitChannels('Cyan');
    splitChannels('Magenta');
    splitChannels('Yellow');
    splitChannels('Black');
        doc.changeMode(ChangeMode.RGB);
    addLevelsHueSat('Cyan', 174, 50, 20);
    addLevelsHueSat('Magenta', 300, 50, 20);
    addLevelsHueSat('Yellow', 50, 50, 20);
    addLevelsHueSat('Black')
    	app.refresh();
    alert("Split to CMYK\n* Use Hue/Saturation Adjustment layers to lighten, darken, change color\n* Use Levels adjustment layer for best contrast\n* Use Layer masks to mask out content\n* Original image is hidden on bottom layer");
}
var doc = app.activeDocument;
runScript();
