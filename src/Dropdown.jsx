import React, { useState } from 'react';

const Dropdown = ({ selectedCategory, setSelectedCategory }) => {
    const categories = [
        'All Species',
        'Mammals',
        'Birds',
        'Reptiles*',
        'Amphibians',
        'Fishes*',
        'Molluscs*',
        'Other Inverts*',
        'Plants*',
        'Fungi*',
        'Chromists*',
    ];

    // const [selectedCategory, setSelectedCategory] = useState('All Species');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div>
            <label htmlFor="categories-dropdown">Choose a category:</label>
            <select
                id="categories-dropdown"
                value={selectedCategory}
                onChange={handleChange}
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
                <p>
                    Selected Category: <strong>{selectedCategory}</strong>
                </p>
            )}
        </div>
    );
};

export default Dropdown;
