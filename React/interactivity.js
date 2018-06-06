//=========================================
//        INTERACTIVITY
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

    onSubmit(event) {
        //First, this finds the value typed into the <input> DOM element, accessing it via this.textInput. 
        event.preventDefault();
        const text = this.textInput.value.trim();
        console.log(text);
        // TODO: Add the card or list
        this.textInput.value = '';
    }

    setEditing(editing) {
        //This uses the this.setState method of React components to modify the editing property of the state, 
        //setting it to true or false according to the editing parameter.
        this.setState({
            editing
        });
    }

    //If the state.editing property is set to false, we render a button that says "Add a card..." or "Add a list...". 
    //Otherwise, the function continues to render a form for entering the contents of a card, or the title of a list.
    render() {
        if (!this.state.editing) {
            const text = `Add a ${this.props.type}`;
            return (
                <div className="add-button"
                    onClick={() => this.setEditing(true)}>
                    <a href="#">{text}...</a>
                </div>
            );
        }
        const label = `Enter a ${this.props.type}`;
        return (
            <form className="card add-form" onSubmit={(e) => this.onSubmit(e)}>
                <input
                    type="text"
                //The ref prop has a special meaning in React. 
                //As soon as the component is rendered, a callback passed to the ref prop will be called, 
                //passing the corresponding DOM node as an argument to the callback. 
                //This allows you to directly access the DOM node within your component. 
                //So in this case, we use the ref to provide access to the <input> element via the this.textInput property.
                    ref={input => this.textInput = input}
                //This style of input is known as an uncontrolled input. 
                //Using an uncontrolled input with a ref provides a quick way to access and make simple changes to a form field. 
                    aria-label={label}
                />
                <button>Add</button>
//The final piece of the puzzle for our Trello component is the "Cancel" button, which should switch back to displaying the "Add a card..." button:
                <button type="button" onClick={() => this.setEditing(false)}>
                    Cancel
                </button>
            </form>
        );
    }
}


//=========================================
//        CONTROLLED INPUTS
//=========================================

//Controlled inputs store their values as part of the state. 
//Whatever is held in the state is displayed as the value of the input, and whenever the input is changed, 
//the state is updated to reflect this. 
//Using a controlled input means that the value typed in the form and the value held in the state are always in sync with each other.

import React from 'react';

import './add-form.css';

export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            text: ''
        }
    }

    //Because the value of controlled inputs is stored in the state, it is then simple to use that value and update whenever you need to. 
    //In the submit handler we simply log out the value stored in the text property of the state, 
    //and use the setState method to clear the input:
    onSubmit(event) {
        event.preventDefault();
        const text = this.state.text;
        console.log(text);
        // TODO: Add the card or list
        this.setState({
            text: ''
        });
    }

    //there is a new property in the state called text.
    setText(text) {
        //The value property is set to this.state.text. 
        //This means that the value that is displayed in the input will always be whatever is contained within the state. 
        //If you were to comment out the onChange prop then the input would be fixed at a certain value. 
        //Even if you typed in the input, the value would not change, because the state would remain the same.
        this.setState({
            text
        })
    }

    setEditing(editing) {
        this.setState({
            editing
        });
    }

    render() {
        if (!this.state.editing) {
            const text = `Add a ${this.props.type}`;
            return (
                <div className="add-button"
                    onClick={() => this.setEditing(true)}>
                    <a href="#">{text}...</a>
                </div>
            );
        }
        const label = `Enter a ${this.props.type}`;
        return (
            <form className="card add-form" onSubmit={(e) => this.onSubmit(e)}>
                <input type="text" 
                    value={this.state.text}
                    //The onChange event handler is responsible for updating the state when you type in the input, 
                    //which means that the value displayed in the input gets updated.
                    onChange={e => this.setText(e.target.value)}
                    aria-label={label}
                />
                <button>Add</button>
                <button type="button" onClick={() => this.setEditing(false)}>
                    Cancel
                </button>
            </form>
        );
    }
}

/*
TWO THINGS NEEDED TO SET IN AN ORDER OF AN INPUT

1. A value prop set to equal a value stored somewhere in your application's state.
2. on onChange prop which updates the value in the state when you interact with the input.

*/