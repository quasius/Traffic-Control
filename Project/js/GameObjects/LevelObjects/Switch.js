/*
A LevelObject-derived class that represents a clickable switch that can cause an arrow button to toggle left/right or up/down.


METHODS:
Switch			Constructor requiring a position, configuration from the Configuration enum below, starting direction from the GameConstants.Direction enum, and flavor from the GameConstants.Flavor enum.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
SetDirection	Sets this Switch to the passed direction from the GameConstants.Direction enum

OVERRIDEN METHODS:
SetPos			Sets the upper-left position of this Switch to a copy of the passed Vec2D.
OnBallCollision		Turns the colliding Ball in this Switch's direction
OnClick			Handles a click on this Switch.  Flips direction.
Free			Frees this Switch's resources.  (Removes Renderable from RenderableManager.)

INHERITED METHODS:
GetPos			Returns a copy of the upper-left position of this LevelObject.  (For faster access, just directly read _m_v2dPos but don't write to it.)
GetParentLevel		Returns a read-only pointer of the Level that owns this LevelObject.  Can be null, if it has not been set.
SetParentLevel		Sets the Level that owns this LevelObject.


MEMBERS:
_m_nCurrentDirection	The direction the Switch is currently facing from the GameConstants.Direction enum
_m_nFlavor			The flavor (red, blue, or purple) of the Switch from GameConstants.Flavor enum
_m_nConfiguration	The configuration (2-way or 4-way) from the Configuration enum below
_m_pSprite			The Sprite for this Switch

INHERITED MEMBERS:
_m_nType		The object type from the LevelObjectType enum below
_m_v2dPos		The current position
_m_pParentLevel		A read-only pointer to the Level that owns this.  Null until set.

STATIC MEMBERS:
Configuration enum

DEPENDENCIES:
Math/Vec2D.js
Rendering/Sprite.js
Rendering/RenderableManager.js
GameObjects/LevelObjects/LevelObject.js
GameObjects/Ball.js
*/


//Constructor requiring a position, configuration from the Configuration enum below, starting direction from the GameConstants.Direction enum, and flavor from the GameConstants.Flavor enum.
var Switch = function(v2dPos, nConfiguration, nStartingDirection, nFlavor)
{
	//Base class constructor
	LevelObject.prototype._Construct.call(this, v2dPos);
	
	this._Construct(nConfiguration, nStartingDirection, nFlavor);
}

//Inherit from LevelObject
Switch.prototype = new LevelObject(new Vec2D(0, 0));


//Configuration enum
Switch.TWO_WAY = 1	//Switch can be set to up/down or left/right
Switch.FOUR_WAY = 2	//Switch can be set to any direction
Switch.CORNER_UP_RIGHT = 3	//Switch can be up or right
Switch.CORNER_RIGHT_DOWN = 4 //Switch can be right or down
Switch.CORNER_DOWN_LEFT = 5 //Switch can be down or left
Switch.CORNER_LEFT_UP = 6 //Switch can be left or up


