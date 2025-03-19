import { useQuery } from "@tanstack/react-query";
import DDIService from "../../servicos/telefones/ddi";

export const usarDDIs = () => {
  const service = new DDIService();
  return useQuery({
    queryKey: ["ddis"],
    queryFn: () => service.listarDDIs(),
  });
};
