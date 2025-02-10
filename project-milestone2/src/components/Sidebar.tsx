import React, { useEffect, useState } from 'react';

interface Category {
    id: number;
    name: string;
}

const Sidebar = () => {
    const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice } = useFilter();

    const [categories, setCategories] = useState<Category[]>([]); // Initialize categories as an empty array

    const fetchCategories = async () => {
        const apiUrl = 'https://api.escuelajs.co/api/v1/categories'; // Example API endpoint

        try {
            const response = await fetch(apiUrl);

            // Check if the response is okay (status code in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Ensure data is an array before setting state
            if (Array.isArray(data)) {
                setCategories(data);
            } else {
                console.warn('Expected data to be an array, but got:', data);
                setCategories([]); // Reset to empty array if data is not an array
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]); // Reset to empty array on error
        }
    };

    useEffect(() => {fetchCategories();}, []);



    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    };

    const handleRadioChangeCategories = (category: Category) => {
        setSelectedCategory(category.id)
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setMinPrice(undefined);
        setMaxPrice(undefined);
    };

    return (
        <div className='w-64 p-5 h-screen'>
            <h1 className='text-2xl font-bold mb-10 mt-4'>Categories</h1>

            <section>
                <input 
                    type='text' 
                    placeholder='Search Products'
                    className="border-2 rounded px-2 sm:mb-0"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)} />

                <div className="flex justify-center items-center">
                    <input type='text' className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder='min'
                    value={minPrice ?? ''}
                    onChange={handleMinPriceChange}
                    />
                    <input type='text' className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder='max'
                    value={maxPrice ?? ''}
                    onChange={handleMaxPriceChange}
                    />
                </div>

                <div className="mb-5">
                    <h2 className="text-xl font-semibold mb-3">Categories</h2>
                </div>

                {categories.map((category, index) => (
                    <label key={index} className="block mb-2">
                        <input type='checkbox' name='category'
                        value={category.id}
                        onChange={() => handleRadioChangeCategories(category)}
                        className="mr-2 w-[16px] h-[16px]" 
                        checked={selectedCategory === category.id}
                         />
                        {category.name}
                    </label>
                ))}

                <button onClick={handleResetFilters} className='w-full mb-4rem py-2 bg-black text-white rounded mt-5'>
                    reset filters
                </button>
            </section>
        </div>

    );
};

export default Sidebar;

function useFilter(): { searchQuery: any; setSearchQuery: any; selectedCategory: any; setSelectedCategory: any; minPrice: any; setMinPrice: any; maxPrice: any; setMaxPrice: any; } {
    throw new Error('Function not implemented.');
}
