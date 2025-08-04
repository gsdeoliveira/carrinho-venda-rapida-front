"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
	AcoesCarrinho,
	ListaItensCarrinho,
	ResumoCarrinho,
} from "@/components/carrinho"
import type { ItemCarrinho } from "@/components/carrinho/types"
import { Button } from "@/components/ui/button"
import { ProvedorCarrinho } from "@/contexts/cart-context"

interface DadosCarrinho {
	id: string
	numero: string
	cliente: string
	tipoNegociacao: string
	itens: ItemCarrinho[]
}

export default function CarrinhoPage() {
	const params = useParams()
	const idCarrinho = params.id as string

	const [dadosCarrinho, setDadosCarrinho] = useState<DadosCarrinho | null>(null)
	const [carregando, setCarregando] = useState(true)
	const [erro, setErro] = useState<string | null>(null)

	// Scroll para o topo após carregar os dados
	useEffect(() => {
		if (!carregando && dadosCarrinho) {
			window.scrollTo({ top: 0, behavior: "smooth" })
		}
	}, [carregando, dadosCarrinho])

	// Simular carregamento de dados do carrinho
	useEffect(() => {
		const carregarDadosCarrinho = async () => {
			setCarregando(true)
			setErro(null)

			try {
				// TODO: Substituir por chamada real da API
				await new Promise((resolve) => setTimeout(resolve, 500)) // Simular delay

				// Dados mockados para teste
				const dadosCarrinhoMock: DadosCarrinho = {
					id: idCarrinho,
					numero: idCarrinho,
					cliente: "ISABELA BRAGA VIEIRA",
					tipoNegociacao: "A VISTA LJ",
					itens: [
						{
							id: "1",
							descricao: "SUPER COMFORT 30% POLIAMIDA 10% ELASTANO",
							empresa: 1,
							valorTotal: 89.9,
							pesoLiquido: 0.3,
							gerarRibana: true,
							percentualRibana: 5,
							observacao: "Tecido de alta performance",
							unidade: "MT",
							pesoUnitario: 0.3,
							valorUnitario: 89.9,
							quantidade: 1,
						},
						{
							id: "2",
							descricao: "MALHA PREMIUM 100% ALGODÃO PIMA",
							empresa: 1,
							valorTotal: 129.9,
							pesoLiquido: 0.4,
							gerarRibana: false,
							percentualRibana: 0,
							observacao: "Toque macio e confortável",
							unidade: "MT",
							pesoUnitario: 0.4,
							valorUnitario: 129.9,
							quantidade: 1,
						},
						{
							id: "3",
							descricao: "TECH DRY 80% POLIÉSTER 20% ELASTANO",
							empresa: 1,
							valorTotal: 199.9,
							pesoLiquido: 0.25,
							gerarRibana: true,
							percentualRibana: 8,
							observacao: "Secagem rápida",
							unidade: "MT",
							pesoUnitario: 0.25,
							valorUnitario: 199.9,
							quantidade: 1,
						},
					],
				}

				setDadosCarrinho(dadosCarrinhoMock)
			} catch (err) {
				setErro("Erro ao carregar carrinho")
				console.error("Erro ao carregar carrinho:", err)
			} finally {
				setCarregando(false)
			}
		}

		if (idCarrinho) {
			carregarDadosCarrinho()
		}
	}, [idCarrinho])

	if (carregando) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Carregando carrinho...</p>
				</div>
			</div>
		)
	}

	if (erro || !dadosCarrinho) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-600 mb-4">
						{erro || "Carrinho não encontrado"}
					</p>
					<Button variant="info" onClick={() => window.history.back()}>
						Voltar
					</Button>
				</div>
			</div>
		)
	}

	return (
		<ProvedorCarrinho dadosIniciais={dadosCarrinho}>
			<div className="min-h-screen bg-gray-50">
				<div className="px-3 sm:px-6 py-3 sm:py-6">
					<AcoesCarrinho />

					<div className="space-y-6">
						<ResumoCarrinho />
						<ListaItensCarrinho />
					</div>
				</div>
			</div>
		</ProvedorCarrinho>
	)
}
