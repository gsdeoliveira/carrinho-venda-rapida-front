export interface ItemCarrinho {
	id: string
	empresa: number
	descricao: string
	quantidade: number
	valorUnitario: number
	valorTotal: number
	unidade: string
	pesoUnitario: number
	pesoLiquido: number
	gerarRibana: boolean
	percentualRibana: number
	observacao: string
}

export interface Produto {
	id: string
	codigo: string
	descricao: string
	preco: number
	categoria: string
	unidade: string
	peso: number
	quantidade: number
	empresa: number
	estoque: number
}
