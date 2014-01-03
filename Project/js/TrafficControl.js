/*
The main Traffic Control file
*/


DEBUG = false;


//Create the canvas with a black background
var g_pCanvas = document.createElement("canvas");
g_pCanvas.style.background = "#000000";
g_pCanvas.width = 768;
g_pCanvas.height = 768;
document.body.appendChild(g_pCanvas);

var pCanvasContext = g_pCanvas.getContext("2d");



var bImagesLoaded = false;
var OnPreloadFinished = function()
{
	bImagesLoaded = true;
}


//Init some singleton managers.  (We don't need to catch the returned object since the constructors will create the singleton instances at global scope.)
new ImageManager();
new RenderableManager();
new LevelManager();
new GameManager();


//Test pre-loaded
var vImagePaths = [];
vImagePaths[0] = "Textures/Launcher_Red.png";
vImagePaths[1] = "Textures/Launcher_Blue.png";
vImagePaths[2] = "Textures/Arrow_Red.png";
vImagePaths[3] = "Textures/Arrow_Blue.png";
vImagePaths[4] = "Textures/Arrow_Purple.png";
vImagePaths[5] = "Textures/Switch_2Way_Red.png";
vImagePaths[6] = "Textures/Switch_2Way_Blue.png";
vImagePaths[7] = "Textures/Switch_2Way_Purple.png";
vImagePaths[8] = "Textures/Switch_Corner_Red.png";
vImagePaths[9] = "Textures/Switch_Corner_Blue.png";
vImagePaths[10] = "Textures/Switch_Corner_Purple.png";
vImagePaths[11] = "Textures/Switch_4Way_Red.png";
vImagePaths[12] = "Textures/Switch_4Way_Blue.png";
vImagePaths[13] = "Textures/Switch_4Way_Purple.png";
vImagePaths[14] = "Textures/Goal_Red.png";
vImagePaths[15] = "Textures/Goal_Blue.png";
vImagePaths[16] = "Textures/Goal_Purple.png";
vImagePaths[17] = "Textures/CrackedRoad.png";
vImagePaths[18] = "Textures/Fire.png";


//Make the background rect and pass to RenderableManager
pBackgroundRect = new RectangleShape(Vec2D._v2dZero, new Vec2D(g_pCanvas.width, g_pCanvas.height), new ColorRGB(0, 0, 0));
g_pRenderableManager.AddRenderableToLayer(pBackgroundRect, RenderableManager.BACKGROUND);


pImageManager.PreLoadImages(vImagePaths, OnPreloadFinished);


// The main game loop
var main = function ()
{
	var CurrentTime = Date.now();
	var dDeltaT = (CurrentTime - g_PrevTime) / 1000;

	//Limit excessive frame update from refocusing tab, or who-knows-what
	if (dDeltaT > 0.1)
		dDeltaT = 0.1;

	Update(dDeltaT);
	Render();

	g_PrevTime = CurrentTime;
}



// Update the game
var Update = function(dDeltaT)
{
	g_pGameManager.Update(dDeltaT);
}

//Draw everything
var Render = function ()
{
	if (bImagesLoaded)
	{
		pCanvasContext.clearRect(0, 0, g_pCanvas.width, g_pCanvas.height);
		
		g_pRenderableManager.RenderAll(pCanvasContext);
		g_pGameManager.RenderNonLevelElements(pCanvasContext);
	}
}



//Handle mouse clicks
var v2dCanvasOffset = new Vec2D(g_pCanvas.offsetLeft, g_pCanvas.offsetTop);
var OnCanvasClick = function(pEvent)
{
	//Find clicked position taking into account any possible scrolling
	var v2dClickPos = new Vec2D(pEvent.clientX - v2dCanvasOffset.x + document.body.scrollLeft, pEvent.clientY - v2dCanvasOffset.y + document.body.scrollTop);
	
	//Process click
	g_pGameManager.OnClick(v2dClickPos);
}

//Listen for clicks
g_pCanvas.addEventListener("click", OnCanvasClick, false);


//Start the game.  (100 FPS)
var g_PrevTime = Date.now();
setInterval(main, 10);