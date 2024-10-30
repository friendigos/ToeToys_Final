'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation';
import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct'
import OnSale from '@/components/Product/Detail/OnSale';
import Footer from '@/components/Footer/Footer'
import productData from '@/data/Product.json'
import MenuJewelry from '@/components/Header/Menu/MenuJewelry';

const ProductOnSale = () => {
    const searchParams = useSearchParams()
    let productId = searchParams.get('id')

    if (productId === null) {
        productId = '1'
    }

    return (
        <>
            <div id="header" className='relative w-full'>
            <MenuJewelry props="bg-white" />
                <BreadcrumbProduct data={productData} productPage='on-sale' productId={productId} />
            </div>
            <OnSale data={productData} productId={productId} />
            <Footer />
        </>
    )
}

export default ProductOnSale