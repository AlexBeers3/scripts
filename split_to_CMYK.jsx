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
        desc30.putString( idNm, (layerName) + """ Levels""" );
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
//add hue sat adj layer - if statement is so Black doesnt get a hue adj layer
    if (layerName != 'Black') {
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
        desc23.putString( idNm, (layerName) + """ color adjust""" );
        var idGrup = charIDToTypeID( "Grup" );
        desc23.putBoolean( idGrup, true );
        var idType = charIDToTypeID( "Type" );
            var desc24 = new ActionDescriptor();
            var idpresetKind = stringIDToTypeID( "presetKind" );
            var idpresetKindType = stringIDToTypeID( "presetKindType" );
            var idpresetKindDefault = stringIDToTypeID( "presetKindDefault" );
            desc24.putEnumerated( idpresetKind, idpresetKindType, idpresetKindDefault );
            var idClrz = charIDToTypeID( "Clrz" );
            desc24.putBoolean( idClrz, true );
        var idHStr = charIDToTypeID( "HStr" );
        desc23.putObject( idType, idHStr, desc24 );
    var idAdjL = charIDToTypeID( "AdjL" );
    desc22.putObject( idUsng, idAdjL, desc23 );
executeAction( idMk, desc22, DialogModes.NO );
//sets hue/sat values for each layer
var idsetd = charIDToTypeID( "setd" );
    var desc12 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref3 = new ActionReference();
        var idAdjL = charIDToTypeID( "AdjL" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref3.putEnumerated( idAdjL, idOrdn, idTrgt );
    desc12.putReference( idnull, ref3 );
    var idT = charIDToTypeID( "T   " );
        var desc13 = new ActionDescriptor();
        var idAdjs = charIDToTypeID( "Adjs" );
            var list1 = new ActionList();
                var desc14 = new ActionDescriptor();
                var idChnl = charIDToTypeID( "Chnl" );
                var idChnl = charIDToTypeID( "Chnl" );
                var idCmps = charIDToTypeID( "Cmps" );
                desc14.putEnumerated( idChnl, idChnl, idCmps );
                var idH = charIDToTypeID( "H   " );
                desc14.putInteger( idH, hue );
                var idStrt = charIDToTypeID( "Strt" );
                desc14.putInteger( idStrt, sat );
                var idLght = charIDToTypeID( "Lght" );
                desc14.putInteger( idLght, light );
            var idHsttwo = charIDToTypeID( "Hst2" );
            list1.putObject( idHsttwo, desc14 );
        desc13.putList( idAdjs, list1 );
    var idHStr = charIDToTypeID( "HStr" );
    desc12.putObject( idT, idHStr, desc13 );
executeAction( idsetd, desc12, DialogModes.NO );
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