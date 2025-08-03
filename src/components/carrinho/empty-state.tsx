"use client"

import { ShoppingCart } from "lucide-react"

interface EmptyStateProps {
	icon?: React.ReactNode
	title: string
	description: string
	className?: string
}

export function EmptyState({
	icon,
	title,
	description,
	className = "",
}: EmptyStateProps) {
	return (
		<div className={`text-center py-12 text-gray-500 ${className}`}>
			{icon || <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />}
			<p className="text-lg font-semibold mb-2">{title}</p>
			<p className="text-sm mb-4">{description}</p>
		</div>
	)
}