/*
A Renderable-derived class for wrapping up a 2D image-based sprite.
Currently expects any images to be pre-loaded in the ImageManager.


METHODS:
Sprite		Constructor specifying image path and starting position.
_Construct		"Protected" initilizer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
SetRotation		Sets this Sprite's rotation to the passed value in radians.  (Note:  This may drastically reduce performance.  For better results, have multiple pre-rotated sprite textures when possible.)
SetScale		Sets this Sprite's scale to the passed Vec2D

OVERRIDEN METHODS:
Render			Renders this Sprite to the passed render context at its current position.

INHERITED METHODS:
GetPos			Returns a copy of the upper-left position of this Renderable.  (For faster access, just directly read _m_v2dPos but don't write to it.)
SetPos			Sets the upper-left position of this Renderable to a copy of the passed Vec2D.
SetVisible		Sets whether or not this is visible to the passed value.


MEMBERS:
_m_pImage		A reference to the image from the ImageManager.
_m_dRotation	The rotation of this Sprite in radians
_m_v2dScale		The scale of this Sprite
_m_bScaled		Whether or not this Sprite has been scaled.  Cached to save more expensive comparisons each frame.

INHERITED MEMBERS:
_m_nType		The object type from the RenderableType enum below
_m_v2dPos		The current position
_m_bVisible		Whether or not this Renderable is currently visible.  Derived classes with overridden Render methods must respect this variable.


DEPENDENCIES:
Math/Vec2D.js
Rendering/ImageManager.js
Rendering/RenderableManager.js
Rendering/Renderable.js
*/


//Constructor specifying image path and starting position.
var Sprite = function(sImagePath, v2dPos)
{
	//Base class constructor
	Renderable.prototype._Construct.call(this, v2dPos);
	
	this._Construct(sImagePath)
}

//Inherit from Renderable
Sprite.prototype = new Renderable(new Vec2D(0, 0));


//"Protected" initializer that can be called from a "subclass" within JavaScript's restrictions.  (The main "constructor" is used to set the derived class' prototype and can only be called once.)
Sprite.prototype._Construct = function(sImagePath)
{
	//Set type
	this._m_nType = Renderable.SPRITE;

	//Get image
	this._m_pImage = pImageManager.GetImageByPath(sImagePath);
	if (DEBUG && this._m_pImage === null)
		alert("Sprite: " + sImagePath + " not loaded!");
		
	//Start with 0 rotation and unit scale
	this._m_dRotation = 0.0;
	this._m_v2dScale = new Vec2D(1.0, 1.0);
	this._m_bScaled = false;
}


//Sets this Sprite's rotation to the passed value in radians.  (Note:  This may drastically reduce performance.  For better results, have multiple pre-rotated sprite textures when possible.)
Sprite.prototype.SetRotation = function(dRadians)
{
	this._m_dRotation = dRadians;
}


//Sets this Sprite's scale to the passed Vec2D
Sprite.prototype.SetScale = function(v2dScale)
{
	this._m_v2dScale = v2dScale.Copy();
	this._m_bScaled = !(Vec2D.ApproxEqual(v2dScale, new Vec2D(1.0, 1.0)));//Cache if this was unit scaling or not
}


//Renders this Sprite to the passed render context at its current position.
Sprite.prototype.Render = function(pRenderContext)
{
	//Do nothing if this is invisible
	if (!this._m_bVisible)
		return;

	//Just render if there's no rotation or scale
	var bRotated = this._m_dRotation !== 0.0;
	if (!bRotated && !this._m_bScaled)
	{
		pRenderContext.drawImage(this._m_pImage, this._m_v2dPos.x, this._m_v2dPos.y);
		return;
	}
	
	//Else we need to rotate
	var v2dPos = this._m_v2dPos;
	var pImage = this._m_pImage;
	var dHalfImageX = pImage.width / 2.0;
	var dHalfImageY = pImage.height / 2.0;
	pRenderContext.save();

	pRenderContext.translate(v2dPos.x + dHalfImageX, v2dPos.y + dHalfImageY);
	if (this._m_bScaled)
		pRenderContext.scale(this._m_v2dScale.x, this._m_v2dScale.y);
	
	if (bRotated)
		pRenderContext.rotate(this._m_dRotation);
			
	pRenderContext.drawImage(this._m_pImage, -dHalfImageX, -dHalfImageY);
	pRenderContext.restore();
}
