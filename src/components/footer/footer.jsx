import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className=" py-4">
            <div className="max-w-4xl mx-auto px-4 text-center text-gray-800 text-sm">
                <p>
                    Strona stworzona przez <span className="font-semibold">Kamil Więcek</span> | &copy; {currentYear}. Wszelkie prawa zastrzeżone.
                </p>
            </div>
        </footer>
    );
};

export default Footer;