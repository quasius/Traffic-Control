/*
A Renderable-derived class for wrapping up a JavaScript circle shape.


METHODS:
CircleShape		Constructor specifying starting bounding box upper-left position, radius, and a Color.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)

OVERRIDEN METHODS:
Render			Renders this CircleShape to the passed render context at its current position.

INHERITED METHODS:
GetPos			Returns a copy of the upper-left position of this Renderable.  (For faster access, just directly read _m_v2dPos but don't write to it.)
SetPos			Sets the upper-left position of this Renderable to a copy of the passed Vec2D.
SetVisible		Sets whether or not this is visible to the passed value.


MEMBERS:
_m_dRadius		The radius of this CircleShape
_m_pColorRGB	The Color of this CircleShape

INHERITED MEMBERS:
_m_nType		The object type from the RenderableType enum below
_m_v2dPos		The current position
_m_bVisible		Whether or not this Renderable is currently visible.  Derived classes with overridden Render methods must respect this variable.


DEPENDENCIES:
Math/Vec2D.js
Rendering/ColorRGB.js
Rendering/Renderable.js
*/


//Constructor specifying starting bounding box upper-left position, radius, and a Color.
var CircleShape = function(v2dPos, dRadius, pColorRGB)
{
	//Base class constructor
	Renderable.prototype._Construct.call(this, v2dPos);
	
	this._Construct(dRadius, pColorRGB)
}

//Inherit from Renderable
CircleShape.prototype = new Renderable(new Vec2D(0, 0));


//"Protected" initializer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
CircleShape.prototype._Construct = function(dRadius, pColorRGB)
{
	//Set type
	this._m_nType = Renderable.CIRCLE_SHAPE;
	
	this._m_dRadius = dRadius;
	this._m_pColorRGB = pColorRGB.Copy();
}


//Renders this CircleShape to the passed render context at its current position.
CircleShape.prototype.Render = function(pRenderContext)
{
	//Do nothing if this is invisible
	if (!this._m_bVisible)
		return;

	var dRadius = this._m_dRadius;
	pRenderContext.beginPath();
	pRenderContext.arc(this._m_v2dPos.x + dRadius, this._m_v2dPos.y + dRadius, dRadius, 0, GeneralMath.d2Pi, true);
	pRenderContext.fillStyle = this._m_pColorRGB.ToHexString();
	pRenderContext.fill();
	//pRenderContext.lineWidth = 5;
	//pRenderContext.strokeStyle = '#003300';
	//pRenderContext.stroke();
}

