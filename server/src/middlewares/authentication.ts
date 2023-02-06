import 'dotenv/config';
import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

interface IJwtPayload extends JwtPayload {
    username: string,
}

export function Authentication(request: Request, response: Response, next: NextFunction) {
    const currentToken = request.headers.authorization;

    if (!currentToken) {
        return response.status(403).json({ message: "Usuário não autorizado." });
    }

    const [, token] = currentToken.split(" ")

    try {
        const { sub } = verify(token, process.env.SECRET_KEY) as IJwtPayload;

        if (sub !== "1")
            return response.status(403).json({ message: "Usuário não autorizado." });

        return next();
    } catch {
        return response.status(403).json({ message: "Usuário não autorizado." });
    }

}