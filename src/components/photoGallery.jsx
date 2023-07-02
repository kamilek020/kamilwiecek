import React, { useState, useEffect, useRef } from 'react';
import data from '../components/data.json';
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
    const galleryContainerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

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
        setCurrentPage(1); // Reset current page to 1 when changing category
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset current page to 1 when changing search query
    };

    const addToCart = (productId) => {
        const product = data.find((item) => item.id === productId);
        setCartItemsState((prevItems) => {
            const updatedItems = [...prevItems, product];
            setCartItems(updatedItems);
            return updatedItems;
        });
    };

    const removeFromCart = (productId) => {
        setCartItemsState((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== productId);
            setCartItems(updatedItems);
            return updatedItems;
        });
    };

    const openCartModal = () => {
        setIsCartModalOpen(true);
    };

    const closeCartModal = () => {
        setIsCartModalOpen(false);
    };

    const sortedData = [...data].sort((a, b) => {
        if (a.isBestseller && !b.isBestseller) {
            return -1;
        } else if (!a.isBestseller && b.isBestseller) {
            return 1;
        } else {
            return 0;
        }
    });

    const filteredData =
        currentCategory === 'all'
            ? sortedData
            : sortedData.filter(
                (item) =>
                    item.categories.includes(currentCategory) &&
                    (!item.isBestseller || item.isBestseller === true)
            );

    const searchResults = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to top when changing page
    };

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
                {currentItems.map((item) => (
                    <div
                        key={item.id}
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
            {searchResults.length > itemsPerPage && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`${
                                currentPage === index + 1
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-gray-300 text-gray-600'
                            } px-4 py-2 rounded mx-1`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
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
                    <div className="max-w-md md:max-w-md bg-white rounded-lg p-4" ref={cartModalRef}>
                        <h2 className="text-xl font-bold mb-4">Koszyk</h2>
                        <h5 className="text-sm mb-4">Po skonstruowaniu koszyka zrób screena i Mi wyślij</h5>
                        {cartItems.map((item) => (
                            <div key={item.id} className="mb-2 flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 flex-shrink-0 mr-2">
                                        <img
                                            src={item.url}
                                            alt={`Zdjęcie ${item.id}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-gray-800">{item.name}</span>
                                </div>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 ml-1 rounded"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        removeFromCart(item.id);
                                    }}
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
                    <div className="max-w-2xl md:max-w-md bg-white rounded-lg p-8 overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-4">{selectedProduct.name}</h2>
                        <img
                            src={selectedProduct.url}
                            alt={`Zdjęcie ${selectedProduct.id}`}
                            className="w-full mb-4"
                        />
                        <p className="text-gray-500">Ilość sztuk: {selectedProduct.quantity}</p>
                        <p className="text-gray-600">{selectedProduct.description}</p>
                        <button
                            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
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