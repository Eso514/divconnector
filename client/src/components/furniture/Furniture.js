import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {getFurnitureById} from '../../actions/furniture';
import { set_global } from '../../global';

const Furniture = ({getFurnitureById, isAuthenticated, furniture: {furnitures}, auth, match}) => {
    useEffect(() => {
        getFurnitureById(match.params.id)
    }, [getFurnitureById]);

    const set_item = () => {
        if(!window.$furnitures){
            window.$furnitures = [];
        }
        window.$furnitures.push(furnitures);
        console.log(window.$furnitures);
        //set_global(furnitures);
    }

    return (
        <div className="jumbotron text-center">
            <img src={ require('../../img/igor-tkachenko-6565.jpg') } style={{ background:'#1A88FF', width:'250px', height: '250px', borderRadius : '50%', fontSize: '10px' }}>

            </img>
            <h1 className="display-4">{furnitures.name}</h1>
            <p className="lead">{furnitures.description}</p>
            <hr className="my-4" />
            <p>That's only its price <span style={{ background:'#1A88FF', padding:'5px', borderRadius : '5px', fontSize: '10px' }}>{furnitures.price} L.E</span></p>
            { 
                isAuthenticated ?  
                <button className="btn btn-primary btn-lg" onClick = {set_item}>Add To Cart</button> :
                <Link className="btn btn-primary btn-lg" to="/login">Login</Link>

            }
        </div>
    )
}

Furniture.propTypes = {
    getFurnitureById: PropTypes.func.isRequired,
    furniture: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    furniture: state.furniture,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getFurnitureById})(Furniture)
