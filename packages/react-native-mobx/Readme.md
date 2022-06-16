# Mobx

## Problem

Mobx solves just one main problem - point DOM tree update, using **observable design pattern**. Redux have their snowball tree updates, because of immutability.

## Solution under the hood

Mobx use JS getter and setter to create a handler, with array of components. Components are subscribers of get value. Handler listen to set calls and then calls this handler and rerender components. When getter calls (in render method of component), we just put reference of this component in handler array. Using this approach, every observable property will keep array of components that have to rerender after property changes.
This algorithm know how much components will be rerendered, so complexity is O(1)

## Principles of use

Mobx uses a unidirectional data flow: **Actions => Observable State => Derived Values => Reactions**<br><br>
**Actions** - functions which can update Observable state.<br>
**Observable state** - state which use observable pattern.<br>
**Derived Value** - computed value, it's updated automatically and synchronously with observable state, also it provide optimization to prevent unnecessary Reactions.<br>
**Reaction** - Component.render(), it's just UI update.

## Standard problems and solutions by Mobx:

1. Data normalization and duplication: since mobx supports mutable state, you shouldn't create ids references between state entities, build a table and track that your values are updating in many entities and stores correctly, but in this example project I use solution from redux, in my opinion mobx cannot provide stable reference concept (even with mutations), if your app have references and need to synchronize them, **mobx-state-tree** is better to use. See [redux data normalization](https://redux.js.org/tutorials/essentials/part-6-performance-normalization#normalizing-data)
2. Asynchronous actions: mobx requires one rule, that all changes must changes in actions, however I know only one reason for it - debug mode for tracking state mutations. That means you should update you state in async functions with runInAction helper, or use flow and generator function, the last one is easier. For example in redux we should add middleware.

## Why no persist in comparison with other state management projects?

I have great experience in mobx-state-tree, and lib named mst-persist works well,
however it doesn't support nesting persisting, I found (hack)[https://github.com/agilgur5/mst-persist/issues/27#issuecomment-1079447663], and in my opinion it's fully support persisting with a little bit fuss.

About mobx: if you use version 6 or above, single lib for use is mobx-persist-store and it's good until using nested observable classes or instances, there are two ways to correctly persist state:

1. Simple (but not correct for architecture:) is move all logic from nested classes to parent store, in this app it's can be viewed by User and Users stores: just move all logic and computed from UserEntity to UsersStore and use plane object instead of UserEntity class. But if User has itself nested logic or new features will be added to UsersStore, it code will be too large and logic incorrect.

2. Correct in all meanings, but hardest in realization: let's think in case of UserEntity and UserStore from previous way. After adding persist, we will see error that UserEntity is undefined. We cant parse classes in default storage (MMKV), and for that case we should every time write own storageController with get and set to parse in and out data by correct ways, and it's too much harder to understand and support, and a big question can any other data (class) added into UserEntity, how we figure out in this case?

And that's all, I reject way for mobx persisting, this app have too much connections between data and references. I would use a mobx-state-tree with mst-persist, because it's easy to develop applications with a lot of data maps and arrays with mobx-state-tree:)
