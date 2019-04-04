#target photoshop
#targetengine "main"

var doc = app.activeDocument;

//switch color mode to get 4 channels
doc.changeMode(ChangeMode.CMYK);

//copies all channels into their own layers and adjusts blending mode
//reverse order of var layerK - layerC so layers appear in proper order in PS
function makeLayers() {
		var layers = doc.artLayers;
	
		var layerK = layers.add();
  			layerK.name = 'Black';
  			layerK.blendMode = BlendMode.NORMAL;
	
		var layerY = layers.add();
  			layerY.name = 'Yellow';
  			layerY.blendMode = BlendMode.MULTIPLY;
	
		var layerM = layers.add();
  			layerM.name = 'Magenta';
  			layerM.blendMode = BlendMode.MULTIPLY;
	
		var layerC = layers.add();
  			layerC.name = 'Cyan';
  			layerC.blendMode = BlendMode.MULTIPLY;
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
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass( s2t( "adjustmentLayer" ));
    descriptor.putReference( c2t( "null" ), reference );
    descriptor2.putString( s2t( "name" ), (layerName) + """ Levels""" );
    descriptor2.putBoolean( s2t( "group" ), true );
    descriptor3.putEnumerated( s2t( "presetKind" ), s2t( "presetKindType" ), s2t( "presetKindDefault" ));
    descriptor2.putObject( s2t( "type" ), s2t( "levels" ), descriptor3 );
    descriptor.putObject( s2t( "using" ), s2t( "adjustmentLayer" ), descriptor2 );
    executeAction( s2t( "make" ), descriptor, DialogModes.NO );
//add hue sat adj layer - if statement is so Black doesnt get a hue adj layer
    if (layerName != 'Black') {
    var c2t = function (s) {
        return app.charIDToTypeID(s);
    };
    var s2t = function (s) {
        return app.stringIDToTypeID(s);
    };
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass( s2t( "adjustmentLayer" ));
    descriptor3.putReference( c2t( "null" ), reference );
    descriptor.putString( s2t( "name" ), (layerName) + """ color adjust""" );
    descriptor.putBoolean( s2t( "group" ), true );
    descriptor2.putEnumerated( s2t( "presetKind" ), s2t( "presetKindType" ), s2t( "presetKindDefault" ));
    descriptor2.putBoolean( s2t( "colorize" ), true );
    descriptor.putObject( s2t( "type" ), s2t( "hueSaturation" ), descriptor2 );
    descriptor3.putObject( s2t( "using" ), s2t( "adjustmentLayer" ), descriptor );
    executeAction( s2t( "make" ), descriptor3, DialogModes.NO );
//sets hue, sat, lightness
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var list = new ActionList();
    var reference = new ActionReference();

    reference.putEnumerated( s2t( "adjustmentLayer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
    descriptor.putReference( c2t( "null" ), reference );
    descriptor2.putEnumerated( s2t( "presetKind" ), s2t( "presetKindType" ), s2t( "presetKindCustom" ));
    descriptor3.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "composite" ));
    descriptor3.putInteger( s2t( "hue" ), hue );
    descriptor3.putInteger( c2t( "Strt" ), sat );
    descriptor3.putInteger( s2t( "lightness" ), light );
    list.putObject( s2t( "hueSatAdjustmentV2" ), descriptor3 );
    descriptor2.putList( s2t( "adjustment" ), list );
    descriptor.putObject( s2t( "to" ), s2t( "hueSaturation" ), descriptor2 );
    executeAction( s2t( "set" ), descriptor, DialogModes.NO );
    } else {return}
}

makeLayers();
splitChannels('Cyan');
splitChannels('Magenta');
splitChannels('Yellow');
splitChannels('Black');
//sets color mode back to RGB
doc.changeMode(ChangeMode.RGB);
addLevelsHueSat('Cyan', 174, 50, 20);
addLevelsHueSat('Magenta', 300, 50, 20);
addLevelsHueSat('Yellow', 50, 50, 20);
addLevelsHueSat('Black')

alert("Split to CMYK\n* Use Hue/Saturation Adjustment layers to lighten, darken, change color\n* Use Levels adjustment layer for best contrast\n* Use Layer masks to mask out content\n* Original image is hidden on bottom layer\n* Rename adjusted layers to the color name you want in the final tiff files");

//runs the adjustment layers action set
//app.doAction("split_to_CMYK_adj_layers", "split_to_CMYK_adj_layers.ATN");