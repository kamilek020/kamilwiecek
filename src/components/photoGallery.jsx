import React, { useState, useEffect, useRef } from 'react';
import data from '../components/data-tests.json';

const PhotoGallery = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const cartModalRef = useRef(null);

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
                container.offsetWidth >= 640 ? 3 : container.offsetWidth >= 480 ? 2 : 1;
            container.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const counts = {};

        data.forEach((item) => {
            item.categories.forEach((category) => {
                counts[category] = (counts[category] || 0) + 1;
            });
        });

        setCategoryCounts(counts);
    }, []);

    const filterProductsByCategory = (category) => {
        setCurrentCategory(category);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const addToCart = (productId) => {
        const product = data.find((item) => item.id === productId);
        setCartItems((prevItems) => [...prevItems, product]);
    };

    const openCartModal = () => {
        setIsCartModalOpen(true);
    };

    const closeCartModal = () => {
        setIsCartModalOpen(false);
    };

    const filteredData =
        currentCategory === 'all'
            ? data
            : data.filter(
                (item) =>
                    item.categories.includes(currentCategory) &&
                    (!item.isBestseller || item.isBestseller === true)
            );

    const searchResults = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-8 mx-auto max-w-4xl">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Wyszukaj..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="px-12 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <button
                    className={`${
                        currentCategory === 'all'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-300 my-2 text-gray-600'
                    } px-4 py-2 rounded`}
                    onClick={() => filterProductsByCategory('all')}
                >
                    Wszystkie ({data.length})
                </button>
                {Object.keys(categoryCounts).map((category) => (
                    <button
                        key={category}
                        className={`${
                            currentCategory === category
                                ? 'bg-indigo-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                        } px-4 py-2 rounded my-2 ml-2`}
                        onClick={() => filterProductsByCategory(category)}
                    >
                        {category} ({categoryCounts[category] || 0})
                    </button>
                ))}
            </div>
            <div
                className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
                ref={galleryContainerRef}
            >
                {searchResults.map((item) => (
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
                            <button
                                className="absolute top-2 right-2 bg-indigo-500 text-white px-2 py-1 rounded"
                                onClick={() => addToCart(item.id)}
                            >
                                Dodaj do koszyka
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {cartItems.length > 0 && (
                <div className="fixed bottom-0 right-0 p-4">
                    <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded"
                        onClick={openCartModal}
                    >
                        Koszyk ({cartItems.length})
                    </button>
                </div>
            )}
            {isCartModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeCartModal}
                >
                    <div className="max-w-sm md:max-w-md bg-white rounded-lg p-4" ref={cartModalRef}>
                        <h2 className="text-xl font-bold mb-4">Koszyk</h2>
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center mb-4">
                                <img
                                    src={item.url}
                                    alt={`Zdjęcie ${item.id}`}
                                    className="w-16 h-16 object-cover rounded mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-500">Cena: {item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedProduct && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 ${
                        isOverlayVisible ? '' : 'hidden'
                    }`}
                    onClick={handleOverlayClick}
                >
                    <div className="max-w-sm md:max-w-md bg-white rounded-lg p-4">
                        <img
                            src={selectedProduct.url}
                            alt={`Zdjęcie ${selectedProduct.id}`}
                            className="w-full h-auto"
                        />
                        <h2 className="text-xl font-bold mt-2">{selectedProduct.name}</h2>
                        <p className="text-gray-500">
                            Dostępność: {selectedProduct.quantity} szt.
                        </p>
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