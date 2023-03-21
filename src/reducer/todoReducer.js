export const init_state = {
    activityTitle: "",
    activityId: 0,
    activity: [],
    todos: [],
}

export const todoReducer = (state, action) => {
    switch (action.type) {
        case "setTodos":
            return {
                ...state,
                todos: action.payload
            }
        case "changeActivityTitle":
            return {
                ...state,
                [action.payload.name]:action.payload.value
            }
        case "fetchActivity":
            return {
                ...state,
                activity: action.payload.activity,
                activityId: action.payload.activityId,
                activityTitle: action.payload.activityTitle,
                todos: action.payload.todos
            }
        case "asc":
            return {
                ...state,
                todos: state.todos.sort(function (a, b) {
                    // changing the case (to upper or lower) ensures a case insensitive sort.
                    let textA = a.title.toUpperCase();
                    let textB = b.title.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                }),
            }
        case "desc":
            return {
                ...state,
                todos: state.todos.sort(function (a, b) {
                    // changing the case (to upper or lower) ensures a case insensitive sort.
                    let textA = a.title.toUpperCase();
                    let textB = b.title.toUpperCase();
                    return textA > textB ? -1 : textA < textB ? 1 : 0;
                })
            }
        case "newest":
            return {
                ...state,
                todos: state.todos.sort(function (a, b) {
                    let idA = new Date(a.id);
                    let idB = new Date(b.id);
                    return idB - idA;
                })
            }
        case "oldest":
            console.log(state.todos)
            return {
                ...state,
                todos: state.todos.sort(function (a, b) {
                    let idA = new Date(a.id);
                    let idB = new Date(b.id);
                    return idA - idB;
                })
            }
        case "ongoing":
            return {
                ...state,
                todos: state.todos.sort(function (a, b) {
                    return b.is_active - a.is_active;
                })
            }
        default:
            return state;
    }
}