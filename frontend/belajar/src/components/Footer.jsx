import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; 2024 FilmApp. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-200">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-200">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-200">
            Contact Us
          </a>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" className="hover:text-blue-200">
            <Facebook size={24} />
          </a>
          <a href="https://twitter.com" className="hover:text-blue-200">
            <Twitter size={24} />
          </a>
          <a href="https://instagram.com" className="hover:text-blue-200">
            <Instagram size={24} />
          </a>
          <a href="https://github.com" className="hover:text-blue-200">
            <Github size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
