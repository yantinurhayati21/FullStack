import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-6">Welcome to Our Film App</h1>
                <p className="text-lg mb-8">Discover and manage your favorite films with ease.</p>
                <div className="space-x-4">
                    <Link to="/login">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
