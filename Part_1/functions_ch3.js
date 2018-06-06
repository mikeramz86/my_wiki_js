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
