import React, { useState } from 'react';

const Dropdown = ({ selectedCategory, setSelectedCategory }) => {
    const categories = [
        'All Species',
        'Mammals',
        'Birds',
        'Reptiles',
        'Amphibians',
        'Fishes',
        'Molluscs',
        'Other Inverts',
        'Plants',
        'Fungi',
        'Chromists',
    ];

    // const [selectedCategory, setSelectedCategory] = useState('All Species');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
                margin: '15px',
                padding: '10px',
                backgroundColor: '#f8f9fa', // Subtle background
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Light shadow
                width: '100%',
                maxWidth: '300px', // Constrain width for a cleaner look
            }}
        >
            <label
                htmlFor="categories-dropdown"
                style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#333',
                }}
            >
                Choose a category:
            </label>
            <select
                id="categories-dropdown"
                value={selectedCategory}
                onChange={handleChange}
                style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#007bff')} // Highlight on focus
                onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            >
                <option value="" disabled>
                    Select a category
                </option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            {selectedCategory && (
                <p
                    style={{
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#555',
                        margin: '0',
                    }}
                >
                    Selected Category: <strong style={{ color: '#007bff' }}>{selectedCategory}</strong>
                </p>
            )}
        </div>

    );
};

export default Dropdown;
