/*
A class representing a color with red, green, and blue components.


METHODS:
ColorRGB		Constructor requiring red, blue, and green integer components.  (Each 0-255)
Copy			Returns a copy of this ColorRGB
ToHexString		Returns the #-prefixed hex representation of this ColorRGB as a string.
toString		Converts this ColorRGB to a string.


MEMBERS:
_m_nRed			Integer from 0-255 representing the red component.
_m_nGreen		Integer from 0-255 representing the green component.
_m_nBlue		Integer from 0-255 representing the blue component.


DEPENDENCIES:
*/


//Fully-specified constructor.
var ColorRGB = function(nRed, nGreen, nBlue)
{
	this._m_nRed = nRed;
	this._m_nGreen = nGreen;
	this._m_nBlue = nBlue;
}

//Returns a copy of this ColorRGB
ColorRGB.prototype.Copy = function()
{
	return new ColorRGB(this._m_nRed, this._m_nGreen, this._m_nBlue);
}

//Returns the #-prefixed hex representation of this ColorRGB as a string.
ColorRGB.prototype.ToHexString = function()
{
	//Find the hex string of each component, adding a leading 0 if needed
	var sRed, sGreen, sBlue;
	if (this._m_nRed < 16)
		sRed = "0" + this._m_nRed.toString(16);
	else
		sRed = this._m_nRed.toString(16);
		
	if (this._m_nGreen < 16)
		sGreen = "0" + this._m_nGreen.toString(16);
	else
		sGreen = this._m_nGreen.toString(16);

	if (this._m_nBlue < 16)
		sBlue = "0" + this._m_nBlue.toString(16);
	else
		sBlue = this._m_nBlue.toString(16);

	return ("#" + sRed + sGreen + sBlue);
}


//Converts this ColorRGB to a string.
ColorRGB.prototype.toString = function()
{
	return ("(" + this._m_nRed + ", " + this._m_nGreen + ", " + this._m_nBlue + ")");
}
