/*
Let's hard-code some levels.  Yee-haw!!!!
With these static level-creation functions, we can do it!

STATIC MEMBERS:
nNumLevels				How many total levels there are


METHODS:
CreateLevel		Creates and returns the level of the passed index.  (0 counts)
_vLevelCreationFunctions	An array of the actual internal level-creation functions called by CreateLevel

DEPENDENCIES:
LevelHandling/Level.js
GameObjects/LevelObjects/Launcher.js
GameManagement/GameConstants.js
*/


var LevelCreationFunctions = {};


//Init static vars
LevelCreationFunctions.nNumLevels = 10;


//Creates and returns the level of the passed index.  (0 counts)
LevelCreationFunctions.CreateLevel = function(nLevelIndex)
{
	return LevelCreationFunctions._vLevelCreationFunctions[nLevelIndex]();
}


//Make the actual level-creation functions
LevelCreationFunctions._vLevelCreationFunctions = [];



//Make level 0
LevelCreationFunctions._vLevelCreationFunctions[0] = function()
{
	/*
	      
	      
	    # 
	 #### 
	 #  # 
	 #  # 
	 #### 
	 #    
	      
	      
	*/

	
	var pNewLevel = new Level("Click the Switch", new Vec2D(6, 10));
	
	pNewLevel.SetLevelFromString("                #  ####  #  #  #  #  ####  #                ");
	
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.UP, GameConstants.RED, 1, 128.0, 1.0, 1.0), 1, 8);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.PURPLE), 1, 6);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.PURPLE), 1, 3);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.DOWN, GameConstants.PURPLE), 4, 3);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.PURPLE), 4, 6);
	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 4, 1);
	
	return pNewLevel;
}


//Make level 1
LevelCreationFunctions._vLevelCreationFunctions[1] = function()
{
	/*
	     
	     
	   # 
	   # 
	   # 
	 ### 
	 #   
	 #   
	 #   
	     
	     
	*/

	
	var pNewLevel = new Level("Don't Fall!", new Vec2D(5, 11));
	
	pNewLevel.SetLevelFromString("             #    #    #  ###  #    #    #             ");
	
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.UP, GameConstants.RED, 1, 128.0, 1.0, 1.0), 1, 9);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.LEFT, GameConstants.PURPLE), 1, 5);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.DOWN, GameConstants.PURPLE), 3, 5);
	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 3, 1);
	
	return pNewLevel;
}


//Make level 2
LevelCreationFunctions._vLevelCreationFunctions[2] = function()
{
	/*
	               
	       #       
	       #       
	       #       
	     #####     
	     #   #     
	   ###   ###   
	   #       #   
	 ###       ### 
	               
	*/

	
	var pNewLevel = new Level("Multi-ball", new Vec2D(15, 10));
	
	pNewLevel.SetLevelFromString("                      #              #              #            #####          #   #        ###   ###      #       #    ###       ###                ");
	
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.RIGHT, GameConstants.RED, 1, 128.0, 1.25, 1.0), 1, 8);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.PURPLE), 3, 8);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.LEFT, GameConstants.PURPLE), 3, 6);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.PURPLE), 5, 6);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.LEFT, GameConstants.PURPLE), 5, 4);
	
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.LEFT, GameConstants.RED, 1, 128.0, 1.8, 1.0), 13, 8);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.DOWN, GameConstants.PURPLE), 11, 8);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.PURPLE), 11, 6);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.DOWN, GameConstants.PURPLE), 9, 6);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.PURPLE), 9, 4);

	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.UP, GameConstants.PURPLE), 7, 4);

	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 7, 1);
	
	return pNewLevel;
}


