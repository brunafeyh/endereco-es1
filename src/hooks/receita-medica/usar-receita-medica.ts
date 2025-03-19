import { useQuery } from "@tanstack/react-query";
import ReceitaMedicaService from "../../servicos/receita-medica";

export const usarReceitasMedicas = () => {
  const service = new ReceitaMedicaService();
  return useQuery({
    queryKey: ["receitas-medicas"],
    queryFn: () => service.listarTodasReceitasMedicas(),
  })
}