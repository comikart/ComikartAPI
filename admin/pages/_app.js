import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';

import reducer from '.'

const store = (initialState, options) => {
    return createStore(reducer, initialState);
}
class MyApp extends App {

}

export default withRedux(store)(MyApp);