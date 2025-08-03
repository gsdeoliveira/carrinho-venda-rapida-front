import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"

interface CartSummaryProps {
	customerInfo?: string
}

export function CartSummary({
	customerInfo = "NR. 11505 - ISABELA BRAGA VIEIRA - A VISTA LJ",
}: CartSummaryProps) {
	const { totalItems, totalQuantity, totalValue } = useCart()
	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">Resumo do Carrinho</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-3">
					<p className="text-sm font-semibold">{customerInfo}</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
					<div className="bg-blue-50 rounded-lg p-4">
						<p className="text-sm text-gray-600 mb-1">Total de Itens</p>
						<p className="text-2xl font-bold text-blue-600">{totalItems}</p>
					</div>
					<div className="bg-green-50 rounded-lg p-4">
						<p className="text-sm text-gray-600 mb-1">Quantidade Total</p>
						<p className="text-2xl font-bold text-green-600">{totalQuantity}</p>
					</div>
					<div className="bg-purple-50 rounded-lg p-4">
						<p className="text-sm text-gray-600 mb-1">Valor Total</p>
						<p className="text-2xl font-bold text-purple-600">
							R$ {totalValue.toFixed(2)}
						</p>
					</div>
					<div className="bg-orange-50 rounded-lg p-4">
						<p className="text-sm text-gray-600 mb-1">Status</p>
						<div className="flex justify-center mt-2">
							<Badge
								variant={totalItems > 0 ? "default" : "secondary"}
								className="text-sm px-3 py-1"
							>
								{totalItems > 0 ? "Em Andamento" : "Novo"}
							</Badge>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
