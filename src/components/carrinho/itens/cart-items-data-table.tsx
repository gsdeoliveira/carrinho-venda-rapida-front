"use client"

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

interface PropsTabelaDadosItensCarrinho<TData, TValue> {
	colunas: ColumnDef<TData, TValue>[]
	dados: TData[]
}

export function TabelaDadosItensCarrinho<TData, TValue>({
	colunas,
	dados,
}: PropsTabelaDadosItensCarrinho<TData, TValue>) {
	const [filtrosColunas, setFiltrosColunas] = useState<ColumnFiltersState>([])

	const tabela = useReactTable({
		data: dados,
		columns: colunas,
		onColumnFiltersChange: setFiltrosColunas,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters: filtrosColunas,
		},
	})

	return (
		<div className="w-full">
			<div className="rounded-md border overflow-hidden">
				<div className="max-h-96 overflow-y-auto overflow-x-auto">
					<Table className="min-w-[1200px] table-fixed">
						<TableHeader>
							{tabela.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className="bg-gray-50">
									{headerGroup.headers.map((header) => {
										return (
											<TableHead
												key={header.id}
												className="px-2 py-3"
												style={{
													width: header.column.columnDef.size,
													maxWidth: header.column.columnDef.size,
													minWidth: header.column.columnDef.size,
												}}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{tabela.getRowModel().rows?.length ? (
								tabela.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
										className="hover:bg-gray-50"
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="px-2 py-2"
												style={{
													width: cell.column.columnDef.size,
													maxWidth: cell.column.columnDef.size,
													minWidth: cell.column.columnDef.size,
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "nowrap",
												}}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={colunas.length}
										className="h-24 text-center"
									>
										Nenhum item no carrinho.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{tabela.getFilteredRowModel().rows.length} item(s) no carrinho.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => tabela.previousPage()}
						disabled={!tabela.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => tabela.nextPage()}
						disabled={!tabela.getCanNextPage()}
					>
						Próximo
					</Button>
				</div>
			</div>
		</div>
	)
}
