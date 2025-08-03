import { useContext } from "react"
import { CartContext } from "@/contexts/cart-context"
import { useUIStore } from "@/stores/cart-store"

export const useCart = () => {
	const context = useContext(CartContext)

	// Se não estiver dentro de um CartProvider, retorna valores padrão
	if (!context) {
		return {
			cartItems: [],
			cartInfo: { id: "", numero: "", cliente: "", tipoNegociacao: "" },
			totalItems: 0,
			totalQuantity: 0,
			totalValue: 0,
			addToCart: () => {},
			updateQuantity: () => {},
			removeFromCart: () => {},
			isLoading: false,
			isSaving: false,
			saveCart: async () => {},
		}
	}

	return context
}

// Hook para UI global (modal, filtros, etc.)
export const useCartModal = () => {
	const store = useUIStore()
	return {
		isModalOpen: store.isModalOpen,
		setModalOpen: store.setModalOpen,
		searchFilters: store.searchFilters,
		updateSearchFilter: store.updateSearchFilter,
	}
}

// Hook para criar novo carrinho
export const useCartCreation = () => {
	const store = useUIStore()
	return {
		createNewCart: store.createNewCart,
	}
}
