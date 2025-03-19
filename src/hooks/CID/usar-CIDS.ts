import { useQuery } from "@tanstack/react-query";
import { CIDService } from "../../servicos/CID";

export const usarCIDS = () => {
  const service = new CIDService();
  return useQuery({
    queryKey: ["cids"],
    queryFn: () => service.listarCIDS(),
  })
}