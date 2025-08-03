"use client"

import { useCallback, useMemo, useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { mockProducts } from "../mock-data"
import type { Product } from "../types"
import { AddProductModal } from "./add-product-modal"
import { createProductColumns } from "./product-columns"
import { ProductDataTable } from "./product-data-table"

export function ProductTable() {
	const { addToCart } = useCart()
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)

	const handleAddProduct = useCallback((product: Product) => {
		setSelectedProduct(product)
		setIsAddModalOpen(true)
	}, [])

	const handleConfirmAdd = useCallback(
		(productData: {
			product: Product
			quantidade: number
			volume: number
			valorUnitario: number
			misturarLote: boolean
		}) => {
			// Adicionar ao carrinho com os dados personalizados
			addToCart({
				...productData.product,
				preco: productData.valorUnitario,
				peso: productData.volume,
			})
			setIsAddModalOpen(false)
			setSelectedProduct(null)
		},
		[addToCart],
	)

	const columns = useMemo(
		() => createProductColumns(handleAddProduct),
		[handleAddProduct],
	)

	return (
		<>
			<ProductDataTable columns={columns} data={mockProducts} />
			{selectedProduct && (
				<AddProductModal
					product={selectedProduct}
					isOpen={isAddModalOpen}
					onClose={() => {
						setIsAddModalOpen(false)
						setSelectedProduct(null)
					}}
					onAddToCart={handleConfirmAdd}
				/>
			)}
		</>
	)
}
