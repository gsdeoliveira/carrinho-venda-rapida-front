import {
	Calculator,
	CheckCircle,
	DollarSign,
	Scale,
	ShoppingBag,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCarrinho } from "@/hooks/use-cart"

interface PropsResumoCarrinho {
	infoCliente?: string
}

export function ResumoCarrinho({
	infoCliente = "NR. 11505 - ISABELA BRAGA VIEIRA - A VISTA LJ",
}: PropsResumoCarrinho) {
	const { totalItens, quantidadeTotal, valorTotal, itensCarrinho } =
		useCarrinho()

	// Calcular peso líquido total
	const pesoLiquidoTotal = itensCarrinho.reduce(
		(soma, item) => soma + item.pesoLiquido,
		0,
	)
	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="sm:text-lg font-semibold flex items-center gap-2">
					<Calculator className="h-5 w-5" />
					Resumo do Carrinho
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-3">
					<p className="text-xs sm:text-sm font-semibold">{infoCliente}</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
					<div className="bg-green-50 rounded-lg p-4">
						<div className="flex items-center justify-center mb-2">
							<ShoppingBag className="h-6 w-6 text-green-600" />
						</div>
						<p className="text-sm text-gray-600 mb-1">Quantidade Total</p>
						<p className="text-2xl font-bold text-green-600">
							{quantidadeTotal}
						</p>
					</div>
					<div className="bg-blue-50 rounded-lg p-4">
						<div className="flex items-center justify-center mb-2">
							<Scale className="h-6 w-6 text-blue-600" />
						</div>
						<p className="text-sm text-gray-600 mb-1">Peso Líquido</p>
						<p className="text-2xl font-bold text-blue-600">
							{pesoLiquidoTotal.toFixed(2)} kg
						</p>
					</div>
					<div className="bg-purple-50 rounded-lg p-4">
						<div className="flex items-center justify-center mb-2">
							<DollarSign className="h-6 w-6 text-purple-600" />
						</div>
						<p className="text-sm text-gray-600 mb-1">Valor Total</p>
						<p className="text-2xl font-bold text-purple-600">
							R$ {valorTotal.toFixed(2)}
						</p>
					</div>
					<div className="bg-emerald-50 rounded-lg p-4">
						<div className="flex items-center justify-center mb-2">
							<CheckCircle className="h-6 w-6 text-emerald-600" />
						</div>
						<p className="text-sm text-gray-600 mb-1">Status</p>
						<div className="flex justify-center mt-2">
							<Badge
								variant={totalItens > 0 ? "warning" : "outline"}
								className="text-sm px-3 py-1"
							>
								{totalItens > 0 ? "Em Andamento" : "Novo"}
							</Badge>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
