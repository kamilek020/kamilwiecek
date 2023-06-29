
import React, { useState, useEffect, useRef,  } from 'react';
import Img1 from './images/astronauta-projektor.jpg';

const PhotoGallery = () => {
    const photos = [
        { id: 1, url: Img1, description: 'PROJEKTOR ASTRONAUTA', details: 'Szczegóły produktu 1' },
        { id: 2, url: '../../images/led510.jpg', description: 'TAŚMA LED 5 METRÓW', details: 'Szczegóły produktu 1'  },
        { id: 3, url: '../../images/led510.jpg', description: 'TAŚMA LED 10 METRÓW', details: 'Szczegóły produktu 1'  },
        { id: 4, url: '../../images/sunset-lamp.jpg', description: 'SUNSET LAMPA', details: 'Szczegóły produktu 1'  },
        { id: 5, url: '../../images/orgaznier-bizu.png', description: 'ORGANIZER NA BIŻUTERIĘ', details: 'Szczegóły produktu 1'  },
        { id: 6, url: '../../images/projektor-zwykly.jpg', description: 'PROJEKTOR GWIAZD', details: 'Szczegóły produktu 1'  },
        { id: 7, url: '../../images/projektor-zwykly.jpg', description: 'PROJEKTOR GWIAZD', details: 'Szczegóły produktu 1'  },
        { id: 8, url: '../../images/projektor-zwykly.jpg', description: 'PROJEKTOR GWIAZD', details: 'Szczegóły produktu 1'  },
    ];
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (productId) => {
        const product = photos.find(photo => photo.id === productId);
        setSelectedProduct(product);
    };

    const closeDetails = () => {
        setSelectedProduct(null);
    };

    // Dodane style dla galerii
    const galleryContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const container = galleryContainerRef.current;
            const numColumns = container.offsetWidth >= 640 ? 3 : container.offsetWidth >= 480 ? 2 : 1;
            container.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
        };

        handleResize(); // Wywołanie na starcie
        window.addEventListener('resize', handleResize); // Nasłuchiwanie na zmiany rozmiaru okna

        return () => {
            window.removeEventListener('resize', handleResize); // Oczyszczanie nasłuchiwania przy odmontowaniu komponentu
        };
    }, []);

    return (
        <div className="mt-8 mx-auto max-w-4xl" ref={galleryContainerRef}>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                {photos.map(photo => (
                    <div key={photo.id} className="bg-gray-100 shadow-xl rounded-lg overflow-hidden shadow-sm h-96 mx-auto w-80 md:w-11/12">
                        <img
                            src={photo.url}
                            alt={`Zdjęcie ${photo.id}`}
                            className="h-3/4 w-full object-cover"
                            onClick={() => handleProductClick(photo.id)}
                        />
                        <div className="p-4 h-1/4">
                            <h2 className={`text-lg font-semibold ${photo.description.length > 40 ? 'truncate' : ''}`}>{photo.description}</h2>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="max-w-2xl bg-white rounded-lg p-4">
                        <img
                            src={selectedProduct.url}
                            alt={`Zdjęcie ${selectedProduct.id}`}
                            className="w-full h-auto"
                        />
                        <h2 className="text-xl font-bold mt-2">{selectedProduct.description}</h2>
                        <p className="mt-2">{selectedProduct.details}</p>
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