//Make level 3
LevelCreationFunctions._vLevelCreationFunctions[3] = function()
{
	/*
	         
	 ####### 
	    #    
	 ####### 
	         
	*/

	
	var pNewLevel = new Level("Sorting Algorithm", new Vec2D(9, 5));
	
	pNewLevel.SetLevelFromString("          #######     #     #######          ");
	
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.RIGHT, GameConstants.RED, 3, 128.0, 1.0, 1.4), 1, 1);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.LEFT, GameConstants.BLUE, 3, 128.0, 1.7, 1.4), 7, 1);

	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.DOWN, GameConstants.PURPLE), 4, 1);

	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.LEFT, GameConstants.PURPLE), 4, 3);

	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 7, 3);
	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.BLUE), 1, 3);
	
	return pNewLevel;
}


//Make level 4
LevelCreationFunctions._vLevelCreationFunctions[4] = function()
{
	/*
	           
	         # 
	         # 
	   >#####^ 
	   #     # 
	   # >###^ 
	   # #   # 
	   # # >#^ 
	   x x x x 
	 ######### 
	           
	*/

	
	var pNewLevel = new Level("Burning Bridges", new Vec2D(11, 11));
	pNewLevel.SetLevelFromString("                    #          #    >#####^    #     #    # >###^    # #   #    # # >#^    x x x x  ########^            ");
	
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.RIGHT, GameConstants.RED, 4, 128.0, 1.0, 1.25), 1, 9);

	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_UP_RIGHT, GameConstants.UP, GameConstants.PURPLE), 3, 9);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_UP_RIGHT, GameConstants.UP, GameConstants.PURPLE), 5, 9);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_UP_RIGHT, GameConstants.UP, GameConstants.PURPLE), 7, 9);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_UP_RIGHT, GameConstants.UP, GameConstants.PURPLE), 9, 9);	

	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 9, 1);
	
	
	return pNewLevel;
}


//Make level 5
LevelCreationFunctions._vLevelCreationFunctions[5] = function()
{
	/*
	         
	  ##v##  
	    #    
	 v#####v 
	 # # # # 
	 x x x x 
	 # # # # 
	 ##>v<## 
	    #    
	    #    
	    #    
	         
	*/

	
	var pNewLevel = new Level("Colors", new Vec2D(9, 12));
	pNewLevel.SetLevelFromString("           ##v##      #     v#####v  # # # #  x x x x  # # # #  ##>v<##     #        #        #             ");
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.RIGHT, GameConstants.RED, 2, 128.0, 1.0, 6.0), 2, 1);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.LEFT, GameConstants.BLUE, 2, 128.0, 4.0, 6.0), 6, 1);

	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.RIGHT, GameConstants.PURPLE), 4, 3);
	
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_DOWN_LEFT, GameConstants.DOWN, GameConstants.PURPLE), 3, 3);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_RIGHT_DOWN, GameConstants.DOWN, GameConstants.PURPLE), 5, 3);

	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.BLUE), 1, 7);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.RED), 7, 7);
	
	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 4, 9)
	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.BLUE), 4, 10)
	
	
	return pNewLevel;
}


//Make level 6
LevelCreationFunctions._vLevelCreationFunctions[6] = function()
{
	/*
	             
	 #     >#### 
	 #     #   # 
	 #     ### # 
	 #  ####   # 
	 #  #  #   # 
	 >###  ####< 
	 #  #  #   # 
	 #  ####   # 
	 #     ### # 
	 #     #   # 
	 #     >#### 
	             
	*/

	
	var pNewLevel = new Level("Loopy", new Vec2D(13, 13));
	pNewLevel.SetLevelFromString("              #     >####  #     #   #  #     ### #  #  ####   #  #  #  #   #  >###  ####<  #  #  #   #  #  ####   #  #     ### #  #     #   #  #     >####              ");
	
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	//pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.DOWN, GameConstants.RED, 4, 128.0, 1.5, 1.5), 1, 1);
	//pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.UP, GameConstants.BLUE, 4, 128.0, 2.25, 1.5), 1, 11);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.DOWN, GameConstants.RED, 2, 90.0, 1.5, 4.0), 1, 1);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.UP, GameConstants.BLUE, 2, 90.0, 3.5, 4.0), 1, 11);

	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.UP, GameConstants.PURPLE), 4, 6);
	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.BLUE), 4, 4);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.RED), 4, 8);
	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.BLUE), 7, 1);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.RED), 7, 11);
	
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.DOWN, GameConstants.PURPLE), 7, 4);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.UP, GameConstants.PURPLE), 7, 8);
	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.DOWN, GameConstants.BLUE), 11, 1);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.RED), 11, 11);

	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.DOWN, GameConstants.PURPLE), 7, 6);

	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.RED), 7, 3);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.BLUE), 7, 9);

	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.BLUE), 7, 5);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.RED), 7, 7);

	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 9, 3)
	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.BLUE), 9, 9)
	
	
	return pNewLevel;
}


