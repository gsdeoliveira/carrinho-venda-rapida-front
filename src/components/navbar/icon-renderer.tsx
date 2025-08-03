"use client"

import { Package, Plus, ShoppingCart, TrendingUp } from "lucide-react"

interface IconRendererProps {
	iconName: string
	className?: string
}

export function IconRenderer({ iconName, className }: IconRendererProps) {
	const iconMap = {
		Plus,
		TrendingUp,
		Package,
		ShoppingCart,
	}

	const IconComponent = iconMap[iconName as keyof typeof iconMap]

	if (!IconComponent) {
		return <Package className={className} />
	}

	return <IconComponent className={className} />
}
