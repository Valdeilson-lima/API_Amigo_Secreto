import prisma from "../utils/prisma";

export const getAllGroups = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({
      where: { id_event },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
