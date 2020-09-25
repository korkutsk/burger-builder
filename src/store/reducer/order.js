import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const iniState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
};

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
};

const purchaseOrderStart = state => {
    return updateObject(state, { loading: true });
};

const purchaseInit = state => {
    return updateObject(state, { purchased: false });
};

const fetchOrdersStart = state => {
    return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loading: false });
};

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = iniState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.PURCHASE_ORDER_START: return purchaseOrderStart(state);
        case actionTypes.PURCHASE_INIT: return purchaseInit(state);
        case actionTypes.FETCH_OREDERS_START: return fetchOrdersStart(state);
        case actionTypes.FETCH_OREDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_OREDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
};

export default reducer;