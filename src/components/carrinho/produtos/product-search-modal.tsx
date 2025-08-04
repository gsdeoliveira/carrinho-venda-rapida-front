"use client"

import { Filter, Plus, Search } from "lucide-react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useModalCarrinho } from "@/hooks/use-cart"
import { TabelaProduto } from "./product-table"

export function ModalBuscaProduto() {
	const { modalAberto, setModalAberto, filtrosBusca, atualizarFiltroBusca } =
		useModalCarrinho()
	return (
		<Dialog open={modalAberto} onOpenChange={setModalAberto}>
			<DialogTrigger asChild>
				<Button variant="success">
					<Plus className="h-4 w-4" />
					<span className="hidden sm:block">Adicionar Item</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="xl:max-w-[1024px]">
				<DialogHeader>
					<DialogTitle className="text-base md:text-lg flex items-center gap-2">
						Adicionar Produtos
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4 overflow-auto max-h-[calc(100vh-200px)]">
					{/* Filtros Desktop - sempre visíveis */}
					<div className="hidden sm:block">
						<div className="flex flex-col sm:flex-row items-center gap-3">
							<div className="flex-1 w-full">
								<Label htmlFor="codArtigo">Cód. Artigo</Label>
								<Input
									id="codArtigo"
									placeholder="Digite o código"
									value={filtrosBusca.codArtigo}
									onChange={(e) =>
										atualizarFiltroBusca("codArtigo", e.target.value)
									}
								/>
							</div>
							<div className="flex-1 w-full">
								<Label htmlFor="codCor">Cód. Cor</Label>
								<Input
									id="codCor"
									placeholder="Digite a cor"
									value={filtrosBusca.codCor}
									onChange={(e) =>
										atualizarFiltroBusca("codCor", e.target.value)
									}
								/>
							</div>
							<div className="flex-1 w-full">
								<Label htmlFor="descricao">Descrição</Label>
								<Input
									id="descricao"
									placeholder="Digite a descrição"
									value={filtrosBusca.descricao}
									onChange={(e) =>
										atualizarFiltroBusca("descricao", e.target.value)
									}
								/>
							</div>
							<Button className="self-end" variant="outline">
								<Search className="h-4 w-4" />
							</Button>
						</div>
					</div>

					{/* Filtros Mobile - usando Accordion */}
					<div className="sm:hidden">
						<Accordion type="single" collapsible>
							<AccordionItem value="filters" className="border-none">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex gap-3 items-center">
										<Filter className="w-5 h-5" />
										Filtros de Busca
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-3">
										<div className="w-full">
											<Label htmlFor="codArtigo-mobile">Cód. Artigo</Label>
											<Input
												id="codArtigo-mobile"
												placeholder="Digite o código"
												value={filtrosBusca.codArtigo}
												onChange={(e) =>
													atualizarFiltroBusca("codArtigo", e.target.value)
												}
											/>
										</div>
										<div className="w-full">
											<Label htmlFor="codCor-mobile">Cód. Cor</Label>
											<Input
												id="codCor-mobile"
												placeholder="Digite a cor"
												value={filtrosBusca.codCor}
												onChange={(e) =>
													atualizarFiltroBusca("codCor", e.target.value)
												}
											/>
										</div>
										<div className="w-full">
											<Label htmlFor="descricao-mobile">Descrição</Label>
											<Input
												id="descricao-mobile"
												placeholder="Digite a descrição"
												value={filtrosBusca.descricao}
												onChange={(e) =>
													atualizarFiltroBusca("descricao", e.target.value)
												}
											/>
										</div>
										<Button className="w-full" variant="outline">
											<Search className="h-4 w-4" />
											<span className="ml-2">Pesquisar</span>
										</Button>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>

					<TabelaProduto />
				</div>
			</DialogContent>
		</Dialog>
	)
}
