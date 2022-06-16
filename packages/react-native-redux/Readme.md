### Concept and gist

Flux pattern (architecture) - unidirectional data flow, which redux provide to use to manage state. Flux is easy to debug, all changes in flux becomes from _dispatcher_
Event-source pattern, allows us to produce state not in the place of call, but in clean functions - reducers.
Single event bus, allows us to add own and 3rd party handlers to connect logging, async. Every time they handle actions and produce them.

### Disadvantages

Optimization: because of immutable state, to update the nested object property in some arrays, we should reset all arrays and objects from previous state.
Reference principe: we cannot add references of objects, arrays and other DS to some parts of state for working with them, becaus of immutablity
Garbage collector is working too much

All of this Disadvantages dictates to us how we have to build architecture, for second diss we must normalize data and manage it using hash (data normalization in redux docs)
