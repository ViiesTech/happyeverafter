import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { ShowToast } from '../globalFunctions/ShowToast';
const initialState = {
    user: [],
    token: '',
    isLoading: false,
    error: null,
    formStatus: '',
    subscriptionPlan: ''
};

const showToast = (type, message) => {
    Toast.show({
        type: type,
        text1: message,
    });
};

export const UserLogin = createAsyncThunk(
    'auth/UserLogin',
    async (config, { rejectWithValue }) => {
        try {
            const response = await axios(config);
            console.log('response', response.data)
            // console.log('loading', state.isLoading)
            if (response.data.success == true) {

                // ShowToast('success', 'Login Successful');
                return response.data;
            } else {
                showToast('error', response.data.message);
                return rejectWithValue(response.data);
            }

        } catch (error) {
            showToast('error', error.response.data.message);
            console.log(error.response.data.message)
            return rejectWithValue(error.message);
            // return error.message
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUserToken: (state) => {
            state.token = '';
        },

        userDetails: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        makeLoadingFalse: (state, action) => {
            state.isLoading = false
        },
        formStatus: (state, action) => {
            state.formStatus = action.payload
            // console.log('redux form status', action.payload)
        },
        setSubscription: (state, action) => {
            state.subscriptionPlan = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(UserLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                state.isLoading = false; // Set isLoading to false when login is successful
                state.token = action.payload.data.token;
                state.user = action.payload.data;
                state.formStatus = action.payload.data.formStatus
                state.subscriptionPlan = action.payload.data.subscriptionStatus
            })
            .addCase(UserLogin.rejected, (state, action) => {
                state.isLoading = false; // Set isLoading to false when login fails
                state.error = action.payload;
            });
    },
});

export const { clearUserToken, userDetails, setError, makeLoadingFalse, formStatus, setSubscription } = authSlice.actions;

export default authSlice.reducer;