//Make level 7
LevelCreationFunctions._vLevelCreationFunctions[7] = function()
{
	/*
	                
	     #######    
	  ####  #  #### 
	  #  #  #  #  # 
	  #  #######  # 
	  #           # 
	  ############# 
	        #       
	     #######    
	        #       
	        #       
	        #       
	                
	*/

	
	var pNewLevel = new Level("Wildflower", new Vec2D(16, 13));
	
	pNewLevel.SetLevelFromString("                     #######      ####  #  ####   #  #  #  #  #   #  #######  #   #           #   #############         #            #######            #               #               #                       ");
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.RIGHT, GameConstants.RED, 2, 110.0, 1.0, 3.0), 5, 8);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.UP, GameConstants.BLUE, 2, 110.0, 2.0, 3.0), 8, 11);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.LEFT, GameConstants.RED, 2, 110.0, 3.0, 3.0), 11, 8);

	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.PURPLE), 8, 8);

	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.LEFT, GameConstants.PURPLE), 8, 6);
	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.DOWN, GameConstants.RED), 4, 6);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.BLUE), 2, 6);
	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.DOWN, GameConstants.BLUE), 12, 6);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.RED), 14, 6);

	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.PURPLE), 2, 2);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.PURPLE), 14, 2);

	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.UP, GameConstants.PURPLE), 5, 2);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.DOWN, GameConstants.PURPLE), 11, 2);

	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.PURPLE), 5, 1);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.PURPLE), 11, 1);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.DOWN, GameConstants.PURPLE), 8, 1);


	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.RED), 5, 4);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.BLUE), 11, 4);

	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.RIGHT, GameConstants.PURPLE), 8, 4);

	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 7, 4);
	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.BLUE), 9, 4);
	
	return pNewLevel;
}


//Make level 8
LevelCreationFunctions._vLevelCreationFunctions[8] = function()
{
	/*
	           
	 ######### 
	 ######### 
	 ######### 
	 ######### 
	 ######### 
	 ######### 
	 ######### 
	 ######### 
	 ######### 
	           
	*/
	
	

	
	var pNewLevel = new Level("Wildfire", new Vec2D(11, 11));
	pNewLevel.SetLevelFromString("            #########  #########  #########  #########  #########  #########  #########  #########  #########            ");
	
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.RIGHT, GameConstants.RED, 1, 128.0, 1.0, 0.0), 1, 1);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.LEFT, GameConstants.BLUE, 1, 128.0, 1.0, 0.0), 9, 9);
	
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.RIGHT, GameConstants.PURPLE), 4, 1);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.LEFT, GameConstants.PURPLE), 5, 1);
	
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.LEFT, GameConstants.PURPLE), 6, 9);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.RIGHT, GameConstants.PURPLE), 5, 9);
	
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.0, 0.0), 8, 1);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.0, 0.0), 2, 9);
	
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_RIGHT_DOWN, GameConstants.RIGHT, GameConstants.PURPLE), 2, 1);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_LEFT_UP, GameConstants.LEFT, GameConstants.PURPLE), 8, 9);

	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.0, 1.0, -0.25), 3, 1);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.0, 1.0, -0.25), 7, 9);

	
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.RIGHT, GameConstants.PURPLE), 2, 5);
	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.DOWN, GameConstants.RED), 1, 5);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.DOWN, GameConstants.RED), 3, 5);

	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.55, 1.55, 1.55), 1, 6);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.55, 1.55), 3, 6);
	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.RED), 1, 7);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.RED), 3, 7);
	
	
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.LEFT, GameConstants.PURPLE), 8, 5);
	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.BLUE), 7, 5);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.BLUE), 9, 5);

	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.55, 1.55, 1.55), 7, 4);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.55, 1.55), 9, 4);
	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.BLUE), 7, 3);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.BLUE), 9, 3);
	

	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.DOWN, GameConstants.BLUE), 5, 3);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.UP, GameConstants.BLUE), 5, 4);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.0, 1.0), 5, 5);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.TWO_WAY, GameConstants.DOWN, GameConstants.RED), 5, 6);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.RED), 5, 7);

	
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.LEFT, GameConstants.BLUE), 5, 8);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.DOWN, GameConstants.BLUE), 1, 8);

	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.RIGHT, GameConstants.RED), 5, 2);
	pNewLevel.SetLevelObjectAtCoords(new Arrow(v2dZero, GameConstants.UP, GameConstants.RED), 9, 2);

	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 9, 1);
	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.BLUE), 1, 9);
	
	
	return pNewLevel;
}


