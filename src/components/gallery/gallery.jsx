import React, { useState, useEffect, useRef } from 'react';
import data from '../data/data.json';
import { getCartItems, setCartItems } from '../../helpers/storage-helper.jsx';
import ProductPage from '../productPage/productPage.jsx';
import GalleryHeader from './GalleryHeader';
import GalleryPagination from './GalleryPagination';
import GalleryItem from './GalleryItem';

const Gallery = () => {
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
    const [isProductPageVisible, setIsProductPageVisible] = useState(false);

    const openProductPage = () => {
        setIsProductPageVisible(true);
    };

    const handleProductPageClose = () => {
        setIsProductPageVisible(false);
    };

    const handleProductClick = (productId) => {
        const product = data.find((item) => item.id === productId);
        setSelectedProduct(product);
        setIsOverlayVisible(true);
        openProductPage();
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
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <div className="mt-8 mx-auto max-w-4xl">
            <GalleryHeader
                currentCategory={currentCategory}
                categoryCounts={categoryCounts}
                filterProductsByCategory={filterProductsByCategory}
            />
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                ref={galleryContainerRef}
            >
                {currentItems.map((item) => (
                    <GalleryItem
                        key={item.id}
                        item={item}
                        handleProductClick={handleProductClick}
                    />
                ))}
            </div>
            <GalleryPagination
                totalPages={totalPages}
                currentPage={currentPage}
                paginate={paginate}
            />
            {/* Pozostała część kodu */}
        </div>
    );
};

export default Gallery;