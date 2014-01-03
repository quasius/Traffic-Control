/*
A Renderable-derived class for wrapping up a JavaScript rectangle shape.


METHODS:
RectangleShape	Constructor specifying starting upper-left position, dimensions, and a Color.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)

OVERRIDEN METHODS:
Render			Renders this RectangleShape to the passed render context at its current position.

INHERITED METHODS:
GetPos			Returns a copy of the upper-left position of this Renderable.  (For faster access, just directly read _m_v2dPos but don't write to it.)
SetPos			Sets the upper-left position of this Renderable to a copy of the passed Vec2D.
SetVisible		Sets whether or not this is visible to the passed value.


MEMBERS:
_m_v2dDims		The width and height of this RectangleShape
_m_pColorRGB	The Color of this RectangleShape

INHERITED MEMBERS:
_m_nType		The object type from the RenderableType enum below
_m_v2dPos		The current position
_m_bVisible		Whether or not this Renderable is currently visible.  Derived classes with overridden Render methods must respect this variable.


DEPENDENCIES:
Math/Vec2D.js
Rendering/ColorRGB.js
Rendering/Renderable.js
*/


//Constructor specifying starting upper-left position, dimensions, and a Color.
var RectangleShape = function(v2dPos, v2dDims, pColorRGB)
{
	//Base class constructor
	Renderable.prototype._Construct.call(this, v2dPos);
	
	this._Construct(v2dDims, pColorRGB)
}

//Inherit from Renderable
RectangleShape.prototype = new Renderable(new Vec2D(0, 0));


//"Protected" initializer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
RectangleShape.prototype._Construct = function(v2dDims, pColorRGB)
{
	//Set type
	this._m_nType = Renderable.RECTANGLE_SHAPE;
	
	this._m_v2dDims = v2dDims.Copy();
	this._m_pColorRGB = pColorRGB.Copy();
}


//Renders this RectangleShape to the passed render context at its current position.
RectangleShape.prototype.Render = function(pRenderContext)
{
	//Do nothing if this is invisible
	if (!this._m_bVisible)
		return;
		
	pRenderContext.beginPath();
	pRenderContext.rect(this._m_v2dPos.x, this._m_v2dPos.y, this._m_v2dDims.x, this._m_v2dDims.y);
	pRenderContext.fillStyle = this._m_pColorRGB.ToHexString();
	pRenderContext.fill();
	/*pRenderContext.lineWidth = 7;
	pRenderContext.strokeStyle = 'black';
	pRenderContext.stroke();*/
}

