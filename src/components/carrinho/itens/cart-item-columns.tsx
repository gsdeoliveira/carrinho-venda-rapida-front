"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Check, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ItemCarrinho } from "../types"

export const criarColunasItemCarrinho = (
	removerDoCarrinho: (id: string) => void,
	isMobile: boolean = false,
): ColumnDef<ItemCarrinho>[] => [
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
		header: () => <div>Descrição</div>,
		cell: ({ row }) => (
			<div className="text-left whitespace-normal">
				{row.getValue("descricao")}
			</div>
		),
		minSize: isMobile ? 150 : 200,
		size: isMobile ? 180 : 300,
	},
	{
		accessorKey: "unidade",
		header: () => <div className="text-center">Uni</div>,
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("unidade")}</div>
		),
		size: 80,
	},
	{
		accessorKey: "pesoLiquido",
		header: () => <div className="text-center">Peso Líquido</div>,
		cell: ({ row }) => {
			const item = row.original
			return <div className="text-center">{item.pesoLiquido.toFixed(2)}</div>
		},
		size: 100,
	},
	{
		accessorKey: "valorUnitario",
		header: () => <div className="text-center">Valor Unit.</div>,
		cell: ({ row }) => {
			const valor = parseFloat(row.getValue("valorUnitario"))
			return <div className="text-center">{valor.toFixed(2)}</div>
		},
		size: 100,
	},
	{
		accessorKey: "quantidade",
		header: () => <div className="text-center">Quantidade</div>,
		cell: ({ row }) => {
			const item = row.original
			return <div className="text-center">{item.quantidade}</div>
		},
		size: 100,
	},
	{
		accessorKey: "valorTotal",
		header: () => <div className="text-center">Valor Total</div>,
		cell: ({ row }) => {
			const valor = parseFloat(row.getValue("valorTotal"))
			return <div className="text-center">{valor.toFixed(2)}</div>
		},
		size: 100,
	},
	{
		accessorKey: "gerarRibana",
		header: () => <div className="text-center">Gerar Ribana</div>,
		cell: () => {
			return (
				<div className="flex justify-center px-2">
					<Check />
				</div>
			)
		},
		size: 100,
	},
	{
		accessorKey: "percentualRibana",
		header: () => <div className="text-center">% Ribana</div>,
		cell: ({ row }) => {
			const item = row.original
			return (
				<div className="text-center">{item.percentualRibana?.toFixed(1)}</div>
			)
		},
		size: 100,
	},
	{
		accessorKey: "observacao",
		header: () => <div>Observação</div>,
		cell: ({ row }) => {
			const item = row.original
			return <div>{item.observacao}</div>
		},
		size: 200,
	},
	{
		id: "actions",
		header: () => <div className="text-center"></div>,
		cell: ({ row }) => {
			const item = row.original

			return (
				<div className="flex items-center justify-center">
					<Button
						size="sm"
						variant="danger"
						onClick={() => removerDoCarrinho(item.id)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			)
		},
		size: 80,
	},
]