//Make level 9
LevelCreationFunctions._vLevelCreationFunctions[9] = function()
{
	/*
	            
	 ########## 
	 ########## 
	 ########## 
	 ########## 
	 ########## 
	 ########## 
	            
	*/

	
	var pNewLevel = new Level("Fire Phase", new Vec2D(12, 8));
	
	pNewLevel.SetLevelFromString("             ##########  ##########  ##########  ##########  ##########  ##########             ");
	
	
	//Add some other objects
	var v2dZero = new Vec2D(0.0, 0.0);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.RIGHT, GameConstants.RED, 1, 128.0, 1.5, 0.0), 1, 4);
	pNewLevel.SetLevelObjectAtCoords(new Launcher(v2dZero, GameConstants.LEFT, GameConstants.BLUE, 1, 128.0, 1.5, 0.0), 10, 3);

	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.RED), 10, 4);
	pNewLevel.SetLevelObjectAtCoords(new Goal(v2dZero, GameConstants.BLUE), 1, 3);

	//row 1
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.DOWN, GameConstants.PURPLE), 2, 1);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.LEFT, GameConstants.PURPLE), 7, 1);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.DOWN, GameConstants.PURPLE), 9, 1);

	//row 2
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.LEFT, GameConstants.PURPLE), 1, 2);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_RIGHT_DOWN, GameConstants.RIGHT, GameConstants.PURPLE), 5, 2);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.DOWN, GameConstants.PURPLE), 8, 2);

	//row 3
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.LEFT, GameConstants.PURPLE), 5, 3);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.DOWN, GameConstants.PURPLE), 7, 3);

	//row 4
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.DOWN, GameConstants.PURPLE), 3, 4);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.DOWN, GameConstants.PURPLE), 8, 4);

	//row 6
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.CORNER_UP_RIGHT, GameConstants.UP, GameConstants.PURPLE), 2, 6);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.LEFT, GameConstants.PURPLE), 3, 6);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.LEFT, GameConstants.PURPLE), 7, 6);
	pNewLevel.SetLevelObjectAtCoords(new Switch(v2dZero, Switch.FOUR_WAY, GameConstants.RIGHT, GameConstants.PURPLE), 10, 6);	

	
	//Unblinking fires
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.0, 0.0), 6, 4);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.0, 0.0), 1, 1);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 1.0, 0.0), 4, 5);
	
	//Blinking fires
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 2.0, 2.0, 0.0), 7, 2);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 2.0, 2.0, -0.5), 7, 5);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 2.0, 2.0, 0.25), 4, 6);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 2.0, 2.0, 0.5), 2, 4);
	pNewLevel.SetLevelObjectAtCoords(new Fire(v2dZero, 2.0, 2.0, -0.25), 4, 3);

	
	return pNewLevel;
}