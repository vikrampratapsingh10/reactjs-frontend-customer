import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../WebApi/api";

export const fetchProduct = createAsyncThunk("fetchProduct", async () => {
    let response = await axios.get(api.VIEW_ALL_PRODUCT)

    console.log(response.data.products);
    return response.data.products;
});

const slice = createSlice({
    name: "Product",
    initialState: {
        Product: []
    }
})