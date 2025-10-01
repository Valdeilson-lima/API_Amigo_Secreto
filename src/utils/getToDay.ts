export const getToDay = (): string => {
  return Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .split("/")
    .reverse()
    .join("");
}