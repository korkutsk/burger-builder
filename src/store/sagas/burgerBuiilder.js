import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
    try {
        // TODO update url
        const response = yield axios.get(
            '[base_url]/ingredients.json'
        );
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    };
};