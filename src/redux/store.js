import {applyMiddleware, combineReducers, createStore} from "redux";
import {thunk as thunkMiddleware} from "redux-thunk"
import literatureReducer from "./reducers/literature-reducer";
import galleryReducer from "./reducers/gallery-reducer";
import {reducer as formReducer} from 'redux-form';
import musicReducer from "./reducers/music-reducer";
import adminReducer from "./reducers/admin-reducer";

let reducers = combineReducers({
    literature: literatureReducer,
    gallery: galleryReducer,
    music: musicReducer,
    form: formReducer,
    admin: adminReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;