/*
"Singleton" class to organize currently-loaded LevelObjects.


METHODS:
LevelManager			Default constructor
LoadLevel				Loads the passed Level into the LevelObjectManager.  Clears previous Level if needed.
Update					Updates the current level with the passed dDeltaT
GetGridCoordsFromScreenCoords	Returns the current Level's grid coords from the passed screen coords or null if the screen coords are not on the Level.
GetScreenCoordsCenterOfGridCoords	Returns the screen coords of the center of the passed grid coords.
GetLevelObjectAtGridCoords		Returns the LevelObject at the passed grid coords or null if there is not LevelObject there or the grid coords are out-of-bounds.
AddBallToLevel			Adds the passed Ball to the currently-loaded level
RemoveBallFromLevel		Removes the passed Ball from the currently-loaded level and completes the level if it was the last one.
Clear					Clears out all currently-loaded LevelObjects and frees their resources.


MEMBERS:
_m_v2dGridSize			The size of the currently-loaded Level's grid.  (i.e. number of cells, not cell size which is defined as GameConstants.v2dLevelCellSize.)
_m_v2dLevelDisplaySize	The size of the currently-loaded Level in pixels.
_m_v2dLevelUpperLeft	The upper-left pixel location of the currently-loaded level.
_m_vGridLevelObjects	A 2D array of LevelObject pointers representing the Level's cells.  Only contains LevelObjects that are permanently bound to a certain cell.  Empty cells are null.
_m_nTotalBalls			The total number of balls in the current level.
_m_nNumBallsLeft		How many balls are left to get to a goal in the current level.
_m_nActiveBalls			A vector of currently-active Balls


STATIC MEMBERS:
g_pLevelManager			Singleton instance


DEPENDENCIES:
LevelHandling/Level.js
System/DebugFunctions.js (if DEBUG is true)
GameObjects/Ball.js
*/


//"Singleton" instance
var g_pLevelManager = null;


//Default constructor
var LevelManager = function()
{
	//Init class members
	this._m_v2dGridSize = new Vec2D(0, 0);
	this._m_v2dLevelDisplaySize = new Vec2D(0, 0);
	this._m_v2dLevelUpperLeft = new Vec2D(0, 0);
	this._m_vGridLevelObjects = [];
	this._m_nTotalBalls = 0;
	this._m_nNumBallsLeft = 0;
	this._m_nActiveBalls = [];
	
	//Save "singleton"
	g_pLevelManager = this;
}


//Loads the passed Level into the LevelObjectManager.  Clears previous Level if needed.
LevelManager.prototype.LoadLevel = function(pLevel)
{
	//Clear old level
	this.Clear();
	
	
	//Reset some vars
	this._m_nTotalBalls = 0;
	
	
	//Copy new grid size
	this._m_v2dGridSize = pLevel._m_v2dGridSize.Copy();
	
	//Calculate level display size
	var v2dLevelDisplaySize = new Vec2D(this._m_v2dGridSize.x * GameConstants.dLevelCellSize, this._m_v2dGridSize.y * GameConstants.dLevelCellSize);
	this._m_v2dLevelDisplaySize = v2dLevelDisplaySize;
	
	//Calculate upper-left of level display
	var v2dLevelUpperLeft = new Vec2D((g_pCanvas.width - v2dLevelDisplaySize.x) / 2.0, GameConstants.nTopCanvasBufferSize + (g_pCanvas.height - GameConstants.nTopCanvasBufferSize - v2dLevelDisplaySize.y) / 2.0);
	this._m_v2dLevelUpperLeft = v2dLevelUpperLeft;

	
	//Set up the LevelObject 2D array, initing the cells to null
	this._m_vGridLevelObjects = [];
	for (var x = 0; x < this._m_v2dGridSize.x; ++x)
	{
		this._m_vGridLevelObjects[x] = [];
		for (var y = 0; y < this._m_v2dGridSize.y; ++y)
		{
			this._m_vGridLevelObjects[x][y] = null;
		}
	}
	
	
	//Iterate through the Level, creating the appropriate LevelObjects
	for (var x = 0; x < this._m_v2dGridSize.x; ++x)
	{
		for (var y = 0; y < this._m_v2dGridSize.y; ++y)
		{	
			//Get the LevelObject at this cell
			var pLevelObject = pLevel.GetLevelObjectAtCoords(x, y);
			if (pLevelObject === null)
				continue;
				
							
			//Set the LevelObject's correct position
			pLevelObject.SetPos(new Vec2D(v2dLevelUpperLeft.x + (x * GameConstants.dLevelCellSize), v2dLevelUpperLeft.y + (y * GameConstants.dLevelCellSize)));
			
			
			//If the LevelObject is a Launcher, we need to add to the total number of balls for this level
			if (pLevelObject._m_nType === LevelObject.LAUNCHER)
				this._m_nTotalBalls = this._m_nTotalBalls += pLevelObject._m_nNumBallsTotal;
			
			
			//Tag the LevelObject with the Level that owns it.
			pLevelObject.SetParentLevel(pLevel);
			
			//Save the LevelObject in the grid
			this._m_vGridLevelObjects[x][y] = pLevelObject;
		}
	}
	
	
	//No balls have been put in goals yet
	this._m_nNumBallsLeft = this._m_nTotalBalls;
	this._m_nActiveBalls = [];
}


