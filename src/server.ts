import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import { parse } from 'path';
import siteRoutes from './routes/site';
import adminRoutes from './routes/admin';
import { requestIntercepter } from './utils/requestIntercepter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestIntercepter);

app.use('/', siteRoutes);
app.use('/admin', adminRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

}

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === 'production') {
    // TODO: configurar SSL
    // TODO: rodar servidor na porta 443 e na 80
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}