const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");


class SessionsController {
    async create(request, response) {
        const { email, password } =  request.body;

        const user = await knex("users").where({ email }).first();

        if (!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const role = user.role
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({user, token, role });
    }
}

module.exports = SessionsController;