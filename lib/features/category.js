import API from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch categories
export const fetchCategory = createAsyncThunk(
    'category/fetchCategory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('category');
            return response.data; // Return the response if successful
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Add category
export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (category, { rejectWithValue }) => {
        try {
            const response = await API.post('category', category);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Delete category
export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.delete(`category/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Update category
export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/category/${id}`, formData);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Fetch a single category
export const fetchSingleCategory = createAsyncThunk(
    'category/fetchSingleCategory',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.get(`category/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Search category
export const searchCategory = createAsyncThunk(
    'category/searchCategory',
    async (query, { rejectWithValue }) => {
        try {
            const response = await API.get(`category/search?q=${query}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Error handling function
const handleError = (error, rejectWithValue) => {
    if (error.response && error.response.data) {
        // If there's a response with data, return the error message
        return rejectWithValue(error.response.data.message || 'An error occurred');
    }
    // Generic error if there's no response or other issues
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

const categorySlice = createSlice({
    name: 'category',
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
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || 'Category added successfully';
                state.error = null; // Clear any previous errors
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add category';
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.isLoading = false;
                state.success = 'Category deleted successfully';
                state.error = null;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete category';
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = 'Category updated successfully';
                state.error = null;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update category';
            })
            .addCase(fetchCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.category;
                state.total = action.payload.total;
                state.error = null;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch categories';
            })
            .addCase(fetchSingleCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSingleCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleData = action.payload;
                state.error = null;
            })
            .addCase(fetchSingleCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch category';
            });
            builder
            .addCase(searchCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.category;
                state.totalCategory = action.payload.total;
                state.error = null;
            })
            .addCase(searchCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'No such products found';
            });
    },
});

export const { clearSuccess, clearError } = categorySlice.actions;

export default categorySlice.reducer;
