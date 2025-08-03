"use client"

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react"
import type { CartItem, Product } from "@/components/carrinho/types"

interface CartInfo {
	id: string
	numero: string
	cliente: string
	tipoNegociacao: string
}

interface CartContextType {
	// Estado do carrinho
	cartItems: CartItem[]
	cartInfo: CartInfo

	// Totais calculados
	totalItems: number
	totalQuantity: number
	totalValue: number

	// Ações
	addToCart: (product: Product, quantity?: number) => void
	updateQuantity: (id: string, newQuantity: number) => void
	updatePesoLiquido: (id: string, newPeso: number) => void
	updateGerarRibana: (id: string, gerarRibana: boolean) => void
	updatePercentualRibana: (id: string, percentual: number) => void
	updateObservacao: (id: string, observacao: string) => void
	removeFromCart: (id: string) => void

	// Estado de loading/saving
	isLoading: boolean
	isSaving: boolean
	saveCart: () => Promise<void>
}

export const CartContext = createContext<CartContextType | null>(null)

// Função helper para calcular totais
const calculateTotals = (items: CartItem[]) => ({
	totalItems: items.length,
	totalQuantity: items.reduce((sum, item) => sum + item.quantidade, 0),
	totalValue: items.reduce((sum, item) => sum + item.valorTotal, 0),
})

interface CartProviderProps {
	children: ReactNode
	initialCartData: {
		id: string
		numero: string
		cliente: string
		tipoNegociacao: string
		items: CartItem[]
	}
}

export function CartProvider({ children, initialCartData }: CartProviderProps) {
	const [cartItems, setCartItems] = useState<CartItem[]>(initialCartData.items)
	const [cartInfo] = useState<CartInfo>({
		id: initialCartData.id,
		numero: initialCartData.numero,
		cliente: initialCartData.cliente,
		tipoNegociacao: initialCartData.tipoNegociacao,
	})
	const [isLoading] = useState(false)
	const [isSaving, setIsSaving] = useState(false)

	// Calcular totais em tempo real
	const totals = calculateTotals(cartItems)

	// Ações do carrinho
	const removeFromCart = useCallback((id: string) => {
		setCartItems((currentItems) =>
			currentItems.filter((item) => item.id !== id),
		)
	}, [])

	const updateQuantity = useCallback(
		(id: string, newQuantity: number) => {
			if (newQuantity <= 0) {
				removeFromCart(id)
				return
			}

			setCartItems((currentItems) =>
				currentItems.map((item) =>
					item.id === id
						? {
								...item,
								quantidade: newQuantity,
								valorTotal: newQuantity * item.valorUnitario,
								pesoLiquido: newQuantity * item.pesoUnitario,
							}
						: item,
				),
			)
		},
		[removeFromCart],
	)

	const updatePesoLiquido = useCallback((id: string, newPeso: number) => {
		setCartItems((currentItems) =>
			currentItems.map((item) =>
				item.id === id
					? {
							...item,
							pesoLiquido: newPeso,
							pesoUnitario: item.quantidade > 0 ? newPeso / item.quantidade : newPeso,
						}
					: item,
			),
		)
	}, [])

	const updateGerarRibana = useCallback((id: string, gerarRibana: boolean) => {
		setCartItems((currentItems) =>
			currentItems.map((item) =>
				item.id === id ? { ...item, gerarRibana } : item,
			),
		)
	}, [])

	const updatePercentualRibana = useCallback((id: string, percentual: number) => {
		setCartItems((currentItems) =>
			currentItems.map((item) =>
				item.id === id ? { ...item, percentualRibana: percentual } : item,
			),
		)
	}, [])

	const updateObservacao = useCallback((id: string, observacao: string) => {
		setCartItems((currentItems) =>
			currentItems.map((item) =>
				item.id === id ? { ...item, observacao } : item,
			),
		)
	}, [])

	const addToCart = useCallback((product: Product, quantity = 1) => {
		setCartItems((currentItems) => {
			const existingItem = currentItems.find((item) => item.id === product.id)

			if (existingItem) {
				return currentItems.map((item) =>
					item.id === product.id
						? {
								...item,
								quantidade: item.quantidade + quantity,
								valorTotal: (item.quantidade + quantity) * item.valorUnitario,
								pesoLiquido: (item.quantidade + quantity) * item.pesoUnitario,
							}
						: item,
				)
			} else {
				const newItem: CartItem = {
					id: product.id,
					empresa: parseInt(product.codigo) || 1,
					descricao: product.descricao,
					quantidade: quantity,
					valorUnitario: product.preco,
					valorTotal: quantity * product.preco,
					unidade: product.unidade,
					pesoUnitario: product.peso,
					pesoLiquido: product.peso * quantity,
					gerarRibana: false,
					percentualRibana: 0,
					observacao: "",
				}
				return [...currentItems, newItem]
			}
		})
	}, [])

	const saveCart = useCallback(async () => {
		setIsSaving(true)
		try {
			// TODO: Implementar salvamento no backend
			await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular delay
			console.log("Carrinho salvo:", { cartInfo, cartItems })
		} catch (error) {
			console.error("Erro ao salvar carrinho:", error)
			throw error
		} finally {
			setIsSaving(false)
		}
	}, [cartInfo, cartItems])

	const contextValue: CartContextType = {
		cartItems,
		cartInfo,
		totalItems: totals.totalItems,
		totalQuantity: totals.totalQuantity,
		totalValue: totals.totalValue,
		addToCart,
		updateQuantity,
		updatePesoLiquido,
		updateGerarRibana,
		updatePercentualRibana,
		updateObservacao,
		removeFromCart,
		isLoading,
		isSaving,
		saveCart,
	}

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	)
}

// Hook para usar o contexto
export function useCartContext() {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error("useCartContext deve ser usado dentro de um CartProvider")
	}
	return context
}
