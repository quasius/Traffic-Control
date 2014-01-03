/*
A collection of "static" constants for various game elements that don't belong to any specific class.

STATIC MEMBERS:
dLevelCellSize			The size of each square cell on the level grid
dHalfLevelCellSize		Half the size of each square cell on the level grid.
v2dLevelCellSize		The size of each square cell on the level grid as a Vec2D
v2dHalfLevelCellSize	The half size of each square cell on the level grid as a Vec2D
nTopCanvasBufferSize	How many pixels tall the buffer at the top of the canvas is.  All area below that is available for the level.

Direction enum			Up, down, left, and right direction used by various objects
Flavor enum				Red of blue.  Used by Launchers, Balls, etc. to determine interactions.

DEPENDENCIES:
Math/Vec2D.js
*/


var GameConstants = {};

//Init static vars
GameConstants.dLevelCellSize = 48.0;
GameConstants.dHalfLevelCellSize = 24.0;
GameConstants.v2dLevelCellSize = new Vec2D(GameConstants.dLevelCellSize, GameConstants.dLevelCellSize);
GameConstants.v2dHalfLevelCellSize = new Vec2D(GameConstants.dHalfLevelCellSize, GameConstants.dHalfLevelCellSize);
GameConstants.nTopCanvasBufferSize = 64;


//Direction enum.
GameConstants.UP = 0;
GameConstants.DOWN = 1;
GameConstants.LEFT = 2;
GameConstants.RIGHT = 3;

//Flavor enum.
GameConstants.RED = 0;
GameConstants.BLUE = 1;
GameConstants.PURPLE = 2;
