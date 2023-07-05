import React from 'react';

const GalleryItem = ({ item, handleProductClick }) => {
    const { id, name, url } = item;

    return (
        <div
            key={id}
            className="text-white shadow-xl rounded-lg overflow-hidden shadow-sm mb-4"
        >
            <div className="relative h-48">
                {item.isBestseller && (
                    <div className="bg-yellow-500 text-white text-center px-2 py-1 absolute top-0 right-0">
                        Bestseller
                    </div>
                )}
                <img
                    src={url}
                    alt={`Zdjęcie ${id}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleProductClick(id)}
                />
            </div>
            <div className="px-4 py-2">
                <h2 className="text-lg font-semibold truncate text-gray-500">
                    {name}
                </h2>
                <button
                    className="mt-2 bg-indigo-500text-white px-2 py-1 rounded"
                    onClick={() => addToCart(id)}
                >
                    Dodaj do koszyka
                </button>
            </div>
        </div>
    );
};

export default GalleryItem;