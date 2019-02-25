#target photoshop
#targetengine "main"

var doc = app.activeDocument;

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

// reset swatches
/*var idRset = charIDToTypeID( "Rset" );
    var desc12 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref2 = new ActionReference();
        var idClr = charIDToTypeID( "Clr " );
        var idClrs = charIDToTypeID( "Clrs" );
        ref2.putProperty( idClr, idClrs );
    desc12.putReference( idnull, ref2 );
executeAction( idRset, desc12, DialogModes.NO );*/


/*//surface blur
var idsurfaceBlur = stringIDToTypeID( "surfaceBlur" );
    var desc8 = new ActionDescriptor();
    var idRds = charIDToTypeID( "Rds " );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc8.putUnitDouble( idRds, idPxl, 50.000000 );
    var idThsh = charIDToTypeID( "Thsh" );
    desc8.putInteger( idThsh, 20 );
executeAction( idsurfaceBlur, desc8, DialogModes.NO );*/

//resizes image proportionally
/*var fWidth = 500;
var fHeight = 500;

// do the resizing.  if height > width (portrait-mode) resize based on height.  otherwise, resize based on width
if (doc.height > doc.width) {
    doc.resizeImage(null,UnitValue(fHeight,"px"),null,ResampleMethod.BICUBIC);
}
else {
    doc.resizeImage(UnitValue(fWidth,"px"),null,null,ResampleMethod.BICUBIC);
}*/

//Adds a solid white background
/*function newColorLayer(red,green,blue) {
    newLayer = app.activeDocument.artLayers.add();
    newLayer.name = "White";
    newColor = new SolidColor;
    newColor.rgb.red = red;
    newColor.rgb.green = green;
    newColor.rgb.blue = blue;
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.fill(newColor);
    app.activeDocument.selection.deselect();
};

newColorLayer(255,255,255);*/

//doc.activeLayer.applyGaussianBlur(2)
//doc.activeLayer.applyUnSharpMask(500,10,0)

//creates smart object
//var idnewPlacedLayer = stringIDToTypeID( 'newPlacedLayer' );
//executeAction(idnewPlacedLayer, undefined, DialogModes.NO);

//reset default foreground background color
// var idRset = charIDToTypeID( "Rset" );
//     var desc12 = new ActionDescriptor();
//     var idnull = charIDToTypeID( "null" );
//         var ref2 = new ActionReference();
//         var idClr = charIDToTypeID( "Clr " );
//         var idClrs = charIDToTypeID( "Clrs" );
//         ref2.putProperty( idClr, idClrs );
//     desc12.putReference( idnull, ref2 );
// executeAction( idRset, desc12, DialogModes.NO );

//scriptlistener Surface Blur
/*var idsurfaceBlur = stringIDToTypeID( "surfaceBlur" );
    var desc8 = new ActionDescriptor();
    var idRds = charIDToTypeID( "Rds " );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc8.putUnitDouble( idRds, idPxl, 50.000000 );
    var idThsh = charIDToTypeID( "Thsh" );
    desc8.putInteger( idThsh, 20 );
executeAction( idsurfaceBlur, desc8, DialogModes.NO );*/

/*//Diffuse
var idDfs = charIDToTypeID( "Dfs " );
    var desc10 = new ActionDescriptor();
    var idMd = charIDToTypeID( "Md  " );
    var idDfsM = charIDToTypeID( "DfsM" );
    var idanisotropic = stringIDToTypeID( "anisotropic" );
    desc10.putEnumerated( idMd, idDfsM, idanisotropic );
    var idFlRs = charIDToTypeID( "FlRs" );
    desc10.putInteger( idFlRs, 1273312 );
executeAction( idDfs, desc10, DialogModes.NO );*/

//Photocopy filter
/*var idGEfc = charIDToTypeID( "GEfc" );
    var desc15 = new ActionDescriptor();
    var idGEfk = charIDToTypeID( "GEfk" );
    var idGEft = charIDToTypeID( "GEft" );
    var idPhtc = charIDToTypeID( "Phtc" );
    desc15.putEnumerated( idGEfk, idGEft, idPhtc );
    var idDtl = charIDToTypeID( "Dtl " );
    desc15.putInteger( idDtl, 24 );
    var idDrkn = charIDToTypeID( "Drkn" );
    desc15.putInteger( idDrkn, 12 );
executeAction( idGEfc, desc15, DialogModes.NO );*/

//Set photocopy filter to multiply
/*var idsetd = charIDToTypeID( "setd" );
    var desc20 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref2 = new ActionReference();
        var idfilterFX = stringIDToTypeID( "filterFX" );
        ref2.putIndex( idfilterFX, 1 );
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref2.putEnumerated( idLyr, idOrdn, idTrgt );
    desc20.putReference( idnull, ref2 );
    var idfilterFX = stringIDToTypeID( "filterFX" );
        var desc21 = new ActionDescriptor();
        var idblendOptions = stringIDToTypeID( "blendOptions" );
            var desc22 = new ActionDescriptor();
            var idOpct = charIDToTypeID( "Opct" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc22.putUnitDouble( idOpct, idPrc, 100.000000 );
            var idMd = charIDToTypeID( "Md  " );
            var idBlnM = charIDToTypeID( "BlnM" );
            var idMltp = charIDToTypeID( "Mltp" );
            desc22.putEnumerated( idMd, idBlnM, idMltp );
        var idblendOptions = stringIDToTypeID( "blendOptions" );
        desc21.putObject( idblendOptions, idblendOptions, desc22 );
    var idfilterFX = stringIDToTypeID( "filterFX" );
    desc20.putObject( idfilterFX, idfilterFX, desc21 );
executeAction( idsetd, desc20, DialogModes.NO );*/

