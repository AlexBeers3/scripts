#target photoshop
#targetengine "main"

var doc = app.activeDocument;

//reset default foreground background color
function resetSwatches () {
    var idRset = charIDToTypeID( "Rset" );
    var desc12 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref2 = new ActionReference();
        var idClr = charIDToTypeID( "Clr " );
        var idClrs = charIDToTypeID( "Clrs" );
        ref2.putProperty( idClr, idClrs );
    desc12.putReference( idnull, ref2 );
executeAction( idRset, desc12, DialogModes.NO );
}; 
//resizes image proportionally

function reSizeImage(width, height) {
    var fWidth = width;
    var fHeight = height;
// do the resizing.  if height > width (portrait-mode) resize based on height.  
// otherwise, resize based on width
    if (doc.height > doc.width) {
        doc.resizeImage(null,UnitValue(fHeight,"px"),null,ResampleMethod.BICUBIC);
    } else {
        doc.resizeImage(UnitValue(fWidth,"px"),null,null,ResampleMethod.BICUBIC);
  }
}; 

//camera RAW filter to reduce noise and adj contrast/clarity
function cameraRaw () {
    var idAdobeCameraRawFilter = stringIDToTypeID( "Adobe Camera Raw Filter" );
    var desc14 = new ActionDescriptor();
    var noiseReduce = charIDToTypeID( "LNR " );
    desc14.putInteger( noiseReduce, 100 );
    var contrast = charIDToTypeID( "Cr12" );
    desc14.putInteger( contrast, 25 );
    var clarity = charIDToTypeID( "Cl12" );
    desc14.putInteger( clarity, 25 );
executeAction( idAdobeCameraRawFilter, desc14, DialogModes.NO );
};

//Converts to smart object
function makeSmart () {
    var idnewPlacedLayer = stringIDToTypeID( 'newPlacedLayer' );
executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
};

//selects subject
function selectAndMask () {
    var idautoCutout = stringIDToTypeID( "autoCutout" );
    var desc58 = new ActionDescriptor();
    var idsampleAllLayers = stringIDToTypeID( "sampleAllLayers" );
    desc58.putBoolean( idsampleAllLayers, false );
executeAction( idautoCutout, desc58, DialogModes.NO );
//applies layer mask
    var idMk = charIDToTypeID( "Mk  " );
    var desc85 = new ActionDescriptor();
    var idNw = charIDToTypeID( "Nw  " );
    var idChnl = charIDToTypeID( "Chnl" );
    desc85.putClass( idNw, idChnl );
    var idAt = charIDToTypeID( "At  " );
        var ref33 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idChnl = charIDToTypeID( "Chnl" );
        var idMsk = charIDToTypeID( "Msk " );
        ref33.putEnumerated( idChnl, idChnl, idMsk );
    desc85.putReference( idAt, ref33 );
    var idUsng = charIDToTypeID( "Usng" );
    var idUsrM = charIDToTypeID( "UsrM" );
    var idRvlS = charIDToTypeID( "RvlS" );
    desc85.putEnumerated( idUsng, idUsrM, idRvlS );
executeAction( idMk, desc85, DialogModes.NO );
};

//surface blur
function surfaceBlur () {
    var idsurfaceBlur = stringIDToTypeID( "surfaceBlur" );
    var desc8 = new ActionDescriptor();
    var idRds = charIDToTypeID( "Rds " );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc8.putUnitDouble( idRds, idPxl, 50.000000 );
    var idThsh = charIDToTypeID( "Thsh" );
    desc8.putInteger( idThsh, 20 );
executeAction( idsurfaceBlur, desc8, DialogModes.NO );
};

//diffuse
function diffuse () {
    var idDfs = charIDToTypeID( "Dfs " );
    var desc10 = new ActionDescriptor();
    var idMd = charIDToTypeID( "Md  " );
    var idDfsM = charIDToTypeID( "DfsM" );
    var idanisotropic = stringIDToTypeID( "anisotropic" );
    desc10.putEnumerated( idMd, idDfsM, idanisotropic );
    var idFlRs = charIDToTypeID( "FlRs" );
    desc10.putInteger( idFlRs, 1273312 );
executeAction( idDfs, desc10, DialogModes.NO );
};

