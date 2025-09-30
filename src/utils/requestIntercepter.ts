import { Request, Response, NextFunction } from 'express';
export const requestIntercepter = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Detalhes da requisição: ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
}