import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
        <div>
            <div>
                <div>

                </div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
        </div>
        <footer className='bg-gray-800 text-white py-8 mt-auto'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4'>
                <div className="mb-3">
                    <Link to="/" className="flex items-center mb-3 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    </Link>
                    <p className="text-gray-400">© 2022</p>
                </div>

                <div className="mb-3">
                    {/* Empty column for spacing */}
                </div>

                <div className="mb-3">
                    <h5 className='font-bold text-lg'>Section</h5>
                    <ul className="flex flex-col space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                    </ul>
                </div>

                <div className="mb-3">
                    <h5 className='font-bold text-lg'>Section</h5>
                    <ul className="flex flex-col space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                    </ul>
                </div>

                <div className="mb-3">
                    <h5 className='font-bold text-lg'>Section</h5>
                    <ul className="flex flex-col space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                    </ul>
                </div>
            </div>
        </footer>
        </>
    );
}

export default Footer;
