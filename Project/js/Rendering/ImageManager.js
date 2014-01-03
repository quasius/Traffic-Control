/*
"Singleton" class to pre-load and store multiple images
Expects PreLoadImages is only called once until it's completed and callback is invoked.  (It can then be called again, if needed.)


METHODS:
ImageManager		Default constructor
PreLoadImages		Preloads all images passed in the 0-indexed vImagePaths string array and calls fpOnFinishedLoadAllImages when they've all finished loading
GetImageByPath		Returns the loaded Image object of the passed path or null if the image has not been pre-loaded
GetImageByID		Returns the loaded Image object associated with the passed ID or null if the ID is invalid.
GetImageIDFromPath	Returns the ID associated with the passed image path or null if that image has not been pre-loaded.
_OnImageLoad		Internal function handling a single image pre-loading.  Invokes the callback if all have been preloaded.
_OnImageFailLoad	Internal function handling a single image failing to pre-load.


MEMBERS:
_m_vImagePaths					Vector of all image paths to be pre-loaded
_m_fpOnFinishedLoadAllImages	Callback function to invoke when a batch of pre-loaded images completes
_m_nNumImagesPreLoaded 			How many images have been pre-loaded from the current batch
_m_nNumImagesToPreLoad			How many images are to be pre-loaded in the current batch
_m_mPathsToImages 				Associates image paths to the actual Image objects
_m_mIDsToImages					Associates image IDs to the actual Image objects
_m_pIDGenerator					Issues image IDs.

STATIC MEMBERS:
pImageManager					Singleton instance


DEPENDENCIES:
System/IDGenerator.js
*/


//"Singleton" instance
var pImageManager = null;

//Default constructor
var ImageManager = function()
{
	//Init class members
	this._m_vImagePaths = null;
	this._m_fpOnFinishedLoadAllImages = null;
	this._m_nNumImagesPreLoaded = null;
	this._m_nNumImagesToPreLoad = null;
	this._m_mPathsToImages = {};
	this._m_mIDsToImages = [];
	this._m_mPathsToIDs = {};
	this._m_pIDGenerator = new IDGenerator();
	
	//Save "singleton"
	pImageManager = this;
}


//Preloads all images passed in the 0-indexed vImagePaths string array and calls fpOnFinishedLoadAllImages when they've all finished loading
ImageManager.prototype.PreLoadImages = function(vImagePaths, fpOnFinishedLoadAllImages)
{
	//Shallow-copy the array of path strings.  (Cloning the strings is unnecessary since JavaScript strings are immutable.)
	this._m_vImagePaths = vImagePaths.slice(0);
	
	//Save the callback
	this._m_fpOnFinishedLoadAllImages = fpOnFinishedLoadAllImages;
	
	//No images have been pre-loaded yet.
	//(We must set these vars first since the images might finish loading before we even complete the below loop and these vars are used in _OnImageLoad.)
	this._m_nNumImagesPreLoaded = 0;
	this._m_nNumImagesToPreLoad = vImagePaths.length;
	
	
	//Create images from each path, causing them to load.
	for (var i = 0; i < this._m_vImagePaths.length; ++i)
	{
		//Set image to load
		var pLoadingImage = new Image();
		pLoadingImage._m_pPreLoader = this; //tag the Image object with this so we can access this class in the callback function
		pLoadingImage.onload = this._OnImageLoad; //Set this first in case it instantly loads after assigning src
		pLoadingImage.onerror = this._OnImageFailLoad;
		
		
		//Save the Image object by its path
		this._m_mPathsToImages[this._m_vImagePaths[i]] = pLoadingImage;
		
		//Associate an ID to the Image
		var nImageID = this._m_pIDGenerator.GetNewID();
		this._m_mIDsToImages[nImageID] = pLoadingImage;
		
		//Assocaite path to ID
		this._m_mPathsToIDs[this._m_vImagePaths[i]] = nImageID;
		
		
		//With all the data linkages in place (in case we need to examine in callbacks), actually set the image to load
		pLoadingImage.src = this._m_vImagePaths[i];
	}
}


//Returns the loaded Image object of the passed path or null if the image has not been pre-loaded
ImageManager.prototype.GetImageByPath = function(sImagePath)
{
	if (!(sImagePath in this._m_mPathsToImages))
		return null;
		
	return this._m_mPathsToImages[sImagePath];
}


//Returns the loaded Image object associated with the passed ID or null if the ID is invalid.
ImageManager.prototype.GetImageByID = function(nID)
{
	if (!(nID in this._m_mIDsToImages))
		return null;
		
	return this._m_mIDsToImages[nID];
}


//Returns the ID associated with the passed image path or null if that image has not been pre-loaded.
ImageManager.prototype.GetImageIDFromPath = function(sImagePath)
{
	if (!(sImagePath in this._m_mPathsToIDs))
		return null;
		
	return this._m_mPathsToIDs[sImagePath]
}


//Internal function handling a single image pre-loading.  Invokes the callback if all have been preloaded.
ImageManager.prototype._OnImageLoad = function()
{
	//Get the PreLoader this callback was assigned from
	var pPreLoader = this._m_pPreLoader;
	
	pPreLoader._m_nNumImagesPreLoaded++;
	if (pPreLoader._m_nNumImagesPreLoaded === pPreLoader._m_nNumImagesToPreLoad && pPreLoader._m_fpOnFinishedLoadAllImages !== null)
	{
		pPreLoader._m_fpOnFinishedLoadAllImages();
	}
	
	//We don't need the pre-loader tag any more
	delete this._m_pPreLoader;
}


//Internal function handling a single image failing to pre-load.
ImageManager.prototype._OnImageFailLoad = function()
{
	alert("ImageManager._OnImageFailLoad: failed to load image " + this.src);
}
