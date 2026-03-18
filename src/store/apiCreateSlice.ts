import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from './apiClient';

/**
 * Creates an async thunk and a corresponding slice for an API endpoint.
 * 
 * @param {string} name - Name of the slice/action
 * @param {string} endpoint - API endpoint path
 * @param {string} actionType - Specific action name (e.g., 'generate')
 * @param {string} method - HTTP method (get, post, put, delete)
 */
export const createAsyncThunkAndSlice = (name: string, endpoint: string, actionType: string, method: 'get' | 'post' | 'put' | 'delete' = 'post') => {
  const typePrefix = `${name}/${actionType}`;

  const asyncThunk = createAsyncThunk(
    typePrefix,
    async (data: any, { rejectWithValue }) => {
      try {
        let response: any;
        // Handle dynamic segments like :id
        let processedActionType = actionType;
        if (data && typeof data === 'object') {
          Object.keys(data).forEach(key => {
            if (processedActionType.includes(`:${key}`)) {
              processedActionType = processedActionType.replace(`:${key}`, data[key]);
            }
          });
        }

        const url = `${endpoint}/${processedActionType}`;

        if (method === 'get') {
          response = await apiClient.get(url, { params: data });
        } else {
          // If data is FormData, remove Content-Type to let browser set it with boundary
          const config: any = {};
          if (data instanceof FormData) {
            config.headers = { 'Content-Type': undefined };
          }
          
          if (method === 'post') {
            response = await apiClient.post(url, data, config);
          } else if (method === 'put') {
            response = await apiClient.put(url, data, config);
          } else if (method === 'delete') {
            response = await apiClient.delete(url, { ...config, data });
          }
        }
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  interface ApiState {
    data: any | null;
    loading: boolean;
    error: any | null;
    success: boolean;
  }

  const slice = createSlice({
    name: typePrefix,
    initialState: {
      data: null,
      loading: false,
      error: null,
      success: false,
    } as ApiState,
    reducers: {
      reset: (state) => {
        state.data = null;
        state.loading = false;
        state.error = null;
        state.success = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(asyncThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.success = true;
        })
        .addCase(asyncThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        });
    },
  });

  return { asyncThunk, slice };
};
