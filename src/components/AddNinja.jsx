import React, { Component } from 'react';

class AddNinja extends Component {
    state = {
        name: null,
        age: null,
        belt: null,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Function As Prop
        // Here we call the function we got as prop and pass the ninja object
        this.props.addNinja(this.state);
    }

    render() {
        return (
            <div className='AddNinja'>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="name" placeholder='Name' onChange={this.handleChange} />
                    <input type="text" id="age" placeholder='Age' onChange={this.handleChange} />
                    <input type="text" id="belt" placeholder='Belt' onChange={this.handleChange} />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

export default AddNinja;