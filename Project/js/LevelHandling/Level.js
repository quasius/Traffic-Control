/*
A class representing a level of the "Traffic Control" game.
This class is only a description of a Level.  It must be loaded into and handled by the LevelManager singleton.


METHODS:
Level			Constructor requiring a name and the grid size.
GetLevelName			Returns the Level name string
SetLevelFromString			Creates certain level elements from the passed string according to the legend below.  Expects string length to match total cell grids.
GetLevelObjectAtCoords		Returns the LevelObject (or null if none) at the passed grid coords.
SetLevelObjectAtCoords		Assigns the passed LevelObject to the passed grid coords.  Must be done before loading level to do anything.


MEMBERS:
_m_sLevelName		The name of this level
_m_v2dGridSize		The size of the level grid.  (i.e. number of cells, not cell size which is defined as GameConstants.v2dLevelCellSize.)
_m_vLevelObjects	A 2D array of LevelObjects that make up Level.  Indexing corresponds to level grid.  LevelObjects are not correctly positions.  (That's handled by LevelManager.LoadLevel) Indexed as [x][y] with [0][0] the upper-left cell.


DEPENDENCIES:
Math/Vec2D.js
GameObjects/LevelObjects/Road
GameObjects/LevelObjects/Arrow
GameObjects/LevelObjects/CrackedRoad
GameManagement/GameConstants.js
System/DebugFunctions.js (if DEBUG is true)

FRIEND CLASSES:
LevelHandling/LevelManager.js


LEVEL STRING LEGEND:
space = empty
# = road
> = right purple arrow
< = left purple arrow
^ = up purple arrow
v = down purple arrow
x = cracked road

(Comma, new line, and tab characters are ignored.)
*/


//Constructor requiring the grid size.
var Level = function(sName, v2dGridSize)
{
	//Save passed vars
	this._m_sLevelName = sName
	this._m_v2dGridSize = v2dGridSize.Copy();

	//Create grid inited to nulls
	this._m_vLevelObjects = [];
	for (i = 0; i < this._m_v2dGridSize.x; ++i)
		this._m_vLevelObjects[i] = [];
}


//Returns the Level name string
Level.prototype.GetLevelName = function()
{
	return this._m_sLevelName;
}


//Creates certain level elements from the passed string according to the legend below.  Expects string length to match total cell grids.
Level.prototype.SetLevelFromString = function(sLevelString)
{
	var v2dCurrentGridCoords = new Vec2D(-1, 0);
	var v2dZero = new Vec2D(0.0, 0.0);
	for (var i = 0; i < sLevelString.length; ++i)
	{
		//Ignore comma, new-line, and tab characters
		if (sLevelString[i] === "," || sLevelString[i] === "\n" || sLevelString[i] === "\t")
			continue;
					
		//Increment the cell
		v2dCurrentGridCoords.x++;
		if (v2dCurrentGridCoords.x === this._m_v2dGridSize.x)
		{
			v2dCurrentGridCoords.x = 0;
			v2dCurrentGridCoords.y++;
		}
			
			
		
		//Translate the characters into LevelObjectTypes
		if (sLevelString[i] === " ")
			this._m_vLevelObjects[v2dCurrentGridCoords.x][v2dCurrentGridCoords.y] = null;
		else if (sLevelString[i] === "#")
			this._m_vLevelObjects[v2dCurrentGridCoords.x][v2dCurrentGridCoords.y] = new Road(v2dZero);
		else if (sLevelString[i] === ">")
			this._m_vLevelObjects[v2dCurrentGridCoords.x][v2dCurrentGridCoords.y] = new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.PURPLE);
		else if (sLevelString[i] === "<")
			this._m_vLevelObjects[v2dCurrentGridCoords.x][v2dCurrentGridCoords.y] = new Arrow(v2dZero, GameConstants.LEFT, GameConstants.PURPLE);
		else if (sLevelString[i] === "^")
			this._m_vLevelObjects[v2dCurrentGridCoords.x][v2dCurrentGridCoords.y] = new Arrow(v2dZero, GameConstants.UP, GameConstants.PURPLE);
		else if (sLevelString[i] === "v")
			this._m_vLevelObjects[v2dCurrentGridCoords.x][v2dCurrentGridCoords.y] = new Arrow(v2dZero, GameConstants.DOWN, GameConstants.PURPLE);
		else if (sLevelString[i] === "x")
			this._m_vLevelObjects[v2dCurrentGridCoords.x][v2dCurrentGridCoords.y] = new CrackedRoad(v2dZero);
		else //shouldn't happen
		{
			if (DEBUG)
				DebugFunctions.Assert(false, "Level.SetLevelFromString: Unknown level string char");
				
			this._m_vLevelObjects[v2dCurrentGridCoords.x][v2dCurrentGridCoords.y] = null;
		}
	}
}


//Returns the LevelObject (or null if none) at the passed grid coords.
Level.prototype.GetLevelObjectAtCoords = function(x, y)
{
	return this._m_vLevelObjects[x][y];
}


//Assigns the passed LevelObject to the passed grid coords.  Must be done before loading level to do anything.
Level.prototype.SetLevelObjectAtCoords = function(pLevelObject, x, y)
{
	//Free any old LevelObjects
	if (this._m_vLevelObjects[x][y] !== null)
		this._m_vLevelObjects[x][y].Free()
		
	this._m_vLevelObjects[x][y] = pLevelObject;
}
