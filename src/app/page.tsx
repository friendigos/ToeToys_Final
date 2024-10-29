import React from 'react'
import MenuJewelry from '@/components/Header/Menu/MenuJewelry'
import BannerTop from '@/components/Home3/BannerTop'
import SliderJewelry from '@/components/Slider/SliderJewelry'
import Quote from '@/components/Jewelry/Quote'
import Collection from '@/components/Jewelry/Collection'
import Lookbook from '@/components/Jewelry/Lookbook'
import productData from '@/data/Product.json'
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

export default function Home() {
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
            <LookBook data={productData} start={8} limit={12} />
            <WeekProduct data={productData} start={0} limit={8} />
            <FeaturedProduct data={productData} start={1} limit={6} />
            <AdsPhoto />
            <CommunityStory />
            <Brand />
            <Footer />
            <ModalNewsletter />
        </>
  )
}