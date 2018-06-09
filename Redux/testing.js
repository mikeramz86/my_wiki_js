//=========================================
//     Testing actions and reducers
//=========================================

//=========================================
//     Testing action CREATORS
//=========================================

/*
Action creators are the simplest pieces of Redux applications to test. 
The tests use an action creator to construct an action, and make sure that the details of the action are correct.
*/

//Take a look at the first two tests in src/actions/index.test.js:

describe('addList', () => {
    it('Should return the action', () => {
        const title = 'List title';
        const action = addList(title);
        expect(action.type).toEqual(ADD_LIST);
        expect(action.title).toEqual(title);
    });
});

describe('addCard', () => {
    it('Should return the action', () => {
        const text = 'Card text';
        const listIndex = 10;
        const action = addCard(text, listIndex);
        expect(action.type).toEqual(ADD_CARD);
        expect(action.text).toEqual(text);
        expect(action.listIndex).toEqual(listIndex);
    });
});

// In each case, we use the corresponding action creator to create an action, passing in some dummy data as the arguments. 
//We then assert that the type of the action and payload contents are correct.

//=========================================
//     Testing the reducer
//=========================================

/*

To test the reducer we set up an initial state, run actions through the reducer, 
and ensure that the modified state which is returned contains the correct values. 

All of the tests in src/reducers/index.test.js use this same technique, so let's just focus on a single test:
*/

describe('addCard', () => {
    it('Should add new cards', () => {
        let state = {
            lists: [list1, list2]
        };
        state = trelloReducer(state, addCard(card1Text, 0));
        state = trelloReducer(state, addCard(card2Text, 1));
        state = trelloReducer(state, addCard(card3Text, 1));
        expect(state).toEqual({
            lists: [{
                title: list1Title,
                cards: [card1]
            }, {
                title: list2Title,
                cards: [card2, card3]
            }]
        });
    });
});

/*

- Here, we set up an example state object using some dummy data, list1 and list2. 
- These are declared at the top of the test file. Then, we run the reducer, passing in an action. 
- In this case we are looking to test the if case for the ADD_CARD action, so we try adding three cards to the state, 
placing one in the first list and two in the second. 
-We then check that the resulting state contains the three cards in the correct places.

*/

//=========================================
//     Testing COMPONENTS
//=========================================


/*
Finally, let's take a look at the updates to the component tests. 

Mostly these have remained the same, but there are a couple of new techniques which we've introduced.
    - The first change relates to what we are testing. For the connected components
     we have changed the default export to be the connected version of the component. 
    - But we really want to be testing the unconnected version. Instead of importing the 
        default export (import List from './list';) we instead import the named export (import {List} from './list';), 
        which contains the unconnected component.

- Before the introduction of Redux, we had tests which made sure that we were modifying the state correctly 
when the user interacted with components. Now that the state is held in our Redux store, this isn't necessary. 
- Instead, we need to check that the components are dispatching the correct actions.

To test whether the correct actions are being dispatched, we can use a spy as the dispatch prop to the component which we want to test. 

*/

//For example, take a look at this test from src/components/list.test.js:

    it('Dispatches addCard from addCard', () => {
        const dispatch = jest.fn();
        const index = 2;
        const wrapper = shallow(
            <List cards={[]} index={index} dispatch={dispatch} />
        );
        const instance = wrapper.instance();
        const text = seedCards[0].text;
        instance.addCard(text);
        expect(dispatch).toHaveBeenCalledWith(addCard(text, index));
    });

/*

- Here, we inject a spy as the dispatch prop of the List component. 
- We then call the instance method which should trigger the dispatch of the action 
and check that the spy was called and that the action passed to dispatch matched our expectation.
*/
