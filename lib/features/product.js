import API from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch products
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async ({ page = 1, limit = 10, sort = 'def' }, { rejectWithValue }) => {
      try {
        // Send GET request with query parameters for pagination and sorting
        const response = await API.get(`product?page=${page}&limit=${limit}&sort=${sort}`);
        
        return response.data; // Returns products, total, currentPage, totalPages
      } catch (error) {
        return handleError(error, rejectWithValue); // Custom error handling function
      }
    }
  );
  
// Add a product
export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await API.post('product', product);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.delete(`product/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Update a product
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`product/${id}`, formData);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Fetch a single product
export const fetchSingleProduct = createAsyncThunk(
    'product/fetchSingleProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.get(`product/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Search products
export const searchProducts = createAsyncThunk(
    'product/searchProducts',
    async (query, { rejectWithValue }) => {
        try {
            const response = await API.get(`product/search?q=${query}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

//delete product image
export const deleteProductImg = createAsyncThunk(
    'product/deleteProductImg',
    async ({ id, imageName }, { rejectWithValue }) => {
        try {
            const response = await API.delete(`product/images/${id}/${imageName}`);
            return response.data;
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    }
);

// Update product image
export const updateProductImage = createAsyncThunk(
    'product/updateProductImage',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`product/${id}`, formData);
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
    singleLoading: true,
    currentPage: 1,
    totalPages: 1,
    isSearched: false,
    success: false,
    error: null,
    total: 0,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSuccess(state) {
            state.success = false;
        },
        clearError(state) {
            state.error = null;
        },
        clearSearch(state){
            state.isSearched = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.message || 'Product added successfully';
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add product';
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.success = 'Product deleted successfully';
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete product';
            })
            .addCase(deleteProductImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductImg.fulfilled, (state) => {
                state.isLoading = false;
                state.success = 'Product Image deleted successfully';
                state.error = null;
            })
            .addCase(deleteProductImg.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete product image';
            })
            .addCase(updateProductImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductImage.fulfilled, (state) => {
                state.isLoading = false;
                state.success = 'Product Image updated successfully';
                state.error = null;
            })
            .addCase(updateProductImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to upload product image';
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = 'Product updated successfully';
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update product';
            })
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.products;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch products';
            })
            .addCase(fetchSingleProduct.pending, (state) => {
                state.singleLoading = true;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.singleLoading = false;
                state.singleData = action.payload;
                state.error = null;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.singleLoading = false;
                state.error = action.payload || 'Failed to fetch product';
            })
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSearched = true;
                state.data = action.payload.products;
                state.total = action.payload.total;
                state.error = null;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isSearched = false;
                state.error = action.payload || 'No such products found';
            });
    },
});

export const { clearSuccess, clearError, clearSearch } = productSlice.actions;

export default productSlice.reducer;
