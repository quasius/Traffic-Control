/*
A class for an associative hash map that uses objects as keys.
Necessary since a standard JavaScript object can not use non primitive, non-string objects as keys since different instances will sometimes be seen as the same key and overwrite each other.
Works by automatically attaching a unique ID tag to each inserted object under _HashID.  _HashID is removed when object is removed, but must not be externally modified.
Note:  Primitives may *not* be used as keys.  For that, just use a standard JavaScript object.

MEMBERS:
_m_Map			The JavaScript object that holds the hashed objects.
_m_pIDGenerator		Generates the _HashID tags.

METHODS:
HashMap			Default constructor
Insert			Inserts the passed key-value pair into the HashMap.  Adds a _HashID tag to the key.
Get				Returns the value associated with the passed key or undefined if the key was not found.
Remove			Removes both the passed key and associated value from the HashMap.  Removes key's _HashID tag.
Clear			Removes all _HashIDs from all held keys and then removes all key-value pairs from the HashMap.


DEPENDENCIES:
System/IDGenerator.js
*/


//Default constructor
var HashMap = function()
{
	//Init class members
	this._m_Map = {};
	this._m_pIDGenerator = new IDGenerator();
}


//Inserts the passed key-value pair into the HashMap.  Adds a _HashID tag to the key.
HashMap.prototype.Insert = function(pKey, value)
{
	//Attach hash ID
	pKey._HashID = this._m_pIDGenerator.GetNewID();
	
	//Insert key-value pair
	this._m_Map[pKey._HashID] = value;
}


//Returns the value associated with the passed key or undefined if the key was not found.
HashMap.prototype.Get = function(pKey)
{
	return this._m_Map[pKey._HashID];
}


//Removes both the passed key and associated value from the HashMap.  Removes key's _HashID tag.
HashMap.prototype.Remove = function(pKey)
{
	//Get the hash ID and return false if it wasn't found
	var nHashID = pKey._HashID
	if (nHashID === undefined)
		return false;
		
	//Delete the hash ID, free it from the IDGenerator and delete the key-value pair.
	delete pKey._HashID;	
	this._m_pIDGenerator.FreeID(nHashID);
	return (delete this._m_Map[pKey._HashID]);
}


//Removes all _HashIDs from all held keys and then removes all key-value pairs from the HashMap.
HashMap.prototype.Clear = function()
{
	//Delete hash IDs
	for (var pKey in this._m_Map)
		delete pKey._HashID;
		
	//Reset class vars
	this._m_pIDGenerator.Reset();
	this._m_Map = {};
}
