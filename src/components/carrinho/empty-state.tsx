"use client"

import { ShoppingCart } from "lucide-react"

interface PropsEstadoVazio {
	icone?: React.ReactNode
	titulo: string
	descricao: string
	className?: string
}

export function EstadoVazio({
	icone,
	titulo,
	descricao,
	className = "",
}: PropsEstadoVazio) {
	return (
		<div className={`text-center py-12 text-gray-500 ${className}`}>
			{icone || <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />}
			<p className="text-lg font-semibold mb-2">{titulo}</p>
			<p className="text-sm mb-4">{descricao}</p>
		</div>
	)
}
