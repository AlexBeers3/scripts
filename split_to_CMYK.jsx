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