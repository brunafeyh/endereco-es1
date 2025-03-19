import { useQuery } from "@tanstack/react-query";
import { MedicamentoService } from "../../servicos/medicamento";

export const usarMedicamentos = () => {
  const service = new MedicamentoService();
  return useQuery({
    queryKey: ["medicamentos"],
    queryFn: () => service.listarMedicamentos(),
  })
}