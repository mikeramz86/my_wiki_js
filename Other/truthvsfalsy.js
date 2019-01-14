//=========================================
//     TRUTHY AND FALSY
//=========================================

/*

The following values are always falsy:

- false
- 0 (zero)
- '' or "" (empty string)
- null
- undefined
- NaN

Everything else is truthy. That includes:

- '0' (a string containing a single zero)
- 'false' (a string containing the text “false”)
- [] (an empty array)
- {} (an empty object)
- function(){} (an “empty” function)
- A single value can therefore be used within conditions, e.g.

*/

if (value) {
    // value is truthy
  }
  else {
    // value is falsy
    // it could be false, 0, '', null, undefined or NaN
  }

