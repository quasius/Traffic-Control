/*
A LevelObject-derived class that represents a launcher that shoots out balls.


METHODS:
Launcher		Constructor requiring a position, direction, flavor, number of balls, ball speed, launch delay, and launch interval.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
_LaunchBall		Internal function that creates and launches a Ball.

OVERRIDEN METHODS:
SetPos			Sets the upper-left position of this Launcher to a copy of the passed Vec2D.
Update			Updates this LevelObject for the passed dDeltaT.  Default implementation does nothing.
CanBallEnter	Returns whether or not the passed Ball can enter this Launcher's space.  Returns false.  (This does not stop a ball from *starting* in the Launcher's space.)
Free			Frees this Launcher's resources.  (Removes Renderable from RenderableManager.)

INHERITED METHODS:
GetPos			Returns a copy of the upper-left position of this LevelObject.  (For faster access, just directly read _m_v2dPos but don't write to it.)
GetParentLevel		Returns a read-only pointer of the Level that owns this LevelObject.  Can be null, if it has not been set.
SetParentLevel		Sets the Level that owns this LevelObject.
OnBallCollision		Defines what happens when a Ball reaches the center of this LevelObject.  Default implementation does nothing.
OnClick			Handles a click on this LevelObject.  Default implementation does nothing.


MEMBERS:
_m_nDirection		The direction the launcher is facing from the GameConstants.Direction enum
_m_nFlavor			The flavor (red or blue) or the launcher from GameConstants.Flavor enum
_m_dFirstLaunchDelay		How long before the first ball is launched.
_m_dLaunchInterval			How long between launches after the first.
_m_dBallSpeed			How fast balls launched from this move.
_m_nNumBallsTotal		How many total balls this will launch.
_m_nNumBallsLeft		How many balls still need to launch.
_m_pSprite			The Sprite for this Launcher
_m_dLaunchTimer			The launch timer.  Resets after each launch.

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


//Constructor requiring a position, direction, flavor, number of balls, ball speed, launch delay, and launch interval.
var Launcher = function(v2dPos, nDirection, nFlavor, nNumBalls, dBallSpeed, dLaunchDelay, dLaunchInterval)
{
	//Base class constructor
	LevelObject.prototype._Construct.call(this, v2dPos);
	
	this._Construct(nDirection, nFlavor, nNumBalls, dBallSpeed, dLaunchDelay, dLaunchInterval);
}

//Inherit from LevelObject
Launcher.prototype = new LevelObject(new Vec2D(0, 0));



//"Protected" initializer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
Launcher.prototype._Construct = function(nDirection, nFlavor, nNumBalls, dBallSpeed, dLaunchDelay, dLaunchInterval)
{
	this._m_nType = LevelObject.LAUNCHER;

	//Save class vars
	this._m_nDirection = nDirection;
	this._m_nFlavor = nFlavor;
	this._m_nNumBallsTotal = nNumBalls;
	this._m_dBallSpeed = dBallSpeed;
	this._m_dFirstLaunchDelay = dLaunchDelay;
	this._m_dLaunchInterval = dLaunchInterval;
	
	//Make Sprite and send it to RenderableManager
	if (this._m_nFlavor === GameConstants.RED)
		this._m_pSprite = new Sprite("Textures/Launcher_Red.png", this._m_v2dPos)
	else //this._m_nFlavor === GameConstants.BLUE
		this._m_pSprite = new Sprite("Textures/Launcher_Blue.png", this._m_v2dPos)
	g_pRenderableManager.AddRenderableToLayer(this._m_pSprite, RenderableManager.LEVEL_OBJECTS);
	
	
	//Rotate sprite as needed.  (Unrotated image faces up.)
	if (nDirection == GameConstants.RIGHT)
		this._m_pSprite.SetRotation(GeneralMath.dHalfPi);
	else if (nDirection == GameConstants.DOWN)
		this._m_pSprite.SetRotation(Math.PI);
	else if (nDirection == GameConstants.LEFT)
		this._m_pSprite.SetRotation(Math.PI + GeneralMath.dHalfPi);

	
	//Init other class vars
	this._m_nNumBallsLeft = this._m_nNumBallsTotal;
	this._m_dLaunchTimer = 0.0
}


//Internal function that creates and launches a Ball.
Launcher.prototype._LaunchBall = function()
{
	//Find new ball position
	//var v2dBallPos = this._m_v2dPos.Add(Ball._v2dHalfBallSize);
	var v2dBallPos = this._m_v2dPos.Add(GameConstants.v2dHalfLevelCellSize).Sub(Ball._v2dHalfBallSize);
	
	//Make the new ball
	var pNewBall = new Ball(v2dBallPos, this._m_nFlavor, this._m_dBallSpeed, this._m_nDirection);
	
	//Add it to the LevelManager
	g_pLevelManager.AddBallToLevel(pNewBall);
	
	//Ball launched
	this._m_nNumBallsLeft--;
}

//Sets the upper-left position of this Launcher to a copy of the passed Vec2D.
Launcher.prototype.SetPos = function(v2dPos)
{
	//Base-class call:
	LevelObject.prototype.SetPos.call(this, v2dPos);

	//Position Sprite
	this._m_pSprite.SetPos(v2dPos);
}


//Updates this LevelObject for the passed dDeltaT.  Default implementation does nothing.
Launcher.prototype.Update = function(dDeltaT)
{
	this._m_dLaunchTimer += dDeltaT;
	
	//Just return if all Balls have been launched
	if (this._m_nNumBallsLeft === 0)
		return;
	
	
	//If we are waiting for first launch
	if (this._m_nNumBallsTotal === this._m_nNumBallsLeft)
	{
		if (this._m_dLaunchTimer >= this._m_dFirstLaunchDelay)
		{
			this._LaunchBall();
			this._m_dLaunchTimer = 0.0;
		}
		
		return;
	}
	
	//Else we are waiting for a later launch
	if (this._m_dLaunchTimer >= this._m_dLaunchInterval)
	{
		this._LaunchBall();
		this._m_dLaunchTimer = 0.0;
	}
}


//Returns whether or not the passed Ball can enter this Launcher's space.  Returns false.  (This does not stop a ball from *starting* in the Launcher's space.)
Launcher.prototype.CanBallEnter = function()
{
	return false;
}


//Frees this Launcher's resources.  (Removes Renderable from RenderableManager.)
Launcher.prototype.Free = function()
{
	g_pRenderableManager.RemoveRenderable(this._m_pSprite);
}
