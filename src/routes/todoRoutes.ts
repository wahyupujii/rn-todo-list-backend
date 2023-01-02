import { TodoController } from "../controller/TodoController"

export const todoRoutes = [
    {
        method: "get",
        route: "/todos",
        controller: TodoController,
        action: "all"
    },
    {
        method: "post",
        route: "/todos",
        controller: TodoController,
        action: "save"
    },
    {
        method: "put",
        route: "/todos",
        controller: TodoController,
        action: "update"
    },
]