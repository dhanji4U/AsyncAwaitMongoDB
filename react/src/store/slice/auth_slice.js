import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import * as API from '../../api/apiHandler';
import * as Common from '../../common/Common';

export const login = createAsyncThunk(
    "PropertiesOwnerLogin",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.login({ ...data });

            dispatch(setLoader(false));
            // dispatch(getPropertiesOwnerData({}));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const getPropertiesOwnerData = createAsyncThunk(
    "PropertiesOwnerDetails",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.getUserDetails(data);

            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const updateProfile = createAsyncThunk(
    "EditProfile",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.editProfile({ ...data });

            dispatch(setLoader(false));
            dispatch(getPropertiesOwnerData({}));
            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const updatePassword = createAsyncThunk(
    "ChangePassword",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.changePassword({ ...data });

            dispatch(setLoader(false));
            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const logout = createAsyncThunk(
    "PropertiesOwnerLogout",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.logout({ ...data });

            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "PropertiesOwnerForgotPassword",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.forgotPassword({ ...data });

            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const otpVerification = createAsyncThunk(
    "PropertiesOwnerOtpVerification",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.otpVerify({ ...data });

            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const resetPassword = createAsyncThunk(
    "PropertiesOwnerResetPassword",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.resetPassword({ ...data });

            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const otpResend = createAsyncThunk(
    "PropertiesOwnerOtpResend",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.otpResend({ ...data });

            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

const initialState = {
    propertiesOwnerLogin: {
        data: null,
        error: null
    },

    propertiesOwnerDetails: {
        data: null,
        error: null
    },

    editProfile: {
        data: null,
        error: null
    },

    editPassword: {
        data: null,
        error: null
    },

    propertiesOwnerLogout: {
        data: null,
        error: null
    },

    forgotPassword: {
        data: null,
        error: null
    },


    otpVerification: {
        data: null,
        error: null
    },

    resetPassword: {
        data: null,
        error: null
    },

    otpResend: {
        data: null,
        error: null
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setActionDisabled: (state, action) => {
            state.isActionDisabled = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPropertiesOwnerData.fulfilled, (state, action) => {
                state.propertiesOwnerDetails.data = action.payload;
                state.propertiesOwnerDetails.error = null;
            })
            .addCase(getPropertiesOwnerData.rejected, (state, action) => {
                state.propertiesOwnerDetails.data = null;
                state.propertiesOwnerDetails.error = action.error.message;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.propertiesOwnerLogin.data = action.payload;
                state.propertiesOwnerLogin.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.propertiesOwnerLogin.data = null;
                state.propertiesOwnerLogin.error = action.error.message;
            })

            .addCase(updateProfile.fulfilled, (state, action) => {
                state.editProfile.data = action.payload;
                state.editProfile.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.editProfile.data = null;
                state.editProfile.error = action.error.message;
            })

            .addCase(updatePassword.fulfilled, (state, action) => {
                state.editPassword.data = action.payload;
                state.editPassword.error = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.editPassword.data = null;
                state.editPassword.error = action.error.message;
            })

            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.forgotPassword.data = action.payload;
                state.forgotPassword.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.forgotPassword.data = null;
                state.forgotPassword.error = action.error.message;
            })

            .addCase(otpVerification.fulfilled, (state, action) => {
                state.otpVerification.data = action.payload;
                state.otpVerification.error = null;
            })
            .addCase(otpVerification.rejected, (state, action) => {
                state.otpVerification.data = null;
                state.otpVerification.error = action.error.message;
            })

            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPassword.data = action.payload;
                state.resetPassword.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPassword.data = null;
                state.resetPassword.error = action.error.message;
            })

            .addCase(otpResend.fulfilled, (state, action) => {
                state.otpResend.data = action.payload;
                state.otpResend.error = null;
            })
            .addCase(otpResend.rejected, (state, action) => {
                state.otpResend.data = null;
                state.otpResend.error = action.error.message;
            })

            .addCase(logout.fulfilled, (state, action) => {
                state.propertiesOwnerLogout.data = action.payload;
                state.propertiesOwnerLogout.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.propertiesOwnerLogout.data = null;
                state.propertiesOwnerLogout.error = action.error.message;
            })
    }
});

export const { setLoader, setActionDisabled } = authSlice.actions;
export default authSlice.reducer;