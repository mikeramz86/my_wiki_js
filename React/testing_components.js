//=========================================
//        HOW DOES ENZYME WORK?
//=========================================

//First we have to do a little bit of work to configure Enzyme. Take a look at src/setupTests.js:

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

//This file is run automatically before any tests. 
//It sets up an adaptor, which lets Enzyme know how to work with components made with a specific version of React.

//=========================================
//       STRUCTURE OF THE TEST
//=========================================

import React from 'react';
import {shallow, mount} from 'enzyme';

import AddForm from './add-form';

//You have a describe block, which is used to group your test cases. 
// The component name is used here to clearly identify which component is being tested
describe('<AddForm />', () => {
    //Inside the describe block you have a series of it blocks.
    //These are the individual test cases that render the component and check that it is behaving as expected.
    it('Renders without crashing', () => {
        shallow(<AddForm />);
    });

    it('Renders the add button initially', () => {
        const wrapper = shallow(<AddForm />);
        expect(wrapper.hasClass('add-button')).toEqual(true);
    });

    it('Should render the add form when editing', () => {
        const wrapper = shallow(<AddForm />);
        wrapper.instance().setEditing(true);
        wrapper.update();
        expect(wrapper.hasClass('add-form')).toEqual(true);
    });

    it('Should switch to editing when the add button is clicked', () => {
        const wrapper = shallow(<AddForm />);
        wrapper.simulate('click');
        expect(wrapper.state('editing')).toEqual(true);
    });

    it('Should fire the onAdd callback when the form is submitted', () => {
        const callback = jest.fn();
        const wrapper = mount(<AddForm onAdd={callback} />);
        const value = 'Foobar';
        wrapper.instance().setEditing(true);
        wrapper.update();
        wrapper.find('input[type="text"]').instance().value = value;
        wrapper.simulate('submit');
        expect(callback).toHaveBeenCalledWith(value);
    });

    it('Should not fire onAdd if the input is empty', () => {
        const callback = jest.fn();
        const wrapper = mount(<AddForm onAdd={callback} />);
        wrapper.instance().setEditing(true);
        wrapper.simulate('submit');
        expect(callback).not.toHaveBeenCalled();
    });
});


//=========================================
//       SHALLOW RENDERING
//=========================================

it('Renders without crashing', () => {
    shallow(<AddForm />);
});

/*

    - the test uses an Enzyme's shallow function
    - If the component renders without throwing an error, then the test will pass

    - THIS IS AN EXAMPLE OF SMOKE TEST!!!!

    - The shallow function uses a technique called shallow rendering
        -When you shallow render a component, you just render one

    - In addition to just rendering components, 
        the shallow function provides an API for manipulating the component and making assertions about its output. 

*/

//take a look at the next three tests, which cover how the component changes from a button to a form when it's clicked:

it('Renders the add button initially', () => {
    const wrapper = shallow(<AddForm />);
    expect(wrapper.hasClass('add-button')).toEqual(true);
});

/*

    - The first test shows how you can make assertions about DOM elements output by your component. 
    - Here, we are asserting that we see the button when the AddForm component is initially rendered. 
    - The rendered component, wrapper, has a similar API to jQuery for traversing and manipulating the output. 
    - In this case, we use the hasClass method to check that the root element output by AddForm has the class add-button.

*/

it('Should render the add form when editing', () => {
    const wrapper = shallow(<AddForm />);
    wrapper.instance().setEditing(true);
    wrapper.update();
    expect(wrapper.hasClass('add-form')).toEqual(true);
});

/*

    - The second test shows one of the ways to manipulate the component's output, 
        using .instance, which allows us to access instance methods on the component.
    - Calling .instance returns the instance of the React component. 
    - We use this to call the setEditing method, which updates the state of the component. When we call a method 
        which updates the state, Enzyme won't automatically rerender the component. 
    - To make sure it rerenders we call the .update() method.
    -  Then we can make assertions about its modified output. 
    - Here, we ensure that the root element has changed from the <div> with class add-button to the <form> with class add-form.

*/

it('Should switch to editing when the add button is clicked', () => {
    const wrapper = shallow(<AddForm />);
    wrapper.simulate('click');
    expect(wrapper.state('editing')).toEqual(true);
});

/*
    -  you can simulate DOM events using the simulate method to ensure that your component responds correctly to user interactions

    - you simulate a click on the add button, 
    - and then use the state method to check that the editing property of the component's state has been set to true. 
    
    Note: that Enzyme automatically checks for updates after simulating an event, so we don't need to call .update() here.

*/


//=========================================
//       FULL DOM RENDERING
//=========================================

/*

    - In full DOM rendering, the entire component including its children are rendered into an in-memory DOM. 

    - If the feature you are trying to test uses any of the following features or techniques, 
    then you will need to use full DOM rendering rather than shallow rendering:

                - Refs
                - Lifecycle methods
                - Directly interacting with DOM APIs


*/

// The code for submitting the AddForm uses refs to access the contents of the text input.

it('Should fire the onAdd callback when the form is submitted', () => {
    const callback = jest.fn();
    const wrapper = mount(<AddForm onAdd={callback} />);
    const value = 'Foobar';
    wrapper.instance().setEditing(true);
    wrapper.update();
    wrapper.find('input[type="text"]').instance().value = value;
    wrapper.simulate('submit');
    expect(callback).toHaveBeenCalledWith(value);
});

it('Should not fire onAdd if the input is empty', () => {
    const callback = jest.fn();
    const wrapper = mount(<AddForm onAdd={callback} />);
    wrapper.instance().setEditing(true);
    wrapper.simulate('submit');
    expect(callback).not.toHaveBeenCalled();
});


/*

    - Both tests start by using the jest.fn(what is jest.fn) method to make a spy
        - Spies are small functions that keep a record of each time they have been called. 
        - They are useful for testing callback functions.
        -  we use a spy to make sure that the component's onAdd callback is called correctly when the form is submitted.
    - After the spy is created, we use the mount method to render the component, passing in the spy as the onAdd prop.
    - The setEditing method is called so the form is rendered, then in the first test we find the text input, and set its value.
        - Notice how with full DOM rendering we can directly access the DOM node using the .instance() method 
        - and then manipulate it using .value as if we had an actual DOM node within a browser environment.
    - Finally we simulate a submit event, and check whether the spy has been called, depending on whether the text input was filled in.



*/




