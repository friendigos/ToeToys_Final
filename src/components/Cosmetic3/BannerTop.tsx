import React from 'react'
import Marquee from 'react-fast-marquee'

interface Props {
    props: string
    textColor: string
    bgLine: string
}

const BannerTop: React.FC<Props> = ({ props, textColor, bgLine }) => {
    return (
        <>
            <div className={`banner-top ${props}`}>
                <Marquee>
                    <div className={`heading5 md:px-[110px] px-12 ${textColor}`}>Get Trendy Bags</div>
                    <div className={`icon-leaves md:text-[32px] text-[24px]`}></div>
                    <div className={`heading5 md:px-[110px] px-12 ${textColor}`}>Latest In the Market</div>
                    <div className={`icon-double-leaves md:text-[32px] text-[24px]`}></div>
                    <div className={`heading5 md:px-[110px] px-12 ${textColor}`}>Subscribe for Exclusive Offers</div>
                    <div className={`icon-leaves md:text-[32px] text-[24px]`}></div>
                    <div className={`heading5 md:px-[110px] px-12 ${textColor}`}>Womens and Mens</div>
                    <div className={`icon-double-leaves md:text-[32px] text-[24px]`}></div>
                    <div className={`heading5 md:px-[110px] px-12 ${textColor}`}>Accesories</div>
                    <div className={`icon-leaves md:text-[32px] text-[24px]`}></div>
                    <div className={`heading5 md:px-[110px] px-12 ${textColor}`}>Subscribe for Exclusive Offers</div>
                    <div className={`icon-double-leaves md:text-[32px] text-[24px]`}></div>
                </Marquee>
            </div>
        </>
    )
}

export default BannerTop