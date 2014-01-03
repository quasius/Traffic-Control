/*
"Singleton" class to organize Renderables into layers and provide easy "batch" rendering.
Multiple Renderables in the same layer will be drawn in the order they were added.


METHODS:
RenderableManager		Default constructor
AddRenderableToLayer	Adds the passed Renderable to the passed layer from the Layer enum below
RemoveRenderable		Removes the passed Renderable from the manager.  Does nothing if the passed Renderable was not found.  Returns whether or not the passed Renderable was found.
RenderAll				Renders all currently-managed Renderables to the passed render context in the correct layer.
ClearLayer				Removes all currently-managed Renderables from the passed Layer.
ClearAll				Removes all currently-managed Renderables from all Layers.


MEMBERS:
_m_vRenderable			A 2D array of all managed Renderables.  First index is layer.
_m_mRenderablesToLayerHash	Associates all managed Renderables to their layer.


STATIC MEMBERS:
g_pRenderableManager				Singleton instance


DEPENDENCIES:
Rendering/Renderable.js
System/HashMap.js
*/


//"Singleton" instance
var g_pRenderableManager = null;

//Default constructor
var RenderableManager = function()
{
	//Init class members
	this._m_vRenderable = []
	for (var i = 0; i < RenderableManager.NUM_LAYERS; ++i)
		this._m_vRenderable[i] = [];
		
	this._m_mRenderablesToLayerHash = new HashMap();
	
	//Save "singleton"
	g_pRenderableManager = this;
}


//Layer enum
RenderableManager.BACKGROUND = 0;
RenderableManager.LEVEL_OBJECTS = 1;
RenderableManager.BALLS = 2;
RenderableManager.NUM_LAYERS = 3;


//Adds the passed Renderable to the passed layer from the Layer enum below
RenderableManager.prototype.AddRenderableToLayer = function(pRenderable, nLayer)
{
	//Save to Renderables 2D array
	this._m_vRenderable[nLayer].push(pRenderable);
	
	//Associate Renderable with layer
	this._m_mRenderablesToLayerHash.Insert(pRenderable, nLayer);
}


//Removes the passed Renderable from the manager.  Does nothing if the passed Renderable was not found.  Returns whether or not the passed Renderable was found.
RenderableManager.prototype.RemoveRenderable = function(pRenderable)
{		
	//Find the layer, returning false if the Renderable wasn't found
	var nLayer = this._m_mRenderablesToLayerHash.Get(pRenderable);
	if (nLayer === undefined)
	{
		console.log("unfound tag = " + pRenderable.tag);
		return false;
	}

		
	//Remove Renderable both from layer association and Renderables 2D array
	var nRenderableIndex = this._m_vRenderable[nLayer].indexOf(pRenderable);
	this._m_vRenderable[nLayer].splice(nRenderableIndex, 1);
	this._m_mRenderablesToLayerHash.Remove(pRenderable);

	//If we get here, the Renderable was found and removed
	return true;
}


//Renders all currently-managed Renderables to the passed render context in the correct layer.
RenderableManager.prototype.RenderAll = function(pRenderContext)
{
	for (var i = 0; i < this._m_vRenderable.length; ++i)
	{
		for (var j = 0; j < this._m_vRenderable[i].length; ++j)
			this._m_vRenderable[i][j].Render(pRenderContext);
	}
}


//Removes all currently-managed Renderables from the passed Layer.
RenderableManager.prototype.ClearLayer = function(nLayer)
{
	//delete all layer associations
	for (var i = 0; i < this._m_vRenderable[nLayer].length; ++i)
		this._m_mRenderablesToLayerHash.Remove(this._m_vRenderable[nLayer][i]);

		
	//Replace with empty layer in the Renderables array
	this._m_vRenderable[nLayer] = [];
}


//Removes all currently-managed Renderables from all Layers.
RenderableManager.prototype.ClearAll = function(nLayer)
{
	//Clear layer associations
	this._m_mRenderablesToLayerHash.Clear();
	
	//Clear the Renderables 2D array
	for (var i = 0; i < this._m_vRenderable.length; ++i)
		this._m_vRenderable[i] = [];
}
