/*
"Singleton" class to organize the game flow.


METHODS:
GameManager				Default constructor
Update					Updates the current level with the passed dDeltaT
RenderNonLevelElements		Renders non-level visuals managed by GameManager to the passed render context.  (Level name, etc.)
LoadLevel				Loads the level at the passed index.
OnLevelFailed			Call when a level is failed.  (A Ball is destroyed)
OnLevelWon				Call when a level is won.  (All Balls in Goals.)
OnClick					Handles a click at the passed position.


MEMBERS:
_m_nCurrentLevel		The index of the currently-loaded level
_m_nCurrentGameState	The current game state from the GameState enum below
_m_LevelNameText		The Text for the level name
_m_ClickToStartText		The "Click to Start" Text
_m_LevelCompleteText	The "Level Complete!  (Click to continue.)" Text
_m_LevelFailedText		The "Level Failed!  (Click to restart.)" Text


STATIC MEMBERS:
g_pGameManager			Singleton instance


DEPENDENCIES:
Rendering/ColorRGB
Rendering/Text
LevelHandling/Level
*/

//"Singleton" instance
var g_pGameManager = null;


//Default constructor
var GameManager = function()
{
	//Init class members
	this._m_nCurrentLevel = -1;
	this._m_nCurrentGameState = GameManager.WAIT_TO_START;
	
	//Init Texts
	this._m_LevelNameText = new Text(new Vec2D(25, 40), "0- Level Name", new ColorRGB(255, 255, 255), 32);
	this._m_ClickToStartText = new Text(new Vec2D(215, 125), "Click to Start...", new ColorRGB(255, 255, 200), 45);
	this._m_LevelCompleteText = new Text(new Vec2D(60, 125), "Level Complete!  (Click to continue.)", new ColorRGB(70, 255, 70), 35);
	this._m_LevelFailedText = new Text(new Vec2D(85, 125), "Level Failed!  (Click to restart.)", new ColorRGB(255, 25, 25), 35);

	
	//Save "singleton"
	g_pGameManager = this;
}


//GameState enum
GameManager.IN_GAME = 0;		//Normal gameplay
GameManager.WAIT_TO_START = 1;	//Waiting for a click to start the level.
GameManager.LEVEL_FAILED = 2;	//The level failed.  Waiting for click to restart.
GameManager.LEVEL_WON = 3;		//The level won.  Waiting for click to go to next level.


//Updates the current level with the passed dDeltaT
GameManager.prototype.Update = function(dDeltaT)
{
	//Load first Level on first update
	if (this._m_nCurrentLevel === -1)
		this.LoadLevel(0);
		
	//Don't update further if we are not in-game
	if (this._m_nCurrentGameState !== GameManager.IN_GAME)
		return;
		
	g_pLevelManager.Update(dDeltaT);
}


//Renders non-level visuals managed by GameManager to the passed render context.  (Level name, etc.)
GameManager.prototype.RenderNonLevelElements = function(pRenderContext)
{
	//Always render level name
	this._m_LevelNameText.Render(pRenderContext);
	
	//Render "Click to Start" in WAIT_TO_START
	if (this._m_nCurrentGameState === GameManager.WAIT_TO_START)
		this._m_ClickToStartText.Render(pRenderContext);
		
	//Render "Level Complete!  (Click to continue.)" in LEVEL_WON
	if (this._m_nCurrentGameState === GameManager.LEVEL_WON)
		this._m_LevelCompleteText.Render(pRenderContext);
	
	//Render "Level Failed!  (Click to restart.)" in LEVEL_FAILED
	if (this._m_nCurrentGameState === GameManager.LEVEL_FAILED)
		this._m_LevelFailedText.Render(pRenderContext);
}


//Loads the level at the passed index.
GameManager.prototype.LoadLevel = function(nLevelIndex)
{
	var pLevel = LevelCreationFunctions.CreateLevel(nLevelIndex);
	g_pLevelManager.LoadLevel(pLevel);
	
	this._m_nCurrentLevel = nLevelIndex;
	this._m_LevelNameText.SetString((this._m_nCurrentLevel + 1) + "- " + pLevel.GetLevelName());
}


//Call when a level is failed.  (A Ball is destroyed)
GameManager.prototype.OnLevelFailed = function()
{
	this._m_nCurrentGameState = GameManager.LEVEL_FAILED;
}


//Call when a level is won.  (All Balls in Goals.)
GameManager.prototype.OnLevelWon = function()
{
	//console.log("You win!");
	this._m_nCurrentGameState = GameManager.LEVEL_WON;
}


//Handles a click at the passed position.
GameManager.prototype.OnClick = function(v2dClickPos)
{
	//If in-game, see if we clicked on a LevelObject
	if (this._m_nCurrentGameState === GameManager.IN_GAME)
	{
		//See if we clicked a grid tile
		var v2dGridCoords = g_pLevelManager.GetGridCoordsFromScreenCoords(v2dClickPos);
		if (v2dGridCoords !== null)
		{
			var pClickedLevelObject = g_pLevelManager.GetLevelObjectAtGridCoords(v2dGridCoords);
			if (pClickedLevelObject !== null)
				pClickedLevelObject.OnClick();
		}
	}
	//If waiting to start, start game.
	else if (this._m_nCurrentGameState === GameManager.WAIT_TO_START)
		this._m_nCurrentGameState = GameManager.IN_GAME;
	//If level failed, restart
	else if (this._m_nCurrentGameState === GameManager.LEVEL_FAILED)
	{
		this.LoadLevel(this._m_nCurrentLevel);
		this._m_nCurrentGameState = GameManager.IN_GAME;
	}
	//If level won, load next level
	else if (this._m_nCurrentGameState === GameManager.LEVEL_WON)
	{
		//If this was the last level, wrap back around to 0
		if (this._m_nCurrentLevel + 1 === LevelCreationFunctions.nNumLevels)
			this.LoadLevel(0);
		else
			this.LoadLevel(this._m_nCurrentLevel + 1);
			
		this._m_nCurrentGameState = GameManager.WAIT_TO_START;
	}
}
