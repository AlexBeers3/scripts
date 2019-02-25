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
makeLayers();
splitChannels('Cyan');
splitChannels('Magenta');
splitChannels('Yellow');
splitChannels('Black');

//sets color mode back to RGB
doc.changeMode(ChangeMode.RGB);

//runs the adjustment layers action set
app.doAction("split_to_CMYK_adj_layers", "split_to_CMYK_adj_layers.ATN");

//add hue sat adj layer
var idMk = charIDToTypeID( "Mk  " );
    var desc22 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref11 = new ActionReference();
        var idAdjL = charIDToTypeID( "AdjL" );
        ref11.putClass( idAdjL );
    desc22.putReference( idnull, ref11 );
    var idUsng = charIDToTypeID( "Usng" );
        var desc23 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc23.putString( idNm, """Cyan color adjust""" );
        var idGrup = charIDToTypeID( "Grup" );
        desc23.putBoolean( idGrup, true );
        var idType = charIDToTypeID( "Type" );
            var desc24 = new ActionDescriptor();
            var idpresetKind = stringIDToTypeID( "presetKind" );
            var idpresetKindType = stringIDToTypeID( "presetKindType" );
            var idpresetKindDefault = stringIDToTypeID( "presetKindDefault" );
            desc24.putEnumerated( idpresetKind, idpresetKindType, idpresetKindDefault );
            var idClrz = charIDToTypeID( "Clrz" );
            desc24.putBoolean( idClrz, false );
        var idHStr = charIDToTypeID( "HStr" );
        desc23.putObject( idType, idHStr, desc24 );
    var idAdjL = charIDToTypeID( "AdjL" );
    desc22.putObject( idUsng, idAdjL, desc23 );
executeAction( idMk, desc22, DialogModes.NO );

//add levels adj layer
var idMk = charIDToTypeID( "Mk  " );
    var desc29 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref14 = new ActionReference();
        var idAdjL = charIDToTypeID( "AdjL" );
        ref14.putClass( idAdjL );
    desc29.putReference( idnull, ref14 );
    var idUsng = charIDToTypeID( "Usng" );
        var desc30 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc30.putString( idNm, """Cyan Levels""" );
        var idGrup = charIDToTypeID( "Grup" );
        desc30.putBoolean( idGrup, true );
        var idType = charIDToTypeID( "Type" );
            var desc31 = new ActionDescriptor();
            var idpresetKind = stringIDToTypeID( "presetKind" );
            var idpresetKindType = stringIDToTypeID( "presetKindType" );
            var idpresetKindDefault = stringIDToTypeID( "presetKindDefault" );
            desc31.putEnumerated( idpresetKind, idpresetKindType, idpresetKindDefault );
        var idLvls = charIDToTypeID( "Lvls" );
        desc30.putObject( idType, idLvls, desc31 );
    var idAdjL = charIDToTypeID( "AdjL" );
    desc29.putObject( idUsng, idAdjL, desc30 );
executeAction( idMk, desc29, DialogModes.NO );
