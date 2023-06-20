import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../WebApi/api";

export const fetchFeatureProduct=createAsyncThunk("featuresproduct/fetchFeatureProduct",async()=>{
    let response=await axios.get(api.FEATURE_PRODUCT)
       if(response.data.status)
    return response.data.products
})

const slice=createSlice({
    name:"featuresproduct",
    initialState:{
        featuresProductList:[],
        isLoading:false,
        error:null
    },extraReducers:(builder)=>{
        builder.addCase(fetchFeatureProduct.pending,(state,action)=>{
            state.isLoading=true;
        }).addCase(fetchFeatureProduct.fulfilled,(state,action)=>{
            state.featuresProductList=action.payload
            state.isLoading=false
        }).addCase(fetchFeatureProduct.rejected,(state,action)=>{
            state.error="Something went wrong"
            state.isLoading=false
        })
    }
})

export default slice.reducer;