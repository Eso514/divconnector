import React, { Fragment } from 'react';
import {get_global, set_global} from '../../global';

if(!window.$furnitures){
    window.$furnitures = [];
}
var f = window.$furnitures;
var sum = 0;
f.forEach(f1 => {
    console.log(f1.price);
});

export const Cart = () => {
    return (
        <Fragment>
            {
                f.length > 0 ? (
                    <div>
                        <h1>My Cart</h1>
                        <table style={{ width:'100%'}}>
                            <thead>
                                <tr>
                                    <td>name</td>
                                    <td>price</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    f.map(furniture => (
                                        <tr>
                                            <td>{ furniture.name }</td>
                                            <td>{ furniture.price }</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : <h4>No furnitures found</h4>
            }
        </Fragment>
    )
}
