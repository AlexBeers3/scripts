#target photoshop
#targetengine "main"

var doc = app.activeDocument;

var c2t = function (s) {
    return app.charIDToTypeID(s);
};
var s2t = function (s) {
    return app.stringIDToTypeID(s);
};

alert("This script will take about 10 secs to run")
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
    doc.activeLayer.applyGaussianBlur(2);
    doc.activeLayer.applyUnSharpMask(500,10,0);
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

//threshold adjustment layer
function thresh() {
    var descriptor = new ActionDescriptor();
    var descriptor2 = new ActionDescriptor();
    var descriptor3 = new ActionDescriptor();
    var reference = new ActionReference();
    	reference.putClass( s2t( "adjustmentLayer" ));
    	descriptor.putReference( c2t( "null" ), reference );
    	descriptor2.putString( s2t( "name" ), "Amount of Black" );
    	descriptor2.putBoolean( s2t( "group" ), true );
    	descriptor3.putInteger( s2t( "level" ), 60 );
    	descriptor2.putObject( s2t( "type" ), s2t( "thresholdClassEvent" ), descriptor3 );
    	descriptor.putObject( s2t( "using" ), s2t( "adjustmentLayer" ), descriptor2 );
    	executeAction( s2t( "make" ), descriptor, DialogModes.NO );
}

//B&W adjusment layer
function blackAndWhite() {
	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();
	var descriptor3 = new ActionDescriptor();
	var descriptor4 = new ActionDescriptor();
	var reference = new ActionReference();
		reference.putClass( s2t( "adjustmentLayer" ));
		descriptor.putReference( c2t( "null" ), reference );
		descriptor2.putString( s2t( "name" ), "Black & White" );
		descriptor2.putBoolean( s2t( "group" ), true );
		descriptor3.putEnumerated( s2t( "presetKind" ), s2t( "presetKindType" ), s2t( "presetKindDefault" ));
		descriptor3.putObject( s2t( "tintColor" ), s2t( "RGBColor" ), descriptor4 );
		descriptor2.putObject( s2t( "type" ), s2t( "blackAndWhite" ), descriptor3 );
		descriptor.putObject( s2t( "using" ), s2t( "adjustmentLayer" ), descriptor2 );
		executeAction( s2t( "make" ), descriptor, DialogModes.NO );
}

//Makes sketch layer
function makeSketch () {
    executeAction( s2t( "copyToLayer" ), undefined, DialogModes.NO );
      doc.activeLayer.desaturate();
    executeAction( s2t( "copyToLayer" ), undefined, DialogModes.NO );
      doc.activeLayer.invert();
      doc.activeLayer.blendMode = BlendMode.COLORDODGE; 
      doc.activeLayer.applyGaussianBlur(5);

    function select() {
        var descriptor = new ActionDescriptor();
        var list = new ActionList();
        var reference = new ActionReference();
      
        reference.putName( s2t( "layer" ), "Layer 1" );
        descriptor.putReference( c2t( "null" ), reference );
        descriptor.putEnumerated( s2t( "selectionModifier" ), s2t( "selectionModifierType" ), s2t( "addToSelectionContinuous" ));
        descriptor.putBoolean( s2t( "makeVisible" ), false );
        list.putInteger( 4 );
        list.putInteger( 5 );
        descriptor.putList( s2t( "layerID" ), list );
        executeAction( s2t( "select" ), descriptor, DialogModes.NO );  
    }; select();

    makeSmart();

        doc.activeLayer.blendMode = BlendMode.MULTIPLY; 
        doc.activeLayer.applyUnSharpMask(500,10,0);
        doc.activeLayer.name = "Sketch"
        selectAndMask ()

    function levelsAdjustment() {
        var descriptor = new ActionDescriptor();
        var descriptor2 = new ActionDescriptor();
        var descriptor3 = new ActionDescriptor();
        var descriptor4 = new ActionDescriptor();
        var descriptor5 = new ActionDescriptor();
        var descriptor6 = new ActionDescriptor();
        var list = new ActionList();
        var list2 = new ActionList();
        var reference = new ActionReference();
        var reference2 = new ActionReference();
        var reference3 = new ActionReference();
      
        reference.putClass( s2t( "adjustmentLayer" ));
        descriptor.putReference( c2t( "null" ), reference );
        descriptor2.putString( s2t( "name" ), "Levels" );
        descriptor2.putBoolean( s2t( "group" ), true );
        descriptor3.putEnumerated( s2t( "presetKind" ), s2t( "presetKindType" ), s2t( "presetKindDefault" ));
        descriptor2.putObject( s2t( "type" ), s2t( "levels" ), descriptor3 );
        descriptor.putObject( s2t( "using" ), s2t( "adjustmentLayer" ), descriptor2 );
        executeAction( s2t( "make" ), descriptor, DialogModes.NO );
        reference2.putEnumerated( s2t( "adjustmentLayer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
        descriptor4.putReference( c2t( "null" ), reference2 );
        descriptor5.putEnumerated( s2t( "presetKind" ), s2t( "presetKindType" ), s2t( "presetKindCustom" ));
        reference3.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "composite" ));
        descriptor6.putReference( s2t( "channel" ), reference3 );
        list2.putInteger( 0 );
        list2.putInteger( 168 );
        descriptor6.putList( s2t( "input" ), list2 );
        list.putObject( s2t( "levelsAdjustment" ), descriptor6 );
        descriptor5.putList( s2t( "adjustment" ), list );
        descriptor4.putObject( s2t( "to" ), s2t( "levels" ), descriptor5 );
        executeAction( s2t( "set" ), descriptor4, DialogModes.NO );
    }; levelsAdjustment();

}

