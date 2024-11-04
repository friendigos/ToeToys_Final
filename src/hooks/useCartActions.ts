import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCart } from '@/store/slices/cartSlice';
import axios from 'axios';
import { ProductType } from '@/type/ProductType';

export const useCartActions = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);

    const loadCart = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(updateCart({ items: response.data }));
        } catch (error) {
            console.error('Load cart error:', error);
        }
    };

    const addToCart = async (product: ProductType) => {
        try {
            const response = await axios.post('http://localhost:5000/api/cart', {
                product,
                quantity: 1,
                selectedSize: product.sizes?.[0],
                selectedColor: product.variation?.[0]?.color
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(updateCart({ items: response.data }));
            return response.data;
        } catch (error) {
            console.error('Add to cart error:', error);
            throw error;
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(updateCart({ items: response.data }));
            return response.data;
        } catch (error) {
            console.error('Remove from cart error:', error);
            throw error;
        }
    };

    return { cart, addToCart, removeFromCart, loadCart };
}; 