//=========================================
//       AJAX IN REACT AND HOW IT WORKS
//=========================================

//=========================================
//       HOW IT WORKS
//=========================================

/*-----------------------------------------------server/server.js------------- */


const express = require('express');
// we are now using the CORS middleware to allow cross-origin AJAX requests.
// Here the client is running on http://localhost:3000, and the API is running on http://localhost:8080.

const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

const app = express();

//To allow clients on different domains to make requests to our API server,
// we need to enable cross origin resource sharing (CORS).
//example, all we need to do is configure our app to send the right headers with every response:
//CLIENT_ORIGIN controls which domain is allowed to access our API. It's configured in server/config.js:
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

const board = {
    lists: [
        {
            title: 'Example list 1',
            cards: [
                {
                    text: 'Example card 1'
                },
                {
                    text: 'Example card 2'
                }
            ]
        },
        {
            title: 'Example list 2',
            cards: [
                {
                    text: 'Example card 1'
                },
                {
                    text: 'Example card 2'
                }
            ]
        }
    ]
};

app.get('/api/board', (req, res) => {
    res.json(board);
});

app.listen(8080);

/*-----------------------------------------------server/config.js------------- */

//CLIENT_ORIGIN controls which domain is allowed to access our API. It's configured in server/config.js:

module.exports = {
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
};


//=========================================
//       LIFECYLCLE METHOD
//=========================================

//Lifecycle methods solve this problem; they provide methods that are triggered at the different stages of a React 
//component's lifetime. We override these methods to run our own code at a certain stage. 

/*-----------------------------------------------client/components/board.js------------- */

import React from 'react';

import {API_BASE_URL} from '../config';
import List from './list';
import AddForm from './add-form';

import './board.css';

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            error: null,
            loading: false
        };
    }
//The componentDidMount method is a lifecycle method that is triggered as soon as the component is mounted 
//(i.e., it becomes part of the DOM). When this happens, we call the this.loadBoard method, 
//which makes the AJAX request to the server.
    componentDidMount() {
        this.loadBoard();
    }

    loadBoard() {
        this.setState({
            error: null,
            loading: true
        });
//makes the AJAX request in the loadBoard method. This loads a board's state from the API, using Fetch:
//After the board mounts, it makes a request to the /api/board endpoint. 
//The idea is that we set API_BASE_URL in a single place in our app (in this case, client/config.js), 
//and then any place our code needs to make a call to the API, it can import API_BASE_URL from our config (look down below)
        return fetch(`${API_BASE_URL}/board`)
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json();
            })
            .then(board =>
                this.setState({
                    lists: board.lists,
                    loading: false
                })
            )
            .catch(err =>
                this.setState({
                    error: 'Could not load board',
                    loading: false
                })
            );
    }

    addList(title) {
        this.setState({
            lists: [...this.state.lists, {title, cards: []}]
        });
    }

    addCard(text, listIndex) {
        this.setState({
            lists: this.state.lists.map((list, index) => {
                if (index !== listIndex) {
                    return list;
                }
                return Object.assign({}, list, {
                    cards: [...list.cards, {text}]
                });
            })
        });
    }

    render() {
        let body;
        if (this.state.error) {
            body = (
                <div className="message message-error">{this.state.error}</div>
            );
        } else if (this.state.loading) {
            body = (
                <div className="message message-default">Loading board...</div>
            );
        } else {
            const lists = this.state.lists.map((list, index) => (
                <li className="list-wrapper" key={index}>
                    <List
                        index={index}
                        {...list}
                        addCard={(text, index) => this.addCard(text, index)}
                    />
                </li>
            ));
            body = (
                <ul className="lists">
                    {lists}
                    <li className="add-list-wrapper">
                        <AddForm
                            type="card"
                            onAdd={text => this.addList(text)}
                        />
                    </li>
                </ul>
            );
        }

        return (
            <div className="board">
                <h2>{this.props.title}</h2>
                {body}
            </div>
        );
    }
}

Board.defaultProps = {
    title: 'Board'
};

/*-----------------------------------------------client/config.js------------- */

export const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

