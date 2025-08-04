import { Loader2, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCarrinho } from "@/hooks/use-cart"

export function AcoesCarrinho() {
	const { salvarCarrinho, salvando } = useCarrinho()

	const lidarComSalvarCarrinho = async () => {
		try {
			await salvarCarrinho()
			// Aqui você pode adicionar uma notificação de sucesso
		} catch (error) {
			console.error("Erro ao salvar carrinho:", error)
		}
	}

	const lidarComDetalhesNegociacao = () => {
		// TODO: Implementar detalhes da negociação
	}

	const lidarComGerarPedido = () => {
		// TODO: Implementar geração de pedido
	}

	const lidarComGerarRibana = () => {
		// TODO: Implementar geração de ribana
	}

	const lidarComApagarCarrinho = () => {
		// TODO: Implementar apagar carrinho
	}

	return (
		<div className="grid sm:grid-cols-2 lg:flex gap-2 mb-6">
			<Button variant="info" onClick={lidarComDetalhesNegociacao}>
				Detalhes da Negociação
			</Button>
			<Button variant="success" onClick={lidarComGerarPedido}>
				Gerar Pedido
			</Button>
			<Button variant="warning" onClick={lidarComGerarRibana}>
				Gerar Ribana
			</Button>
			<Button variant="success" onClick={lidarComSalvarCarrinho} disabled={salvando}>
				{salvando ? (
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
			<Button variant="danger" onClick={lidarComApagarCarrinho}>
				<Trash2 />
				Apagar Carrinho
			</Button>
		</div>
	)
}
