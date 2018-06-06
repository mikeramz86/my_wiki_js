//=========================================
//       Communicating Between Components INTERACTIVITY
//=========================================

import React from 'react';

import './add-form.css';

export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    //After we have used our uncontrolled input ref to obtain the text the user entered, 
    //we check to see whether an onAdd prop has been passed to the component. 
    //This prop is a function passed to the component by its parent. 
    //If this prop has been supplied, we call it, passing the user's text as an argument.
    onSubmit(event) {
        event.preventDefault();
        const text = this.textInput.value.trim();
        if (text && this.props.onAdd) {
            this.props.onAdd(text);
        }
        this.textInput.value = '';
    }

    setEditing(editing) {
        this.setState({
            editing
        });
    }

    render() {
        if (!this.state.editing) {
            return (
                <div className="add-button"
                    onClick={() => this.setEditing(true)}>
                    <a href="#">Add a {this.props.type}...</a>
                </div>
            );
        }

        return (
            <form className="card add-form" onSubmit={(e) => this.onSubmit(e)}>
                <input type="text" ref={input => this.textInput = input} />
                <button>Add</button>
                <button type="button" onClick={() => this.setEditing(false)}>
                    Cancel
                </button>
            </form>
        );
    }
}

/*---------------------------------------------------------------------------PARENTS SIDE JS ----------------------------------- */

import React from 'react';

import Card from './card';
import AddForm from './add-form';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }
    //The addCard method uses this.setState to add the new card to the List:
    addCard(text) {
        this.setState({
            cards: [...this.state.cards, {
                text
            }]
        });
    }

    render() {
        const cards = this.state.cards.map((card, index) =>
            <li key={index}>
                <Card {...card} />
            </li>
        );
        return (
            <div>
                <h3>{this.props.title}</h3>
                <ul className="list">
                    {cards}
                    <li>
                        {/* The component passes a callback that calls the this.addCard method as the onAdd prop. 
                        This is the callback function that will be fired when the AddForm is submitted. */}
                        <AddForm
                            type="card"
                            onAdd={text => this.addCard(text)}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

List.defaultProps = {
    title: ''
};


/*
KEY PARTS OF THE PATTERN:

- The callback being passed from the parent (Board) to the child (AddForm) as a prop
- The child (AddForm) calling the callback in response to some user interaction
- The parent (Board) using the callback to update its state

*/