//Threshold adj layer
/*var idMk = charIDToTypeID( "Mk  " );
    var desc23 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref3 = new ActionReference();
        var idAdjL = charIDToTypeID( "AdjL" );
        ref3.putClass( idAdjL );
    desc23.putReference( idnull, ref3 );
    var idUsng = charIDToTypeID( "Usng" );
        var desc24 = new ActionDescriptor();
        var idType = charIDToTypeID( "Type" );
            var desc25 = new ActionDescriptor();
            var idLvl = charIDToTypeID( "Lvl " );
            desc25.putInteger( idLvl, 128 );
        var idThrs = charIDToTypeID( "Thrs" );
        desc24.putObject( idType, idThrs, desc25 );
    var idAdjL = charIDToTypeID( "AdjL" );
    desc23.putObject( idUsng, idAdjL, desc24 );
executeAction( idMk, desc23, DialogModes.NO );*/

//add 5 point outter stroke to layer
/*var idsetd = charIDToTypeID( "setd" );
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
executeAction( idsetd, desc33, DialogModes.NO );*/

/*//apply mask to layer
var idMk = charIDToTypeID( "Mk  " );
    var desc48 = new ActionDescriptor();
    var idNw = charIDToTypeID( "Nw  " );
    var idChnl = charIDToTypeID( "Chnl" );
    desc48.putClass( idNw, idChnl );
    var idAt = charIDToTypeID( "At  " );
        var ref19 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idChnl = charIDToTypeID( "Chnl" );
        var idMsk = charIDToTypeID( "Msk " );
        ref19.putEnumerated( idChnl, idChnl, idMsk );
    desc48.putReference( idAt, ref19 );
    var idUsng = charIDToTypeID( "Usng" );
    var idUsrM = charIDToTypeID( "UsrM" );
    var idRvlA = charIDToTypeID( "RvlA" );
    desc48.putEnumerated( idUsng, idUsrM, idRvlA );
executeAction( idMk, desc48, DialogModes.NO );*/

/*//select subject
var idautoCutout = stringIDToTypeID( "autoCutout" );
    var desc58 = new ActionDescriptor();
    var idsampleAllLayers = stringIDToTypeID( "sampleAllLayers" );
    desc58.putBoolean( idsampleAllLayers, false );
executeAction( idautoCutout, desc58, DialogModes.NO );
*/

