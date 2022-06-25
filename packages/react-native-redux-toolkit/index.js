import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import { App } from './src/App'
import { store } from './src/reduxStore/store'
import { name as appName } from './app.json'

const AppWithRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => AppWithRedux)
