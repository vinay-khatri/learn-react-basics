import React from 'react';

export const SearchNinja = ({ searchNinja }) => {

    return (
        <input type="search" onChange={(e) => { searchNinja(e.target.value) }} placeholder="Search Ninja" />
    )
};