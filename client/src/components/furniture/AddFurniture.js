import React, { Fragment, useState } from 'react'
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { add } from '../../actions/furniture';
import PropTypes from 'prop-types';

const AddFurniture = ({ setAlert, add}) => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });

    const {name, description, price} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        add({name, description, price});
    }

    return (
        <Fragment>
                <h1 className="large text-primary">
                    Add furniture
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Add a new furniture</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                    <input 
                    type="text" 
                    placeholder="Name" 
                    minLength="6" 
                    name = 'name'
                    value={name} 
                    onChange={e => onChange(e)}
                    autoComplete='off'
                    required />
                    </div>
                    <div className="form-group">
                    <input 
                    type="text" 
                    placeholder="Description"
                    minLength="30" 
                    name = 'description'
                    value={description}
                    onChange={e => onChange(e)}
                    required />
                    </div>
                    <div className="form-group">
                    <input 
                    type="number" 
                    placeholder="Price" 
                    name = 'price'
                    value={price}
                    onChange={e => onChange(e)}
                    required />
                    </div>
                    <input type="submit" value="Add Item" className="btn btn-primary" />
                </form>
            </Fragment>
    )
}

AddFurniture.propTypes = {
    setAlert: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, add })(AddFurniture)
