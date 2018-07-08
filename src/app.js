import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

// this will provide us all the features of redex i.e. store.dipatch etc.
const store = configureStore();

console.log(store.getState());

ReactDOM.render(<AppRouter/>, document.getElementById('app'));
