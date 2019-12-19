import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFurnitures, searchFurnitures } from '../../actions/furniture';
import FurnitureItem from './FurnitureItem'

const Dashboard = ({ getFurnitures, searchFurnitures, auth, furniture: {furnitures, loading}, match }) => {
    const w = match.params.word;
    console.log(typeof(w));

    useEffect(() => {
        if(w === 'all'){
            getFurnitures();
        }else{
            searchFurnitures(match.params.word);
        }
    }, [searchFurnitures, getFurnitures]);
    const x = 5;
    console.log(window.$furnitures);

    return (
        <Fragment>
            <div className="container">
                <div className="row row-cols-3">
                    {
                        furnitures.length  > 0 ? (
                            furnitures.map(furniture => (
                                <FurnitureItem key={furniture.id} furniture={furniture} />
                            ))
                        ) : <h4>No furnitures found</h4>
                    }
                </div>
            </div>
        </Fragment>
    )
}

Dashboard.propTypes = {
    getFurnitures: PropTypes.func.isRequired,
    searchFurnitures: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    furniture: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    furniture: state.furniture
});

export default connect(mapStateToProps, { getFurnitures, searchFurnitures })(Dashboard)
