'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { useCartActions } from '@/hooks/useCartActions'
import { countdownTime } from '@/store/countdownTime'
import MenuJewelry from '@/components/Header/Menu/MenuJewelry'

const Cart = () => {
    const router = useRouter()
    const { cart, removeFromCart, loadCart, isAuthenticated } = useCartActions();
    const [shipCart, setShipCart] = useState<number>(30)
    const moneyForFreeship = 150;

    // Load cart data when component mounts or auth state changes
    useEffect(() => {
        if (isAuthenticated) {
            loadCart();
        }
    }, [isAuthenticated]); // Remove loadCart from dependencies to avoid lint warning

    // Calculate total
    const totalCart = cart.items.reduce((sum: number, item) => sum + item.price * item.quantity, 0);
    const finalShipCost = totalCart > moneyForFreeship ? 0 : shipCart;
    const finalTotal = totalCart + finalShipCost;

    const handleRemoveFromCart = async (productId: string) => {
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    const redirectToCheckout = () => {
        router.push('/checkout')
    }

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuJewelry props="bg-white" />
                <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
            </div>
            <div className="cart-page">
                <div className="container">
                    <div className="cart-block mt-7">
                        <div className="heading bg-surface bora-4 pt-4 pb-4">
                            <div className="flex">
                                <div className="w-1/2">
                                    <div className="text-button text-center">Products</div>
                                </div>
                                <div className="w-1/12">
                                    <div className="text-button text-center">Price</div>
                                </div>
                                <div className="w-1/6">
                                    <div className="text-button text-center">Quantity</div>
                                </div>
                                <div className="w-1/6">
                                    <div className="text-button text-center">Total Price</div>
                                </div>
                            </div>
                        </div>

                        <div className="list-product-main w-full mt-3">
                            {cart.items.length === 0 ? (
                                <p className='text-button pt-3'>No products in cart</p>
                            ) : (
                                cart.items.map((item) => (
                                    <div className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full" key={item.productId}>
                                        <div className="product-infor w-1/2 flex items-center gap-6">
                                            <div className="bg-img">
                                                <Image
                                                    src={item.image}
                                                    width={100}
                                                    height={100}
                                                    alt={item.name}
                                                    className='w-[100px] aspect-square flex-shrink-0 rounded-lg'
                                                />
                                            </div>
                                            <div className="product-name text-button">{item.name}</div>
                                        </div>
                                        <div className="product-price w-1/12 flex items-center justify-center">
                                            <div className="text-title">${item.price}.00</div>
                                        </div>
                                        <div className="product-quantity w-1/6 flex items-center justify-center">
                                            <div className="quantity-block flex items-center gap-4">
                                                <div className="quantity flex items-center">
                                                    <div className="quantity-input flex items-center justify-center text-button mx-3">
                                                        {item.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-total-price w-1/6 flex items-center justify-center">
                                            <div className="text-title">${item.price * item.quantity}.00</div>
                                        </div>
                                        <div className="remove-cart-btn pl-7 flex items-center justify-end">
                                            <div
                                                className="remove-btn cursor-pointer"
                                                onClick={() => {
                                                    console.log('Remove button clicked for:', item.productId); // Debug log
                                                    handleRemoveFromCart(item.productId);
                                                }}
                                            >
                                                <Icon.X size={20} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="cart-total-block mt-7">
                            <div className="flex justify-end">
                                <div className="total-block md:w-1/3 w-full">
                                    <div className="heading4">Cart Total</div>
                                    <div className="total-item-block pt-5">
                                        <div className="subtotal flex items-center justify-between pb-4">
                                            <div className="text-title">Subtotal</div>
                                            <div className="text-title">${totalCart}.00</div>
                                        </div>
                                        <div className="shipping pb-4">
                                            <div className="heading flex items-center justify-between">
                                                <div className="text-title">Shipping</div>
                                                <div className="text-title">${finalShipCost}.00</div>
                                            </div>
                                            <div className="type mt-1">
                                                <input
                                                    id="flat"
                                                    type="radio"
                                                    name="ship"
                                                    value={40}
                                                    checked={shipCart === 40}
                                                    onChange={() => setShipCart(40)}
                                                />
                                                <label className="text-on-surface-variant1 pl-1" htmlFor="flat">Flat Rate:</label>
                                            </div>
                                        </div>
                                        <div className="total-cart-block pt-4 pb-4 flex justify-between">
                                            <div className="heading5">Total</div>
                                            <div className="heading5">
                                                ${finalTotal}.00
                                            </div>
                                        </div>
                                        <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                                            <div 
                                                className="checkout-btn button-main text-center w-full" 
                                                onClick={redirectToCheckout}
                                            >
                                                Process To Checkout
                                            </div>
                                            <Link 
                                                className="text-button hover-underline" 
                                                href={"/shop/breadcrumb1"}
                                            >
                                                Continue shopping
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart