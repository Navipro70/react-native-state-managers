### Concept and gist

Flux pattern (architecture) - unidirectional data flow, which redux provide to use to manage state. Flux is easy to debug, all changes in flux becomes from _dispatcher_
Event-source pattern, allows us to produce state not in the place of call, but in clean functions - reducers.
Single event bus, allows us to add own and 3rd party handlers to connect logging, async. Every time they handle actions and produce them.

### Disadvantages

https://habr.com/ru/post/498860/ 2.7, каждый раз вызов useSelector подписывает компоненту на обновление состояния из store, это про то как редакс обновляет состояния
Документацию лучше писать по этой статье https://ivaneroshkin.medium.com/%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%B5%D1%82-redux-a967d8616398

Optimization: because of immutable state, to update the nested object property in some arrays, we should reset all arrays and objects from previous state.
Reference principe: we cannot add references of objects, arrays and other DS to some parts of state for working with them, becaus of immutablity
Garbage collector is working too much

All of this Disadvantages dictates to us how we have to build architecture, for second diss we must normalize data and manage it using hash (data normalization in redux docs)

## Standard problems and solutions by Redux:

1. Optimization. We should use reselect/toolkit select api to prevent unnsesary rerendering, useSelector compares prev and next values on rerender and if values are not equals it's rerender component.
2. Data normalizing.
3. Asynchronous code.
4. Effects.

Почитать про паттерн saga и про его реализацию в redux https://habr.com/ru/post/427705/
