import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const [films, setFilms] = useState([]);
  const [reviewerName, setReviewerName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [filmId, setFilmId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:5000/api/films", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setFilms(data))
      .catch((error) => {
        console.error("Error fetching films:", error);
        setError("Error fetching films. Please try again later.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dto = { reviewerName, comment, rating, filmId };

    try {
      const response = await fetch("http://localhost:5000/api/reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dto),
      });

      if (response.ok) {
        console.log("Review added successfully");
        navigate("/reviews");
      } else {
        const errorText = await response.text();
        console.error("Error adding review:", errorText);
        setError(`Error adding review: ${errorText}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Review
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Film
            </label>
            <select
              value={filmId}
              name="filmId"
              onChange={(e) => setFilmId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a film</option>
              {films.map((film) => (
                <option key={film.id} value={film.id}>
                  {film.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Review
            </label>
            <textarea
              value={comment}
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Write your review here"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              min="0"
              max="5"
              value={rating}
              name="rating"
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Rate the film"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="reviewerName"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your name"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