function setAllTheThings () {
	resetSwatches ();
	
	doc.flatten();

    makeSketch();
	
    doc.activeLayer = doc.artLayers.getByName("Background");
    doc.activeLayer.name = "Original"
	//duplicates original image

	doc.selection.selectAll();
	doc.selection.copy();
	doc.paste();
	
	//sizes down, runs camera raw, sizes up, smart object with mask, changes to greyscale
	reSizeImage(500,500);
	cameraRaw ();
	reSizeImage(2000,2000);
	makeSmart ();
	selectAndMask ();
	
	//makes sure layer mask isn't selected for next steps
	doc.activeLayer = doc.artLayers.getByName("Original");
	doc.activeLayer = doc.artLayers.getByName("Layer 1");
	doc.activeLayer.name = "Simplified Shading"
	surfaceBlur ();
	diffuse ();
	doc.activeLayer.duplicate();

	doc.activeLayer = doc.artLayers.getByName("Simplified Shading copy");
	doc.activeLayer.name = "Clipart Me"
	doc.activeLayer.blendMode = BlendMode.DARKEN; 
	addStroke(); 
	blurUnsharp();
	thresh();
	
	doc.activeLayer = doc.artLayers.getByName("Simplified Shading");
	cutOut();
	blackAndWhite();
	
	//hides background
	doc.activeLayer = doc.artLayers.getByName("Original");
	doc.activeLayer.visible = !doc.activeLayer.visible;

	//trims empyt space in doc  **may not be needed***
	//doc.trim(TrimType.TOPLEFT)
}
setAllTheThings();	

//message on how to use script-----------------------------------------------------------
function createText(fface, size, colR, colG, colB, content, tX, tY)
{
  	var artLayerRef = doc.artLayers.add()
  		artLayerRef.kind = LayerKind.TEXT
  		
  		textColor = new SolidColor();
  		textColor.rgb.red = colR;
  		textColor.rgb.green = colG;
  		textColor.rgb.blue = colB;
		
  		textItemRef = artLayerRef.textItem
  		textItemRef.font = fface;
  		textItemRef.contents = content;
  		textItemRef.color = textColor;
  		textItemRef.size = size
  		textItemRef.position = new Array(tX, tY) //pixels from the left, pixels from the top

  //sets layer style for legibility
	function setLayerStyle() {
    	var descriptor = new ActionDescriptor();
    	var descriptor2 = new ActionDescriptor();
    	var descriptor3 = new ActionDescriptor();
    	var descriptor4 = new ActionDescriptor();
    	var descriptor5 = new ActionDescriptor();
    	var reference = new ActionReference();
    	  	reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
    	  	descriptor.putReference( c2t( "null" ), reference );
    	  	descriptor4.putBoolean( s2t( "enabled" ), true );
    	  	descriptor4.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "normal" ));
    	  	descriptor5.putDouble( s2t( "gray" ), 0 );
    	  	descriptor4.putObject( s2t( "color" ), s2t( "grayscale" ), descriptor5 );
    	  	descriptor4.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), 100 );
    	  	descriptor4.putUnitDouble( s2t( "distance" ), s2t( "pixelsUnit" ), 0 );
    	  	descriptor4.putUnitDouble( s2t( "chokeMatte" ), s2t( "pixelsUnit" ), 100 );
    	  	descriptor4.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), 7 );
    	  	descriptor3.putObject( s2t( "dropShadow" ), s2t( "dropShadow" ), descriptor4 );
    	  	descriptor2.putObject( s2t( "layerEffects" ), s2t( "layerEffects" ), descriptor3 );
    	  	descriptor.putObject( s2t( "to" ), s2t( "layer" ), descriptor2 );
    	  	executeAction( s2t( "set" ), descriptor, DialogModes.NO );
    }
    setLayerStyle();
}
createText("Arial-BoldMT", 24,0,0,0, "Clipart Me & Simplified Shading\r  * Use Amount of Black layer to adjust darkness of Clipart Me layer\r  * Use Black and White layer to darken Simplified Shades layer\r  * Double click on Clipart Me layer mask to soften shadow\r  * Double click Filter Gallery to adjust amount of shades\r  * Turn off filters to get more detail\r  * Adjust layer mask to show/hide content\r  * Original image is hidden on bottom layer", .5, .5);