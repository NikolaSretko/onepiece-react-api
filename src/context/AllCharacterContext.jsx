import React, { createContext, useContext, useEffect, useState } from "react";

const CharacterContext = createContext();

const CharacterProvider = ({ children }) => {
    const [characterData, setCharacterData] = useState([]);

    useEffect(() => {
        const getAllCharacters = () => {
            fetch('https://api.api-onepiece.com/v2/characters/en')
                .then(response => response.json())
                .then(data => {

                    setCharacterData(data);
                })
                .catch(error => {
                    console.error('Fehler beim Laden der Daten', error);
                });
        };
    
        getAllCharacters();
    }, []);


    const contextValue = {
        characterData,
    };

    return (
        <CharacterContext.Provider value={contextValue}>
            {children}
        </CharacterContext.Provider>
    );
};

const useCharacterContext = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useCharacterContext muss innerhalb deines CharacterContext.Providers sein');
    }
    return context;
};

export { CharacterProvider, useCharacterContext };
