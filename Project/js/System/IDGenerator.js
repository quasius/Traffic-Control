/*
A simple class for generating and recycling integer IDs
The lowest ID returned is 0.

MEMBERS:
_m_nGreatestID		The highest ID that has been generated so far.  (Begins at 0 when no IDs have been generated).  Read only
_m_vRecycledIDs		Holds all currently-recycled IDs
_m_vIDActive		An array that holds whether or not a given ID is active.  Has range from 1 to _m_nGreatestID.  (This could figured out from looking through _m_vRecycledIDs, but that's slow.)
_m_vActiveIDs		An array holding all the active IDs.  (Calculated from _m_vIDActive and cached for faster access.)
_m_bActiveIDsDirty	True when _m_vActiveIDs is dirty and needs to be refreshed.

METHODS:
IDGenerator		Default constructor
GetNewID		Returns a unique unused ID.  (Will always return a recycled ID if available.)
FreeID			Recycles the passed ID so it can be re-issued later.
IsIDActive		Returns if the passed ID is valid and active.
GetActiveIDs	Returns a const vector of all active IDs.  Slow.
GetNumActiveIDs	Returns the number of currently active IDs
Reset			Resets the class instance
*/


//Default constructor
var IDGenerator = function()
{
	//Init class members
	this.Reset();
}


//Returns a unique unused ID.  (Will always return a recycled ID if available.)
IDGenerator.prototype.GetNewID = function()
{
	var nNewID;
	
	//first check if there is a recycled ID
	var nNumRecycledIDs = this._m_vRecycledIDs.length
	if (nNumRecycledIDs !== 0)
	{
		nNewID = this._m_vRecycledIDs.pop();
	}
	//else issue the next unallocated ID
	else
	{
		this._m_nGreatestID++;
		nNewID = this._m_nGreatestID;
	}
	
	
	//Mark as active again.  (Works whether the ID is new or recycled)
	this._m_vIDActive[nNewID] = true;
	this._m_bActiveIDsDirty = true;

	return nNewID;
}


//Recycles the passed ID so it can be re-issued later.
IDGenerator.prototype.FreeID = function(nID)
{
	//Mark the ID as inactive and add to it the unused IDs list
	this._m_vIDActive[nID] = false;
	this._m_vRecycledIDs.push(nID);
	this._m_bActiveIDsDirty = true;
}


//Returns if the passed ID is valid and active.
IDGenerator.prototype.IsIDActive = function(nID)
{
	//Make sure the ID is in the current range
	if (nID < 0 || nID > this._m_nGreatestID)
		return false;
	
	//Return if the ID is currently active.
	return this._m_vIDActive[nID];
}


//Returns a const vector of all active IDs.  Slow.
IDGenerator.prototype.GetActiveIDs = function()
{
	//Refresh _m_vActiveIDs if needed
	if (this._m_bActiveIDsDirty)
	{
		this._m_vActiveIDs = [];
		for (var i = 0; i <= this._m_nGreatestID; ++i)
		{
			if (this._m_vIDActive[i])
				this._m_vActiveIDs.push(i);
		}
		
		//Mark as non-dirty
		this._m_bActiveIDsDirty = false;
	}
	
	return this._m_vActiveIDs;
}


//Returns the number of currently active IDs
IDGenerator.prototype.GetNumActiveIDs = function()
{
	return this._m_nGreatestID - this._m_vRecycledIDs.length;
}


//Resets the class instance
IDGenerator.prototype.Reset = function()
{
	this._m_nGreatestID = -1;
	this._m_vRecycledIDs = [];
	this._m_vIDActive = [];
	this._m_vActiveIDs = [];
	this._m_bActiveIDsDirty = false;
};
