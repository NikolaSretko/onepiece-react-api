// App.js
import React from 'react';
import {  Route, Routes,  } from 'react-router-dom';
import CharacterList from './components/allcharacters/CharactersList';
import CharacterDetails from './components/allcharacters/FruitDetails';

const App = () => {
    return (
        <Routes>
                <Route path="/" element={<CharacterList/>} />
                <Route path="/character/:id" element={<CharacterDetails/>} />
        </Routes>
    );
};

export default App;
