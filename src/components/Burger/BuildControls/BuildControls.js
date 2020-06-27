import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map((control) => (
                <BuildControl key={control.label} label={control.label}
                    addIngredient={() => props.addIngredient(control.type)}
                    removeIngredient={() => props.removeIngredient(control.type)}
                    disabled={props.disabled[control.type]}
                />
            ))
        }
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable && props.isAuth}
            onClick={props.purchasing}
        >
            {props.isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}
        </button>
    </div>
);

export default BuildControls;