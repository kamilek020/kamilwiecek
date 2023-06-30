import React, { useState, useEffect, useRef } from 'react';
import data from '../components/data-tests.json';

const PhotoGallery = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const handleProductClick = (productId) => {
        const product = data.find((item) => item.id === productId);
        setSelectedProduct(product);
        setIsOverlayVisible(true);
    };

    const closeDetails = () => {
        setSelectedProduct(null);
        setIsOverlayVisible(false);
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeDetails();
        }
    };

    const galleryContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const container = galleryContainerRef.current;
            const numColumns =
                container.offsetWidth >= 640
                    ? 3
                    : container.offsetWidth >= 480
                        ? 2
                        : 1;
            container.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const filterProductsByCategory = (category) => {
        setCurrentCategory(category);
    };

    const filteredData =
        currentCategory === 'all'
            ? data
            : data.filter(
                (item) =>
                    item.categories.includes(currentCategory) &&
                    (!item.isBestseller || item.isBestseller === true)
            );

    return (
        <div className="mt-8 mx-auto max-w-4xl" ref={galleryContainerRef}>
            <div className="mb-4">
                <button
                    className={`${
                        currentCategory === 'all'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-300 my-2 text-gray-600'
                    } px-4 py-2 rounded`}
                    onClick={() => filterProductsByCategory('all')}
                >
                    Wszystkie
                </button>
                <button
                    className={`${
                        currentCategory === 'bestseller'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                    } px-4 py-2 rounded my-2 ml-2`}
                    onClick={() => filterProductsByCategory('bestseller')}
                >
                    Bestseller
                </button>
                <button
                    className={`${
                        currentCategory === 'dom'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                    } px-4 py-2 rounded  my-2 ml-2`}
                    onClick={() => filterProductsByCategory('dom')}
                >
                    Dom
                </button>
                <button
                    className={`${
                        currentCategory === 'ogród'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                    } px-4 py-2 rounded my-2 ml-2`}
                    onClick={() => filterProductsByCategory('ogród')}
                >
                    Ogród
                </button>
                <button
                    className={`${
                        currentCategory === 'elektronika'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                    } px-4 py-2 rounded my-2 ml-2`}
                    onClick={() => filterProductsByCategory('elektronika')}
                >
                    Elektronika
                </button>
                <button
                    className={`${
                        currentCategory === 'samochód'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                    } px-4 py-2 rounded my-2 ml-2`}
                    onClick={() => filterProductsByCategory('samochód')}
                >
                    Samochód
                </button>
                <button
                    className={`${
                        currentCategory === 'łazienka'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                    } px-4 py-2 rounded my-2 ml-2`}
                    onClick={() => filterProductsByCategory('łazienka')}
                >
                    Łazienka
                </button>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                {filteredData.map((item) => (
                    <div
                        key={item.id}
                        className="text-white shadow-xl rounded-lg overflow-hidden shadow-sm mx-auto w-80 md:w-11/12"
                    >
                        <div className="relative">
                            {item.isBestseller && (
                                <div className="bg-yellow-500 text-white text-center px-2 py-1 absolute top-0 right-0">
                                    Bestseller
                                </div>
                            )}
                            <img
                                src={item.url}
                                alt={`Zdjęcie ${item.id}`}
                                className="h-3/4 w-full object-cover cursor-pointer"
                                onClick={() => handleProductClick(item.id)}
                            />
                            <div className="absolute bottom-0 left-0 w-full text-gray-500 p-2">
                                <h2
                                    className={`text-lg font-semibold ${
                                        item.name.length > 40 ? 'truncate' : ''
                                    }`}
                                >
                                    {item.name}
                                </h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 ${
                        isOverlayVisible ? '' : 'hidden'
                    }`}
                    onClick={handleOverlayClick}
                >
                    <div className="max-w-2xl bg-white rounded-lg p-4">
                        <img
                            src={selectedProduct.url}
                            alt={`Zdjęcie ${selectedProduct.id}`}
                            className="w-full h-auto"
                        />
                        <h2 className="text-xl font-bold mt-2">{selectedProduct.name}</h2>
                        <p className="text-gray-500">Dostępność: {selectedProduct.quantity} szt.</p>
                        <p className="text-gray-500">Cena: {selectedProduct.price}</p>
                        <p className="text-gray-500">{selectedProduct.description}</p>
                        <button
                            className="bg-gray-800 text-white px-4 py-2 rounded mt-4"
                            onClick={closeDetails}
                        >
                            Zamknij
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;