//mask selection. ----need to sort through code
/*var idinvokeCommand = stringIDToTypeID( "invokeCommand" );
    var desc81 = new ActionDescriptor();
    var idcommandID = stringIDToTypeID( "commandID" );
    desc81.putInteger( idcommandID, 1115 );
    var idkcanDispatchWhileModal = stringIDToTypeID( "kcanDispatchWhileModal" );
    desc81.putBoolean( idkcanDispatchWhileModal, true );
executeAction( idinvokeCommand, desc81, DialogModes.NO );

// =======================================================
var idmodalStateChanged = stringIDToTypeID( "modalStateChanged" );
    var desc82 = new ActionDescriptor();
    var idLvl = charIDToTypeID( "Lvl " );
    desc82.putInteger( idLvl, 1 );
    var idStte = charIDToTypeID( "Stte" );
    var idStte = charIDToTypeID( "Stte" );
    var identer = stringIDToTypeID( "enter" );
    desc82.putEnumerated( idStte, idStte, identer );
    var idkcanDispatchWhileModal = stringIDToTypeID( "kcanDispatchWhileModal" );
    desc82.putBoolean( idkcanDispatchWhileModal, true );
    var idTtl = charIDToTypeID( "Ttl " );
    desc82.putString( idTtl, """Refine Edge""" );
executeAction( idmodalStateChanged, desc82, DialogModes.NO );

// =======================================================
var idlayersFiltered = stringIDToTypeID( "layersFiltered" );
executeAction( idlayersFiltered, undefined, DialogModes.NO );

// =======================================================
var idmodalStateChanged = stringIDToTypeID( "modalStateChanged" );
    var desc83 = new ActionDescriptor();
    var idLvl = charIDToTypeID( "Lvl " );
    desc83.putInteger( idLvl, 0 );
    var idStte = charIDToTypeID( "Stte" );
    var idStte = charIDToTypeID( "Stte" );
    var idexit = stringIDToTypeID( "exit" );
    desc83.putEnumerated( idStte, idStte, idexit );
    var idkcanDispatchWhileModal = stringIDToTypeID( "kcanDispatchWhileModal" );
    desc83.putBoolean( idkcanDispatchWhileModal, true );
    var idTtl = charIDToTypeID( "Ttl " );
    desc83.putString( idTtl, """Refine Edge""" );
executeAction( idmodalStateChanged, desc83, DialogModes.NO );

// =======================================================
var idlayersFiltered = stringIDToTypeID( "layersFiltered" );
executeAction( idlayersFiltered, undefined, DialogModes.NO );

// =======================================================
var idrefineSelectionEdge = stringIDToTypeID( "refineSelectionEdge" );
    var desc84 = new ActionDescriptor();
    var idrefineEdgeBorderRadius = stringIDToTypeID( "refineEdgeBorderRadius" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc84.putUnitDouble( idrefineEdgeBorderRadius, idPxl, 5.000000 );
    var idrefineEdgeBorderContrast = stringIDToTypeID( "refineEdgeBorderContrast" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc84.putUnitDouble( idrefineEdgeBorderContrast, idPrc, 0.000000 );
    var idrefineEdgeSmooth = stringIDToTypeID( "refineEdgeSmooth" );
    desc84.putInteger( idrefineEdgeSmooth, 31 );
    var idrefineEdgeFeatherRadius = stringIDToTypeID( "refineEdgeFeatherRadius" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc84.putUnitDouble( idrefineEdgeFeatherRadius, idPxl, 5.000000 );
    var idrefineEdgeChoke = stringIDToTypeID( "refineEdgeChoke" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc84.putUnitDouble( idrefineEdgeChoke, idPrc, -35.000000 );
    var idrefineEdgeAutoRadius = stringIDToTypeID( "refineEdgeAutoRadius" );
    desc84.putBoolean( idrefineEdgeAutoRadius, true );
    var idrefineEdgeDecontaminate = stringIDToTypeID( "refineEdgeDecontaminate" );
    desc84.putBoolean( idrefineEdgeDecontaminate, false );
    var idrefineEdgeOutput = stringIDToTypeID( "refineEdgeOutput" );
    var idrefineEdgeOutput = stringIDToTypeID( "refineEdgeOutput" );
    var idselectionOutputToSelection = stringIDToTypeID( "selectionOutputToSelection" );
    desc84.putEnumerated( idrefineEdgeOutput, idrefineEdgeOutput, idselectionOutputToSelection );
executeAction( idrefineSelectionEdge, desc84, DialogModes.NO );

// =======================================================
var idlayersFiltered = stringIDToTypeID( "layersFiltered" );
executeAction( idlayersFiltered, undefined, DialogModes.NO );

// =======================================================
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
executeAction( idMk, desc85, DialogModes.NO );*/

// Set image size
/*var idImgS = charIDToTypeID( "ImgS" );
    var desc13 = new ActionDescriptor();
    var idWdth = charIDToTypeID( "Wdth" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc13.putUnitDouble( idWdth, idPxl, 500.000000 );
    var idscaleStyles = stringIDToTypeID( "scaleStyles" );
    desc13.putBoolean( idscaleStyles, true );
    var idCnsP = charIDToTypeID( "CnsP" );
    desc13.putBoolean( idCnsP, true );
    var idIntr = charIDToTypeID( "Intr" );
    var idIntp = charIDToTypeID( "Intp" );
    var idautomaticInterpolation = stringIDToTypeID( "automaticInterpolation" );
    desc13.putEnumerated( idIntr, idIntp, idautomaticInterpolation );
executeAction( idImgS, desc13, DialogModes.NO );*/

//Camera RAW filter
/*var idAdobeCameraRawFilter = stringIDToTypeID( "Adobe Camera Raw Filter" );
    var desc14 = new ActionDescriptor();
    var idLNR = charIDToTypeID( "LNR " );
    desc14.putInteger( idLNR, 100 );
   var idPC_one = charIDToTypeID( "PC_1" );
    desc14.putInteger( idPC_one, 25 );
    var idPC_two = charIDToTypeID( "PC_2" );
    desc14.putInteger( idPC_two, 50 );
    var idPC_three = charIDToTypeID( "PC_3" );
    desc14.putInteger( idPC_three, 75 );
    var idShpR = charIDToTypeID( "ShpR" );
    desc14.putDouble( idShpR, 1.000000 );
    var idShpD = charIDToTypeID( "ShpD" );
    desc14.putInteger( idShpD, 25 );
    var idCronetwo = charIDToTypeID( "Cr12" );
    desc14.putInteger( idCronetwo, 25 );
    var idClonetwo = charIDToTypeID( "Cl12" );
    desc14.putInteger( idClonetwo, 25 );
    var idDPHL = charIDToTypeID( "DPHL" );
    desc14.putInteger( idDPHL, 30 );
    var idDPHH = charIDToTypeID( "DPHH" );
    desc14.putInteger( idDPHH, 70 );
    var idDPGL = charIDToTypeID( "DPGL" );
    desc14.putInteger( idDPGL, 40 );
    var idDPGH = charIDToTypeID( "DPGH" );
    desc14.putInteger( idDPGH, 60 );
executeAction( idAdobeCameraRawFilter, desc14, DialogModes.NO );
*/
