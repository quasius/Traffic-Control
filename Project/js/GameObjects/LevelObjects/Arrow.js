/*
A LevelObject-derived class that represents an arrow that changes the direction of a Ball.


METHODS:
Arrow			Constructor requiring a position, starting direction from the GameConstants.Direction enum, and flavor from the GameConstants.Flavor enum.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)

OVERRIDEN METHODS:
SetPos			Sets the upper-left position of this Arrow to a copy of the passed Vec2D.
OnBallCollision		Turns the colliding Ball in this Arrow's direction
Free			Frees this Arrow's resources.  (Removes Renderable from RenderableManager.)

INHERITED METHODS:
GetPos			Returns a copy of the upper-left position of this LevelObject.  (For faster access, just directly read _m_v2dPos but don't write to it.)
GetParentLevel		Returns a read-only pointer of the Level that owns this LevelObject.  Can be null, if it has not been set.
SetParentLevel		Sets the Level that owns this LevelObject.
OnClick			Handles a click on this LevelObject.  Default implementation does nothing.


MEMBERS:
_m_nDirection		The direction the Arrow is facing from the GameConstants.Direction enum
_m_nFlavor			The flavor (red, blue, or purple) of the Arrow from GameConstants.Flavor enum
_m_pSprite			The Sprite for this Arrow

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


//Constructor requiring a position, starting direction from the GameConstants.Direction enum, and flavor from the GameConstants.Flavor enum.
var Arrow = function(v2dPos, nDirection, nFlavor)
{
	//Base class constructor
	LevelObject.prototype._Construct.call(this, v2dPos);
	
	this._Construct(nDirection, nFlavor);
}

//Inherit from LevelObject
Arrow.prototype = new LevelObject(new Vec2D(0, 0));


//"Protected" initializer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
Arrow.prototype._Construct = function(nDirection, nFlavor)
{
	this._m_nType = LevelObject.ARROW;

	//Save class vars
	this._m_nDirection = nDirection;
	this._m_nFlavor = nFlavor;

	
	//Make Sprite and send it to RenderableManager
	if (this._m_nFlavor === GameConstants.RED)
		this._m_pSprite = new Sprite("Textures/Arrow_Red.png", this._m_v2dPos)
	else if (this._m_nFlavor === GameConstants.BLUE)
		this._m_pSprite = new Sprite("Textures/Arrow_Blue.png", this._m_v2dPos)
	else //this._m_nFlavor === GameConstants.PURPLE
		this._m_pSprite = new Sprite("Textures/Arrow_Purple.png", this._m_v2dPos)
	g_pRenderableManager.AddRenderableToLayer(this._m_pSprite, RenderableManager.LEVEL_OBJECTS);
	
	
	//Rotate sprite as needed.  (Unrotated image faces up.)
	if (nDirection == GameConstants.RIGHT)
		this._m_pSprite.SetRotation(GeneralMath.dHalfPi);
	else if (nDirection == GameConstants.DOWN)
		this._m_pSprite.SetRotation(Math.PI);
	else if (nDirection == GameConstants.LEFT)
		this._m_pSprite.SetRotation(Math.PI + GeneralMath.dHalfPi);
}


//Sets the upper-left position of this Arrow to a copy of the passed Vec2D.
Arrow.prototype.SetPos = function(v2dPos)
{
	//Base-class call:
	LevelObject.prototype.SetPos.call(this, v2dPos);

	//Position Sprite
	this._m_pSprite.SetPos(v2dPos);
}


//Turns the colliding Ball in this Arrow's direction
Arrow.prototype.OnBallCollision = function(pBall)
{
	//Return if we don't interact with this
	if ((pBall._m_nFlavor === GameConstants.BLUE && this._m_nFlavor === GameConstants.RED) || (pBall._m_nFlavor === GameConstants.RED && this._m_nFlavor === GameConstants.BLUE))
		return;
		
	pBall.SetDirection(this._m_nDirection);
}


//Frees this Arrow's resources.  (Removes Renderable from RenderableManager.)
Arrow.prototype.Free = function()
{
	g_pRenderableManager.RemoveRenderable(this._m_pSprite);
}
