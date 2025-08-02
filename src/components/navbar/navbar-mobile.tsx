"use client"

import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"

export const NavbarMobile = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className="md:hidden">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" aria-label="Menu">
						<Menu size={24} />
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="w-full p-0 sm:max-w-full">
					<SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
					<div className="flex flex-col h-full py-6 px-4">
						<div className="flex-1 mt-5">
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="loja" className="border-b">
									<AccordionTrigger className="py-2 text-lg font-medium">
										Loja
									</AccordionTrigger>
									<AccordionContent>
										<ul className="pl-4 space-y-3">
											<li>
												<Link
													href="/loja/novo-pedido"
													className="text-base hover:text-blue-600"
													onClick={() => setIsOpen(false)}
												>
													Novo Pedido
												</Link>
											</li>
											<li>
												<Link
													href="/loja/acompanhamento"
													className="text-base hover:text-blue-600"
													onClick={() => setIsOpen(false)}
												>
													Acompanhamento de Pedidos
												</Link>
											</li>
										</ul>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="produtos" className="border-b">
									<AccordionTrigger className="py-2 text-lg font-medium">
										Produtos
									</AccordionTrigger>
									<AccordionContent>
										<ul className="pl-4 space-y-3">
											<li>
												<Link
													href="/produtos/categoria-a"
													className="text-base hover:text-blue-600"
													onClick={() => setIsOpen(false)}
												>
													Categoria A
												</Link>
											</li>
											<li>
												<Link
													href="/produtos/categoria-b"
													className="text-base hover:text-blue-600"
													onClick={() => setIsOpen(false)}
												>
													Categoria B
												</Link>
											</li>
										</ul>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
						<div className="mt-auto pt-4 border-t">
							<div className="flex items-center space-x-3">
								<div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
									<Image
										src="https://i.pravatar.cc/150"
										alt="Foto de perfil"
										width={40}
										height={40}
									/>
								</div>
								<span className="text-base font-medium">João Silva</span>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}
