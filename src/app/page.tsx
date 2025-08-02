import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<div className="container px-10 py-8">
			<h1 className="text-3xl font-bold mb-6">
				Bem-vindo ao Carrinho Venda Rápida
			</h1>
			<p className="text-lg mb-4">
				Utilize o menu de navegação acima para acessar as funcionalidades do
				sistema.
			</p>
			<div className="mt-8">
				<Button className="mr-4">Iniciar Venda</Button>
				<Button variant="outline">Ver Produtos</Button>
			</div>
		</div>
	)
}
