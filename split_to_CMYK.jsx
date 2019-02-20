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
makeLayers();

//copies channels into corresponding layers
function splitChannels(targetChannel) {
    
    doc.activeLayer = doc.artLayers.getByName("Background");

    doc.activeChannels = [doc.channels.getByName(targetChannel)];
        function selectCopy() {
          doc.selection.selectAll();
          doc.selection.copy();
  }selectCopy();
      
      if (targetChannel = 'Cyan') {
          doc.activeLayer = doc.artLayers.getByName("Cyan");
          doc.paste();
          return
    } else if (targetChannel = 'Magenta'){
          doc.activeLayer = doc.artLayers.getByName("Magenta");
          doc.paste();
          return
    } else if (targetChannel = 'Yellow'){
          doc.activeLayer = doc.artLayers.getByName("Yellow");
          doc.paste();
          return
    } else if (targetChannel = 'Black'){
          doc.activeLayer = doc.artLayers.getByName("Black");
          doc.paste();
          return
  } 
}
splitChannels('Cyan');
splitChannels('Magenta');
splitChannels('Yellow');
splitChannels('Black');

//sets color mode back to RGB
doc.changeMode(ChangeMode.RGB);

//runs the adjustment layers action set
//app.doAction("split_to_CMYK_adj_layers", "split_to_CMYK_adj_layers.ATN");



//-------------------------------------------------------------------------------Old Code


/*try {
    if (app.documents.length) {
      var layerColor = ["Cyan", "Magenta", "Yellow", "Black"];
      var layers = doc.artLayers;
      var cmyk_layers = [
        layerK = layers.add(),
        layerY = layers.add(),
        layerM = layers.add(),
        layerC = layers.add()
      ];

      if (layerColor) {
        cmyk_layers[0].name = layerColor[3];
        cmyk_layers[0].blendMode = BlendMode.NORMAL;
        cmyk_layers[1].name = layerColor[2];
        cmyk_layers[1].blendMode = BlendMode.MULTIPLY;
        cmyk_layers[2].name = layerColor[1];
        cmyk_layers[2].blendMode = BlendMode.MULTIPLY;
        cmyk_layers[3].name = layerColor[0];
        cmyk_layers[3].blendMode = BlendMode.MULTIPLY;

      }

      doc.activeLayer = newLayer;
    }
  } catch (e) {}
}
makeLayers();

function selectCopy() {
  doc.selection.selectAll();
  doc.selection.copy();
}

//copies channels into corresponding layers
function splitCyan() {
  doc.activeLayer = doc.layers[4];
  doc.activeChannels = [doc.channels.getByName('Cyan')];
  doc.selection.selectAll();
  doc.selection.copy();
  doc.activeLayer = doc.layers[0];
  doc.paste();
}

function splitMagenta() {
  doc.activeLayer = doc.layers[4];
  doc.activeChannels = [doc.channels.getByName('Magenta')];
  doc.selection.selectAll();
  doc.selection.copy();
  doc.activeLayer = doc.layers[1];
  doc.paste();
}

function splitYellow() {
  doc.activeLayer = doc.layers[4];
  doc.activeChannels = [doc.channels.getByName('Yellow')];
  doc.selection.selectAll();
  doc.selection.copy();
  doc.activeLayer = doc.layers[2];
  doc.paste();
}

function splitBlack() {
  doc.activeLayer = doc.layers[4];
  doc.activeChannels = [doc.channels.getByName('Black')];
  doc.selection.selectAll();
  doc.selection.copy();
  doc.activeLayer = doc.layers[3];
  doc.paste();
}
*/

