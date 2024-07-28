import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftCircle, Save } from 'lucide-react';

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
    <div className="container mx-auto py-6 px-4 max-w-lg">
      <div className="text-center mb-6">
        <ArrowLeftCircle onClick={() => navigate("/reviews")} className="mx-auto h-12 w-12 text-gray-600 cursor-pointer hover:text-gray-800" />
        <h1 className="text-3xl font-bold mt-2 text-gray-800">Edit Review</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name='reviewerName'
          value={review.reviewerName}
          onChange={(e) => setReview({ ...review, reviewerName: e.target.value })}
          placeholder="Author"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <textarea
          value={review.comment}
          name='comment'
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          placeholder="Review"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          name='rating'
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
          placeholder="Rating"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select
          value={review.filmId}
          onChange={(e) => setReview({ ...review, filmId: e.target.value })}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="" disabled>Select Film</option>
          {films.map(film => (
            <option key={film.id} value={film.id}>
              {film.title}
            </option>
          ))}
        </select>
        <div className="flex justify-between items-center">
          <button type="button" onClick={() => navigate("/reviews")} className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 shadow-md">
            <ArrowLeftCircle className="mr-2" />
            Cancel
          </button>
          <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 shadow-md">
            <Save className="mr-2" />
            Update Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
