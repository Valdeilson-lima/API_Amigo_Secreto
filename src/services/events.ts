import { Prisma } from "../generated/prisma";
import prisma from "../utils/prisma";

export const getAllEvents = async () => {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getEventOne = async (id: number) => {
  try {
    return await prisma.event.findFirst({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

type Event = Prisma.Args<typeof prisma.event, "create">["data"];
export const createEvent = async (data: Event) => {
  
  try {
    return await prisma.event.create({
      data,
    });
   
  } catch (error) {
    console.log(error);
    return false;
  }
};
