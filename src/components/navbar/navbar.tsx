import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { NavbarDropdown } from "./navbar-dropdown"
import { NavbarMobile } from "./navbar-mobile"

interface NavbarProps {
	className?: string
}

export function Navbar({ className }: NavbarProps) {
	return (
		<nav
			className={cn(
				"fixed top-0 left-0 w-full z-50 bg-sky-300 shadow-sm",
				className,
			)}
		>
			<div className="px-4 md:px-10">
				<div className="flex items-center justify-between w-full h-16">
					<div className="flex-shrink-0">
						<Link href="/" className="flex items-center">
							<ShoppingCart className="mr-2" />
							<span className="font-bold text-lg">Venda Rápida</span>
						</Link>
					</div>

					<div className="hidden md:flex items-center space-x-4">
						<NavbarDropdown
							label="Loja"
							items={[
								{ label: "Novo Pedido", href: "/loja/novo-pedido" },
								{
									label: "Acompanhamento de Pedidos",
									href: "/loja/acompanhamento",
								},
							]}
						/>
						<NavbarDropdown
							label="Produtos"
							items={[
								{ label: "Categoria A", href: "/produtos/categoria-a" },
								{ label: "Categoria B", href: "/produtos/categoria-b" },
							]}
						/>
					</div>

					<div className="hidden md:flex items-center">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
								<Image
									src="https://i.pravatar.cc/150"
									alt="Foto de perfil"
									width={32}
									height={32}
								/>
							</div>
							<span className="text-sm font-medium">João Silva</span>
						</div>
					</div>

					<NavbarMobile />
				</div>
			</div>
		</nav>
	)
}
