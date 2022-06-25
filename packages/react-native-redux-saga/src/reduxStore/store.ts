import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat([sagaMiddleware]),
})

// TODO не забыть подключить настоящий вотчер
function* watcherSaga() {}

sagaMiddleware.run(watcherSaga)
