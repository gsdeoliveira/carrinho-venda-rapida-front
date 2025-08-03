import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<div className="min-h-screen">
			<div className="p-8 border-t">
				<div className="flex flex-col gap-6 items-center justify-center">
					<h1 className="text-2xl font-bold">Variants de Botão</h1>
					<div className="flex gap-4 items-center justify-center flex-wrap">
						<Button>Default</Button>
						<Button variant="success">Success</Button>
						<Button variant="warning">Warning</Button>
						<Button variant="danger">Danger</Button>
						<Button variant="info">Info</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
