import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { hash, compare } from 'bcrypt'

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        // return this.userRepository.find()
        response.status(200).send({
            status: true,
            message: "users",
            data: await this.userRepository.find()
        })
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async register(request: Request, response: Response, next: NextFunction) {
        const { name, email, password } = request.body;

        const hashPassword = await hash(password, 10);

        const checkEmailExist = await this.userRepository.findOne({
            where: { email }
        })

        if (checkEmailExist !== null) {
            response.status(400).send({
                status: false,
                message: "email exist"
            })
            return
        }

        const data = Object.assign(new User(), {
            name, email, password: hashPassword, real_password: password
        })
        const user = await this.userRepository.save(data)

        if (!user) {
            response.status(400).send({
                status: false,
                message: "error register",
            })
            return
        }

        response.status(200).send({
            status: true,
            message: "success register",
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
        return
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body

        const userExist = await this.userRepository.findOne({
            where: { email }
        })

        if (userExist === null) {
            response.status(400).send({
                status: false,
                message: "email not found"
            })
            return
        }

        const isPasswordValid = await compare(password, userExist.password);

        if (!isPasswordValid) {
            response.status(400).send({
                status: false,
                message: "password not valid",
            })
            return
        }

        response.status(200).send({
            status: true,
            message: "success login",
            data: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email
            }
        })
        return
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}