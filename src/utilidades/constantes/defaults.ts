import { EnderecoTipo } from "../../tipos/endereco"

export const defaultEndereco: EnderecoTipo = {
    id: 0,
    cep: "",
    cidade: {
      id: 1, 
      nome: "Curitiba",
      unidadeFederativa: {
        sigla: "PR", 
        nome: "Paraná",
      },
    },
    logradouro: {
      id: 1, 
      nome: "Avenida Paulista",
      tipoLogradouro: {
        sigla: "AV",
        nome: "Avenida",
      },
    },
    bairro: {
      id: 1, 
      nome: "Centro",
    },
  };
  