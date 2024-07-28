import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, PlusCircle } from 'lucide-react';

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
        credentials: 'include',
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
    <div className="container mx-auto py-6 px-4 max-w-lg">
      <div className="text-center mb-6">
        <Film className="mx-auto h-12 w-12 text-blue-600" />
        <h1 className="text-3xl font-bold mt-2 text-gray-800">Add Film</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Film Title"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          name="director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          placeholder="Director"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="date"
          name="releaseDate"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <textarea
          name="synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          placeholder="Synopsis"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          name="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="Cover Image URL"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (minutes)"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 shadow-md">
          <PlusCircle className="mr-2" />
          Add
        </button>
      </form>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">Register Result:</h3>
        <p className="text-gray-600">{addFilm}</p>
      </div>
    </div>
  );
};

export default AddFilm;
