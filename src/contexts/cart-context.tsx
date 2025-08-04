"use client"

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react"
import type { ItemCarrinho, Produto } from "@/components/carrinho/types"

interface InfoCarrinho {
	id: string
	numero: string
	cliente: string
	tipoNegociacao: string
}

interface TipoContextoCarrinho {
	// Estado do carrinho
	itensCarrinho: ItemCarrinho[]
	infoCarrinho: InfoCarrinho

	// Totais calculados
	totalItens: number
	quantidadeTotal: number
	valorTotal: number

	// Ações
	adicionarAoCarrinho: (produto: Produto, quantidade?: number) => void
	atualizarQuantidade: (id: string, novaQuantidade: number) => void
	atualizarPesoLiquido: (id: string, novoPeso: number) => void
	atualizarGerarRibana: (id: string, gerarRibana: boolean) => void
	atualizarPercentualRibana: (id: string, percentual: number) => void
	atualizarObservacao: (id: string, observacao: string) => void
	removerDoCarrinho: (id: string) => void

	// Estado de loading/saving
	carregando: boolean
	salvando: boolean
	salvarCarrinho: () => Promise<void>
}

export const ContextoCarrinho = createContext<TipoContextoCarrinho | null>(null)

// Função helper para calcular totais
const calcularTotais = (itens: ItemCarrinho[]) => ({
	totalItens: itens.length,
	quantidadeTotal: itens.reduce((soma, item) => soma + item.quantidade, 0),
	valorTotal: itens.reduce((soma, item) => soma + item.valorTotal, 0),
})

interface PropsProvedorCarrinho {
	children: ReactNode
	dadosIniciais: {
		id: string
		numero: string
		cliente: string
		tipoNegociacao: string
		itens: ItemCarrinho[]
	}
}

export function ProvedorCarrinho({ children, dadosIniciais }: PropsProvedorCarrinho) {
	const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>(dadosIniciais.itens)
	const [infoCarrinho] = useState<InfoCarrinho>({
		id: dadosIniciais.id,
		numero: dadosIniciais.numero,
		cliente: dadosIniciais.cliente,
		tipoNegociacao: dadosIniciais.tipoNegociacao,
	})
	const [carregando] = useState(false)
	const [salvando, setSalvando] = useState(false)

	// Calcular totais em tempo real
	const totais = calcularTotais(itensCarrinho)

	// Ações do carrinho
	const removerDoCarrinho = useCallback((id: string) => {
		setItensCarrinho((itensAtuais) =>
			itensAtuais.filter((item) => item.id !== id),
		)
	}, [])

	const atualizarQuantidade = useCallback(
		(id: string, novaQuantidade: number) => {
			if (novaQuantidade <= 0) {
				removerDoCarrinho(id)
				return
			}

			setItensCarrinho((itensAtuais) =>
				itensAtuais.map((item) =>
					item.id === id
						? {
								...item,
								quantidade: novaQuantidade,
								valorTotal: novaQuantidade * item.valorUnitario,
								pesoLiquido: novaQuantidade * item.pesoUnitario,
							}
						: item,
				),
			)
		},
		[removerDoCarrinho],
	)

	const atualizarPesoLiquido = useCallback((id: string, novoPeso: number) => {
		setItensCarrinho((itensAtuais) =>
			itensAtuais.map((item) =>
				item.id === id
					? {
							...item,
							pesoLiquido: novoPeso,
							pesoUnitario:
								item.quantidade > 0 ? novoPeso / item.quantidade : novoPeso,
						}
					: item,
			),
		)
	}, [])

	const atualizarGerarRibana = useCallback((id: string, gerarRibana: boolean) => {
		setItensCarrinho((itensAtuais) =>
			itensAtuais.map((item) =>
				item.id === id ? { ...item, gerarRibana } : item,
			),
		)
	}, [])

	const atualizarPercentualRibana = useCallback(
		(id: string, percentual: number) => {
			setItensCarrinho((itensAtuais) =>
				itensAtuais.map((item) =>
					item.id === id ? { ...item, percentualRibana: percentual } : item,
				),
			)
		},
		[],
	)

	const atualizarObservacao = useCallback((id: string, observacao: string) => {
		setItensCarrinho((itensAtuais) =>
			itensAtuais.map((item) =>
				item.id === id ? { ...item, observacao } : item,
			),
		)
	}, [])

	const adicionarAoCarrinho = useCallback((produto: Produto, quantidade = 1) => {
		setItensCarrinho((itensAtuais) => {
			const itemExistente = itensAtuais.find((item) => item.id === produto.id)

			if (itemExistente) {
				return itensAtuais.map((item) =>
					item.id === produto.id
						? {
								...item,
								quantidade: item.quantidade + quantidade,
								valorTotal: (item.quantidade + quantidade) * item.valorUnitario,
								pesoLiquido: (item.quantidade + quantidade) * item.pesoUnitario,
							}
						: item,
				)
			} else {
				const novoItem: ItemCarrinho = {
					id: produto.id,
					empresa: parseInt(produto.codigo) || 1,
					descricao: produto.descricao,
					quantidade: quantidade,
					valorUnitario: produto.preco,
					valorTotal: quantidade * produto.preco,
					unidade: produto.unidade,
					pesoUnitario: produto.peso,
					pesoLiquido: produto.peso * quantidade,
					gerarRibana: false,
					percentualRibana: 0,
					observacao: "",
				}
				return [...itensAtuais, novoItem]
			}
		})
	}, [])

	const salvarCarrinho = useCallback(async () => {
		setSalvando(true)
		try {
			// TODO: Implementar salvamento no backend
			await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular delay
			console.log("Carrinho salvo:", { infoCarrinho, itensCarrinho })
		} catch (error) {
			console.error("Erro ao salvar carrinho:", error)
			throw error
		} finally {
			setSalvando(false)
		}
	}, [infoCarrinho, itensCarrinho])

	const valorContexto: TipoContextoCarrinho = {
		itensCarrinho,
		infoCarrinho,
		totalItens: totais.totalItens,
		quantidadeTotal: totais.quantidadeTotal,
		valorTotal: totais.valorTotal,
		adicionarAoCarrinho,
		atualizarQuantidade,
		atualizarPesoLiquido,
		atualizarGerarRibana,
		atualizarPercentualRibana,
		atualizarObservacao,
		removerDoCarrinho,
		carregando,
		salvando,
		salvarCarrinho,
	}

	return (
		<ContextoCarrinho.Provider value={valorContexto}>{children}</ContextoCarrinho.Provider>
	)
}

// Hook para usar o contexto
export function useContextoCarrinho() {
	const contexto = useContext(ContextoCarrinho)
	if (!contexto) {
		throw new Error("useContextoCarrinho deve ser usado dentro de um ProvedorCarrinho")
	}
	return contexto
}
