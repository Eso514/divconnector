import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FurnitureItem = ({ furniture }) => {
    return (
        <Fragment>
            <div className="card col" style={{ width: "18rem", margin:'10px' }}>
                <img src={ require('../../img/igor-tkachenko-6565.jpg') } className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{furniture.name} <span style={{ background: '#1A88FF', padding:'5px', borderRadius : '5px', fontSize: '10px'}}>{furniture.price} L.E</span></h5>
                    <p className="card-text">{furniture.description}</p>
                    <Link to={`/furniture/${furniture._id}`} className="btn btn-primary">See more</Link>
                </div>
            </div>
        </Fragment>
    )
}

FurnitureItem.propTypes = {
    furniture: PropTypes.object.isRequired,
}

export default FurnitureItem
