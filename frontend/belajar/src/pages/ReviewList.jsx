// src/components/ReviewList.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/reviews', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => setReviews(data))
        .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setReviews(reviews.filter(review => review.id !== id));
            } else {
                console.error('Error deleting review:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Review List</h1>
            <div className="text-center mb-6">
                <Link to="/reviews/add" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">Add Review</Link>
            </div>
            <ul className="space-y-4">
                {reviews.map(review => (
                    <li key={review.id}>
                        <div className="bg-white border p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">{review.reviewerName}</h2>
                            <p className="text-gray-600 mb-4">{review.comment}</p>
                            <p className="text-gray-600 mb-4">Rating: {review.rating}</p>
                            <div className="flex space-x-2">
                                <Link to={`/reviews/edit/${review.id}`} className="inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 transition duration-200">Edit</Link>
                                <button onClick={() => handleDelete(review.id)} className="inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200">Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
