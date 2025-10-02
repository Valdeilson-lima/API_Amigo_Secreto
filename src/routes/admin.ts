import { Router } from 'express';
import * as authController from '../controllers/auth';
import * as eventController from '../controllers/events';
import * as groupController from '../controllers/groups'; 

const router = Router();

router.post('/login', authController.login);

router.get('/ping', authController.validateTokenMiddleware, (req, res) => {
    res.json({ pong: true, admin: true });
});

router.get('/events', authController.validateTokenMiddleware, eventController.getAll);

router.get('/events/:id', authController.validateTokenMiddleware, eventController.getEventById);

router.post('/events', authController.validateTokenMiddleware, eventController.createEvent);

router.put('/events/:id', authController.validateTokenMiddleware, eventController.updateEvent);

router.delete('/events/:id', authController.validateTokenMiddleware, eventController.deleteEvent);

// Rotas de Groups podem ser adicionadas aqui
router.get('/events/:id_event/groups', authController.validateTokenMiddleware, groupController.getAllGroups);

export default router;