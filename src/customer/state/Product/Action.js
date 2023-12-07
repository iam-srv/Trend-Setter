import { API_BASE_URL, api } from "../../../Config/apiConfig";
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS } from "./ActionType";

// find products action
export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_REQUEST })


    const { colors,
        sizes,
        minPrice,
        maxPrice,
        minDiscount,
        category,
        stock,
        sort,
        pageNumber,
        pageSize
    } = reqData;

    try {
        const { data } = await api.get(`/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
        console.log("product data", data);

        dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: FIND_PRODUCT_FAILURE, payload: error.message });
    }
}

// find products by id action
export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })

    const { productId } = reqData;

    console.log("product id ", productId);


    try {
        const { data } = await api.get(`/api/products/id/${productId}`);
        console.log("find Product by id", data);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
}


export const createProduct = (product) => async (dispatch) => {

    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST })

        const { data } = await api.post(`${API_BASE_URL}/api/admin/products/`, product);
        console.log("product created", data);

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data,

        })
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    }
}

export const deleteProduct = (productId) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await api.delete(`${API_BASE_URL}/api/admin/products/${productId}/delete`);
        console.log("product deleted", data);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: productId,

        })
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
}