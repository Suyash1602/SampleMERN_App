import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// make api call
export const userLoginLifeCycle = createAsyncThunk("login", async (userCredObj, { rejectWithValue }) => {
    let res = await axios.post("http://localhost:4000/user/login", userCredObj)
    console.log("res is ", res)
    // save token in local storage
    if (res.data.message === "success") {
        localStorage.setItem("token", res.data.token)
        return res.data
    }
    else {
        return rejectWithValue(res.data.message)
    }
})


export const userLoginSlice = createSlice({
    name: "login",
    initialState: { userObj: {}, isPending: false, isSuccess: false, isError: false, errMessage: "" },
    reducers: {
        clearState: (state, actio) => {
            state.userObj = {};
            state.isPending = false;
            state.isSuccess = false;
            state.isError = false;
            state.errMessage = "";
        }
    },
    extraReducers: {
        [userLoginLifeCycle.pending]: (state, action) => {
            state.isPending = true
        },
        [userLoginLifeCycle.fulfilled]: (state, action) => {
            console.log("actino obj in fullfilled", action)
            state.userObj = action.payload.user;
            state.isSuccess = true;
            state.isPending = false;
            state.isError = false;
            state.errMessage = ""
        },
        [userLoginLifeCycle.rejected]: (state, action) => {
            console.log("actino obj in rejected", action)
            state.userObj = {};
            state.isSuccess = false;
            state.isPending = false;
            state.isError = true;
            state.errMessage = action.payload;
        },
    }
})

// export action creation functino
export const { clearState } = userLoginSlice.actions;
// export reducer
export default userLoginSlice.reducer;
