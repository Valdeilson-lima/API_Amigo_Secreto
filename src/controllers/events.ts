import { RequestHandler } from 'express';
import * as EventModel from '../services/events';

export const getAll: RequestHandler = async (req, res) => {
   const itens = await EventModel.getAllEvents();
   if (!itens) {
      return res.status(404).json({ error: 'Nenhum evento encontrado' });
   }
   res.json(itens);
};

export const getEventById: RequestHandler = async (req, res) => {
   const { id } = req.params;
   const item = await EventModel.getEventOne(Number(id));
   if (!item) {
      return res.status(404).json({ error: 'Evento não encontrado' });
   }
   res.json({ event: item });
};
