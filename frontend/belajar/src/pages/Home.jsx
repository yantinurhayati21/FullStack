import { Link } from 'react-router-dom';
import Carousel from "../components/Carousel";

export default function Home() {
    return (
        <div className="relative w-full h-screen">
            <Carousel />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
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
