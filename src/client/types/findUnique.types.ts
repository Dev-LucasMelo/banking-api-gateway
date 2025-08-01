import { contaType } from "src/auth/types/register.types"

export type enderecoType = {
    cep: string
    cidade: string
    bairro: string
    rua: string
    status: string
    criado_em: string
    atualizado_em: string
    cliente_id: string
}

export type findUniqueResponseType = {
    id: string
    nome_completo: string
    email: string
    url_perfil: string
    Conta: Pick<contaType, "id" | "agencia" | 'saldo' | "numero_conta">
    Endereco: Pick<enderecoType, "cep" | "cidade" | "bairro" | "rua">
}