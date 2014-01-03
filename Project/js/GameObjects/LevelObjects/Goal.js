/*
A LevelObject-derived class that represents an goal where Balls go to win a level.  Ball and goal flavor must match.


METHODS:
Goal			Constructor requiring a position and flavor from the GameConstants.Flavor enum.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)

OVERRIDEN METHODS:
SetPos			Sets the upper-left position of this Goal to a copy of the passed Vec2D.
OnBallCollision		Removes the colliding Ball and completes level if it was the last.
Free			Frees this Goal's resources.  (Removes Renderable from RenderableManager.)

INHERITED METHODS:
GetPos			Returns a copy of the upper-left position of this LevelObject.  (For faster access, just directly read _m_v2dPos but don't write to it.)
GetParentLevel		Returns a read-only pointer of the Level that owns this LevelObject.  Can be null, if it has not been set.
SetParentLevel		Sets the Level that owns this LevelObject.
OnClick			Handles a click on this LevelObject.  Default implementation does nothing.


MEMBERS:
_m_nFlavor			The flavor (red, blue, or purple) of the Goal from GameConstants.Flavor enum
_m_pSprite			The Sprite for this Goal

INHERITED MEMBERS:
_m_nType		The object type from the LevelObjectType enum below
_m_v2dPos		The current position
_m_pParentLevel		A read-only pointer to the Level that owns this.  Null until set.


DEPENDENCIES:
Math/Vec2D.js
Rendering/Sprite.js
Rendering/RenderableManager.js
GameObjects/LevelObjects/LevelObject.js
GameObjects/Ball.js
*/


//Constructor requiring a position and flavor from the GameConstants.Flavor enum.
var Goal = function(v2dPos, nFlavor)
{
	//Base class constructor
	LevelObject.prototype._Construct.call(this, v2dPos);
	
	this._Construct(nFlavor);
}

//Inherit from LevelObject
Goal.prototype = new LevelObject(new Vec2D(0, 0));


//"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
Goal.prototype._Construct = function(nFlavor)
{
	this._m_nType = LevelObject.GOAL;

	//Save class vars
	this._m_nFlavor = nFlavor;

	
	//Make Sprite and send it to RenderableManager
	if (this._m_nFlavor === GameConstants.RED)
		this._m_pSprite = new Sprite("Textures/Goal_Red.png", this._m_v2dPos)
	else if (this._m_nFlavor === GameConstants.BLUE)
		this._m_pSprite = new Sprite("Textures/Goal_Blue.png", this._m_v2dPos)
	else //this._m_nFlavor === GameConstants.PURPLE
		this._m_pSprite = new Sprite("Textures/Goal_Purple.png", this._m_v2dPos)
	g_pRenderableManager.AddRenderableToLayer(this._m_pSprite, RenderableManager.LEVEL_OBJECTS);
}


//Sets the upper-left position of this Goal to a copy of the passed Vec2D.
Goal.prototype.SetPos = function(v2dPos)
{
	//Base-class call:
	LevelObject.prototype.SetPos.call(this, v2dPos);

	//Position Sprite
	this._m_pSprite.SetPos(v2dPos);
}


//Removes the colliding Ball and completes level if it was the last.
Goal.prototype.OnBallCollision = function(pBall)
{
	//Return if we don't interact with this
	if ((pBall._m_nFlavor === GameConstants.BLUE && this._m_nFlavor === GameConstants.RED) || (pBall._m_nFlavor === GameConstants.RED && this._m_nFlavor === GameConstants.BLUE))
		return;

	//Have LevelManager remove Ball
	g_pLevelManager.RemoveBallFromLevel(pBall);
}


//Frees this Goal's resources.  (Removes Renderable from RenderableManager.)
Goal.prototype.Free = function()
{
	g_pRenderableManager.RemoveRenderable(this._m_pSprite);
}
