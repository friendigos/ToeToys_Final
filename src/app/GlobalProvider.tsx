'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store/store'
import { CartProvider } from '@/context/CartContext'
import { ModalCartProvider } from '@/context/ModalCartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ModalWishlistProvider } from '@/context/ModalWishlistContext'
import { CompareProvider } from '@/context/CompareContext'
import { ModalCompareProvider } from '@/context/ModalCompareContext'
import { ModalSearchProvider } from '@/context/ModalSearchContext'
import { ModalQuickviewProvider } from '@/context/ModalQuickviewContext'

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CartProvider>
                    <ModalCartProvider>
                        <WishlistProvider>
                            <ModalWishlistProvider>
                                <CompareProvider>
                                    <ModalCompareProvider>
                                        <ModalSearchProvider>
                                            <ModalQuickviewProvider>
                                                {children}
                                            </ModalQuickviewProvider>
                                        </ModalSearchProvider>
                                    </ModalCompareProvider>
                                </CompareProvider>
                            </ModalWishlistProvider>
                        </WishlistProvider>
                    </ModalCartProvider>
                </CartProvider>
            </PersistGate>
        </Provider>
    )
}

export default GlobalProvider
