import API from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch brands
export const fetchBrand = createAsyncThunk(
    'brand/fetchBrand',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('brand');
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Add brand
export const addBrand = createAsyncThunk(
    'brand/addBrand',
    async (brand, { rejectWithValue }) => {
        try {
            const response = await API.post('brand', brand);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Delete brand
export const deleteBrand = createAsyncThunk(
    'brand/deleteBrand',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.delete(`brand/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Update brand
export const updateBrand = createAsyncThunk(
    'brand/updateBrand',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/brand/${id}`, formData);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Fetch a single brand
export const fetchSingleBrand = createAsyncThunk(
    'brand/fetchSingleBrand',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.get(`brand/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Search brands
export const searchBrand = createAsyncThunk(
    'brand/searchBrand',
    async (query, { rejectWithValue }) => {
        try {
            const response = await API.get(`brand/search?q=${query}`);
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
    isLoading: true,
    success: false,
    error: null,
    total: 0,
};

const brandSlice = createSlice({
    name: 'brand',
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
            .addCase(addBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || 'Brand added successfully';
                state.error = null;
            })
            .addCase(addBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add brand';
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled, (state) => {
                state.isLoading = false;
                state.success = 'Brand deleted successfully';
                state.error = null;
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete brand';
            })
            .addCase(updateBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = 'Brand updated successfully';
                state.error = null;
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update brand';
            })
            .addCase(fetchBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.brands;
                state.total = action.payload.total;
                state.error = null;
            })
            .addCase(fetchBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch brands';
            })
            .addCase(fetchSingleBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSingleBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleData = action.payload;
                state.error = null;
            })
            .addCase(fetchSingleBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch brand';
            })
            .addCase(searchBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.brands;
                state.total = action.payload.total;
                state.error = null;
            })
            .addCase(searchBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'No such brands found';
            });
    },
});

export const { clearSuccess, clearError } = brandSlice.actions;

export default brandSlice.reducer;
