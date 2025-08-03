"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import type { CartItem } from "../types"

export const createCartItemColumns = (
	updateQuantity: (id: string, quantity: number) => void,
	updatePesoLiquido: (id: string, newPeso: number) => void,
	updateGerarRibana: (id: string, gerarRibana: boolean) => void,
	updatePercentualRibana: (id: string, percentual: number) => void,
	updateObservacao: (id: string, observacao: string) => void,
	removeFromCart: (id: string) => void,
): ColumnDef<CartItem>[] => [
	{
		accessorKey: "empresa",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="has-[>svg]:px-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Empresa
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<span className="font-mono text-sm px-2">{row.getValue("empresa")}</span>
		),
	},
	{
		accessorKey: "descricao",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="has-[>svg]:px-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Descrição
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div className="px-2">{row.getValue("descricao")}</div>,
	},
	{
		accessorKey: "unidade",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="has-[>svg]:px-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Unidade
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div className="px-2">{row.getValue("unidade")}</div>,
	},
	{
		accessorKey: "pesoLiquido",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="has-[>svg]:px-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Peso Líquido
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const item = row.original
			return (
				<div className="px-2">
					<Input
						type="number"
						step="0.001"
						value={item.pesoLiquido.toFixed(3)}
						onChange={(e) => {
							const newPeso = parseFloat(e.target.value) || 0
							updatePesoLiquido(item.id, newPeso)
						}}
						className="w-20 text-center"
					/>
				</div>
			)
		},
	},
	{
		accessorKey: "valorUnitario",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="has-[>svg]:px-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Valor Unit.
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const valor = parseFloat(row.getValue("valorUnitario"))
			return <span className="font-semibold px-2">R$ {valor.toFixed(2)}</span>
		},
	},
	{
		accessorKey: "quantidade",
		header: () => <div className="text-center">Quantidade</div>,
		cell: ({ row }) => {
			const item = row.original
			return (
				<div className="flex items-center justify-center gap-2">
					<Input
						type="number"
						min="1"
						value={item.quantidade}
						onChange={(e) => {
							const newQuantity = parseInt(e.target.value) || 1
							updateQuantity(item.id, newQuantity)
						}}
						className="w-16 text-center"
					/>
				</div>
			)
		},
	},
	{
		accessorKey: "valorTotal",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="has-[>svg]:px-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Valor Total
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const valor = parseFloat(row.getValue("valorTotal"))
			return (
				<span className="font-bold text-green-700 px-2">
					R$ {valor.toFixed(2)}
				</span>
			)
		},
	},
	{
		accessorKey: "gerarRibana",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="has-[>svg]:px-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Gerar Ribana
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const item = row.original
			return (
				<div className="flex justify-center px-2">
					<Checkbox
						className="w-6 h-6 data-[state=checked]:bg-success data-[state=checked]:border-success-dark"
						checked={item.gerarRibana}
						onCheckedChange={(checked) => {
							updateGerarRibana(item.id, checked as boolean)
						}}
					/>
				</div>
			)
		},
	},
	{
		accessorKey: "percentualRibana",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="has-[>svg]:px-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					% Ribana
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const item = row.original
			return (
				<div className="px-2">
					<Input
						type="number"
						step="0.1"
						min="0"
						max="100"
						value={item.percentualRibana?.toFixed(1) || "0.0"}
						onChange={(e) => {
							const newPercentual = parseFloat(e.target.value) || 0
							updatePercentualRibana(item.id, newPercentual)
						}}
						className="w-20 text-center"
					/>
				</div>
			)
		},
	},
	{
		accessorKey: "observacao",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="has-[>svg]:px-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Observação
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const item = row.original
			return (
				<div className="px-2 max-w-[200px]">
					<Input
						value={item.observacao || ""}
						onChange={(e) => {
							updateObservacao(item.id, e.target.value)
						}}
						placeholder="Adicionar observação"
						className="text-sm"
					/>
				</div>
			)
		},
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
						onClick={() => removeFromCart(item.id)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			)
		},
	},
]
