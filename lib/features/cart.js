import API from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch cart
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await API.post(`cart`,{ userId });
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Add to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await API.post("cart/addToCart", { userId,productId, quantity });
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const response = await API.delete("cart", { 
                data: { userId, productId },
             });
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Error handling function
const handleError = (error, rejectWithValue) => {
    if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "An error occurred");
    }
    return rejectWithValue("An error occurred while processing the request");
};

const initialState = {
    data: [],
    total: 0,
    totalPrice: 0,
    isLoading: true,
    success: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearSuccess(state) {
            state.success = false;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.cart.items;
                state.total = action.payload.total;
                state.totalPrice = action.payload.totalPrice;
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || "Product added to cart";
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to add product to cart";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || "Product removed from cart";
                state.error = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to remove product from cart";
            })
    },
});

export const { clearSuccess, clearError } = cartSlice.actions;

export default cartSlice.reducer;