//"Protected" initializer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
Switch.prototype._Construct = function(nConfiguration, nStartingDirection, nFlavor)
{
	this._m_nType = LevelObject.SWITCH;

	//Save class vars
	this._m_nConfiguration = nConfiguration;
	this._m_nFlavor = nFlavor;

	
	//Make Sprite and send it to RenderableManager
	if (this._m_nConfiguration === Switch.TWO_WAY)
	{
		if (this._m_nFlavor === GameConstants.RED)
			this._m_pSprite = new Sprite("Textures/Switch_2Way_Red.png", this._m_v2dPos)
		else if (this._m_nFlavor === GameConstants.BLUE)
			this._m_pSprite = new Sprite("Textures/Switch_2Way_Blue.png", this._m_v2dPos)
		else //this._m_nFlavor === GameConstants.PURPLE
			this._m_pSprite = new Sprite("Textures/Switch_2Way_Purple.png", this._m_v2dPos)
	}
	else if (this._m_nConfiguration === Switch.FOUR_WAY)
	{
		if (this._m_nFlavor === GameConstants.RED)
			this._m_pSprite = new Sprite("Textures/Switch_4Way_Red.png", this._m_v2dPos)
		else if (this._m_nFlavor === GameConstants.BLUE)
			this._m_pSprite = new Sprite("Textures/Switch_4Way_Blue.png", this._m_v2dPos)
		else //this._m_nFlavor === GameConstants.PURPLE
			this._m_pSprite = new Sprite("Textures/Switch_4Way_Purple.png", this._m_v2dPos)
	}
	else //One of the 4 corners
	{
		if (this._m_nFlavor === GameConstants.RED)
			this._m_pSprite = new Sprite("Textures/Switch_Corner_Red.png", this._m_v2dPos)
		else if (this._m_nFlavor === GameConstants.BLUE)
			this._m_pSprite = new Sprite("Textures/Switch_Corner_Blue.png", this._m_v2dPos)
		else //this._m_nFlavor === GameConstants.PURPLE
			this._m_pSprite = new Sprite("Textures/Switch_Corner_Purple.png", this._m_v2dPos)
	}
	g_pRenderableManager.AddRenderableToLayer(this._m_pSprite, RenderableManager.LEVEL_OBJECTS);
	
	
	//Set direction
	this.SetDirection(nStartingDirection);
}


//Sets this Switch to the passed direction from the GameConstants.Direction enum
//TODO:  This should be done with seperate images and not scale flips since that apparently can drastically reduce performance.
Switch.prototype.SetDirection = function(nDirection)
{
	this._m_nCurrentDirection = nDirection;
	
	
	//Rotate sprite as needed.  (Unrotated image faces up.)
	if (this._m_nConfiguration === Switch.TWO_WAY || this._m_nConfiguration === Switch.FOUR_WAY)
	{
		if (nDirection === GameConstants.UP)
			this._m_pSprite.SetRotation(0.0);
		else if (nDirection === GameConstants.RIGHT)
			this._m_pSprite.SetRotation(GeneralMath.dHalfPi);
		else if (nDirection === GameConstants.DOWN)
			this._m_pSprite.SetRotation(Math.PI);
		else if (nDirection === GameConstants.LEFT)
			this._m_pSprite.SetRotation(Math.PI + GeneralMath.dHalfPi);
	}
	else if (this._m_nConfiguration === Switch.CORNER_UP_RIGHT)
	{
		if (nDirection === GameConstants.UP)
		{
			this._m_pSprite.SetRotation(0.0);
			this._m_pSprite.SetScale(new Vec2D(1.0, 1.0));
		}
		else if (nDirection === GameConstants.RIGHT)
		{
			this._m_pSprite.SetRotation(GeneralMath.dHalfPi);
			this._m_pSprite.SetScale(new Vec2D(1.0, -1.0));
		}
	}
	else if (this._m_nConfiguration === Switch.CORNER_RIGHT_DOWN)
	{
		if (nDirection === GameConstants.RIGHT)
		{
			this._m_pSprite.SetRotation(GeneralMath.dHalfPi);
			this._m_pSprite.SetScale(new Vec2D(1.0, 1.0));
		}
		else if (nDirection === GameConstants.DOWN)
		{
			this._m_pSprite.SetRotation(0.0);
			this._m_pSprite.SetScale(new Vec2D(1.0, -1.0));
		}
	}
	else if (this._m_nConfiguration === Switch.CORNER_DOWN_LEFT)
	{
		if (nDirection === GameConstants.DOWN)
		{
			this._m_pSprite.SetRotation(Math.PI);
			this._m_pSprite.SetScale(new Vec2D(1.0, 1.0));
		}
		else if (nDirection === GameConstants.LEFT)
		{
			this._m_pSprite.SetRotation(GeneralMath.dHalfPi);
			this._m_pSprite.SetScale(new Vec2D(-1.0, 1.0));
		}
	}
	else if (this._m_nConfiguration === Switch.CORNER_LEFT_UP)
	{
		if (nDirection === GameConstants.LEFT)
		{
			this._m_pSprite.SetRotation(Math.PI + GeneralMath.dHalfPi);
			this._m_pSprite.SetScale(new Vec2D(1.0, 1.0));
		}
		else if (nDirection === GameConstants.UP)
		{
			this._m_pSprite.SetRotation(0.0);
			this._m_pSprite.SetScale(new Vec2D(-1.0, 1.0));
		}
	}
	else
	{
		if (DEBUG)
			DebugFunctions.Assert(false, "Switch.SetDirection: Unexpected configuration");
	}
}


