import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            })
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}