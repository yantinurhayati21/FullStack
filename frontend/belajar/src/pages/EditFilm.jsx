import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftCircle, Save } from 'lucide-react';

const EditFilm = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch(`http://localhost:5000/api/films/${id}`, {
      method: 'GET',
      credentials: 'include'
    }) 
    .then(response => response.json())
    .then(data => setFilm(data))
    .catch(error => console.error('Error fetching film:', error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/films/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(film)
      });

      if (response.ok) {
        console.log('Film updated successfully');
        navigate("/films");
      } else {
        const error = await response.json();
        console.error('Error updating film:', error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  if (!film) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-6 px-4 max-w-lg">
      <div className="text-center mb-6">
        <ArrowLeftCircle onClick={() => navigate("/films")} className="mx-auto h-12 w-12 text-gray-600 cursor-pointer hover:text-gray-800" />
        <h1 className="text-3xl font-bold mt-2 text-gray-800">Edit Film</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={film.title}
          onChange={(e) => setFilm({ ...film, title: e.target.value })}
          placeholder="Title"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          value={film.director}
          onChange={(e) => setFilm({ ...film, director: e.target.value })}
          placeholder="Director"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="date"
          value={film.releaseDate}
          onChange={(e) => setFilm({ ...film, releaseDate: e.target.value })}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          value={film.genre}
          onChange={(e) => setFilm({ ...film, genre: e.target.value })}
          placeholder="Genre"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <textarea
          value={film.synopsis}
          onChange={(e) => setFilm({ ...film, synopsis: e.target.value })}
          placeholder="Synopsis"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          value={film.coverImage}
          onChange={(e) => setFilm({ ...film, coverImage: e.target.value })}
          placeholder="Cover Image URL"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          value={film.duration}
          onChange={(e) => setFilm({ ...film, duration: e.target.value })}
          placeholder="Duration (minutes)"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="flex justify-between items-center">
          <button type="button" onClick={() => navigate("/films")} className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 shadow-md">
            <ArrowLeftCircle className="mr-2" />
            Cancel
          </button>
          <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 shadow-md">
            <Save className="mr-2" />
            Update Film
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFilm;
