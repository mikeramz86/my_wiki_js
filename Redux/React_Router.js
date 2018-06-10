//=========================================
//     REACT ROUTER
//=========================================

/*

https://reacttraining.com/react-router/

React Router is a library for React that allows you to render different 
components depending on which URL you have visited. 

For example, if you visited the /about route you could render an AboutMe component,
 and if you visited the /portfolio route you could render the Portfolio component.

https://glitch.com/edit/#!/redux-trello-router2?path=README.md:1:0
*/

//=========================================
//     Defining routes
//=========================================

//This is the new root component, which contains the top navigation bar which displays when you are on any page:

import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './home';
import Board from './board';

export default function App(props) {
    return (
        <Router>
            <div className="app">
                <header>
                    <h1><Link to="/">Trelloish</Link></h1>
                </header>
                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/board/:boardId" component={Board} />
                </main>
            </div>
        </Router>
    );
}

/*

    - Here we import a number of components from React Router. 
    - The BrowserRouter component needs to wrap all of your routes. 
    - It is responsible for handling the browser history 
        (i.e., what happens when you click the back or forward buttons in your browser). 
    - There are different versions of the Router component. 
    - BrowserRouter routes based on the URL in the browser's address bar.

    - Inside the App component you define routes using the Route. 
    - The Route component requires two props, path, which is the path to match against, 
        and component, which is the component to display when the path is matched. 
    - You can have as many Route components as you like, each displaying a different component. 
    
   - In this case, visiting / will display the Home component, and visiting /board/:boardId will display the Board component.

    - Notice how each route is also given the exact prop. 
    - This specifies that the route has to exactly match in order for the component to display.
    
*/

//Imagine that we had a Route that had been defined without the exact prop:
<Route path="/portfolio" component={Sidebar} />

//In this case the Sidebar component would be displayed if the user visited /portfolio, 
//but it would also display for partial matches, 
//for example if the user visited /portfolio/react-capstone or /portfolio/capstones/react. 
//This is useful when you want a particular component to display for a subset of pages.

//=========================================
//     VARIABLE ROUTES
//=========================================

/*

The Board route uses a variable segment as part of its route. 
This is the section of the route which starts with a colon, and will match any string. 

For example, the route /board/:boardId would match the URL /board/11 or /board/moon-unit

*/

// Parameters which match variable segments are passed to the component by React Router in the props.match.params object. 
//For example, in the Board component when we add a new list, 
//we use this information to instruct the reducer to add the list to the correct board:

export class Board extends React.Component {
    addList(title) {
        this.props.dispatch(addList(title, this.props.match.params.boardId));
    }

}

//=========================================
//     Navigating with Link
//=========================================


/*

To navigate between different routes with links you should use React Router's <Link> component instead of <a> tags. 
This ensures that the transition doesn't involve completely reloading the page.
 Instead it just changes the currently displayed component. 
 The <Link> component takes a to prop, which is the equivalent to the href attribute of an <a> tag. 
 
 For example, in src/components/app.js we use this to link back to the front page:

*/

export default function App(props) {
`    return (
        ...
                <h1><Link to="/">Trelloish</Link></h1>
        ...
    );`
};

//=========================================
//    Navigating Programatically
//=========================================

/*

On occasion you will also need to navigate programatically; 
you will need some JavaScript code which carries out the task of redirecting you to a different route. 

When React Router renders a component it passes in the history prop, which points to the <Router> component. 
This component has a push method which can be used to navigate to a different page.

We use this technique in the Home component to redirect to the board which the user has entered in the text box. 
The goToBoard method is called when the form on the front page is submitted:

*/
function
goToBoard(event) {
    event.preventDefault();
    this.props.history.push(`/board/${this.slugify(this.state.text)}`);
}

//Here we create the URL of the new board from the component's state, and use the push method to navigate programatically to that board.

