"use client"

import { ShoppingCart } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCarrinho } from "@/hooks/use-cart"
import { EstadoVazio } from "../empty-state"
import { ModalBuscaProduto } from "../produtos/product-search-modal"
import type { ItemCarrinho } from "../types"
import { criarColunasItemCarrinho } from "./cart-item-columns"
import { TabelaDadosItensCarrinho } from "./cart-items-data-table"

export function ListaItensCarrinho() {
	const { itensCarrinho, removerDoCarrinho } = useCarrinho()
	const [isMobile, setIsMobile] = useState(false)

	// Hook para detectar se é mobile ou desktop
	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < 768) // md breakpoint
		}

		checkIsMobile()
		window.addEventListener("resize", checkIsMobile)

		return () => window.removeEventListener("resize", checkIsMobile)
	}, [])

	const lidarComRemoverDoCarrinho = useCallback(
		(id: string) => {
			removerDoCarrinho(id)
		},
		[removerDoCarrinho],
	)

	// Otimizando a criação das colunas com useMemo
	const colunas = useMemo(
		() => criarColunasItemCarrinho(lidarComRemoverDoCarrinho, isMobile),
		[lidarComRemoverDoCarrinho, isMobile],
	)

	return (
		<Card>
			<CardHeader>
				<div className="flex items-start sm:items-center justify-between">
					<CardTitle className="sm:text-lg font-semibold flex items-center gap-2">
						<ShoppingCart className="h-5 w-5" />
						Itens do Carrinho
					</CardTitle>

					<ModalBuscaProduto />
				</div>
			</CardHeader>
			<CardContent className="p-3 sm:p-6">
				{itensCarrinho.length === 0 ? (
					<EstadoVazio
						titulo="Nenhum item no carrinho"
						descricao="Clique em 'Adicionar Item' para adicionar um produto ao carrinho"
					/>
				) : (
					<TabelaDadosItensCarrinho
						colunas={colunas}
						dados={itensCarrinho as ItemCarrinho[]}
					/>
				)}
			</CardContent>
		</Card>
	)
}
