import { RequestHandler } from "express";
import * as authService from "../services/auth";
import { z } from "zod";

export const login: RequestHandler = (req, res) => {
  const loginSchema = z.object({
    password: z.string(),
  });

  const body = loginSchema.safeParse(req.body);
  if (!body.success) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  // Validar a senha e gerar o token JWT
  if (authService.validatePassword(body.data.password)) {
    const token = authService.generateToken();
    return res.json({ token });
  } else {
    return res.status(401).json({ error: "Senha inválida" });
  }
};

export const validateTokenMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];
  if (!token || !authService.validateToken(token)) {
    return res.status(401).json({ error: "Token inválido" });
  }

  next();
}