//Sets the upper-left position of this Switch to a copy of the passed Vec2D.
Switch.prototype.SetPos = function(v2dPos)
{
	//Base-class call:
	LevelObject.prototype.SetPos.call(this, v2dPos);

	//Position Sprite
	this._m_pSprite.SetPos(v2dPos);
}


//Turns the colliding Ball in this Switch's direction
Switch.prototype.OnBallCollision = function(pBall)
{
	//Return if we don't interact with this
	if ((pBall._m_nFlavor === GameConstants.BLUE && this._m_nFlavor === GameConstants.RED) || (pBall._m_nFlavor === GameConstants.RED && this._m_nFlavor === GameConstants.BLUE))
		return;
		
	pBall.SetDirection(this._m_nCurrentDirection);
}


//Handles a click on this Switch.  Flips direction.
Switch.prototype.OnClick = function()
{
	if (this._m_nConfiguration === Switch.TWO_WAY)
	{
		if (this._m_nCurrentDirection === GameConstants.UP)
			this.SetDirection(GameConstants.DOWN);
		else if (this._m_nCurrentDirection === GameConstants.DOWN)
			this.SetDirection(GameConstants.UP);
		else if (this._m_nCurrentDirection === GameConstants.LEFT)
			this.SetDirection(GameConstants.RIGHT);
		else // (this._m_nCurrentDirection === GameConstants.RIGHT)
			this.SetDirection(GameConstants.LEFT);
	}
	else if (this._m_nConfiguration === Switch.FOUR_WAY)
	{
		if (this._m_nCurrentDirection === GameConstants.UP)
			this.SetDirection(GameConstants.RIGHT);
		else if (this._m_nCurrentDirection === GameConstants.RIGHT)
			this.SetDirection(GameConstants.DOWN);
		else if (this._m_nCurrentDirection === GameConstants.DOWN)
			this.SetDirection(GameConstants.LEFT);
		else // (this._m_nCurrentDirection === GameConstants.LEFT)
			this.SetDirection(GameConstants.UP);
	}
	else if (this._m_nConfiguration === Switch.CORNER_UP_RIGHT)
	{
		if (this._m_nCurrentDirection === GameConstants.UP)
			this.SetDirection(GameConstants.RIGHT);
		else if (this._m_nCurrentDirection === GameConstants.RIGHT)
			this.SetDirection(GameConstants.UP);
	}
	else if (this._m_nConfiguration === Switch.CORNER_RIGHT_DOWN)
	{
		if (this._m_nCurrentDirection === GameConstants.RIGHT)
			this.SetDirection(GameConstants.DOWN);
		else if (this._m_nCurrentDirection === GameConstants.DOWN)
			this.SetDirection(GameConstants.RIGHT);
	}
	else if (this._m_nConfiguration === Switch.CORNER_DOWN_LEFT)
	{
		if (this._m_nCurrentDirection === GameConstants.DOWN)
			this.SetDirection(GameConstants.LEFT);
		else if (this._m_nCurrentDirection === GameConstants.LEFT)
			this.SetDirection(GameConstants.DOWN);
	}
	else if (this._m_nConfiguration === Switch.CORNER_LEFT_UP)
	{
		if (this._m_nCurrentDirection === GameConstants.LEFT)
			this.SetDirection(GameConstants.UP);
		else if (this._m_nCurrentDirection === GameConstants.UP)
			this.SetDirection(GameConstants.LEFT);
	}
	else
	{
		if (DEBUG)
			DebugFunctions.Assert(false, "Switch.OnClick: Unexpected configuration");
	}
}

//Frees this Switch's resources.  (Removes Renderable from RenderableManager.)
Switch.prototype.Free = function()
{
	g_pRenderableManager.RemoveRenderable(this._m_pSprite);
}
