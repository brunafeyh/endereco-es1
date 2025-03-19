import { useQuery } from "@tanstack/react-query";
import DDDService from "../../servicos/telefones/ddd";

export const usarDDDs = () => {
  const service = new DDDService();
  return useQuery({
    queryKey: ["ddds"],
    queryFn: () => service.listarDDDs(),
  });
};
