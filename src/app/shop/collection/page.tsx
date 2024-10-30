'use client'

import React, { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import productData from '@/data/Product.json'
import ShopCollection from '@/components/Shop/ShopCollection'
import Footer from '@/components/Footer/Footer'
import MenuJewelry from '@/components/Header/Menu/MenuJewelry'

export default function Collection() {

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuJewelry props="bg-white" />
                <Breadcrumb heading='Shop Collection' subHeading='Collection' />
            </div>
            <ShopCollection data={productData} />
            <Footer />
        </>
    )
}
