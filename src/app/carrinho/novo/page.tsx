"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useCartCreation } from "@/hooks/use-cart"

export default function NovoCarrinhoPage() {
	const router = useRouter()
	const { createNewCart } = useCartCreation()
	const [_isCreating, setIsCreating] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const createAndRedirect = async () => {
			try {
				setIsCreating(true)
				setError(null)

				// Criar novo carrinho
				const newCartId = await createNewCart()

				// Redirecionar para o carrinho criado
				router.replace(`/carrinho/${newCartId}`)
			} catch (err) {
				setError("Erro ao criar novo carrinho")
				console.error("Erro ao criar carrinho:", err)
				setIsCreating(false)
			}
		}

		createAndRedirect()
	}, [createNewCart, router])

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-600 mb-4">{error}</p>
					<Button
						variant="warning"
						onClick={() => window.location.reload()}
						className="mr-2"
					>
						Tentar Novamente
					</Button>
					<Button variant="info" onClick={() => router.push("/")}>
						Voltar ao Início
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
				<p className="text-gray-600">Criando novo carrinho...</p>
			</div>
		</div>
	)
}
