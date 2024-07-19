import Carousel from "../components/Carousel";

export default function Dashboard() {
    return (
        <>
            <div className="relative w-full h-screen">
                <Carousel />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
                    <h2 className="text-4xl font-bold mb-4">Selamat datang di Nayasta Bioskop</h2>
                    <p className="text-lg text-center">
                        Di sini kamu dapat mengelola dan menikmati film-film favoritmu.
                        <br />
                        Selamat mengeksplorasi dan menonton
                    </p>
                </div>
            </div>
        </>
    );
}
