import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash } from 'lucide-react';

const FilmList = () => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/films', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => setFilms(data))
        .catch(error => console.error('Error fetching films:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/films/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                setFilms(films.filter(film => film.id !== id));
            } else {
                console.error('Error deleting film:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">Film List</h1>
            <Link to="/films/add" className="mb-4 inline-block px-4 py-2 bg-blue-600 text-white rounded">Add New Film</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {films.map(film => (
                    <div key={film.id} className="border rounded-lg p-4 shadow-lg bg-white">
                        <img src={film.coverImage} alt={film.title} className="w-full h-48 object-cover rounded" />
                        <h2 className="text-xl font-semibold mt-4">{film.title}</h2>
                        <p className="text-gray-600"><strong>Director:</strong> {film.director}</p>
                        <p className="text-gray-600"><strong>Release Date:</strong> {new Date(film.releaseDate).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Genre:</strong> {film.genre}</p>
                        <p className="text-gray-600"><strong>Duration:</strong> {film.duration} minutes</p>
                        <p className="text-gray-600 mt-2">{film.synopsis}</p>
                        <div className="mt-4 flex justify-between">
                            <Link to={`/films/edit/${film.id}`} className="text-blue-600 flex items-center">
                                <Pencil className="mr-2" /> Edit
                            </Link>
                            <button onClick={() => handleDelete(film.id)} className="text-red-600 flex items-center">
                                <Trash className="mr-2" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilmList;
