/*
An "abstract" base class for various renderable objects.


METHODS:
Renderable		Constructor requiring a position.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
GetPos			Returns a copy of the upper-left position of this Renderable.  (For faster access, just directly read _m_v2dPos but don't write to it.)
SetPos			Sets the upper-left position of this Renderable to a copy of the passed Vec2D.
SetVisible		Sets whether or not this is visible to the passed value.
Render			Renders this Renderable to the passed render context at its current position.  Default implementation does nothing.

MEMBERS:
_m_nType		The object type from the RenderableType enum below
_m_v2dPos		The current position
_m_bVisible		Whether or not this Renderable is currently visible.  Derived classes with overridden Render methods must respect this variable.


DEPENDENCIES:
Math/Vec2D.js
*/



//Constructor requiring a position.
var Renderable = function(v2dPos)
{
	this._Construct(v2dPos);
}



//RenderableType enum
Renderable.RENDERABLE = 0;
Renderable.SPRITE = 1;
Renderable.RECTANGLE_SHAPE = 2;
Renderable.CIRCLE_SHAPE = 3;
Renderable.TEXT = 4;


//"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
Renderable.prototype._Construct = function(v2dPos)
{
	this._m_nType = Renderable.RENDERABLE;
	this._m_v2dPos = v2dPos.Copy();
	this._m_bVisible = true;
}


//Returns a copy of the upper-left position of this Renderable.  (For faster access, just directly read _m_v2dPos but don't write to it.)
Renderable.prototype.GetPos = function()
{
	return this._m_v2dPos.Copy();
}

//Sets the upper-left position of this Renderable to a copy of the passed Vec2D.
Renderable.prototype.SetPos = function(v2dPos)
{
	this._m_v2dPos = v2dPos.Copy();
}


//Sets whether or not this is visible to the passed value.
Renderable.prototype.SetVisible = function(bVisible)
{
	this._m_bVisible = bVisible;
}


//Renders this Renderable to the passed render context at its current position.  Default implementation does nothing.
Renderable.prototype.Render = function(pRenderContext)
{}
