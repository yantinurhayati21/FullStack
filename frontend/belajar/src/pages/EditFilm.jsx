import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Film</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={film.title}
          onChange={(e) => setFilm({ ...film, title: e.target.value })}
          placeholder="Title"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          value={film.director}
          onChange={(e) => setFilm({ ...film, director: e.target.value })}
          placeholder="Director"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="date"
          value={film.releaseDate}
          onChange={(e) => setFilm({ ...film, releaseDate: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          value={film.genre}
          onChange={(e) => setFilm({ ...film, genre: e.target.value })}
          placeholder="Genre"
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          value={film.synopsis}
          onChange={(e) => setFilm({ ...film, synopsis: e.target.value })}
          placeholder="Synopsis"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          value={film.coverImage}
          onChange={(e) => setFilm({ ...film, coverImage: e.target.value })}
          placeholder="Cover Image URL"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          value={film.duration}
          onChange={(e) => setFilm({ ...film, duration: e.target.value })}
          placeholder="Duration (minutes)"
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update Film</button>
      </form>
    </div>
  );
};

export default EditFilm;