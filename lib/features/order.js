import API from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch all orders
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            // Send GET request with query parameters for pagination and sorting
            const response = await API.get(`order?page=${page}&limit=${limit}`);
            return response.data; // Returns products, total, currentPage, totalPages
        } catch (error) {
            return handleError(error, rejectWithValue); // Custom error handling function
        }
    }
);

// Fetch a user order
export const fetchUserOrders = createAsyncThunk(
    'order/fetchUserOrders',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await API.post(`order/user-orders`, { userId });
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Fetch a single order
export const fetchSingleOrder = createAsyncThunk(
    'order/fetchSingleOrder',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.get(`order/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

//search orders
// Search products
export const searchOrders = createAsyncThunk(
    'product/searchOrders',
    async (query, { rejectWithValue }) => {
        try {
            const response = await API.get(`order/search?q=${query}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Create a new order
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await API.post('order', orderData);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Confirm an order
export const confirmOrder = createAsyncThunk(
    'order/confirmOrder',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.put(`order/${id}/confirm`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Cancel an order
export const cancelOrder = createAsyncThunk(
    'order/cancelOrder',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.put(`order/${id}/cancel`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Error handling function
const handleError = (error, rejectWithValue) => {
    if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'An error occurred');
    }
    return rejectWithValue('An error occurred while processing the request');
};

const initialState = {
    data: [],
    singleData: {},
    currentPage: 1,
    totalPages: 1,
    isSearched: false,
    total: 0,
    isLoading: true,
    success: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearSuccess(state) {
            state.success = false;
        },
        clearError(state) {
            state.error = null;
        },
        clearSearch(state) {
            state.isSearched = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.orders;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.error = null;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch orders';
            })
            .addCase(fetchUserOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.orders;
                state.error = null;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch orders';
            })
            .addCase(fetchSingleOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSingleOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleData = action.payload.order;
                state.error = null;
            })
            .addCase(fetchSingleOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch order';
            })
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || 'Order created successfully';
                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to create order';
            })
            .addCase(confirmOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(confirmOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || 'Order confirmed successfully';
                state.error = null;
            })
            .addCase(confirmOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to confirm order';
            })
            .addCase(cancelOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || 'Order cancelled successfully';
                state.error = null;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to cancel order';
            })
            .addCase(searchOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSearched = true;
                state.data = action.payload.orders;
                state.total = action.payload.total;
                state.error = null;
            })
            .addCase(searchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isSearched = false;
                state.error = action.payload || 'No such products found';
            });
    },
});

export const { clearSuccess, clearError, clearSearch } = orderSlice.actions;

export default orderSlice.reducer;
