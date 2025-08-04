"use client"

import { useCallback, useMemo, useState } from "react"
import { useCarrinho } from "@/hooks/use-cart"
import { produtosMock } from "../mock-data"
import type { Produto } from "../types"
import { ModalAdicionarProduto } from "./add-product-modal"
import { criarColunasProduto } from "./product-columns"
import { TabelaDadosProduto } from "./product-data-table"

export function TabelaProduto() {
	const { adicionarAoCarrinho } = useCarrinho()
	const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
	const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false)

	const lidarComAdicionarProduto = useCallback((produto: Produto) => {
		setProdutoSelecionado(produto)
		setModalAdicionarAberto(true)
	}, [])

	const lidarComConfirmarAdicao = useCallback(
		(dadosProduto: {
			produto: Produto
			quantidade: number
			volume: number
			valorUnitario: number
			misturarLote: boolean
		}) => {
			// Adicionar ao carrinho com os dados personalizados
			adicionarAoCarrinho({
				...dadosProduto.produto,
				preco: dadosProduto.valorUnitario,
				peso: dadosProduto.volume,
			})
			setModalAdicionarAberto(false)
			setProdutoSelecionado(null)
		},
		[adicionarAoCarrinho],
	)

	const colunas = useMemo(
		() => criarColunasProduto(lidarComAdicionarProduto),
		[lidarComAdicionarProduto],
	)

	return (
		<>
			<TabelaDadosProduto colunas={colunas} dados={produtosMock} />
			{produtoSelecionado && (
				<ModalAdicionarProduto
					produto={produtoSelecionado}
					aberto={modalAdicionarAberto}
					aoFechar={() => {
						setModalAdicionarAberto(false)
						setProdutoSelecionado(null)
					}}
					aoAdicionarAoCarrinho={lidarComConfirmarAdicao}
				/>
			)}
		</>
	)
}
