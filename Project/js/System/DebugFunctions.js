/*
A collection of "static" debug functions.


METHODS:
Assert			Checks the passed condition and alerts the passed (optional) message if it's false
*/


var DebugFunctions = {};


//Checks the passed condition and alerts the passed (optional) message if it's false
DebugFunctions.Assert = function(bCondition, sErrorMessage)
{
	if (!bCondition)
	{
		if (sErrorMessage === undefined)
			alert("Error!");
		else
			alert(sErrorMessage);
	}
}