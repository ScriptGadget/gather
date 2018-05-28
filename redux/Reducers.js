import { bindActionCreators, combineReducers } from 'redux';

import * as Actions from "./Actions" //Import the actions types constant we defined in our actions

import { sha1 } from 'sha1';

let dataState = { data: [], loading:true, signedIn: false };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case Actions.DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading:false });
            return state;
        case Actions.ADD_READING:
            var newReadingId = JSON.stringify(action.reading);
            var newReading = Object.assign({}, action.reading, {id: newReadingId});
            var newData = Object.assign({}, state.data);
            newData.entities.newReadings.byId[newReadingId] = newReading;
            newData.entities.newReadings.allIds = [...newData.entities.newReadings.allIds, newReadingId];
            state = Object.assign({}, state, { data: newData });
            return state;
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
export function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
export function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}


export default rootReducer;
