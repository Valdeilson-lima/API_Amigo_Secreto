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
}
