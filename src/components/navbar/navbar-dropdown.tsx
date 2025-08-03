"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconRenderer } from "./icon-renderer"
import type { NavigationSection } from "./navigation-data"

interface NavbarDropdownProps {
	section: NavigationSection
}

export function NavbarDropdown({ section }: NavbarDropdownProps) {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-white/20 hover:text-white transition-colors duration-200"
				>
					{section.label}
					<ChevronDown className="ml-1 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				className="w-48 border-border bg-popover text-popover-foreground shadow-lg animate-in slide-in-from-top-2 duration-200"
			>
				{section.items.map((item) => (
					<DropdownMenuItem
						key={item.label}
						asChild
						className="hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
					>
						<Link
							href={item.href}
							className="flex items-center w-full cursor-pointer"
						>
							<IconRenderer
								iconName={item.icon}
								className="mr-2 h-4 w-4 text-muted-foreground"
							/>
							{item.label}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
