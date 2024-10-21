'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const Lookbook = () => {
    const router = useRouter()

    const handleDetailProduct = (productId: string) => {
        // redirect to shop with category selected
        router.push(`/product/default?id=${productId}`);
    };

    return (
        <>
            <div className="look-book-block md:pt-20 lg:py-20 md:py-14 py-20 bg-[#fff]">
                <div className="container">
                    <div className="main-content relative flex max-lg:flex-wrap gap-y-5 items-center lg:justify-end justify-center">
                        <div className="heading bg-white xl:py-20 py-10 xl:px-10 px-8 rounded-2xl lg:w-[30%] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 z-[1] max-lg:text-center">
                            <div className="heading3">Discover the latest collection</div>
                            <Link href={'/shop/collection'} className="button-main bg-green lg:w-full text-center lg:mt-8 mt-5 text-black">Shop Collection</Link>
                        </div>
                        <div className="list popular-product w-3/4 grid sm:grid-cols-2 gap-4 max-lg:w-full">
                            
                            <div className="item relative rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/toe/look1.jpg'}
                                    width={2000}
                                    height={1000}
                                    alt='/images/banner/lookbook-jewelry2.png'
                                    className='w-full h-full object-cover'
                                />
                                <div className="dots absolute top-[25%] left-[80%] cursor-pointer">
                                    <div className="top-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center">
                                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                                    </div>
                                    <div className="product-infor bg-white rounded-2xl p-4 cursor-pointer" onClick={()=> handleDetailProduct('66')}>
                                        <div className="text-title name">Nike traviscott x Something</div>
                                        <div className="price text-center">$48.00</div>
                                        <div
                                            className="text-center underline mt-1 text-button-uppercase duration-300 text-secondary2 hover:text-black">
                                            View
                                        </div>
                                    </div>
                                </div>
                                <div className="dots absolute top-[25%] left-[60%] cursor-pointer">
                                    <div className="top-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center">
                                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                                    </div>
                                    <div className="product-infor bg-white rounded-2xl p-4 cursor-pointer" onClick={()=> handleDetailProduct('66')}>
                                        <div className="text-title name">Nike traviscott x Something</div>
                                        <div className="price text-center">$48.00</div>
                                        <div
                                            className="text-center underline mt-1 text-button-uppercase duration-300 text-secondary2 hover:text-black">
                                            View
                                        </div>
                                    </div>
                                </div>
                                <div className="dots absolute top-[35%] left-[45%] cursor-pointer">
                                    <div className="top-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center">
                                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                                    </div>
                                    <div className="product-infor bg-white rounded-2xl p-4 cursor-pointer" onClick={()=> handleDetailProduct('66')}>
                                        <div className="text-title name">Nike traviscott x Something</div>
                                        <div className="price text-center">$48.00</div>
                                        <div
                                            className="text-center underline mt-1 text-button-uppercase duration-300 text-secondary2 hover:text-black">
                                            View
                                        </div>
                                    </div>
                                </div>
                                <div className="dots absolute top-[45%] left-[30%] cursor-pointer">
                                    <div className="top-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center">
                                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                                    </div>
                                    <div className="product-infor bg-white rounded-2xl p-4 cursor-pointer" onClick={()=> handleDetailProduct('66')}>
                                        <div className="text-title name">Nike traviscott x Something</div>
                                        <div className="price text-center">$48.00</div>
                                        <div
                                            className="text-center underline mt-1 text-button-uppercase duration-300 text-secondary2 hover:text-black">
                                            View
                                        </div>
                                    </div>
                                </div>
                                <div className="dots absolute top-[60%] left-[30%] cursor-pointer">
                                    <div className="top-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center">
                                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                                    </div>
                                    <div className="product-infor bg-white rounded-2xl p-4 cursor-pointer" onClick={()=> handleDetailProduct('66')}>
                                        <div className="text-title name">Nike traviscott x Something</div>
                                        <div className="price text-center">$48.00</div>
                                        <div
                                            className="text-center underline mt-1 text-button-uppercase duration-300 text-secondary2 hover:text-black">
                                            View
                                        </div>
                                    </div>
                                </div>
                                <div className="dots absolute top-[65%] left-[70%] cursor-pointer">
                                    <div className="top-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center">
                                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                                    </div>
                                    <div className="product-infor bg-white rounded-2xl p-4 cursor-pointer" onClick={()=> handleDetailProduct('66')}>
                                        <div className="text-title name">Nike traviscott x Something</div>
                                        <div className="price text-center">$48.00</div>
                                        <div
                                            className="text-center underline mt-1 text-button-uppercase duration-300 text-secondary2 hover:text-black">
                                            View
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item relative rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/toe/look1.jpeg'}
                                    width={2000}
                                    height={1000}
                                    alt='/images/banner/lookbook-jewelry1.png'
                                    className='w-full h-full object-cover'
                                />
                                <div className="dots bottom-dot absolute top-[45%] left-[35%] cursor-pointer">
                                    <div className="bottom-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center">
                                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                                    </div>
                                    <div className="product-infor bg-white rounded-2xl p-4 cursor-pointer" onClick={()=> handleDetailProduct('66')}>
                                        <div className="text-title name">Ruby Ring</div>
                                        <div className="price text-center">$40.00</div>
                                        <div
                                            className="text-center underline mt-1 text-button-uppercase duration-300 text-secondary2 hover:text-black">
                                            View
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lookbook