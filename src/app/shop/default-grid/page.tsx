// 'use client'

// import React, { useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation';
// // import TopNavOne from '@/components/Header/TopNav/TopNavOne'
// // import MenuOne from '@/components/Header/Menu/MenuOne'
// import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1'
// import productData from '@/data/Product.json'
// import Footer from '@/components/Footer/Footer'
// import MenuJewelry from '@/components/Header/Menu/MenuJewelry';

// export default function DefaultGrid() {
//     const searchParams = useSearchParams()
//     let type = searchParams.get('type')
//     let gender = searchParams.get('gender')
//     let category = searchParams.get('category')

//     return (
//         <>
//             <div id="header" className='relative w-full'>
//             <MenuJewelry props="bg-white" />
//             </div>
//             <ShopBreadCrumb1 data={productData} productPerPage={9} dataType={type} gender={gender} category={category} />
//             <Footer />      
//         </>
//     )
// }
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1';
import Footer from '@/components/Footer/Footer';
import MenuJewelry from '@/components/Header/Menu/MenuJewelry';
import axios from 'axios';

export default function DefaultGrid() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let type = searchParams.get('type');
    let gender = searchParams.get('gender');
    let category = searchParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', {
                    params: { type, gender, category } // Include query params if needed
                });
                setProducts(response.data); // Set the fetched data
                setLoading(false); // Update loading state
            } catch (err: any) { // Explicitly typing 'err' as 'any'
                setError(err.message); // Set any error message
                setLoading(false); // Update loading state
            }
        };

        fetchProducts(); // Call the fetch function
    }, [type, gender, category]); // Dependencies to re-fetch data if parameters change

    if (loading) return <div>Loading...</div>; // Loading state
    if (error) return <div>Error: {error}</div>; // Error handling

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuJewelry props="bg-white" />
            </div>
            {/* Pass the fetched products to ShopBreadCrumb1 */}
            <ShopBreadCrumb1 data={products} productPerPage={9} dataType={type} gender={gender} category={category} />
            <Footer />      
        </>
    );
}
