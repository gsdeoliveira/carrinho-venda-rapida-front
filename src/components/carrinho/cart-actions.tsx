import { Loader2, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

export function CartActions() {
	const { saveCart, isSaving } = useCart()

	const handleSaveCart = async () => {
		try {
			await saveCart()
			// Aqui você pode adicionar uma notificação de sucesso
		} catch (error) {
			console.error("Erro ao salvar carrinho:", error)
		}
	}

	const handleDetalhesNegociacao = () => {
		// TODO: Implementar detalhes da negociação
	}

	const handleGerarPedido = () => {
		// TODO: Implementar geração de pedido
	}

	const handleGerarRibana = () => {
		// TODO: Implementar geração de ribana
	}

	const handleApagarCarrinho = () => {
		// TODO: Implementar apagar carrinho
	}

	return (
		<div className="grid sm:grid-cols-2 lg:flex gap-2 mb-6">
			<Button variant="info" onClick={handleDetalhesNegociacao}>
				Detalhes da Negociação
			</Button>
			<Button variant="success" onClick={handleGerarPedido}>
				Gerar Pedido
			</Button>
			<Button variant="warning" onClick={handleGerarRibana}>
				Gerar Ribana
			</Button>
			<Button variant="success" onClick={handleSaveCart} disabled={isSaving}>
				{isSaving ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Salvando...
					</>
				) : (
					<>
						<Save className="mr-2 h-4 w-4" />
						Salvar Carrinho
					</>
				)}
			</Button>
			<Button variant="danger" onClick={handleApagarCarrinho}>
				<Trash2 />
				Apagar Carrinho
			</Button>
		</div>
	)
}
