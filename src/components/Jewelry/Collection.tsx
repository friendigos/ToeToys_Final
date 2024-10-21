'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Collection = () => {
    const router = useRouter()

    const handleCategoryClick = (category: string) => {
        router.push(`/shop/breadcrumb1?category=${category}`);
    };

    return (
        <>
            <div className="banner-block md:pt-20 pt-10 bg-[#fff] py-20">
                <div className="container">
                    <div className="list-banner grid lg:grid-cols-4 min-[480px]:grid-cols-2 gap-[30px]">
                        <div className="banner-item relative bg-surface block rounded-[20px] overflow-hidden duration-500 cursor-pointer" onClick={() => handleCategoryClick('jewelry')}>
                            <div className="banner-img w-full h-full">
                                <Image
                                    src={'/images/toe/nike.png'}
                                    width={1000}
                                    height={800}
                                    alt='bg-img'
                                    className='w-full h-full object-cover duration-500'
                                />
                            </div>
                        </div>
                        <div className="banner-item relative bg-surface block rounded-[20px] overflow-hidden duration-500 cursor-pointer" onClick={() => handleCategoryClick('jewelry')}>
                            <div className="banner-img w-full h-full">
                                <Image
                                    src={'/images/toe/adidas.png'}
                                    width={1000}
                                    height={800}
                                    alt='bg-img'
                                    className='w-full h-full object-cover duration-500'
                                />
                            </div>
                        </div>
                        <div className="banner-item relative bg-surface block rounded-[20px] overflow-hidden duration-500 cursor-pointer" onClick={() => handleCategoryClick('jewelry')}>
                            <div className="banner-img w-full h-full">
                                <Image
                                    src={'/images/toe/newbalance.png'}
                                    width={1000}
                                    height={800}
                                    alt='bg-img'
                                    className='w-full h-full object-cover duration-500'
                                />
                            </div>
                             
                        </div>
                        <div className="banner-item relative bg-surface block rounded-[20px] overflow-hidden duration-500 cursor-pointer" onClick={() => handleCategoryClick('jewelry')}>
                            <div className="banner-img w-full h-full">
                                <Image
                                    src={'/images/toe/crocs.png'}
                                    width={1000}
                                    height={800}
                                    alt='bg-img'
                                    className='w-full h-full object-cover duration-500'
                                />
                            </div>
                             
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Collection