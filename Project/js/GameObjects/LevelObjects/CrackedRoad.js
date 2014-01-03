/*
A LevelObject-derived class that represents the a cracked road that breaks after a ball rolls over it.


METHODS:
CrackedRoad		Constructor requiring a position.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)

OVERRIDEN METHODS:
SetPos			Sets the upper-left position of this CrackedRoad to a copy of the passed Vec2D.
OnBallCollision		Defines what happens when a Ball reaches the center of this CrackedRoad.  Breaks the road if unbroken or fails the level if already broken.
Update			Updates this CrackedRoad for the passed dDeltaT.  Handles breaking.
Free			Frees this CrackedRoad's resources.  (Removes Renderable from RenderableManager.)

INHERITED METHODS:
GetPos				Returns a copy of the upper-left position of this LevelObject.  (For faster access, just directly read _m_v2dPos but don't write to it.)
GetParentLevel		Returns a read-only pointer of the Level that owns this LevelObject.  Can be null, if it has not been set.
SetParentLevel		Sets the Level that owns this LevelObject.
OnClick			Handles a click on this LevelObject.  Default implementation does nothing.
CanBallEnter	Returns whether or not the passed Ball can enter this LevelObject's space.  Default implementation just returns true.


MEMBERS:
_m_pSprite		The Sprite for this CrackedRoad
_m_nBreakState	The current state of this CrackedRoad from the BreakState enum below.
_m_dBreakingTimer	The timer for the BREAKING state

INHERITED MEMBERS:
_m_nType		The object type from the LevelObjectType enum below
_m_v2dPos		The current position
_m_pParentLevel		A read-only pointer to the Level that owns this.  Null until set.

STATIC MEMBERS:
BreakState enum		Defines states of broken-ness for CrackedRoads
_BreakingStateDuration		How long the BREAKING state lasts.


DEPENDENCIES:
Math/Vec2D.js
Rendering/ColorRGB.js
Rendering/Sprite.js
Rendering/RenderableManager.js
GameManagement/GameConstants.js
GameObjects/LevelObjects/LevelObject.js
*/


//Constructor requiring a position.
var CrackedRoad = function(v2dPos)
{
	//Base class constructor
	LevelObject.prototype._Construct.call(this, v2dPos);
	
	this._Construct()
}

//Inherit from LevelObject
CrackedRoad.prototype = new LevelObject(new Vec2D(0, 0));


//STATIC MEMBERS

//BreakState enum
CrackedRoad.UNBROKEN = 0;	//This CrackedRoad has not been run over yet
CrackedRoad.BREAKING = 1;	//This CrackedRoad has been run over and is "broken" but not graphically removed yet
CrackedRoad.BROKEN = 2;		//This CrackedRoad is broken and the Sprite is no longer rendered

CrackedRoad._BreakingStateDuration = 0.5;


//"Protected" initializer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
CrackedRoad.prototype._Construct = function()
{
	this._m_nType = LevelObject.CRACKED_ROAD;
	
	//Init class vars
	this._m_nBreakState = CrackedRoad.UNBROKEN;
	this._m_dBreakingTimer = 0.0;
	
	//Make Sprite and send it to RenderableManager
	this._m_pSprite = new Sprite("Textures/CrackedRoad.png", this._m_v2dPos)
	g_pRenderableManager.AddRenderableToLayer(this._m_pSprite, RenderableManager.LEVEL_OBJECTS);
}


//Sets the upper-left position of this CrackedRoad to a copy of the passed Vec2D.
CrackedRoad.prototype.SetPos = function(v2dPos)
{
	//Base-class call:
	LevelObject.prototype.SetPos.call(this, v2dPos);

	
	//Position Sprite
	this._m_pSprite.SetPos(v2dPos);
}


//Defines what happens when a Ball reaches the center of this CrackedRoad.  Breaks the road if unbroken or fails the level if already broken.
CrackedRoad.prototype.OnBallCollision = function()
{
	//If it's unbroken, set this CrackedRoad to start breaking
	if (this._m_nBreakState == CrackedRoad.UNBROKEN)
	{
		this._m_nBreakState = CrackedRoad.BREAKING;
		this._m_dBreakingTimer = 0.0;
	}
	//Else, game over
	else
		g_pGameManager.OnLevelFailed();
}


//Updates this CrackedRoad for the passed dDeltaT.  Handles breaking.
CrackedRoad.prototype.Update = function(dDeltaT)
{
	if (this._m_nBreakState == CrackedRoad.BREAKING)
	{
		this._m_dBreakingTimer += dDeltaT;
		if (this._m_dBreakingTimer >= CrackedRoad._BreakingStateDuration)
		{
			this._m_pSprite.SetVisible(false);
			this._m_nBreakState = CrackedRoad.BROKEN;
		}
	}
}


//Frees this CrackedRoad's resources.  (Removes Renderable from RenderableManager.)
CrackedRoad.prototype.Free = function()
{
	g_pRenderableManager.RemoveRenderable(this._m_pSprite);
}
