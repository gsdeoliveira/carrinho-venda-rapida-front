"use client"

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table"
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

interface PropsTabelaDados<TData, TValue> {
	colunas: ColumnDef<TData, TValue>[]
	dados: TData[]
}

export function TabelaDadosProduto<TData, TValue>({
	colunas,
	dados,
}: PropsTabelaDados<TData, TValue>) {
	const [isDesktop, setIsDesktop] = useState(false)

	useEffect(() => {
		const checkIsDesktop = () => {
			setIsDesktop(window.innerWidth >= 1024) // lg breakpoint
		}

		checkIsDesktop()
		window.addEventListener("resize", checkIsDesktop)

		return () => window.removeEventListener("resize", checkIsDesktop)
	}, [])

	const pageSize = isDesktop ? 10 : 5

	const tabela = useReactTable({
		data: dados,
		columns: colunas,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize,
			},
		},
	})

	// Atualizar pageSize quando isDesktop mudar
	useEffect(() => {
		tabela.setPageSize(pageSize)
	}, [pageSize, tabela])

	return (
		<div>
			<div className="rounded-md border overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							{tabela.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead
												key={header.id}
												className="px-2 py-3"
												style={{
													width: header.column.columnDef.size,
													minWidth: header.column.columnDef.minSize,
													maxWidth: header.column.columnDef.maxSize,
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
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className="px-2 py-2">
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
										Nenhum produto encontrado.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>

			{/* Controles de Paginação */}
			<div className="flex items-center justify-between px-4 py-3 border-t bg-white">
				<div className="flex items-center text-sm text-muted-foreground">
					<span>
						Página {tabela.getState().pagination.pageIndex + 1} de{" "}
						{tabela.getPageCount()} ({dados.length} produtos)
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => tabela.setPageIndex(0)}
						disabled={!tabela.getCanPreviousPage()}
						className="h-8 w-8 p-0"
					>
						<ChevronsLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => tabela.previousPage()}
						disabled={!tabela.getCanPreviousPage()}
						className="h-8 w-8 p-0"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => tabela.nextPage()}
						disabled={!tabela.getCanNextPage()}
						className="h-8 w-8 p-0"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => tabela.setPageIndex(tabela.getPageCount() - 1)}
						disabled={!tabela.getCanNextPage()}
						className="h-8 w-8 p-0"
					>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	)
}
