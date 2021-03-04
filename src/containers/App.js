import React from 'react';
import { connect } from 'react-redux';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';


import {
    likeFunc_act,
    unlikeFunc_act,
    morePhotos_act,
    changeSearch_act,
    searchPhotos_act
} from '../actions/actions.js'

import Navbar from '../components/navbar.js'
import Gallery from '../components/gallery.js';
import Photo from '../components/photo.js';

let App = (props) => {
    return (
        <Router basename='/'>
            <Navbar
                props={props}
                Link={Link}
            />

            <div className='container'>
                <Switch>
                    <Route exact path='/'>
                        <Gallery
                            props={props}
                            Link={Link}
                        />
                    </Route>

                    <Route path='/photo/:id'>
                        <Photo
                            props={props}
                            Link={Link}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeFunc: (id) => dispatch(likeFunc_act(id)),
        unlikeFunc: (id) => dispatch(unlikeFunc_act(id)),
        morePhotos: (photos) => dispatch(morePhotos_act(photos)),
        changeSearch: (word) => dispatch(changeSearch_act(word)),
        searchPhotos: (photos) => dispatch(searchPhotos_act(photos))
    }
}

App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default App;