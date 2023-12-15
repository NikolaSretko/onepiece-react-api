import React from 'react';
import { NavLink, useParams, useNavigate, Link } from 'react-router-dom';
import { useCharacterContext } from '../../context/AllCharacterContext';

const CharacterDetails = () => {
    const { id } = useParams();
    const { characterData } = useCharacterContext();
    const navigate = useNavigate();  

    const character = characterData.find(character => character.id.toString() === id);

    if (!character) {
        return <div className="text-center mt-8">Charakter nicht gefunden</div>;
    }

    const { name, size, age, bounty, crew, fruit, job, status } = character;

    const handleGoBack = () => {
        navigate(-1);
    };

    const findYonkoCaptain = (characters) => {
        const yonkoCharacters = characters.filter(
            (character) => character.crew && character.crew.is_yonko
        );
        return yonkoCharacters.find((character) => character.job === 'Captain');
    };

    const yonkoCaptain = findYonkoCaptain(characterData);

    const getFellowCrewMembers = (character, characters) => {
        if (character && character.crew) {
            const crewId = character.crew.id;
            const fellowCrew = characters.filter((c) => c.crew && c.crew.id === crewId && c.id !== character.id);
            return fellowCrew;
        }
        return [];
    };

    const fellowCrewMembers = getFellowCrewMembers(character, characterData);

    return (
        <div className="container mx-a px-4 py-8 text-center bg-white border rounded-md shadow-md">
            <nav className="mb-4 text-left">
                <button
                    className="text-grey-600 hover:underline pr-2"
                    onClick={handleGoBack}
                >
                    Back
                </button>
                <NavLink
                    to="/"
                    className="text-grey-600 hover:underline"
                >
                    Home
                </NavLink>
            </nav>
            <h2 className="text-3xl font-bold mb-4">{name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border p-4 rounded-md shadow-md">
                    <p className="text-gray-600">Height: {size}</p>
                    <p className="text-gray-600">Age: {age}</p>
                    <p className="text-gray-600">Bounty: {bounty}</p>
                    <p className="text-gray-600">Job: {job}</p>
                </div>
                {yonkoCaptain && (
                    <div className="border p-4 rounded-md shadow-md">
                        {yonkoCaptain.id === character.id && yonkoCaptain.job === 'Captain' ? (
                            <h3 className="text-xl font-semibold m-auto">One of the 4 emperors</h3>
                        ) : (
                            <h3 className="text-xl font-semibold m-auto">Crewmember</h3>
                        )}
                    </div>
                )}

                {crew && (
                    <div className="border p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mt-4">Crew</h3>
                        <p className="text-gray-600">Name: {crew.name}</p>
                        <p className="text-gray-600">
                            Description: {crew.description || 'Keine Beschreibung vorhanden'}
                        </p>
                        <p className="text-gray-600">Number of members: {crew.number}</p>
                    </div>
                )}
                {fellowCrewMembers.length > 0 && (
                    <div className="border p-4 rounded-md shadow-md">
                        <h3 className="text-l font-semibold mt-4">Crewmembers</h3>
                        <ul>
                            {fellowCrewMembers.map((crewMember) => (
                                <li key={crewMember.id}>
                                    <Link to={`/character/${crewMember.id}`} className="text-grey-600 mx-auto">
                                        {crewMember.name} - {crewMember.job}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {fruit && (
                    <div className="border p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mt-4">Devil Fruit</h3>
                        <p className="text-gray-600">Name: {fruit.name}</p>
                        <p className="text-gray-600">Description: {fruit.description}</p>
                        <p className="text-gray-600">Typ: {fruit.type}</p>
                        {fruit.filename && (
                            <div className="overflow-hidden mt-2">
                                <img
                                    className="w-full h-full object-cover"
                                    src={fruit.filename}
                                    alt="Teufelsfrucht-Bild"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CharacterDetails;
