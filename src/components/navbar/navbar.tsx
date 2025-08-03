import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavbarDropdown } from "./navbar-dropdown"
import { NavbarMobile } from "./navbar-mobile"
import { navigationData } from "./navigation-data"
import { UserProfile } from "./user-profile"

interface NavbarProps {
	className?: string
}

export function Navbar({ className }: NavbarProps) {
	return (
		<nav
			className={cn(
				"fixed top-0 left-0 w-full z-50 bg-orange-500 backdrop-blur border-b border-primary-foreground/20 shadow-sm",
				className,
			)}
		>
			<div className="px-4 md:px-10">
				<div className="flex items-center justify-between w-full h-16">
					<div className="flex-shrink-0">
						<div className="flex items-center space-x-2">
							<div className="flex items-center justify-center w-8 h-8 bg-white rounded-md">
								<ShoppingCart className="h-5 w-5 text-orange-500" />
							</div>
							<Link
								href="/"
								className="text-xl font-bold text-white hover:text-white/80 transition-colors"
							>
								Venda Rápida
							</Link>
						</div>
					</div>

					<div className="hidden md:flex items-center space-x-4">
						{navigationData.map((section) => (
							<NavbarDropdown key={section.label} section={section} />
						))}
					</div>

					<div className="hidden md:flex items-center space-x-2">
						<UserProfile />
					</div>

					<NavbarMobile />
				</div>
			</div>
		</nav>
	)
}
