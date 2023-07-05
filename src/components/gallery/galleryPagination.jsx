import React from 'react';

const GalleryPagination = ({ totalPages, currentPage, paginate }) => {
    return (
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
    );
};

export default GalleryPagination;