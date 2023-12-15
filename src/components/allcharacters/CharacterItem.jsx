import React from 'react';
import { useCharacterContext } from '../../context/AllCharacterContext';

const CharacterItem = ({ characterItem }) => {
    const { characterData } = useCharacterContext();

    if (!characterData) {
        return <div className="bg-white p-4 shadow-md rounded-md">Lade Daten...</div>;
    }

    const matchingCharacter = characterData.find(character => character.id === characterItem.id);

    if (!matchingCharacter) {
        return <div className="bg-white p-4 shadow-md rounded-md">Charakter nicht gefunden</div>;
    }

    const { fruit } = matchingCharacter;

    return (
        <article className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-2">{matchingCharacter.name}</h2>
            <p className="text-gray-600">{matchingCharacter.age}</p>

            {fruit && (
                <div className="max-h-200 overflow-y-auto">
                    <h3 className="text-lg font-semibold mt-2">Fruit Information</h3>
                    <p className="text-gray-600">Name: {fruit.name}</p>
                    <p className="text-gray-600">Description: {fruit.description}</p>
                    {fruit.filename && (
                        <div className="overflow-hidden">
                            <img
                                className="mt-2 w-full h-full object-fit-contain"
                                src={fruit.filename}
                                alt="Fruit Image"
                            />
                        </div>
                    )}
                </div>
            )}
        </article>
    );
};

export default CharacterItem;
