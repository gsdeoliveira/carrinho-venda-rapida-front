import { create } from "zustand"

// Interface para filtros de busca
interface SearchFilters {
	codArtigo: string
	codCor: string
	descricao: string
}

// Store apenas para estado de UI global (modal e filtros de busca)
interface UIState {
	// Modal de busca de produtos
	isModalOpen: boolean
	setModalOpen: (open: boolean) => void

	// Filtros de busca
	searchFilters: SearchFilters
	updateSearchFilter: (field: keyof SearchFilters, value: string) => void

	// Função para criar novo carrinho
	createNewCart: () => Promise<string>
}

export const useUIStore = create<UIState>()((set, get) => ({
	// Estado inicial
	isModalOpen: false,
	searchFilters: {
		codArtigo: "",
		codCor: "",
		descricao: "",
	},

	// Ações da UI
	setModalOpen: (open: boolean) => {
		set({ isModalOpen: open })
	},

	updateSearchFilter: (field, value) => {
		set({
			searchFilters: { ...get().searchFilters, [field]: value },
		})
	},

	// Criar novo carrinho
	createNewCart: async () => {
		try {
			// TODO: Implementar criação no backend
			const newCartId = `CAR-${Date.now().toString().slice(-6)}`

			// Simular delay da API
			await new Promise((resolve) => setTimeout(resolve, 500))

			console.log("Novo carrinho criado:", newCartId)
			return newCartId
		} catch (error) {
			console.error("Erro ao criar carrinho:", error)
			throw error
		}
	},
}))

// Manter compatibilidade com hooks existentes
export const useCartStore = useUIStore
