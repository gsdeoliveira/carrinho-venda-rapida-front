"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Produto } from "../types"

export const criarColunasProduto = (
	aoAdicionarProduto: (produto: Produto) => void,
): ColumnDef<Produto>[] => [
	{
		accessorKey: "empresa",
		header: () => <div className="text-center">Empresa</div>,
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("empresa")}</div>
		),
		size: 80,
	},
	{
		accessorKey: "descricao",
		header: () => <div className="text-left">Descrição</div>,
		cell: ({ row }) => (
			<div className="text-left whitespace-normal">
				{row.getValue("descricao")}
			</div>
		),
		size: 500,
		minSize: 300,
	},
	{
		accessorKey: "quantidade",
		header: () => <div className="text-center">Quantidade</div>,
		cell: ({ row }) => {
			const quantidade = parseFloat(row.getValue("quantidade"))
			return <div className="text-center">{quantidade.toFixed(0)}</div>
		},
		size: 80,
	},
	{
		accessorKey: "estoque",
		header: () => <div className="text-center">Estoque</div>,
		cell: ({ row }) => {
			const estoque = parseFloat(row.getValue("estoque"))
			return <div className="text-center">{estoque.toFixed(2)}</div>
		},
		size: 100,
	},
	{
		accessorKey: "preco",
		header: () => <div className="text-center">Valor Unit.</div>,
		cell: ({ row }) => {
			const preco = parseFloat(row.getValue("preco"))
			return <div className="text-center">R$ {preco.toFixed(2)}</div>
		},
		size: 120,
	},
	{
		id: "actions",
		header: () => <div className="text-center"></div>,
		cell: ({ row }) => {
			const produto = row.original

			return (
				<div className="text-center">
					<Button
						variant="outline"
						size="sm"
						onClick={() => aoAdicionarProduto(produto)}
					>
						<Plus />
						<span className="hidden sm:inline">Adicionar</span>
					</Button>
				</div>
			)
		},
		size: 100,
	},
]
