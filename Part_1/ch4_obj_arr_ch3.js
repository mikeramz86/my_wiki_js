//=========================================
//     CHAPTER 3: DATA STRUCTURES
//=========================================

//=========================================
//      OBJECTS AND ARRAYS
//=========================================

//=========================================
//     PROPERTIES
//=========================================


/*
    COMMON WAYS TO ACCESS PROPS IN JS
        1. . and (dot)
            - example: value.x]
            -must be a valid variable, and it directly names the property 
        2. [] (square brackets)
            - example: value[x]
            - the expression between the brackets is evaluated to get the property name



*/


//=========================================
//     METHODS
//=========================================


/*
 Method: properties that contain functions

 Some methods to understand:
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods
    -pop() 
        -This method is used to remove the final item from an array. It also returns the discarded item:

    -shit()
        -Like .pop(), but removes and returns the first item of a list:

    -slice(being, end)
        -This method creates a new array from an existing one. 
        If you call it with no arguments, the entirety of the original array will be copied. 
        It can be called with begin and end to specify only part of the original array has been copied. 
        Finally, you can use negative values for the begin parameter in order to select the last n numbers of an array

    -.sort()
        -This method sorts an array in place. In place means that this method sorts the original array; 
        it does not copy the array, sort it, and then return the sorted copy. 
        If you pass no arguments to .sort(), it will alphabetically sort the list by default:
    
    -.sort() with anonymous functions
        - 
    
    - .map()
        - This method is used to generate a new array of items by applying the same function to each item in the original array
    
    - .forEach()
        - Like .map(), this method applies a function to each item in a collection, 
        but it does not return an array of transformed elements.
    
    - .filter()
        - This method is used to take one array of items and make a new one that contains only items that a filtering function returns true for.
    
    - .reduce()
        - This is useful for aggregating array data. This method iterates over the array while maintaining an accumulation object. 
        This object is returned inside the reduce function and is passed into the subsequent iteration
    
    -.find()
        - This method is used to find a single item in an array. 

*/

//=========================================
//     METHOD EXAMPLES
//=========================================

/* -------------------pop()------------------------------------- */

const myArray = [1, 2, 'three'];
console.log(myArray.length); // => 3
const lastItem = myArray.pop();
console.log(lastItem); // => three
console.log(myArray.length); // => 2

