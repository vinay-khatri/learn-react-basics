import React from 'react';

//  This is a functional component or stateless component.
//  No need for their own state and render() method.
//  Note - With useState hook we can have state inside function components as well.

// You can destructure passed props direct in thier arguments by using curly brackets.
const Ninjas = ({ ninjasArray, deleteNinja }) => {

    const ninjaList = ninjasArray.map(ninja => {
        return <div className="ninja" key={ninja.id}>
            {/* Don't forget to give unique key to each item of array */}
            <div>Name: {ninja.name}</div>
            <div>Age: {ninja.age}</div>
            <div>Belt : {ninja.belt}</div>
            {/* always call a function with parameter inside an anonymous function  */}
            {/* so it doesn't trigger automatically */}
            <button onClick={() => { deleteNinja(ninja.id) }}>Delete</button>
            <br /><br />
        </div>
    });

    // console.log(ninjaList)

    return (
        <div className='ninja-list'>
            <h2>Our Ninjas</h2>
            {ninjaList}
        </div>
    );
}

export default Ninjas;