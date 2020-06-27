import React from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';

const Burger = props => {
    let processedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => (
                <Ingredient key={ingKey + i} type={ingKey}></Ingredient>
            ));
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (processedIngredients.length === 0) {
        processedIngredients = <p>Please add ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {processedIngredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(Burger);