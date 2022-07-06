// React uses components (blocks) to build App.

// This is the root App component, meaning it will run first.
// import core React library from react 
// import component class from react if you want to make a new class based component.
// We dont need to import component for functional components
import React, { Component } from 'react';

//  import the components we have made.
import Ninjas from './components/Ninjas';
import AddNinja from './components/AddNinja';
// we are not using curly brackets around these components {Ninjas}, bcoz they are exported as default.
import { SearchNinja } from './components/SearchNinja'

// Import various types of files u wanna use
import './App.css';


// We are creating a App class that extends Component class
//  Or You can say we are creating an App component and exporting it to index.js
//  Where ReactDOM will render it to actual DOM.

class App extends Component {

    // state holds all the data (properties)
    // only class components can have state.
    // we can pass state as props to other components
    // React provides useState() hook to functional components so they can also have their own state.

    state = {
        userName: 'Vinay Singh',
        age: 29,
        inputName: '',
        inputAge: '',
        ninjasArray: [
            { name: 'Vinay', age: '29', belt: 'black', id: 1 },
            { name: 'Rakesh', age: '31', belt: 'brown', id: 2 },
            { name: 'Musha', age: '34', belt: 'brown', id: 3 }
        ],
        searchInput: '',
    }

    // setState() the only method(way) to update state. Its an async method.
    handleChange = (e) => {
        this.setState({ inputName: e.target.value })
    }
    // Note - It doesn't immidiately update the state. It takes some time to do so.
    // think setState() as a request, react will decide when to update for best result.
    // setState() takes a callback function as second argument which will fire only after update complete.
    // setState ( {updater}, callback function)
    // as we know that state has been already updated (bcoz callback function has been fired)
    // for hot relaod we can call setState() again inside callback function to assign the updated value.
    liveChange = (e) => {
        this.setState({ inputAge: e.target.value }, function () {
            this.setState({ age: this.state.inputAge })
            console.log(this.state.inputAge);
        })
    }
    // React may batch multiple setState() calls into a single update for performance.
    // So setState() can also take a function as an only argument.
    // this function has two inbuilt arguments as previousState, previousProps 
    // setState(function(state,props))

    // NOTE -  onChange event in react is different than in the DOM
    // DOM fires onChange event when something rerenders.
    // But react onChange fires when value inside a input form changes.
    // So it helps to track the input value


    // NOTE - In React form submit event doesn't give you the final input value
    //  So you have to listen live change in input and store it somewhere.
    //  Then use that inputName here
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            userName: this.state.inputName,
        })
    }

    // We can define methods here that can be called from JSX ( JS + HTML ) template
    // Or we can pass these methods as props to other components.

    // Some Devs like to keep their JSX and javascript seprate as much as possible.
    // Otherwise we can define these methods right inside JSX.

    handleClick = (e) => {
        this.setState({
            userName: 'Donkey',
        })
    }

    handleCopy = (e) => {
        document.querySelector('.copy').textContent = 'Try to be Orignal Once'
    }

    // NOTE - One Importent feature of React is One way data flow.
    // So data can be passed to children compnenets but not the other way around.
    // That mean children components can't edit the data.
    // so we pass methods that can edit data to children components.

    addNinja = (ninja) => {
        // Directly editing ur Data is considered a bad practice
        // so lets make a copy of ninjasArray using spread operator
        let newNinjasArray = [...this.state.ninjasArray]

        // Lets add a unique id to ninja object we recieved as parameter
        // React need a key for each item of array. This id will be assigned as key.
        // If array length is 0 than this will give error. Its just a basic example to add id.
        ninja.id = newNinjasArray[newNinjasArray.length].id + 1;

        // Now Append ninja to newNinjaArray
        newNinjasArray.push(ninja);

        // Now lets replace this array with orignal array
        this.setState({
            ninjasArray: newNinjasArray
        })
    }

    deleteNinja = (id) => {
        let filteredNinjasArray = this.state.ninjasArray.filter((ninja) => {
            return ninja.id !== id
        })
        this.setState({
            ninjasArray: filteredNinjasArray
        })
    }

    searchNinja = (input) => {
        this.setState({ searchInput: input })
    }


    // Inside render() method we return our JSX ( JS + HTML ) template.
    // in JSX we use className for class attribute of HTML
    // Some other HTML attributes also have different names in JSX.
    // There can be only 1 root HTML element in React Component.
    // In JSX, JavaScript statements can be written inside curly brackets
    // JSX makes it super easy to add events(synthetic events).

    render() {

        // To filter out ninja searches
        // It was not working inside searchNinja() method.
        const filteredNinjas = this.state.ninjasArray.filter(ninja => {
            return ninja.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
        })

        return (
            <div className="App">
                <h1>Hello World</h1>
                <h3>My name is {this.state.userName} and i am {this.state.age} years old.</h3>
                <button onClick={this.handleClick}>Change User</button>
                <h4 onCopy={this.handleCopy} className="copy">Do Not Copy Me Plz</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} />
                    <button type="submit">Add Your Name</button>
                </form>
                <input type="number" onChange={this.liveChange} placeholder="Age with Live Changes" />
                <br /><br /><br />
                {/* Adding a component to our template */}
                <SearchNinja searchNinja={this.searchNinja} />
                {/* Passing state and a delete function as prop */}
                <Ninjas ninjasArray={filteredNinjas} deleteNinja={this.deleteNinja} />
                {/* Passing function as prop */}
                <AddNinja addNinja={this.addNinja} />
            </div>
        )
    }
}

export default App;
