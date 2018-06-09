
//=========================================
//     REACT AND REDUX
//=========================================


/*

-  how does that process fit in with your React components? There are two aspects to this problem. You need to be able to:

Display data from your state in your React components
Modify the state when your user interacts with your components

These problems are both solved by the React Redux library. 
React Redux contains utilities that help you link React components to the Redux store.

*/

//The first of these utilities is the Provider component. 
//This passes the Redux store down to any components that request access to part of it.

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Board from './components/board';
import store from './store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
      <Board />
  </Provider>,
  document.getElementById('root')
);

// Notice how the root component (Board) has been wrapped in the Provider component, and the store is passed as a prop of Provider.
// When the Provider is in place, components can access parts of the store, including the dispatch method, using the connect method.

// In the version of the Trello app which only used React, the Board component stored the array of lists in its state,
// and added a new list by calling this.setState:
export default class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: []
        };
    }

    addList(title) {
        this.setState({
            lists: [...this.state.lists, {title}]
        });
    }

    render() {
        const lists = this.state.lists.map((list, index) =>
            <li className="list-wrapper" key={index}>
                <List {...list}/>
            </li>
        );

        return (
            <div className="board">
                <h2>Example board</h2>
                <ul className="lists">
                        {lists}
                        <li>
                        <AddForm
                            type="card"
                            onAdd={text => this.addList(text)}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

//Compare this to the updated version which uses React Redux:

export class Board extends React.Component {
    addList(title) {
        this.props.dispatch(addList(title));
    }

    render() {
        const lists = this.props.lists.map((list, index) =>
        <li className="list-wrapper" key={index}>
            <List index={index} {...list} />
        </li>
        );

        return (
            <div className="board">
                <h2>Example board</h2>
                <ul className="lists">
                    {lists}
                    <li className="add-list-wrapper">
                        <AddForm
                            type="list"
                            onAdd={title => this.addList(title)}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

Board.defaultProps = {
    title: 'Board'
};

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(Board);

/*

- Take a look at the render method. 
- Notice how instead of the lists array being accessed through the Board's state, it is now accessed through its props. 

- So how does the component receive the lists prop? This is where React Redux's connect method comes in.

- connect takes a function as an argument which by convention is called mapStateToProps. 
- The mapStateToProps function describes how the different parts of the state should be inserted into the props of the component. 
- Each key in the returned object is a single prop that will be added to the wrapped component. 
- The value is the value that will be given to that prop. 

*/

/* For example, let's imagine that your state was the following object:

{
    user: {
        name: 'bknowles',
        password: 'uhohuhohuhohohnana'
    }
}

And imagine that you had a User component that took two props, username and password. 
You want to map the user.name part of the state to the username prop, and the user.password part of the state to the password prop. 

In this case, your mapStateToProps function should look like this:

const mapStateToProps = (state, props) => ({
    username: state.user.name,
    password: state.user.password
});

*/

/* 
In the Board example you say that the lists prop should contain the lists property of the Redux state (i.e., your array of lists).

Calling the connect function creates a factory, 
which when called returns a container component wrapping in this case the Board component.

In addition to inserting the props from mapStateToProps, 
the connect method also inserts the dispatch function by default as this.props.dispatch. 

This allows actions to be dispatched directly from the component. Instead of calling this.setState in the addList method, 
we call this.props.dispatch(addList(title)), dispatching the ADD_LIST action to be handled by the reducer.

Also notice how the default export has been switched: 
The connected version of the component is now the default export and the unconnected version becomes a named export. 

This is useful when it comes to testing as it allows you to import and test the unconnected version.

*/


//We do something similar with the List component to allow it to dispatch the ADD_CARD action:

/*
export class List extends React.Component {
    addCard(text) {
        this.props.dispatch(addCard(text, this.props.index));
    }

    render() {
        ...
    }
}

export default connect()(List);

*/

//Notice how you don't pass a mapStateToProps function to connect. 
//This means that only the dispatch prop will be added to the List component.