//Updates the current level with the passed dDeltaT
LevelManager.prototype.Update = function(dDeltaT)
{
	//Update all LevelObjects
	var vGridLevelObjects = this._m_vGridLevelObjects;
	var v2dGridSize = this._m_v2dGridSize;
	for (var x = 0; x < v2dGridSize.x; ++x)
	{
		for (var y = 0; y < v2dGridSize.y; ++y)
		{
			var pCurrentLevelObject = vGridLevelObjects[x][y];
			if (pCurrentLevelObject !== null)
				vGridLevelObjects[x][y].Update(dDeltaT);
		}
	}
	
	//Update Balls
	for (var i = 0; i < this._m_nActiveBalls.length; ++i)
		this._m_nActiveBalls[i].Update(dDeltaT);
}


//Returns the current Level's grid coords from the passed screen coords or null if the screen coords are not on the Level.
LevelManager.prototype.GetGridCoordsFromScreenCoords = function(v2dScreenCoords)
{
	var v2dOffsetFromLevel = v2dScreenCoords.Sub(this._m_v2dLevelUpperLeft);
	var v2dCellSize = GameConstants.v2dLevelCellSize;
	var v2dGridCoords = new Vec2D(GeneralMath.ApproxFloor(v2dOffsetFromLevel.x / v2dCellSize.x), GeneralMath.ApproxFloor(v2dOffsetFromLevel.y / v2dCellSize.y));
	
	//Make sure we are not out-of-bounds
	var v2dGridSize = this._m_v2dGridSize;
	if (v2dGridCoords.x < 0 || v2dGridCoords.y < 0 || v2dGridCoords.x >= v2dGridSize.x || v2dGridCoords.y >= v2dGridSize.y)
		return null;
		
	return v2dGridCoords;
}


//Returns the screen coords of the center of the passed grid coords.
LevelManager.prototype.GetScreenCoordsCenterOfGridCoords = function(v2dGridCoords)
{
	return this._m_v2dLevelUpperLeft.Add(v2dGridCoords.Mult(GameConstants.dLevelCellSize)).Add(GameConstants.v2dLevelCellSize.Mult(0.5));
}


//Returns the LevelObject at the passed grid coords or null if there is not LevelObject there or the grid coords are out-of-bounds.
LevelManager.prototype.GetLevelObjectAtGridCoords = function(v2dGridCoords)
{
	//Make sure we are not out-of-bounds
	var v2dGridSize = this._m_v2dGridSize;
	if (v2dGridCoords.x < 0 || v2dGridCoords.y < 0 || v2dGridCoords.x >= v2dGridSize.x || v2dGridCoords.y >= v2dGridSize.y)
		return null;
		
	return this._m_vGridLevelObjects[v2dGridCoords.x][v2dGridCoords.y];
}


//Adds the passed Ball to the currently-loaded level
LevelManager.prototype.AddBallToLevel = function(pNewBall)
{
	this._m_nActiveBalls.push(pNewBall);
}


//Removes the passed Ball from the currently-loaded level and completes the level if it was the last one.
LevelManager.prototype.RemoveBallFromLevel = function(pBall)
{
	//Find the Ball in the active list
	var nBallIndex = this._m_nActiveBalls.indexOf(pBall);
	
	if (DEBUG)
		DebugFunctions.Assert(nBallIndex !== -1, "LevelManager.RemoveBallFromLevel: Ball not found");
	

	//Remove the ball from the active list
	this._m_nActiveBalls.splice(nBallIndex, 1);

	//Free the Ball
	pBall.Free();
	
	
	//Decrement balls left and see if we've won
	this._m_nNumBallsLeft--;
	if (this._m_nNumBallsLeft <= 0)
		g_pGameManager.OnLevelWon();
}


//Clears out all currently-loaded LevelObjects and frees their resources.
LevelManager.prototype.Clear = function()
{
	//Iterate through the grid LevelObjects, freeing them
	for (var x = 0; x < this._m_v2dGridSize.x; ++x)
	{
		for (var y = 0; y < this._m_v2dGridSize.y; ++y)
		{
			if (this._m_vGridLevelObjects[x][y] !== null)
				this._m_vGridLevelObjects[x][y].Free();
		}
	}
	
	
	//Iterate through Balls, freeing them
	for (var i = 0; i < this._m_nActiveBalls.length; ++i)
		this._m_nActiveBalls[i].Free();

	
	//Reset class members
	this._m_v2dGridSize = new Vec2D(0, 0);
	this._m_v2dLevelDisplaySize = new Vec2D(0, 0);
	this._m_v2dLevelUpperLeft = new Vec2D(0, 0);
	this._m_vGridLevelObjects = [];
}
