import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2 } from 'lucide-react';

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
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Review List</h1>
            <div className="text-center mb-6">
                <Link to="/reviews/add" className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 shadow-lg">
                    <Plus className="mr-2" />
                    Add Review
                </Link>
            </div>
            <ul className="flex flex-wrap justify-center space-x-4 space-y-4">
                {reviews.map(review => (
                    <li key={review.id} className="flex justify-center w-full md:w-1/2 lg:w-1/3 px-2">
                        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 w-full">
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">Author: {review.reviewerName}</h2>
                            <p className="text-gray-600 mb-4">Review: {review.comment}</p>
                            <p className="text-gray-600 mb-4">Rating: {review.rating}</p>
                            <p className="text-gray-600 mb-4">Judul Film: {review.filmTitle}</p>
                            <div className="flex space-x-2">
                                <Link to={`/reviews/edit/${review.id}`} className="inline-flex items-center bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 transition duration-200 shadow-md">
                                    <Edit3 className="mr-2" />
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(review.id)} className="inline-flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200 shadow-md">
                                    <Trash2 className="mr-2" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
