//==========================
//         COMPONENTS
//==========================


export default function Card() {
    const text  = 'Example card';
    return (
        <div className="card">
            {text}
        </div>
    );
};

//Card is this module's default export: its the main object that you want to be able to access from the module

//{text} will access the text variable.

//Also notice how you substitute the attribute className for the standard CSS class attribute. 
//This is because React uses the property names when modifying HTMLElement objects from JavaScript 
//rather than the HTML attribute names.


//=========================================
//         COMPONENTS in Components
//=========================================

import List from './list';

// ... other imports

export default function Board() {
    return (
        <div className="board">
            <h2>Example board</h2>
            <ul className="lists">
                <li className="list-wrapper">
                    <List />
                </li>
                <li className="list-wrapper">
                    <List />
                </li>
                <li className="list-wrapper">
                    <List />
                </li>
            </ul>
        </div>
    );
}

//React components can also be stored as variables and subsequently rendered.

export default function List() {
    const cards = [];
    for (let i = 0; i < 3; i++) {
        cards.push(
        <li>
            <Card />
        </li>
        );
    }
    return (
        <div>
            <h3>Example list</h3>
            <ul className="list">
                {cards}
            </ul>
        </div>
    );
}

//Note that if you try to make that change you will see a warning in the console 
//telling you that each child should have a key prop.

//=========================================
//         RENDERING COMPONENTS
//=========================================

import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import './index.css';

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);

//After importing the Board component, we call the ReactDOM.render function. 
//The first argument is the root component that you want to render
//second argument is the place you want it to render to. 
//So here it renders the Board component in the element
// with an id of root: this is a <div> which you can find in the public/index.html file.


//=========================================
//         STATEFUL COMPONENTS
//=========================================

export default class Card extends React.Component {
    render() {
        const text  = 'Example card';
        return (
            <div className="card">
                {text}
            </div>
        );
    }
}

//Stateful components can be used to store the component's state 
//(i.e. the values that describe what the contents and behavior of the component should be, and can change over time).

export default class Card extends React.Component {
    render() {
        const text  = 'Example card';
        return (
            <div className="card">
                {text}
            </div>
        );
    }
}

//Rather than just being pure functions, stateful components are classes that contain a render method.
// The render method does the same thing as the stateless component.

//=========================================
//        STYLING COMPONENTS
//=========================================

//The stylesheets are imported in the component's JavaScript.

import './card.css';

//Any CSS which is imported will be bundled together to create the final set of styles for the app. 
//Having a separate CSS file for each component allows us to modularize the CSS, 
//splitting the rules into small chunks related to a single component instead of having a single file containing a jumble of different rules.

export default function Card() {
    const text  = 'Example card';

    const style = {
        background: '#FAFAFA',
        marginBottom: '8px',
        padding: '8px',
        borderRadius: '4px'
    };

    return (
        <div className="card" style={style}>
            {text}
        </div>
    );
};

//The styles are declared as a JavaScript object, and applied to the div by directly setting the style attribute. 
//Notice how you use the DOM notation for the CSS property names, for example marginBottom rather than 'margin-bottom'.