//add stroke to layer
function addStroke () {
    var idsetd = charIDToTypeID( "setd" );
    var desc33 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref7 = new ActionReference();
        var idPrpr = charIDToTypeID( "Prpr" );
        var idLefx = charIDToTypeID( "Lefx" );
        ref7.putProperty( idPrpr, idLefx );
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref7.putEnumerated( idLyr, idOrdn, idTrgt );
    desc33.putReference( idnull, ref7 );
    var idT = charIDToTypeID( "T   " );
        var desc34 = new ActionDescriptor();
        var idScl = charIDToTypeID( "Scl " );
        var idPrc = charIDToTypeID( "#Prc" );
        desc34.putUnitDouble( idScl, idPrc, 416.666667 );
        var idFrFX = charIDToTypeID( "FrFX" );
            var desc35 = new ActionDescriptor();
            var idenab = charIDToTypeID( "enab" );
            desc35.putBoolean( idenab, true );
            var idpresent = stringIDToTypeID( "present" );
            desc35.putBoolean( idpresent, true );
            var idshowInDialog = stringIDToTypeID( "showInDialog" );
            desc35.putBoolean( idshowInDialog, true );
            var idStyl = charIDToTypeID( "Styl" );
            var idFStl = charIDToTypeID( "FStl" );
            var idOutF = charIDToTypeID( "OutF" );
            desc35.putEnumerated( idStyl, idFStl, idOutF );
            var idPntT = charIDToTypeID( "PntT" );
            var idFrFl = charIDToTypeID( "FrFl" );
            var idSClr = charIDToTypeID( "SClr" );
            desc35.putEnumerated( idPntT, idFrFl, idSClr );
            var idMd = charIDToTypeID( "Md  " );
            var idBlnM = charIDToTypeID( "BlnM" );
            var idNrml = charIDToTypeID( "Nrml" );
            desc35.putEnumerated( idMd, idBlnM, idNrml );
            var idOpct = charIDToTypeID( "Opct" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc35.putUnitDouble( idOpct, idPrc, 100.000000 );
            var idSz = charIDToTypeID( "Sz  " );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc35.putUnitDouble( idSz, idPxl, 5.000000 );
            var idClr = charIDToTypeID( "Clr " );
                var desc36 = new ActionDescriptor();
                var idRd = charIDToTypeID( "Rd  " );
                desc36.putDouble( idRd, 0.000000 );
                var idGrn = charIDToTypeID( "Grn " );
                desc36.putDouble( idGrn, 0.000000 );
                var idBl = charIDToTypeID( "Bl  " );
                desc36.putDouble( idBl, 0.000000 );
            var idRGBC = charIDToTypeID( "RGBC" );
            desc35.putObject( idClr, idRGBC, desc36 );
            var idoverprint = stringIDToTypeID( "overprint" );
            desc35.putBoolean( idoverprint, false );
        var idFrFX = charIDToTypeID( "FrFX" );
        desc34.putObject( idFrFX, idFrFX, desc35 );
    var idLefx = charIDToTypeID( "Lefx" );
    desc33.putObject( idT, idLefx, desc34 );
executeAction( idsetd, desc33, DialogModes.NO );
};

//threshold ajustment layer
function cutOut() {
    var idGEfc = charIDToTypeID( "GEfc" );
    var desc12 = new ActionDescriptor();
    var idGEfk = charIDToTypeID( "GEfk" );
    var idGEft = charIDToTypeID( "GEft" );
    var idCt = charIDToTypeID( "Ct  " );
    desc12.putEnumerated( idGEfk, idGEft, idCt );
    var idNmbL = charIDToTypeID( "NmbL" );
    desc12.putInteger( idNmbL, 5 );
    var idEdgS = charIDToTypeID( "EdgS" );
    desc12.putInteger( idEdgS, 0 );
    var idEdgF = charIDToTypeID( "EdgF" );
    desc12.putInteger( idEdgF, 3 );
executeAction( idGEfc, desc12, DialogModes.NO );
};

resetSwatches ();
//duplicates original image
doc.selection.selectAll();
doc.selection.copy();
doc.paste();
reSizeImage(500,500);
cameraRaw ();
reSizeImage(2000,2000);
doc.changeMode(ChangeMode.GRAYSCALE);
makeSmart ();
selectAndMask ()
//makes sure layer mask isn't selected for next steps
doc.activeLayer = doc.artLayers.getByName("Background");
doc.activeLayer = doc.artLayers.getByName("Layer 1");
surfaceBlur ();
diffuse ();
addStroke();
cutOut();
//hides background and selects Threshold layer
doc.activeLayer = doc.artLayers.getByName("Background");
doc.activeLayer.visible = !doc.activeLayer.visible;

alert("Shades of Gray\n* Double click Filter Gallery to adjust amount of shades\n* Turn off filters to get more detail\n* Adjust layer mask to show/hide content\n* Original image is hidden on bottom layer");