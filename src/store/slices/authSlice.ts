import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearCart } from './cartSlice';
import { AppDispatch } from '../store';

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    user: any;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
    token: null
};

// Login thunk
export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            const { token, user } = response.data;

            // Set token in localStorage
            localStorage.setItem('token', token);
            
            // Set default authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return { token, user };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Add this initialization thunk
export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { dispatch }) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get('http://localhost:5000/api/auth/me');
                dispatch(setUser(response.data));
                dispatch(setAuthenticated(true));
                return response.data;
            } catch (error) {
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
                throw error;
            }
        }
        return null;
    }
);

// Add register thunk
export const register = createAsyncThunk(
    'auth/register',
    async (credentials: { email: string; password: string; name: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', credentials);
            const { token, user } = response.data;

            // Set token in localStorage
            localStorage.setItem('token', token);
            
            // Set default authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return { token, user };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(initializeAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                }
            })
            .addCase(initializeAuth.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

// Logout action
export const logout = () => async (dispatch: AppDispatch) => {
    try {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        dispatch(clearCart());
        dispatch(setAuthenticated(false));
        dispatch(setUser(null));
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export const { 
    setAuthenticated, 
    setUser, 
    clearError, 
    setLoading 
} = authSlice.actions;

export default authSlice.reducer;
