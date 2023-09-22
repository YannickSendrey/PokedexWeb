import React from 'react';
import { Outlet } from 'react-router-dom';

export const Header = () => {


    return (
        <>
            <header>
                <img src="/assets/pokeball.svg" alt="Pokeball Logo" width="50px"/>
                <h1>PokedexWeb</h1>
                <button>{/* login or logout check if user is connected */}Login/Logout</button>
            </header>
            <Outlet /> {/* outlet is used in react-router to display the rest of our page below our header */}       
        </>


    )
}