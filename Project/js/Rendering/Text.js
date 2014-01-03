/*
A Renderable-derived class for wrapping up a text object.
Currently just uses Verdana font.


METHODS:
Text			Constructor specifying a position, string, a font size, and a Color.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
GetString		Returns this Text's string
SetString		Sets this Text's string to the passed value

OVERRIDEN METHODS:
Render			Renders this Text to the passed render context at its current position.

INHERITED METHODS:
GetPos			Returns a copy of the upper-left position of this Renderable.  (For faster access, just directly read _m_v2dPos but don't write to it.)
SetPos			Sets the upper-left position of this Renderable to a copy of the passed Vec2D.
SetVisible		Sets whether or not this is visible to the passed value.


MEMBERS:
_m_sText		The actual text of this Text.
_m_nFontSize	The size of the font
_m_pColorRGB	The ColorRGB of this Text.

INHERITED MEMBERS:
_m_nType		The object type from the RenderableType enum below
_m_v2dPos		The current position
_m_bVisible		Whether or not this Renderable is currently visible.  Derived classes with overridden Render methods must respect this variable.


DEPENDENCIES:
Math/Vec2D.js
Rendering/RenderableManager.js
Rendering/Renderable.js
Rendering/ColorRGB.js
*/


//Constructor specifying a position, string, a font size, and a Color.
var Text = function(v2dPos, sText, pColorRGB, nFontSize)
{
	//Base class constructor
	Renderable.prototype._Construct.call(this, v2dPos);
	
	this._Construct(sText, pColorRGB, nFontSize)
}

//Inherit from Renderable
Text.prototype = new Renderable(new Vec2D(0, 0));


//"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
Text.prototype._Construct = function(sText, pColorRGB, nFontSize)
{
	this._m_nType = Renderable.TEXT;
	
	//Save class vars
	this._m_sText = sText;
	this._m_nFontSize = nFontSize;
	this._m_pColorRGB = pColorRGB.Copy();
}


//Returns this Text's string
Text.prototype.GetString = function()
{
	return this._m_sText;
}

//Sets this Text's string to the passed value
Text.prototype.SetString = function(sText)
{
	this._m_sText = sText;
}


//Renders this Text to the passed render context at its current position.
Text.prototype.Render = function(pRenderContext)
{
	//Do nothing if this is invisible
	if (!this._m_bVisible)
		return;

	pRenderContext.font = this._m_nFontSize + "px Verdana";
	pRenderContext.fillStyle = this._m_pColorRGB.ToHexString();
	pRenderContext.fillText(this._m_sText, this._m_v2dPos.x, this._m_v2dPos.y);


	/*var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");

	ctx.font="20px Georgia";
	ctx.fillText("Hello World!",10,50);

	ctx.font="30px Verdana";
	// Create gradient
	var gradient=ctx.createLinearGradient(0,0,c.width,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	// Fill with gradient
	ctx.fillStyle=gradient;
	ctx.fillText("Big smile!",10,90);*/

}


