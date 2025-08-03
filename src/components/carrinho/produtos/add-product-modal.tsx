"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Product } from "../types"

interface AddProductModalProps {
	product: Product | null
	isOpen: boolean
	onClose: () => void
	onAddToCart: (productData: {
		product: Product
		quantidade: number
		volume: number
		valorUnitario: number
		misturarLote: boolean
	}) => void
}

export function AddProductModal({
	product,
	isOpen,
	onClose,
	onAddToCart,
}: AddProductModalProps) {
	const [quantidade, setQuantidade] = useState<number>(1)
	const [volume, setVolume] = useState<number>(20) // 1 unidade = 20kg
	const [valorUnitario, setValorUnitario] = useState<number>(0)
	const [misturarLote, setMisturarLote] = useState<boolean>(false)
	const [inputType, setInputType] = useState<"quantidade" | "volume">(
		"quantidade",
	)

	// Reset form when product changes
	useEffect(() => {
		if (product) {
			setQuantidade(1)
			setVolume(20)
			setValorUnitario(product.preco)
			setMisturarLote(false)
			setInputType("quantidade")
		}
	}, [product])

	// Calculate volume when quantidade changes and quantidade is selected
	useEffect(() => {
		if (inputType === "quantidade") {
			setVolume(quantidade * 20)
		}
	}, [quantidade, inputType])

	// Calculate quantidade when volume changes and volume is selected
	useEffect(() => {
		if (inputType === "volume") {
			setQuantidade(Math.round((volume / 20) * 100) / 100)
		}
	}, [volume, inputType])

	const handleQuantidadeChange = (value: number) => {
		setQuantidade(value)
	}

	const handleVolumeChange = (value: number) => {
		setVolume(value)
	}

	const handleAddToCart = () => {
		if (!product) return

		onAddToCart({
			product,
			quantidade,
			volume,
			valorUnitario,
			misturarLote,
		})

		onClose()
	}

	if (!product) return null

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px] overflow-auto max-h-[calc(100vh-200px)]">
				<DialogHeader>
					<DialogTitle className="text-start text-base md:text-lg">
						Adicionar Produto ao Carrinho
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4 py-4">
					{/* Informações do Produto */}
					<div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
						<div>
							<Label className="text-sm font-medium text-gray-600">
								Produto
							</Label>
							<p className="text-sm font-semibold">{product.descricao}</p>
						</div>
						<div>
							<Label className="text-sm font-medium text-gray-600">
								Código
							</Label>
							<p className="text-sm font-mono">{product.codigo}</p>
						</div>
						<div>
							<Label className="text-sm font-medium text-gray-600">
								Empresa
							</Label>
							<p className="text-sm">{product.empresa}</p>
						</div>
						<div>
							<Label className="text-sm font-medium text-gray-600">
								Estoque
							</Label>
							<p className="text-sm">{product.estoque.toFixed(2)}</p>
						</div>
					</div>

					{/* Escolha do tipo de entrada */}
					<div>
						<Label className="text-base font-medium">Tipo de entrada</Label>
						<RadioGroup
							value={inputType}
							onValueChange={(value) =>
								setInputType(value as "quantidade" | "volume")
							}
							className="flex flex-row space-x-6"
						>
							<div className="flex items-center space-x-2 mt-2">
								<RadioGroupItem value="quantidade" id="tipo-quantidade" />
								<Label htmlFor="tipo-quantidade">
									Por Quantidade (unidades)
								</Label>
							</div>
							<div className="flex items-center space-x-2 mt-2">
								<RadioGroupItem value="volume" id="tipo-volume" />
								<Label htmlFor="tipo-volume">Por Volume (kg)</Label>
							</div>
						</RadioGroup>
					</div>

					<div className="space-y-2">
						{inputType === "quantidade" ? (
							<>
								<Label htmlFor="quantidade">Quantidade (unidades)</Label>
								<Input
									id="quantidade"
									type="number"
									min="0"
									step="0.01"
									value={quantidade}
									onChange={(e) =>
										handleQuantidadeChange(parseFloat(e.target.value) || 0)
									}
									placeholder="Digite a quantidade em unidades"
								/>
								<div className="text-xs text-gray-500">
									Volume calculado: {volume.toFixed(2)} kg (1 unidade = 20kg)
								</div>
							</>
						) : (
							<>
								<Label htmlFor="volume">Volume (kg)</Label>
								<Input
									id="volume"
									type="number"
									min="0"
									step="0.01"
									value={volume}
									onChange={(e) =>
										handleVolumeChange(parseFloat(e.target.value) || 0)
									}
									placeholder="Digite o volume em kg"
								/>
								<div className="text-xs text-gray-500">
									Quantidade calculada: {quantidade.toFixed(3)} unidades (1
									unidade = 20kg)
								</div>
							</>
						)}
					</div>

					{/* Valor Unitário */}
					<div className="space-y-2">
						<Label htmlFor="valorUnitario">Valor Unitário (R$)</Label>
						<Input
							id="valorUnitario"
							type="number"
							min="0"
							step="0.01"
							value={valorUnitario}
							onChange={(e) =>
								setValorUnitario(parseFloat(e.target.value) || 0)
							}
						/>
					</div>

					{/* Misturar Lote */}
					<div className="flex items-center space-x-2">
						<Checkbox
							id="misturarLote"
							checked={misturarLote}
							onCheckedChange={(checked) => setMisturarLote(checked as boolean)}
						/>
						<Label htmlFor="misturarLote" className="text-sm font-medium">
							Misturar Lote
						</Label>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button onClick={handleAddToCart} disabled={quantidade <= 0}>
						Adicionar ao Carrinho
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
