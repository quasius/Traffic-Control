/*
An "abstract" base class for objects that can appear on a level map in the game area.


METHODS:
LevelObject		Constructor requiring a position.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
GetPos			Returns a copy of the upper-left position of this LevelObject.  (For faster access, just directly read _m_v2dPos but don't write to it.)
SetPos			Sets the upper-left position of this LevelObject to a copy of the passed Vec2D.
GetParentLevel	Returns a read-only pointer of the Level that owns this LevelObject.  Can be null, if it has not been set.
SetParentLevel	Sets the Level that owns this LevelObject.
OnBallCollision		Defines what happens when a Ball reaches the center of this LevelObject.  Default implementation does nothing.
OnClick			Handles a click on this LevelObject.  Default implementation does nothing.
Update			Updates this LevelObject for the passed dDeltaT.  Default implementation does nothing.
CanBallEnter	Returns whether or not the passed Ball can enter this LevelObject's space.  Default implementation just returns true.
Free			Frees this LevelObject's resources.  Base implementation does nothing.

MEMBERS:
_m_nType		The object type from the LevelObjectType enum below
_m_v2dPos		The current position
_m_pParentLevel	A read-only pointer to Level that owns this.  Null until set.

//STATIC MEMBERS:
LevelObjectType enum	Defines the type of LevelObject and any derived classes.


DEPENDENCIES:
Math/Vec2D.js
Math/GameObjects/Ball.js
*/



//Constructor requiring a position.
var LevelObject = function(v2dPos)
{
	this._Construct(v2dPos);
}



//LevelObjectType enum
LevelObject.LEVEL_OBJECT = 0;
LevelObject.ROAD = 1;
LevelObject.LAUNCHER = 2;
LevelObject.ARROW = 3;
LevelObject.SWITCH = 4;
LevelObject.GOAL = 5;
LevelObject.CRACKED_ROAD = 6;
LevelObject.FIRE = 7;


//"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
LevelObject.prototype._Construct = function(v2dPos)
{
	this._m_nType = LevelObject.LEVEL_OBJECT;
	this._m_v2dPos = v2dPos.Copy();
	this._m_pParentLevel = null;
}


//Returns a copy of the upper-left position of this LevelObject.  (For faster access, just directly read _m_v2dPos but don't write to it.)
LevelObject.prototype.GetPos = function()
{
	return this._m_v2dPos.Copy();
}

//Sets the upper-left position of this LevelObject to a copy of the passed Vec2D.
LevelObject.prototype.SetPos = function(v2dPos)
{
	this._m_v2dPos = v2dPos.Copy();
}


//Returns a read-only pointer of the Level that owns this LevelObject.  Can be null, if it has not been set.
LevelObject.prototype.GetParentLevel = function()
{
	return this._m_pParentLevel;
}

//Sets the Level that owns this LevelObject.
LevelObject.prototype.SetParentLevel = function(pLevel)
{
	this._m_pParentLevel = pLevel;
}


//Defines what happens when a Ball reaches the center of this LevelObject.  Default implementation does nothing.
LevelObject.prototype.OnBallCollision = function(pBall)
{}


//Handles a click on this LevelObject at the passed position.  Default implementation does nothing.
LevelObject.prototype.OnClick = function(v2dPos)
{}


//Updates this LevelObject for the passed dDeltaT.  Default implementation does nothing.
LevelObject.prototype.Update = function(dDeltaT)
{}


//Returns whether or not the passed Ball can enter this LevelObject's space.  Default implementation just returns true.
LevelObject.prototype.CanBallEnter = function(pBall)
{
	return true;
}


//Frees this LevelObject's resources.  Base implementation does nothing.
LevelObject.prototype.Free = function()
{}
