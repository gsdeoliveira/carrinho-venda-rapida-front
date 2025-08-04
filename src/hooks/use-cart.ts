import { useContext } from "react"
import { ContextoCarrinho } from "@/contexts/cart-context"
import { useUIStore } from "@/stores/cart-store"

export const useCarrinho = () => {
	const contexto = useContext(ContextoCarrinho)

	// Se não estiver dentro de um ProvedorCarrinho, retorna valores padrão
	if (!contexto) {
		return {
			itensCarrinho: [],
			infoCarrinho: { id: "", numero: "", cliente: "", tipoNegociacao: "" },
			totalItens: 0,
			quantidadeTotal: 0,
			valorTotal: 0,
			adicionarAoCarrinho: () => {},
			atualizarQuantidade: () => {},
			removerDoCarrinho: () => {},
			carregando: false,
			salvando: false,
			salvarCarrinho: async () => {},
		}
	}

	return contexto
}

// Hook para UI global (modal, filtros, etc.)
export const useModalCarrinho = () => {
	const store = useUIStore()
	return {
		modalAberto: store.isModalOpen,
		setModalAberto: store.setModalOpen,
		filtrosBusca: store.searchFilters,
		atualizarFiltroBusca: store.updateSearchFilter,
	}
}

// Hook para criar novo carrinho
export const useCriacaoCarrinho = () => {
	const store = useUIStore()
	return {
		criarNovoCarrinho: store.createNewCart,
	}
}
