"use client"

import { Menu } from "lucide-react"
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
import { IconRenderer } from "./icon-renderer"
import { navigationData } from "./navigation-data"
import { UserProfile } from "./user-profile"

export const NavbarMobile = () => {
	const [open, setOpen] = useState(false)
	return (
		<div className="md:hidden">
			<Sheet open={open} onOpenChange={setOpen} modal={false}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						aria-label="Menu"
						className="text-white hover:bg-white/20 hover:text-white"
					>
						<Menu size={24} />
					</Button>
				</SheetTrigger>
				<SheetContent
					side="right"
					className="w-full p-0 sm:max-w-full bg-background border-border"
				>
					<SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
					<div className="flex flex-col h-full py-6 px-4">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center space-x-2">
								<div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
									<IconRenderer iconName="ShoppingCart" />
								</div>
								<span className="text-foreground font-semibold">
									Venda Rápida
								</span>
							</div>
						</div>

						<Accordion type="single" collapsible className="w-full">
							{navigationData.map((section, index) => (
								<AccordionItem key={section.label} value={`item-${index}`}>
									<AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground">
										{section.label}
									</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-1 pl-4">
											{section.items.map((item) => (
												<Link
													key={item.href}
													href={item.href}
													className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
													onClick={() => setOpen(false)}
												>
													<IconRenderer iconName={item.icon} />
													<span>{item.label}</span>
												</Link>
											))}
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>

						<div className="pt-4 border-t border-border">
							<UserProfile />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}
