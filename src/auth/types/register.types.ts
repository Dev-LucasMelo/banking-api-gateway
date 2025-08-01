
export type clienteType = {
    id: string
    nome_completo: string
    cpf: string
    email: string
    senha: string
    url_perfil: string | null
    criado_em: string
    atualizado_em: string
}

export type contaType = {
    id: string
    numero_conta: string
    agencia: string
    saldo: string
    tipo: string
    status: string
    criado_em: string
    atualizado_em: string
    cliente_id: string
}

