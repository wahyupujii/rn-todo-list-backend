import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Todo } from '../entity/Todo'
import { User } from '../entity/User'

export class TodoController {

    private todoRepository = AppDataSource.getRepository(Todo)
    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        const userID = request.query.userID
        const getUser = await this.userRepository.findOne({
            select: ['id'],
            where: { id: userID }
        })

        if (getUser === null) return

        const todos = await this.todoRepository.find({
            where: { user: getUser },
        })

        response.status(200).send({
            status: true,
            message: "todos",
            data: todos
        })
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { todo, userID } = request.body

        //get user
        const getUser = await this.userRepository.findOne({
            select: ['id'],
            where: { id: userID }
        })

        const saveTodo = await this.todoRepository.save({
            todo: todo,
            user: getUser
        })

        if (!saveTodo) {
            response.status(400).send({
                status: false,
                message: "error save todo",
            })
            return
        }

        response.status(200).send({
            status: true,
            message: "success save todo",
            data: saveTodo
        })
        return
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const { todoID, checked } = request.body

        const todo = await this.todoRepository.createQueryBuilder().update().set({
            isChecked: checked
        }).where("id = :id", { id: todoID }).execute();

        if (!todo.affected) {
            response.status(400).send({
                status: false,
                message: "error update",
            })
            return
        }

        response.status(200).send({
            status: true,
            message: "success update",
        })
        return
    }
}