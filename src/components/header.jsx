import React from "react";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4">
            <div className="flex items-center">
                <img
                    src="/path/to/logo.png"
                    alt="Logo"
                    className="mr-4"
                    style={{ maxHeight: "40px" }}
                />
            </div>
            <div className="flex">
                <span className="text-black text-sm md:text-lg ">Najniższe ceny!</span>
            </div>
        </header>
    );
};

export default Header;