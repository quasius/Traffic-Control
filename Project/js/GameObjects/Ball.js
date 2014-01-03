/*
A class representing a ball that moves around the level from launcher to goal.


METHODS:
Ball			Constructor requiring a position, flavor from the Flavor enum below, speed, and starting direction from the Direction enum below.
Update			Updates this Ball with the passed dDeltaT.
GetPos			Returns a copy of the upper-left position of this Ball.  (For faster access, just directly read _m_v2dPos but don't write to it.)
SetPos			Sets the upper-left position of this Ball to a copy of the passed Vec2D.
SetDirection	Sets the current direction of this Ball.
MoveInCurrentDirection	Moves this ball the passed amount in its current direction.
Free			Frees this Ball's resources.  (The CircleShape)


MEMBERS:
_m_v2dPos			The current position of the Ball
_m_nFlavor			The flavor of this Ball from the GameConstants.Flavor enum
_m_dSpeed			How fast this Ball is moving in pixels per second
_m_nDirection		The direction this Ball is currently moving in from the GameConstants.Direction enum.
_m_pCircleShape		The visual CircleShape for this Ball.

STATIC_MEMBERS:
_v2dBallSize		Read-only size of Balls.
_v2dHalfBallSize	Read-only half size of Balls.
_dBallRadius		Read-only radius of Balls.


DEPENDENCIES:
Math/Vec2D.js
Rendering/ColorRGB.js
Rendering/CircleShape.js
Rendering/RenderableManager.js
GameManagement/GameConstants.js
*/

var nFoo = 0;

//Constructor requiring a position, flavor from the Flavor enum below, speed, and starting direction from the Direction enum below.
var Ball = function(v2dPos, nFlavor, dSpeed, nStartingDirection)
{
	//Init class variables
	this._m_v2dPos = v2dPos.Copy();
	this._m_nFlavor = nFlavor;
	this._m_dSpeed = dSpeed;
	this._m_nDirection = nStartingDirection;
	
	
	//Create the CircleShape
	if (nFlavor === GameConstants.RED)
		this._m_pCircleShape = new CircleShape(v2dPos, Ball._dBallRadius, new ColorRGB(255, 0, 0));
	else //nFlavor == GameConstants.BLUE
		this._m_pCircleShape = new CircleShape(v2dPos, Ball._dBallRadius, new ColorRGB(0, 0, 255));
		
	this._m_pCircleShape.tag = nFoo;
	nFoo++;
	
	//Add it the RenderableManager
	g_pRenderableManager.AddRenderableToLayer(this._m_pCircleShape, RenderableManager.BALLS);
}


//STATIC MEMBERS
Ball._v2dBallSize = GameConstants.v2dLevelCellSize.Mult(0.75);
Ball._v2dHalfBallSize = Ball._v2dBallSize.Mult(0.5);
Ball._dBallRadius = Ball._v2dBallSize.x / 2.0;



