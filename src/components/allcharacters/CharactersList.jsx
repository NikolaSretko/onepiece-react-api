import React, { useState } from "react";
import { useCharacterContext } from "../../context/AllCharacterContext";
import { Link } from 'react-router-dom';

const CharacterList = () => {
    const { characterData } = useCharacterContext();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCharacters = characterData.filter((characterItem) =>
        characterItem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="m-6">
                <input
                    type="text"
                    placeholder="Suche nach Charakter..."
                    className="w-full px-4 py-2 border rounded-md"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {filteredCharacters.length > 0 ? (
                filteredCharacters.map((characterItem) => (
                    <div key={characterItem.id} className="mb-8">
                        <h2 className="text-xl font-bold mb-2">{characterItem.name}</h2>
                        <Link to={`/character/${characterItem.id}`} className="text-blue-800 mx-auto">
                            Details anzeigen
                        </Link>
                    </div>
                ))
            ) : (
                <h1 className="text-2xl font-bold text-center mt-8">
                    Keine passenden Charaktere gefunden.
                </h1>
            )}
        </section>
    );
};

export default CharacterList;
