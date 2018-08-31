//=========================================
//     CHAPTER 3: FUNCTIONS
//=========================================

//=========================================
//      DEFINING A FUNCTION
//=========================================

//definition: a regular variable defintion where teh value given to the variable happens to be a function

var square = function(x) {
    return x * x;
};

console.log(square(12));
//result > 144

/* 

- A function is created by an expression that starts with a keyword function
- functions have a set of parameters and a body
    which confuction body must always be wrapped in braces, even when it consists only a single statement
- A function can have multiple parameters or non at all

*/

var makeNoise = function() {
    console.log("Pling!");
};

var power = function(base, exponent) {
    var result = 1;
    for ( var count = 0; count < exponent; count++)
        result *= base;
    return result;
};

console.log(power(2,10));

// return statement: determines the value the function returns

//=========================================
//      PARAMETERS AND SCOPES
//=========================================

//Parameters behave like variables but their initial values are given by the caller of the function

//local scope: variables created inside of functions, including their parameters
// global scope: variables created outside the function


//=========================================
//      FUNCTIONS AS VALUES
//=========================================

//Function variables usually simply act as names for a specific piece of program

/*

-Function value can do all the things that other values can do
    - you can use it in arbitrary expressions
    - not just call it

- It is possible to store  a function value ina new place, pass it as an arguement to a function and so on

- a variable that holds a function is still just a regular variable and can be assigned a value

*/

var launchMissles = function(value) {
    missleSystem.launch("now");
};
if (safeMode)
    launchMissles = function(value) {/*do nothing */}


//=========================================
//      FUNCTIONS DECLARATION
//=========================================

// Function Declaration: The function keyword can also be used at the start of a statement, like below:
function square(x) {
    return x * x;
}

// When you want programs to behave consistently , only use this form of function-defining statements in the outermost block or program
function example() {
    function a() // okay
    if (something) {
        function b() {} // NOT OKAY!!!
    }
}


//=========================================
//      THE CALL STACK
//=========================================

//call stack definition: a place where the computer stores context.

function greet(who) {
    console.log("hello " + who)
}
greet("Harry")
console.log("Bye");

/* 
    - the call to greet causes control to jump to the start of that function (line 100)
    - it calls console.log, which takes control, does its job, and then returns contorl to line 100
    - then it reaches the end of teh greet function , so it return to the place that called it, at line 102
    - the line after that cals the console.log again

    top
        greet
            console.log
        greet
    top
        console.log
    top
*/

//=========================================
//      CLOSURE
//=========================================

//What happens to local variables when the function call that created them is no longer active?

function wrapValue(n) {
    var localVar = n;
    return function() { return localVar};
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);

console.log(wrap1());
// 1
console.log(wrap2());
//2

/* 
    - the variable can still be accessed
    - local variables rare re-created for every call - difference calls can't trample on one another's local variables

    CLOSURE: being able to reference a specific instance of local variables in an enclosing function 

    the local variable from the wrapvalue example isn't needed since a parameter itself is a local variable


*/

//this example is a way toi create functions that multiply  by an arbitrary amount
// arbitrary: based on random choice or personal whim, rather than any reason or system

function multiplier(factor) {
    return function(num) {
        return num * factor;
    };
}

var twice = multiplier(2);
console.log(twice(5));
//1

/*

    -  A GOOD MENTAL MODEL IS TO THINK OF THE WORD function KEYWORD AS "FREEZING" THE CODE IN ITS BODY AND WRAPPING IT
        INTO A PACKAGE (THE FUNCTION VALUE)
    -  SO WHEN YOU READ return function(...) {...}, THINK OF IT AS RETURNING A HANDLE TO A PIECE OF COMPUTATION, FORZEN FOR LATER USE

*/


//=========================================
//      RECURSIONS
//=========================================

// RECURSIVE: a function that calls itself

function power(base, exponent) {
    if (exponent == 0) {
        return 1;
    }
    else {
        return base * power(base, exponent - 1);
    }
}

console.log(power(2,3))
// 8

/*

    - the example above is 10x slower that the looping version
    
    -  IMPORTANT!!! DO NOT WORRY ABOUT EFFICIENCY UNTIL YOU KNOW FOR SURE THAT THE PROGRAM IS TOO SLOW. 
        IF IT IS, FIND OUT WHICH PARTS ARE TAKING UP THE MOST TIME, AND START EXCHANGING ELEGANCE FOR EFFICIENCY
        IN THOSE PARTS.

*/

// RECURSIVE SOLUTION

function findSolution(target) {
    function find(start, history) {
        if (start == target) {
            return history
        } else if (start > target) {
            return null;
        } else {
            return find(start + 5, "(" + history + " +5)") ||
                find(start * 3, "(" + history + " * 3)");
        }
    }
    return find(1, "1")
}

console.log(findSolution(24));

/*

    - the inner function find does the actual recursing
    - it takes two arugments - the current number and a string that records how we reached the number
    - and returns eitehr a string that shows how to get to the target or null

    -to do this, the function peforms one of three actions
        1. if the current number is the target
        2. the current number is greater  than the target
        3. the current history is a way to reach that target, so it simply returns it
        4. if the current number is greater than the target there's no sense in further exploring this history
            since both add and multilying will only make the number bigger
        5. If we're still below teh target, the functino tries both possible paths and start from the current number,
            by calling itself twice, once for each of teh allowed next steps.

*/

//=========================================
//      GROWING FUNCTIONS
//=========================================

/*

    - THERE ARE TWO MORE OR LESS NATURAL WAYS FOR FUNCTIONS TO BE INTRODUCED IN PROGRAMS

    1. You find yourself writing very similar code multiple times
        - to avoid that we:
            1. take the repeated functionality, 
            2. find a good name for it, 
            3. and put it into a function
    
    2. You find you need some more functionality that you haven't written yet and that sounds like it deserves its own function
        - you'll start
            1. by naming the function
            2. write its body

*/

// How difficult it is to find a good name for a function is a good indication of how clear a concept it is that you're trying to wrap

//this program prints two numbers, the numbers of cows and chickens on a farm, with the word Cows and Chickens after them,
// and zeros padded before both numbers so that they are always three digits

/*

007 COWS

011 Chickens

*/

function printFarmInventory(cows, chickens) {
    var cowString = String(cows);
    //adding .length after string value gives us the length of that string
    while (cowString.length < 3) {
    //the while loop keeps adding zeros in front of the number strings until they are at least three characters long
        cowString = "0" + cowString;
        console.log(cowString + "Cows")
    };

    var chickenString = String(chickens);
    while (chickenString.length < 3) {
        chickenString= "0" + chickenString;
        console.log(chickenString + "Chickens");
    };
}

printFarmInventory(7,11);

// so what if the farmer adds pigs when are starting to add labels to invoice the farmer

//new solution

function zeroPad(number, width) {
    var string = String(number);
    while (string.length < width) {
        string = "0" + string;
    }
    return string;
}

function printFarmInventory( cows, chickens, pigs) {
    console.log(zeroPad(cows, 3) + " Cows");
    console.log(zeroPad(chickens, 3) + " Chickens");
    console.log(zeroPad(pigs, 3) + " Pigs");
}

printFarmInventory(7, 16, 3);
