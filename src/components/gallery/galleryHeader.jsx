import React from 'react';

const GalleryHeader = ({ currentCategory, categoryCounts, filterProductsByCategory }) => {
    return (
        <div className="mb-4">
            <button
                className={`${
                    currentCategory === 'all'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-300 my-2 text-gray-600'
                } px-4 py-2 rounded`}
                onClick={() => filterProductsByCategory('all')}
            >
                Wszystkie ({categoryCounts.all || 0})
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
    );
};

export default GalleryHeader;