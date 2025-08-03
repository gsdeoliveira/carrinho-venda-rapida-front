"use client"

import { ShoppingCart } from "lucide-react"
import { useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { EmptyState } from "../empty-state"
import { ProductSearchModal } from "../produtos/product-search-modal"
import { createCartItemColumns } from "./cart-item-columns"
import { CartItemsDataTable } from "./cart-items-data-table"

export function CartItemsList() {
	const {
		cartItems,
		updateQuantity,
		updatePesoLiquido,
		updateGerarRibana,
		updatePercentualRibana,
		updateObservacao,
		removeFromCart,
	} = useCart()

	// Otimizando as funções de atualização com useCallback
	const handleUpdateQuantity = useCallback(
		(id: string, quantity: number) => {
			updateQuantity(id, quantity)
		},
		[updateQuantity],
	)

	const handleUpdatePesoLiquido = useCallback(
		(id: string, newPeso: number) => {
			updatePesoLiquido(id, newPeso)
		},
		[updatePesoLiquido],
	)

	const handleUpdateGerarRibana = useCallback(
		(id: string, gerarRibana: boolean) => {
			updateGerarRibana(id, gerarRibana)
		},
		[updateGerarRibana],
	)

	const handleUpdatePercentualRibana = useCallback(
		(id: string, percentual: number) => {
			updatePercentualRibana(id, percentual)
		},
		[updatePercentualRibana],
	)

	const handleUpdateObservacao = useCallback(
		(id: string, observacao: string) => {
			updateObservacao(id, observacao)
		},
		[updateObservacao],
	)

	const handleRemoveFromCart = useCallback(
		(id: string) => {
			removeFromCart(id)
		},
		[removeFromCart],
	)

	// Otimizando a criação das colunas com useMemo
	const columns = useMemo(
		() =>
			createCartItemColumns(
				handleUpdateQuantity,
				handleUpdatePesoLiquido,
				handleUpdateGerarRibana,
				handleUpdatePercentualRibana,
				handleUpdateObservacao,
				handleRemoveFromCart,
			),
		[
			handleUpdateQuantity,
			handleUpdatePesoLiquido,
			handleUpdateGerarRibana,
			handleUpdatePercentualRibana,
			handleUpdateObservacao,
			handleRemoveFromCart,
		],
	)

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg font-semibold flex items-center gap-2">
						<ShoppingCart className="h-5 w-5" />
						Itens do Carrinho
					</CardTitle>

					<ProductSearchModal />
				</div>
			</CardHeader>
			<CardContent className="p-6">
				{cartItems.length === 0 ? (
					<EmptyState
						title="Nenhum item no carrinho"
						description="Clique em 'Adicionar Item' para adicionar um produto ao carrinho"
					/>
				) : (
					<CartItemsDataTable columns={columns} data={cartItems} />
				)}
			</CardContent>
		</Card>
	)
}
