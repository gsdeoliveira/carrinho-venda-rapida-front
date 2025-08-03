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
	const { cartItems, removeFromCart } = useCart()

	const handleRemoveFromCart = useCallback(
		(id: string) => {
			removeFromCart(id)
		},
		[removeFromCart],
	)

	// Otimizando a criação das colunas com useMemo
	const columns = useMemo(
		() => createCartItemColumns(handleRemoveFromCart),
		[handleRemoveFromCart],
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
