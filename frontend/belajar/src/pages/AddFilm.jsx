import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddFilm = () => {
  const [addFilm, setAddFilm] = useState("");
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dto = { title, director, releaseDate, genre, synopsis, coverImage, duration };
    try {
      const response = await fetch("http://localhost:5000/api/films/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include', // Include credentials for JWT cookies
        body: JSON.stringify(dto),
      });

      if (response.ok) {
        const result = await response.json();
        setAddFilm("Add Film successful.");
        setTimeout(() => {
          navigate("/films");
        }, 2000);
      } else {
        const error = await response.json();
        setAddFilm(error.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Add Film</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Film Title"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          placeholder="Director"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="date"
          name="releaseDate"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          placeholder="Synopsis"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="Cover Image URL"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (minutes)"
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>
      <div className="mt-4">
        <h3>Register Result:</h3>
        <p>{addFilm}</p>
      </div>
    </div>
  );
};

export default AddFilm;
