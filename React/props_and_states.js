//=========================================
//        PROPS
//=========================================

//Conceptually, components are like JavaScript functions. 
//They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

// They comprise the information that a component is told about itself, 
//similar to the key-value pair properties of a conventional JavaScript object.

import React from 'react';

import './card.css';

export default function Card(props) {
    return (
        <div className="card">
            {props.text}
        </div>
    );
};

Card.defaultProps = {
    text: ''
};

//Rather than making text a constant, it is now pulled from the props argument passed into the component. 
//This props object will hold all of the props which are passed into a component.
//In stateful components, instead of props being passed as an argument to the render method, it is accessed through this.props. 

//Props are provided to components like HTML attributes. For example:

<Card text="Example card 1" />






//=========================================
//   Validating props with prop-types
//=========================================

//With prop-types you document the types of prop which you intend to pass to a component. 
//These will be checked against the actual values at runtime, logging a warning if the types do not match.

import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
    // Return some JSX...
}

Card.propTypes = {
    text: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        text: PropTypes.string
    })).isRequired
};

//The propTypes attribute of the component is set to an object that maps the names of the props to their types.
//In this example the text prop should be a string, the labels prop should be an array of strings, 
//and the comments prop should be an array of objects containing an author and some text.

//Also notice how each prop type has .isRequired appended. 
//This indicates that the prop must be supplied or have a default set, otherwise a warning will be logged. 
//If you don't append isRequired then the prop will be optional.


//=========================================
//        STATE
//=========================================

//The state is an object that is stored as part of a component and can be updated by the component itself. 

import React from 'react';

import Card from './card';

export default class List extends React.Component {
    //The component's initial state is set by assigning an object to the this.state variable in the component's constructor:
    constructor(props) {
        super(props);
        this.state = {
            cards: [{
                text: 'Example card 1'
            }, {
                text: 'Example card 2'
            }, {
                text: 'Example card 3'
            }]
        }
    }

//a component will receive an array of data from state or props, 
//and map over it to produce an array of child elements which are subsequently rendered:

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
                </ul>
            </div>
        );
    }
}

List.defaultProps = {
    title: ''
};

// TWO THINGS TO NOTE

//Firstly notice how the li around each Card is given a unique key prop. 
//This helps React to maintain the state of each component (
//for example, whether an <input> is focused) across multiple calls to the render function. 
//This will often correspond to the primary keys if you are displaying a list of information fetched from a database.

//Secondly notice how we use a spread operator to pass props to the Card component. T
//his takes the card object and uses the keys as prop names, and the values as the corresponding values. 

//The equivalent code without using the spread operator would look like this:

const cards = this.state.cards.map((card, index) =>
    <li key={index}>
        <Card text={card.text} />
    </li>
);