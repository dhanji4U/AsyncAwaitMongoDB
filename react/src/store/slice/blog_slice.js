import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";
import * as Alert from "../../common/Common";

export const blogList = createAsyncThunk(
    "blogList",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));
            const response = await API.getBlogList({ ...data });
            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            // Alert.ErrorAlert(error);
            throw error;
        }
    }
);


export const addBlog = createAsyncThunk(
    "addBlog",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));
            const response = await API.addBlog({ ...data });
            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Alert.ErrorAlert(error);
            throw error;
        }
    }
);


export const editBlog = createAsyncThunk(
    "editBlog",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));
            const response = await API.editBlog({ ...data });
            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Alert.ErrorAlert(error);
            throw error;
        }
    }
);

export const blogDetails = createAsyncThunk(
    "blogDetails",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));
            const response = await API.getBlogDetails({ ...data });
            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Alert.ErrorAlert(error);
            throw error;
        }
    }
);

export const changeBlogStatus = createAsyncThunk(
    "changeBlogStatus",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));
            const response = await API.changeBlogStatus({ ...data });
            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Alert.ErrorAlert(error);
            throw error;
        }
    }
);

export const deleteBlog = createAsyncThunk(
    "deleteBlog",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));
            const response = await API.deleteBlog({ ...data });
            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Alert.ErrorAlert(error);
            throw error;
        }
    }
);


const initialState = {
    blogList: {
        data: null,
        error: null,
    },
    editBlog: {
        data: null,
        error: null,
    },
    blogDetails: {
        data: null,
        error: null,
    },
    addBlog: {
        data: null,
        error: null,
    },
    deleteBlog: {
        data: null,
        error: null,
    },
    changeBlogStatus: {
        data: null,
        error: null,
    },

    isActionDisabled: true, // Set the default value to true
};


const blogSlice = createSlice({
    name: "BLOGDATA",
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },

        setActionDisabled: (state, action) => {
            state.isActionDisabled = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(blogList.fulfilled, (state, action) => {
                state.blogList.data = action.payload;
            })
            .addCase(blogList.rejected, (state, action) => {
                state.blogList.error = action.error.message;
            })

            .addCase(editBlog.fulfilled, (state, action) => {
                state.editBlog.data = action.payload;
            })
            .addCase(editBlog.rejected, (state, action) => {
                state.editBlog.error = action.error.message;
            })

            .addCase(addBlog.fulfilled, (state, action) => {
                state.addBlog.data = action.payload;
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.addBlog.error = action.error.message;
            })

            .addCase(blogDetails.fulfilled, (state, action) => {
                state.blogDetails.data = action.payload;
            })
            .addCase(blogDetails.rejected, (state, action) => {
                state.blogDetails.error = action.error.message;
            })

            .addCase(changeBlogStatus.fulfilled, (state, action) => {
                state.changeBlogStatus.data = action.payload;
            })
            .addCase(changeBlogStatus.rejected, (state, action) => {
                state.changeBlogStatus.error = action.error.message;
            })

            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.deleteBlog.data = action.payload;
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.deleteBlog.error = action.error.message;
            })
    },
});

export const { setLoader, setActionDisabled } = blogSlice.actions;
export default blogSlice.reducer;