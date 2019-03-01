#target photoshop
#targetengine "main"

var doc = app.activeDocument;
var c2t = function (s) {
    return app.charIDToTypeID(s);
};
var s2t = function (s) {
    return app.stringIDToTypeID(s);
};

//reset default foreground background color
function resetSwatches () {
    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putProperty( s2t( "color" ), s2t( "colors" ));
    descriptor.putReference( c2t( "null" ), reference );
    executeAction( s2t( "reset" ), descriptor, DialogModes.NO );
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
    var descriptor = new ActionDescriptor();

    descriptor.putInteger( c2t( "LNR " ), 100 );
    descriptor.putInteger( c2t( "Cr12" ), 25 );
    descriptor.putInteger( c2t( "Cl12" ), 25 );
    executeAction( s2t( "Adobe Camera Raw Filter" ), descriptor, DialogModes.NO );
};

//Converts to smart object
function makeSmart () {
    var idnewPlacedLayer = stringIDToTypeID( 'newPlacedLayer' );
executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
};

//selects subject
function selectAndMask () {
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var reference = new ActionReference();

    descriptor.putBoolean( s2t( "sampleAllLayers" ), false );
    executeAction( s2t( "autoCutout" ), descriptor, DialogModes.NO );
    //applies layer mask
    descriptor2.putClass( s2t( "new" ), s2t( "channel" ));
    reference.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "mask" ));
    descriptor2.putReference( s2t( "at" ), reference );
    descriptor2.putEnumerated( s2t( "using" ), c2t( "UsrM" ), s2t( "revealSelection" ));
    executeAction( s2t( "make" ), descriptor2, DialogModes.NO );
};

//surface blur
function surfaceBlur () {
    var descriptor = new ActionDescriptor();

    descriptor.putUnitDouble( c2t( "Rds " ), s2t( "pixelsUnit" ), 50 );
    descriptor.putInteger( s2t( "threshold" ), 20 );
    executeAction( s2t( "surfaceBlur" ), descriptor, DialogModes.NO );
};

//gaussian blur & unsharp mask
function blurUnsharp() {
    doc.activeLayer.applyGaussianBlur(2)
    doc.activeLayer.applyUnSharpMask(500,10,0)
};

//diffuse
function diffuse () {
    var descriptor = new ActionDescriptor();

    descriptor.putEnumerated( s2t( "mode" ), s2t( "diffuseMode" ), s2t( "anisotropic" ));
    descriptor.putInteger( c2t( "FlRs" ), 1273312 );
    executeAction( s2t( "diffuse" ), descriptor, DialogModes.NO );

};

//add stroke to layer
function addStroke () {
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var descriptor4 = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putProperty( s2t( "property" ), s2t( "layerEffects" ));
    reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
    descriptor.putReference( c2t( "null" ), reference );
    descriptor3.putEnumerated( s2t( "style" ), s2t( "frameStyle" ), s2t( "outsetFrame" ));
    descriptor3.putEnumerated( s2t( "paintType" ), s2t( "frameFill" ), s2t( "solidColor" ));
    descriptor3.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), 100 );
    descriptor3.putUnitDouble( s2t( "size" ), s2t( "pixelsUnit" ), 5 );
    descriptor3.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor4 );
    descriptor2.putObject( s2t( "frameFX" ), s2t( "frameFX" ), descriptor3 );
    descriptor.putObject( s2t( "to" ), s2t( "layerEffects" ), descriptor2 );
    executeAction( s2t( "set" ), descriptor, DialogModes.NO );
};

//cutout
function cutOut() {
    var descriptor = new ActionDescriptor();

    descriptor.putEnumerated( c2t( "GEfk" ), c2t( "GEft" ), s2t( "cutout" ));
    descriptor.putInteger( c2t( "NmbL" ), 5 );
    descriptor.putInteger( s2t( "edgeSimplicity" ), 0 );
    descriptor.putInteger( s2t( "edgeFidelity" ), 3 );
    executeAction( c2t( "GEfc" ), descriptor, DialogModes.NO );
};

resetSwatches ();

//duplicates original image
doc.selection.selectAll();
doc.selection.copy();
doc.paste();

//sizes down, runs camera raw, sizes up, smart object with mask, changes to greyscale
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

//hides background
doc.activeLayer = doc.artLayers.getByName("Background");
doc.activeLayer.visible = !doc.activeLayer.visible;

//trims empyt space in doc
doc.trim(TrimType.TOPLEFT)

alert("Shades of Gray\n* Double click Filter Gallery to adjust amount of shades\n* Turn off filters to get more detail\n* Adjust layer mask to show/hide content\n* Original image is hidden on bottom layer");