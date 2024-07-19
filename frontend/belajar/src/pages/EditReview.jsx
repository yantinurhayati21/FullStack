import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data review
    fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setReview(data))
    .catch(error => console.error('Error fetching review:', error));

    // Ambil daftar film untuk dropdown
    fetch('http://localhost:5000/api/films', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setFilms(data))
    .catch(error => console.error('Error fetching films:', error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(review)
      });

      if (response.ok) {
        console.log('Review updated successfully');
        navigate("/reviews");
      } else {
        const error = await response.json();
        console.error('Error updating review:', error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  if (!review || !films.length) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={review.author}
          onChange={(e) => setReview({ ...review, author: e.target.value })}
          placeholder="Author"
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          value={review.review}
          onChange={(e) => setReview({ ...review, review: e.target.value })}
          placeholder="Review"
          className="w-full px-4 py-2 border rounded"
        />
        <select
          value={review.filmId}
          onChange={(e) => setReview({ ...review, filmId: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="" disabled>Select Film</option>
          {films.map(film => (
            <option key={film.id} value={film.id}>
              {film.title}
            </option>
          ))}
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update Review</button>
      </form>
    </div>
  );
};

export default EditReview;
