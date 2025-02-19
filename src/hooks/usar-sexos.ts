import { useQuery } from "@tanstack/react-query";
import SexoService from "../servicos/sexo";

export const usarSexos = () => {
  const service = new SexoService();
  return useQuery({
    queryKey: ["sexos"],
    queryFn: () => service.listarSexos(),
  });
};
