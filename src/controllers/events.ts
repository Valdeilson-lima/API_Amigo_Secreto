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

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updateEventSchema = z.object({
    status: z.enum(["active", "inactive"]).optional(),
    title: z.string().trim().min(1, "title é obrigatório").optional(),
    description: z.string().min(1, "description é obrigatória").optional(),
    grouped: z.boolean().optional(),
  });

  const body = updateEventSchema.safeParse(req.body);
  if (!body.success) {
    return res
      .status(400)
      .json({ error: "Dados inválidos", details: body.error.issues });
  }

  // Remove campos undefined
  const data = Object.fromEntries(
    Object.entries(body.data).filter(([_, v]) => v !== undefined)
  );

  const updatedEvent = await EventModel.updateEvent(Number(id), data);
  if (updatedEvent) {
    if (updatedEvent.status) {
      // TODO: Fazer sorteio
    } else {
      // TODO: Limpar sorteio
    }

    res.json({ event: updatedEvent, status: "Atualizado com sucesso" });
  }
  res.status(404).json({ error: "Evento não encontrado" });
};


export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deleted = await EventModel.deleteEvent(Number(id));
  if (deleted) {
    return res.json({ status: "Evento deletado com sucesso" });
  }
  res.status(404).json({ error: "Evento não encontrado" });
}