//Updates this Ball with the passed dDeltaT
//(Currently assumes small update time that won't go across multiple tiles.  (Currently guaranteed by update capping in main game function.))
Ball.prototype.Update = function(dDeltaT)
{
	//Get the grid cell our center is currently on.
	var v2dPos = this._m_v2dPos;
	var dRadius = Ball._dBallRadius;
	var v2dBallCenter = new Vec2D(v2dPos.x + dRadius, v2dPos.y + dRadius);
	var v2dCell = g_pLevelManager.GetGridCoordsFromScreenCoords(v2dBallCenter);
	
	//Make sure we are still in the Level
	if (v2dCell === null)
	{
		g_pGameManager.OnLevelFailed();
		return;
	}
	
	
	//See if we're going to hit the edge or center of the current cell
	var bWillHitCenter = false; var vWillHitEdge = false;
	var dDistanceToCenter = 999999.9; var dDistanceToEdge = 9999999.9;
	var dMoveDistance = this._m_dSpeed * dDeltaT;
	var nCurrentDirection = this._m_nDirection;
	var v2dCurrentCellCenter = g_pLevelManager.GetScreenCoordsCenterOfGridCoords(v2dCell);
	var dHalfCellSize = GameConstants.dLevelCellSize * 0.5;
	var v2dThisCenter = v2dPos.Add(Ball._v2dHalfBallSize);
	
	//Return immediately if there's no movement.  (Prevents divide-by-0 later)
	if (GeneralMath.ApproxEqual(dMoveDistance, 0.0))
		return;
		
	
	if (nCurrentDirection === GameConstants.UP)
	{
		dDistanceToCenter = v2dThisCenter.y - v2dCurrentCellCenter.y; //Subtraction reversed so "up" is positive for distance
		dDistanceToEdge = (v2dThisCenter.y - dRadius) - (v2dCurrentCellCenter.y - dHalfCellSize);
	}
	else if (nCurrentDirection === GameConstants.DOWN)
	{
		dDistanceToCenter = v2dCurrentCellCenter.y - v2dThisCenter.y;
		dDistanceToEdge = (v2dCurrentCellCenter.y + dHalfCellSize) - (v2dThisCenter.y + dRadius);
	}
	else if (nCurrentDirection === GameConstants.LEFT)
	{
		dDistanceToCenter = v2dThisCenter.x - v2dCurrentCellCenter.x; //Subtraction reversed so "left" is positive for distance
		dDistanceToEdge = (v2dThisCenter.x - dRadius) - (v2dCurrentCellCenter.x - dHalfCellSize);
	}
	else //(nCurrentDirection === GameConstants.RIGHT)
	{
		dDistanceToCenter = v2dCurrentCellCenter.x - v2dThisCenter.x;
		dDistanceToEdge = (v2dCurrentCellCenter.x + dHalfCellSize) - (v2dThisCenter.x + dRadius);
	}
	bWillHitCenter = dDistanceToCenter > 0.0 && dDistanceToCenter <= dMoveDistance;
	bWillHitEdge = dDistanceToEdge > 0.0 && dDistanceToEdge <= dMoveDistance && dDistanceToEdge <= Ball._dBallRadius;

	
	//If we won't hit an edge or a center, just move full movement
	if (!bWillHitCenter && !bWillHitEdge)
	{
		this.MoveInCurrentDirection(dMoveDistance);			
		return;
	}
	
	
	//Handle hitting center first.  (This conditional works since we know we can't be missing both from above.)
	if ((bWillHitCenter && !bWillHitEdge) || (bWillHitCenter && dDistanceToCenter <= dDistanceToEdge))
	{
		//Move to center plus a little more to prevent re-triggering center collision on next update
		this.MoveInCurrentDirection(dDistanceToCenter + 0.001);		
		
		//Handle hitting LevelObject center
		var pLevelObject = g_pLevelManager.GetLevelObjectAtGridCoords(v2dCell);
		if (pLevelObject === null)
		{
			//Fell off road
			g_pGameManager.OnLevelFailed();
			return;
		}
		else
			pLevelObject.OnBallCollision(this);
	
		//Finish Update
		this.Update(dDeltaT * (1.0 - (dDistanceToCenter / dMoveDistance)));
		
		return;
	}
	
	
	//Handle hitting edge first.
	//if ((bWillHitEdge && !bWillHitCenter) || (bWillHitEdge && dDistanceToEdge <= dDistanceToCenter)) //Must be true if we get here	
	
	//Get the LevelObject we're about to move into
	var pNextLevelObject = null;
	if (nCurrentDirection === GameConstants.UP)
		pNextLevelObject = g_pLevelManager.GetLevelObjectAtGridCoords(new Vec2D(v2dCell.x, v2dCell.y - 1));
	else if (nCurrentDirection === GameConstants.DOWN)
		pNextLevelObject = g_pLevelManager.GetLevelObjectAtGridCoords(new Vec2D(v2dCell.x, v2dCell.y + 1));
	else if (nCurrentDirection === GameConstants.LEFT)
		pNextLevelObject = g_pLevelManager.GetLevelObjectAtGridCoords(new Vec2D(v2dCell.x - 1, v2dCell.y));
	else //(nCurrentDirection === GameConstants.RIGHT)
		pNextLevelObject = g_pLevelManager.GetLevelObjectAtGridCoords(new Vec2D(v2dCell.x + 1, v2dCell.y));
		
	//If we can't move into the next LevelObject, we need to turn around.
	if (pNextLevelObject !== null && !pNextLevelObject.CanBallEnter(this))
	{
		//Move to the edge
		this.MoveInCurrentDirection(dDistanceToEdge);
		
		//Turn around
		if (nCurrentDirection === GameConstants.UP)
			this._m_nDirection = GameConstants.DOWN;
		else if (nCurrentDirection === GameConstants.DOWN)
			this._m_nDirection = GameConstants.UP;
		else if (nCurrentDirection === GameConstants.LEFT)
			this._m_nDirection = GameConstants.RIGHT;
		else //(nCurrentDirection === GameConstants.RIGHT)
			this._m_nDirection = GameConstants.LEFT;
	
		//Finish Update
		this.Update(dDeltaT * (1.0 - (dDistanceToEdge / dMoveDistance)));
		
		return;
	}
	else
	{
		//We are not blocked, so move just past edge to prevent re-triggering
		this.MoveInCurrentDirection(dDistanceToEdge + 0.001);
	
		//Finish Update
		this.Update(dDeltaT * (1.0 - (dDistanceToEdge / dMoveDistance)));
		
		return;
	}
}


//Returns a copy of the upper-left position of this Ball.  (For faster access, just directly read _m_v2dPos but don't write to it.)
Ball.prototype.GetPos = function()
{
	return this._m_v2dPos.Copy();
}

//Sets the upper-left position of this Ball to a copy of the passed Vec2D.
Ball.prototype.SetPos = function(v2dPos)
{
	this._m_v2dPos = v2dPos.Copy();
	this._m_pCircleShape.SetPos(v2dPos);
}


//Sets the current direction of this Ball.
Ball.prototype.SetDirection = function(nDirection)
{
	this._m_nDirection = nDirection;
}


//Moves this ball the passed amount in its current direction.
Ball.prototype.MoveInCurrentDirection = function(dMovement)
{
	var nCurrentDirection = this._m_nDirection;
	if (nCurrentDirection === GameConstants.UP)
		this.SetPos(this._m_v2dPos.Add(new Vec2D(0.0, -dMovement)));
	else if (nCurrentDirection === GameConstants.DOWN)
		this.SetPos(this._m_v2dPos.Add(new Vec2D(0.0, dMovement)));
	else if (nCurrentDirection === GameConstants.LEFT)
		this.SetPos(this._m_v2dPos.Add(new Vec2D(-dMovement, 0.0)));
	else //(nCurrentDirection === GameConstants.RIGHT)
		this.SetPos(this._m_v2dPos.Add(new Vec2D(dMovement, 0.0)));
}


//Frees this Ball's resources.  (The CircleShape)
Ball.prototype.Free = function()
{
	g_pRenderableManager.RemoveRenderable(this._m_pCircleShape);
}
