import React, { useState, useEffect, useRef } from 'react';
import data from '../components/data-tests.json';
import { getCartItems, setCartItems } from '../helpers/storage-helper';

const PhotoGallery = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItemsState] = useState(getCartItems());
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
            const containerWidth = container.offsetWidth;
            let numColumns;

            if (containerWidth < 640) {
                numColumns = 1;
            } else if (containerWidth < 768) {
                numColumns = 2;
            } else {
                numColumns = 3;
            }

            container.style.setProperty('--num-columns', numColumns);
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
        const updatedCartItems = [...cartItems, product];
        setCartItemsState(updatedCartItems);
        setCartItems(updatedCartItems);
    };

    const removeFromCart = (productId) => {
        const updatedItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedItems);
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
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                ref={galleryContainerRef}
            >
                {searchResults.map((item, index) => (
                    <div
                        key={`gallery-item-${item.id}-${index}`}
                        className="text-white shadow-xl rounded-lg overflow-hidden shadow-sm mb-4"
                    >
                        <div className="relative h-48">
                            {item.isBestseller && (
                                <div className="bg-yellow-500 text-white text-center px-2 py-1 absolute top-0 right-0">
                                    Bestseller
                                </div>
                            )}
                            <img
                                src={item.url}
                                alt={`Zdjęcie ${item.id}`}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => handleProductClick(item.id)}
                            />
                        </div>
                        <div className="px-4 py-2">
                            <h2 className="text-lg font-semibold truncate text-gray-500">
                                {item.name}
                            </h2>
                            <button
                                className="mt-2 bg-indigo-500 text-white px-2 py-1 rounded"
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
                        {cartItems.map((item, index) => (
                            <div key={`cart-item-${item.id}-${index}`} className="flex items-center mb-4">
                                <img
                                    src={item.url}
                                    alt={`Zdjęcie ${item.id}`}
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                                <p className="ml-2">{item.name}</p>
                                <button
                                    className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Usuń
                                </button>
                            </div>
                        ))}
                        <button
                            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
                            onClick={closeCartModal}
                        >
                            Zamknij
                        </button>
                    </div>
                </div>
            )}
            {isOverlayVisible && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={handleOverlayClick}
                >
                    <div className="max-w-lg bg-white rounded-lg p-8">
                        <button
                            className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white px-2 py-1 rounded"
                            onClick={closeDetails}
                        >
                            Zamknij
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedProduct?.name}</h2>
                        <img
                            src={selectedProduct?.url}
                            alt={`Zdjęcie ${selectedProduct?.id}`}
                            className="w-full h-64 object-cover mb-4"
                        />
                        <p>{selectedProduct?.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;