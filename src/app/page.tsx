'use client'
import React, { useEffect, useState } from 'react'
import MenuJewelry from '@/components/Header/Menu/MenuJewelry'
import BannerTop from '@/components/Home3/BannerTop'
import SliderJewelry from '@/components/Slider/SliderJewelry'
import Quote from '@/components/Jewelry/Quote'
import Collection from '@/components/Jewelry/Collection'
import Lookbook from '@/components/Jewelry/Lookbook'
import TabFeatures from '@/components/Jewelry/TabFeatures'
import FeaturedProduct from '@/components/Toys/FeaturedProduct'
import Benefit from '@/components/Jewelry/Benefit'
import Instagram from '@/components/Jewelry/Instagram'
import Brand from '@/components/Home1/Brand'
import Footer from '@/components/Footer/Footer'
import ModalNewsletter from '@/components/Modal/ModalNewsletter'
import CommunityStory from '@/components/Cosmetic1/CommunityStory'
import AdsPhoto from '@/components/Cosmetic1/AdsPhoto'
import LookBook from '@/components/Cosmetic1/LookBook'
import WeekProduct from '@/components/Toys/WeekProduct'
import axios from 'axios'
import { ProductType } from '@/type/ProductType'

export default function Home() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setError('Failed to load products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuJewelry props="bg-white" />
                <BannerTop props="bg-black py-3" textColor='text-white' bgLine='bg-white' />
                <SliderJewelry />
            </div>
            <Collection />
            <Lookbook />
            <Quote />
            <LookBook data={products} start={8} limit={12} />
            <WeekProduct data={products} start={0} limit={8} />
            <FeaturedProduct data={products} start={1} limit={6} />
            <AdsPhoto />
            <CommunityStory />
            <Brand />
            <Footer />
            <ModalNewsletter />
        </>
    )
}