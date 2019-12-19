import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { get_global, set_global } from '../../global';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    
    const [formData, setFormData] = useState({
        word: '',
    });
    
    const {word} = formData;
    
    const onChange = e => {
        setFormData({ ...formData, [e.target.name] : e.target.value })
    };

    var f = []   
    var x = 0 

    
    
    
    console.log(word);
    

    const authLinks = (
        <div>
            <ul>
                <li className="nav-item">
                    <Link className="nav-link" to="/home">Dashboard</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to='/mycart'>
                        My Cart
                    </Link>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-user"></i>     {user && user.name}
                    </a>
                    <div className="dropdown-menu navbar-light" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" onClick={logout} href='/login'>
                            <i className="fas fa-sign-out-alt" />{' '}
                            <span className="hide-sm">Logout</span>
                        </a>
                    </div>
                </li>
                
            </ul>
        </div>
    );
    const guestLinks = (
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
        </ul>
    );

    return (
        <div>
            <nav className="navbar navbar-light bg-primary">
                <a className="navbar-brand" href="/home"><i className="fas fa-couch"></i> SOFA </a>
                {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search"  placeholder="Search" name = 'word' value={word} onChange={e => onChange(e)} aria-label="Search" />
                    <Link class="btn btn-outline-success my-2 my-sm-0" to={(word.length > 0) ? word : 'all'}>Search</Link>
                </form>
            </nav>
            
        </div>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar)
