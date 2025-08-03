export interface CartItem {
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

export interface Product {
	id: string
	codigo: string
	descricao: string
	preco: number
	categoria: string
	unidade: string
	peso: number
	empresa: number
	estoque: number
}
