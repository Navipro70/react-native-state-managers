### Why no persist, compared with other state management projects?

I have great experience in mobx-state-tree, and lib named mst-persist works well,
however it doesn't support nesting persisting, I found (hack)[https://github.com/agilgur5/mst-persist/issues/27#issuecomment-1079447663], and in my opinion it's fully support persisting with a little bit fuss.

About mobx: if you use version 6 or above, single lib for use is mobx-persist-store and it's good until using nested observable classes or instances, there are two ways to correctly persist state:

1. Simple (but not correct for architecture:) is move all logic from nested classes to parent store, in this app it's can be viewed by User and Users stores: just move all logic and computed from UserEntity to UsersStore and use plane object instead of UserEntity class. But if User has itself nested logic or new features will be added to UsersStore, it code will be too large and logic incorrect.

2. Correct in all meanings, but hardest in realization: let's think in case of UserEntity and UserStore from previous way. After adding persist, we will see error that UserEntity is undefined. We cant parse classes in default storage (MMKV), and for that case we should every time write own storageController with get and set to parse in and out data by correct ways, and it's too much harder to understand and support, and a big question can any other data (class) added into UserEntity, how we figure out in this case?

And that's all, I reject way for mobx persisting, this app have too much connections between data and references. I would use a mobx-state-tree with mst-persist, because it's easy to develop applications with a lot of data maps and arrays with mobx-state-tree:)
