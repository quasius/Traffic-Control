/*
A LevelObject-derived class that represents the base-level roads that the balls can move on.


METHODS:
Road			Constructor requiring a position.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)

OVERRIDEN METHODS:
SetPos			Sets the upper-left position of this Road to a copy of the passed Vec2D.
Free			Frees this Road's resources.  (Removes Renderable from RenderableManager.)

INHERITED METHODS:
GetPos				Returns a copy of the upper-left position of this LevelObject.  (For faster access, just directly read _m_v2dPos but don't write to it.)
GetParentLevel		Returns a read-only pointer of the Level that owns this LevelObject.  Can be null, if it has not been set.
SetParentLevel		Sets the Level that owns this LevelObject.
OnBallCollision		Defines what happens when a Ball reaches the center of this LevelObject.  Default implementation does nothing.
OnClick			Handles a click on this LevelObject.  Default implementation does nothing.
Update			Updates this LevelObject for the passed dDeltaT.  Default implementation does nothing.
CanBallEnter	Returns whether or not the passed Ball can enter this LevelObject's space.  Default implementation just returns true.


MEMBERS:
_m_pRectangleShape	The grey RectangleShape for this Road

INHERITED MEMBERS:
_m_nType		The object type from the LevelObjectType enum below
_m_v2dPos		The current position
_m_pParentLevel		A read-only pointer to the Level that owns this.  Null until set.


DEPENDENCIES:
Math/Vec2D.js
Rendering/ColorRGB.js
Rendering/RectangleShape.js
Rendering/RenderableManager.js
GameManagement/GameConstants.js
GameObjects/LevelObjects/LevelObject.js
*/


//Constructor requiring a position.
var Road = function(v2dPos)
{
	//Base class constructor
	LevelObject.prototype._Construct.call(this, v2dPos);
	
	this._Construct()
}

//Inherit from LevelObject
Road.prototype = new LevelObject(new Vec2D(0, 0));


//"Protected" initializer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
Road.prototype._Construct = function()
{
	this._m_nType = LevelObject.ROAD;
		
	//Make road rectangle and pass to RenderableManager
	this._m_pRectangleShape = new RectangleShape(this._m_v2dPos, GameConstants.v2dLevelCellSize, new ColorRGB(192, 192, 192));
	g_pRenderableManager.AddRenderableToLayer(this._m_pRectangleShape, RenderableManager.LEVEL_OBJECTS);
}


//Sets the upper-left position of this Road to a copy of the passed Vec2D.
Road.prototype.SetPos = function(v2dPos)
{
	//Base-class call:
	LevelObject.prototype.SetPos.call(this, v2dPos);

	
	//Position RectangleShape
	this._m_pRectangleShape.SetPos(v2dPos);
}


//Frees this Road's resources.  (Removes Renderable from RenderableManager.)
Road.prototype.Free = function()
{
	g_pRenderableManager.RemoveRenderable(this._m_pRectangleShape);
}
