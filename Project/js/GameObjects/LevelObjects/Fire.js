/*
A LevelObject-derived class that represents the a flickering fire that causes a game-over if a ball rolls over it.


METHODS:
Fire		Constructor requiring a position, on duration, an off duration, and an optional initial time offset.  (Initial time offset can be negative to stay on longer initially.)
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)

OVERRIDEN METHODS:
SetPos			Sets the upper-left position of this CrackedRoad to a copy of the passed Vec2D.
OnBallCollision		Defines what happens when a Ball reaches the center of this Fire.  Fails the level if fire is currently on.
Update			Updates this Fire for the passed dDeltaT.  Handles flickering.
Free			Frees this CrackedRoad's resources.  (Removes Renderables from RenderableManager.)

INHERITED METHODS:
GetPos				Returns a copy of the upper-left position of this LevelObject.  (For faster access, just directly read _m_v2dPos but don't write to it.)
GetParentLevel		Returns a read-only pointer of the Level that owns this LevelObject.  Can be null, if it has not been set.
SetParentLevel		Sets the Level that owns this LevelObject.
OnClick			Handles a click on this LevelObject.  Default implementation does nothing.
CanBallEnter	Returns whether or not the passed Ball can enter this LevelObject's space.  Default implementation just returns true.


MEMBERS:
_m_pPOnSprite		The Sprite for this Fire while on
_m_pOffRectangleShape	The shape for the Fire when off.  (Same as empty road.)
_m_bOn				Whether or not this Fire is currently on.
_m_dFlickerTimer	The timer used for timing both the on and off states
_m_dOnDuration		How long this Fire stays on
_m_dOffDuration		How long this Fire stays off

INHERITED MEMBERS:
_m_nType		The object type from the LevelObjectType enum below
_m_v2dPos		The current position
_m_pParentLevel		A read-only pointer to the Level that owns this.  Null until set.


DEPENDENCIES:
Math/Vec2D.js
Rendering/ColorRGB.js
Rendering/Sprite.js
Rendering/RectangleShape.js
Rendering/RenderableManager.js
GameManagement/GameConstants.js
GameObjects/LevelObjects/LevelObject.js
*/


//Constructor requiring a position, on duration, and an optional initial time offset.  (Initial time offset can be negative to stay on longer initially.)
var Fire = function(v2dPos, dOnDuration, dOffDuration, dInitialTimeOffset)
{
	//Base class constructor
	LevelObject.prototype._Construct.call(this, v2dPos);
	
	this._Construct(dOnDuration, dOffDuration, dInitialTimeOffset)
}

//Inherit from LevelObject
Fire.prototype = new LevelObject(new Vec2D(0, 0));



//"Protected" initializer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
Fire.prototype._Construct = function(dOnDuration, dOffDuration, dInitialTimeOffset)
{
	//Set type
	this._m_nType = LevelObject.FIRE;
	
	//Save class vars
	this._m_dOnDuration = dOnDuration;
	this._m_dOffDuration = dOffDuration;
	
	//Init other class vars
	this._m_bOn = true;

	//Init timer.  (With initial time offset, if defined)
	if (dInitialTimeOffset !== undefined && dInitialTimeOffset <= dOnDuration)
		this._m_dFlickerTimer = dInitialTimeOffset;
	else
		this._m_dFlickerTimer = 0.0;

	
	//Make on Sprite and send it to RenderableManager
	this._m_pPOnSprite = new Sprite("Textures/Fire.png", this._m_v2dPos)
	g_pRenderableManager.AddRenderableToLayer(this._m_pPOnSprite, RenderableManager.LEVEL_OBJECTS);
	
	//Make off RectangleShape and send it to the RenderableManager
	this._m_pOffRectangleShape = new RectangleShape(this._m_v2dPos, GameConstants.v2dLevelCellSize, new ColorRGB(192, 192, 192));
	g_pRenderableManager.AddRenderableToLayer(this._m_pOffRectangleShape, RenderableManager.LEVEL_OBJECTS);
	
	//Fire starts on, so hide off shape
	this._m_pOffRectangleShape.SetVisible(false);	
}


//Sets the upper-left position of this Fire to a copy of the passed Vec2D.
Fire.prototype.SetPos = function(v2dPos)
{
	//Base-class call:
	LevelObject.prototype.SetPos.call(this, v2dPos);

	
	//Position Sprite and RectangleShape
	this._m_pPOnSprite.SetPos(v2dPos);
	this._m_pOffRectangleShape.SetPos(v2dPos);
}


//Defines what happens when a Ball reaches the center of this Fire.  Fails the level if fire is currently on.
Fire.prototype.OnBallCollision = function()
{
	//If it's on, fail the level
	if (this._m_bOn)
		g_pGameManager.OnLevelFailed();
}


//Updates this Fire for the passed dDeltaT.  Handles flickering.
Fire.prototype.Update = function(dDeltaT)
{
	//Do nothing if both on and off durations are near 0 to prevent infinite recursion
	if (this._m_dOffDuration < 0.1 && this._m_dOnDuration < 0.1)
		return;
		
	this._m_dFlickerTimer += dDeltaT;
	
	
	//See if we've switched between on/off
	if ((this._m_bOn && this._m_dFlickerTimer >= this._m_dOnDuration) || (!this._m_bOn && this._m_dFlickerTimer >= this._m_dOffDuration))
	{
		//Toggle _m_bOn and sprites
		this._m_bOn = !this._m_bOn;	
		this._m_pPOnSprite.SetVisible(this._m_bOn);
		this._m_pOffRectangleShape.SetVisible(!this._m_bOn);

		//See if we exceeded the entire time for the next state.  (For example, off duration is 0)
		if (this._m_bOn)
		{
			//Either re-update in the toggled state if we exceeded its duration, of just add the leftover time to the timer.
			var dLeftOverTime = this._m_dFlickerTimer - this._m_dOffDuration
			if (dLeftOverTime > this._m_dOnDuration)
			{
				this._m_dFlickerTimer = 0.0
				this.Update(dLeftOverTime)
			}
			else
				this._m_dFlickerTimer = dLeftOverTime
		}
		else
		{
			//Either re-update in the toggled state if we exceeded its duration, of just add the leftover time to the timer.
			var dLeftOverTime = this._m_dFlickerTimer - this._m_dOnDuration
			if (dLeftOverTime > this._m_dOffDuration)
			{
				this._m_dFlickerTimer = 0.0
				this.Update(dLeftOverTime)
			}
			else
				this._m_dFlickerTimer = dLeftOverTime
		}
	}
}


//Frees this Fire's resources.  (Removes Renderables from RenderableManager.)
Fire.prototype.Free = function()
{
	g_pRenderableManager.RemoveRenderable(this._m_pPOnSprite);
	g_pRenderableManager.RemoveRenderable(this._m_pOffRectangleShape);
}
