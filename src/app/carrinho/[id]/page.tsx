"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CartActions, CartItemsList, CartSummary } from "@/components/carrinho"
import type { CartItem } from "@/components/carrinho/types"
import { Button } from "@/components/ui/button"
import { CartProvider } from "@/contexts/cart-context"

interface CartData {
	id: string
	numero: string
	cliente: string
	tipoNegociacao: string
	items: CartItem[]
}

export default function CarrinhoPage() {
	const params = useParams()
	const cartId = params.id as string

	const [cartData, setCartData] = useState<CartData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Scroll para o topo após carregar os dados
	useEffect(() => {
		if (!isLoading && cartData) {
			window.scrollTo({ top: 0, behavior: "smooth" })
		}
	}, [isLoading, cartData])

	// Simular carregamento de dados do carrinho
	useEffect(() => {
		const loadCartData = async () => {
			setIsLoading(true)
			setError(null)

			try {
				// TODO: Substituir por chamada real da API
				await new Promise((resolve) => setTimeout(resolve, 500)) // Simular delay

				// Dados mockados para teste
				const mockCartData: CartData = {
					id: cartId,
					numero: cartId,
					cliente: "ISABELA BRAGA VIEIRA",
					tipoNegociacao: "A VISTA LJ",
					items: [],
				}

				setCartData(mockCartData)
			} catch (err) {
				setError("Erro ao carregar carrinho")
				console.error("Erro ao carregar carrinho:", err)
			} finally {
				setIsLoading(false)
			}
		}

		if (cartId) {
			loadCartData()
		}
	}, [cartId])

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Carregando carrinho...</p>
				</div>
			</div>
		)
	}

	if (error || !cartData) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-600 mb-4">
						{error || "Carrinho não encontrado"}
					</p>
					<Button variant="info" onClick={() => window.history.back()}>
						Voltar
					</Button>
				</div>
			</div>
		)
	}

	return (
		<CartProvider initialCartData={cartData}>
			<div className="min-h-screen bg-gray-50">
				<div className="px-3 sm:px-6 py-3 sm:py-6">
					<CartActions />

					<div className="space-y-6">
						<CartSummary />
						<CartItemsList />
					</div>
				</div>
			</div>
		</CartProvider>
	)
}
