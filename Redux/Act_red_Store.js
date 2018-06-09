//=========================================
//     ACTIONS
//=========================================

/*

- Actions are represented by simple objects that have a type property
    - type property's value is a string indicating the type of action being carried out
    -  Any additional properties are known as the action's payload

*/

export const action = {
    type: 'ADD_CARD',
    text: 'The content of the card',
    listIndex: 4
}

// To make errors due to typos easier to debug, these type strings are often separated out into a separate constant:

export const ADD_CARD = 'ADD_CARD';
export const action = {
    type: ADD_CARD,
    text: 'The content of the card',
    listIndex: 4
};

//=========================================
//     ACTION CREATORS
//=========================================

//Because actions should have consistent payloads, 
//it is also common to write action creator functions instead of creating the actions directly.

export const ADD_CARD = 'ADD_CARD';
export const addCard = (text, listIndex) => ({
    type: ADD_CARD,
    text,
    listIndex
});

// Use the action creator to create an action
const action = addCard('The content of the card', 4);

//Here, the addCard action creator returns an ADD_CARD action. 
//Similar to the type strings, this isn't strictly necessary, 
//but it helps to make sure that your actions are created consistently.


//=========================================
//     REDUCERS
//=========================================

// The simplest possible reducer looks like this:

const initialState = {};

export const reducer = (state=initialState, action) => {
    return state;
};

/*

- A reducer is just a function that takes two arguments. 
    1. The first is the current state, 
    2. and the second is an action. 

- Inside the reducer you construct an object that will be the new state, then return it from the function. 
- The returned value will then replace the state in your application. 
- Every time a new action is dispatched, the reducer will be run again, updating the state accordingly.

*/


//If the state argument passed to the reducer is undefined, 
// then it uses a default parameter to set an initial state. In this case we use an empty object. 
const initialState = {};

export const reducer = (state=initialState, action) => {
    return state;
};

//The initialState contains an array of lists, each of which contains an array of cards:

const initialState = {
    lists: [{
        title: 'Example list 1',
        cards: [{
            text: 'Example card 1'
        }, {
            text: 'Example card 2'
        }]
    }, {
        title: 'Example list 2',
        cards: [{
            text: 'Example card 1'
        }, {
            text: 'Example card 2'
        }]
    }]
};

//Now let's look at the reducer itself. The reducer has the following high-level structure:

export const trelloReducer = (state=initialState, action) => {
    if (action.type === actions.ADD_LIST) {
        // ... do something to generate new state
        return newState;
    }
    else if (action.type === actions.ADD_CARD) {
        // ... do something to generate new state
        return newState;
    }
    return state;
};

/*
    IMPORTANT!!!!!!!
    - The structure that is used here will be the same with every reducer that you write. 
    - You should set a default state, then have a series of if-else statements that handle the different action types. 
    - In each if block you generate and return the new state, modified according to the type of action.

    - If actions doesn't match any of the cases, we return the unmodified state. 
    - Applications often have more than one reducer each handling a different aspect of the state,
     so any single reducer won't necessarily handle all of the possible actions.
     -  Returning the unmodified state like this means that an action 
     which isn't handled by this reducer can still modify the unaltered state in a later reducer.

*/

//Now let's look at the body of the if statements. The case for the ADD_LIST action is the simpler of the two:

if (action.type === actions.ADD_LIST) {
    // ... here, Object.assign generates
    // a new state object by merging an object
    // representing the new state of the lists
    // to the existing state, and in turn, that resulting 
    // object into an empty object, which ensures
    // that we're not mutating the original state object,
    // which is a big no-no
    return Object.assign({}, state, {
        lists: [...state.lists, {
            title: action.title,
            cards: []
        }]
    });
}

/*

    - Here, we append an object representing our new list to the lists property of the state. 
    - In order to achieve this we use Object.assign and the array spread operator to avoid mutating either state or state.lists.

*/

/*

    - The Object.assign({}, state, newState) syntax mirrors the operation of this.setState within a component. 
    - It creates a new object (the first argument), copying over all of the properties of state, 
    then subsequently copying over all of the properties of newState. T
    - his means that in the new object, any properties of newState will override the properties of state, without mutating state itself.

*/


//In the newState object we have the lists property which is set to:

[
    ...state.lists,
    {
        title: action.title,
        cards: []
    }
]

/*

- Here, we are creating a new array (notice the standard [] array initialization syntax), 
copying in all of the contents of state.lists using the array spread operator, 
and adding a new object at the end of the array to represent our new list.

*/



export const trelloReducer = (state=initialState, action) => {
    if (action.type === actions.ADD_LIST) {
        return Object.assign({}, state, {
            lists: [...state.lists, {
                title: action.title,
                cards: []
            }]
        });
    }
    //The case for the ADD_CARD action is slightly more complex, but follows the same principle:
    else if (action.type === actions.ADD_CARD) {
        let lists = state.lists.map((list, index) => {
            if (index !== action.listIndex) {
                return list;
            }
            return Object.assign({}, list, {
                cards: [...list.cards, {
                    text: action.text
                }]
            });
        });

        return Object.assign({}, state, {
            lists
        });
    }
    return state;
};


/*

- Here, you map over the lists property of the state, creating a new array of lists. 
- When you reach the list index which you want to add the card to, you use the same combination of Object.assign 
and the array spread operator to append the new card to the cards array. 
- Finally, you use Object.assign to replace the lists property of the state with our new array of lists.


*/


//=========================================
//     STORES
//=========================================


/*

- A store keeps hold of the state, and allows you to dispatch actions that will modify the state. 
- The Redux architecture expects you to have a single store which contains all of your application state. 
- This makes it simple to synchronize your application's state with state stored in a database. 

*/

import {createStore} from 'redux'

import {trelloReducer} from './reducers';

export default createStore(trelloReducer);

//Here, you create a store using the createStore method, telling it to use the trelloReducer to handle any actions that are dispatched.


//=========================================
//     DISPATCHING ACTIONS
//=========================================

/*

-  The store object has two key methods that you need to know about. 
    1. The getState method allows you to inspect the current state held in the store. 
    2. And the dispatch method allows you to run actions through your reducer, modifying the store. 

*/

import * as actions from './actions';
import store from './store';

// Add a third list to the state
store.dispatch(actions.addList('Example list 3'));
// Add a card to the third list
store.dispatch(actions.addCard('Example card 1', 2));
// Logs out the state, with the list and the card added
console.log(store.getState());


/*

- Dispatching actions to the store is the sole way in which you modify state using Redux, 
    so you should get familiar with the flow of:

   -  Creating an action
    - Handling it in a reducer
    - Triggering it using dispatch

*/