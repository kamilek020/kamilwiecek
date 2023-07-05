import React from 'react';

const ProductPage = ({ selectedProduct, onClose }) => {
    if (!selectedProduct) {
        return <div>Loading...</div>;
    }

    const { name, description, imageUrl } = selectedProduct;

    return (
        <div>
            <h1>{name}</h1>
            <img src={imageUrl} alt={`Zdjęcie ${name}`} />
            <p>{description}</p>
            {/* Dodaj inne elementy i treści, które mają być wyświetlane na stronie produktu */}
            <button onClick={onClose}>Zamknij</button>
        </div>
    );
};

export default ProductPage;