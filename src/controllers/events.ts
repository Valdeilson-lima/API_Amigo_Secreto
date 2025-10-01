import { RequestHandler } from "express";
import * as EventModel from "../services/events";
import { z } from "zod";

export const getAll: RequestHandler = async (_req, res) => {
  const itens = await EventModel.getAllEvents();
  
  res.json(itens ?? []);
};

export const getEventById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const item = await EventModel.getEventOne(Number(id));
  if (!item) {
    return res.status(404).json({ error: "Evento não encontrado" });
  }
  res.json({ event: item });
};

export const createEvent: RequestHandler = async (req, res) => {
  const createEventSchema = z.object({
    title: z.string().trim().min(1, "title é obrigatório"),
    description: z.string().trim().min(1, "description é obrigatória"),
    grouped: z.coerce.boolean().default(false),
  });

  const body = createEventSchema.safeParse(req.body);
  if (!body.success) {
    return res
      .status(400)
      .json({ error: "Dados inválidos", details: body.error.issues });
  }

  const newEvent = await EventModel.createEvent(body.data);
  if (!newEvent) {
    return res.status(500).json({ error: "Erro ao criar evento" });
  }
  res.status(201).json({ event: newEvent });
};
