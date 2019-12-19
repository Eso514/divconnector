import React from 'react'
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'

const Red = props => {
    return (
        <Redirect to="/home/all" />
    )
}

Red.propTypes = {

}

export default Red
