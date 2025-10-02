import { RequestHandler } from "express";
import * as GroupModel from "../services/groups";

export const getAllGroups: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const itens = await GroupModel.getAllGroups(Number(id_event));
  if (itens) {
    return res.json({ groups: itens });
  } else {
    return res.status(404).json({ message: "Grupo não encontrado" });
  }
};
