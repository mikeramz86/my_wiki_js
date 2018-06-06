
//=========================================
//     CHAPTER 2; PROGRAM STRUCTURE
//=========================================

//=========================================
//      EXPRESSIONS AND STATEMENTS
//=========================================

//Expression: a fragment of code that produces a value
// Statement: Corresponds to a full sentence

1;
!Fale;

//=========================================
//      VARIABLES
//=========================================
//Variables: catch and hold values

var caught = 5 * 5;

// After a variable has been defined, its name can be used as an expression

var ten = 10;
console.log(ten * ten);
//result > 100


//a single var statement may define multiple variables. the def must be seperated with comments
var one =1, two = 2;
console.log(one + two);
// result > 3

//=========================================
//      ENVIRONMENT
//=========================================


//environment: variables and their values that eist at a given time


//=========================================
//      FUNCTION
//=========================================

//Function: is a piece of program wrapped in a value
// INVOKING, CALLING, APPLYING: executing a function
// values given to functions are called arguments


//=========================================
//      CONSOLE.LOG 
//=========================================

//console.log: writes out its arguments to some text output device (example: google chrome inspect dev tool)
//console.log is an espression that retrieves the log property from teh value held by the consoel variable

var x = 30;
console.log('the value of x is', x);
// Result > the value of x is 30

//=========================================
//      RETURN VALUES
//=========================================

//Functions may also produce values, and in that case they don;t need to have a sie effect to be useful
//when a function produces a value, it is said to return that value
console.log(Math.min(2,4) + 100);
//Result > 102

//=========================================
//      PROMPT AND CONFIRM
//=========================================

//CONFIRM FUNCTION: returns a Boolean: true if the user clicks OK and false if the user clicks cancel

confirm("shall we, then?");

//PROMPT FUNCTION: can be used to ask an open question


//=========================================
//      CONTROL FLOW
//=========================================

//IMPORTANT: when your program contains more than one statement, the statements are executed, predictably, form top to bottom

var theNumber = Number(prompt('pick a number', ""));
alert("Your number is the square root of " + theNumber * theNumber);

//=========================================
//      CONDITIONAL EXECUTION (IF, ELSE IF, ELSE SATEMENTS)
//=========================================

//CONDITIONAL EXECUTION: we choose between two different routes based on a Boolean value

// it is written with an if
var theNumber = prompt("Pick a number", "");
if (!isNaN(theNumber))
    alert("Your number is teh square rool of " + theNumber + theNumber);

// else: can be used together with if to create two seperatie alternative execution paths

var theNumber = prompt("Pick a number", "");
if (!isNaN(theNumber))
    alert("Your number is teh square rool of " + theNumber + theNumber);
else
    alert("Hey. YOu didn't give me a number!");

// If there are more than two paths to choose from, multiple if/else pairs can be "chained" together

var num = Number(prompt("Pick a number", "0"));

if (num <10)
    alert("small")
else if (num < 100)
    alert("Medium");
else
    alert("large");

//=========================================
//      WHILE AND DO LOOPS
//=========================================

/*LOOPING CONTROL FLOW ALLOWS US TO GO BACK TO SOME POINT IN THE PROGRAM WHERE WERE BEFORE AND
REPEAT  IT WITH OUR CURRENT PROGRAM STATE */

// WHILE LOOP------------

var number = 0;
//while creates the loop
// it is followed by an expression in parentheses and then a statement
while (number <= 12) {
    console.log(number);
    number = number +2;
}

/* 
    - Whenever we need to execute multiple statements inside a loop, we wrap them in braces. {and}

    - Braces do for statements what parentheses do for expressions: they group them together, making them count a single statement

    - BLOCK: a sequence of statments wrapped in braces 

*/

//DO LOOP------

/*

do loops is a control structure that is similar to while loop. The difference, a do loop always executes its body at least once, 
and it starts testing whether it should stop only after the first execution. 

*/

do {
    var yourName = prompt("Who are you?");
} while (!yourName);
console.log(yourName)

//=========================================
//      FOR LOOPS
//=========================================

//FOR LOOPS: a slightly shorter and more comprehensive control structure

for (let num = 0; num <= 12; num = num +2)
    console.log(num);

/*
    - first semicolon: initializes the loop, usually by defining a variable
    - second semicolon: is the expression that checks whether the loop must continue
    - final part: updates teh state of the loop afer every iteration
*/

//=========================================
//      BREAKING OUT OF A LOOP
//=========================================

//there is a special statement called break that has teh effect of immediately jumping out of the enclosing loop

for ( let current = 20; ; current++) {
    if (currenbt % 7 == 0)
    break;
}

console.log(current);
// result > 21

//=========================================
//     UPDATING VARIABLES SUCCINGTLY
//=========================================

//definion of succint: briefly and clearly expressed

counter = counter + 1;

//javascript provides a shortcut for this

counter +=1;

//there are even shorter equivalents

counter++

//=========================================
//     DISPATCHING ON A VALUE WITH SWITCH
//=========================================

//it is common for code to look like this:

if (variable == "value1") action1();
else if (variable == "value2") action2();
else if (variable == "value3") action3();
else defaultAction();

//SWITCH: it is a construct that is intended to solve such a "dispatch" in a more direct way

//example:
switch (prompt("what is the weather like?")) {
    //you may put any number of case labels inside the block opened by switch.
    //the program will jump to the label that corresponds to the value that switch was given or to a default 
    //if no matchin value is found
    case "rainy":
        console.log('remember to bring raincoat');
        break;
    case "sunny":
        console.log('dress lightly');
        break;
    case "cloudy":
        console.log('go outside');
        break;
    default:
        console.log('unknown weather type!');
        break;
}







