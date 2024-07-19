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
        <div className="container mx-auto py-4">
            <h1 className="text-3xl font-bold mb-4">Review List</h1>
            <Link to="/reviews/add" className="btn btn-primary mb-4">Add Review</Link>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <div className="border p-4 rounded-lg mb-4">
                            <h2 className="text-2xl font-bold">{review.reviewerName}</h2>
                            <p>{review.comment}</p>
                            <p>Rating: {review.rating}</p>
                            <Link to={`/edit-review/${review.id}`} className="btn btn-secondary mr-2">Edit</Link>
                            <button onClick={() => handleDelete(review.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
