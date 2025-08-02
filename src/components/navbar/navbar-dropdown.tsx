"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownItem {
	label: string
	href: string
}

interface NavbarDropdownProps {
	label: string
	items: DropdownItem[]
	className?: string
}

export function NavbarDropdown({
	label,
	items,
	className,
}: NavbarDropdownProps) {
	const [isOpen, setIsOpen] = React.useState(false)
	const dropdownRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener("mousedown", handleOutsideClick)
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick)
		}
	}, [])

	return (
		<div ref={dropdownRef} className={cn("relative group", className)}>
			<button
				type="button"
				className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-sky-200 transition-colors duration-200"
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-haspopup="menu"
			>
				{label}
				<ChevronDown
					className={`ml-1 h-4 w-4 transition-transform duration-200 ${
						isOpen ? "rotate-180" : ""
					}`}
					aria-hidden="true"
				/>
			</button>

			{isOpen && (
				<div
					className={cn(
						"absolute left-0 mt-1 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
					)}
					role="menu"
					aria-orientation="vertical"
				>
					<div className="py-1" role="none">
						{items.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-blue-600"
								onClick={() => setIsOpen(false)}
								role="menuitem"
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
