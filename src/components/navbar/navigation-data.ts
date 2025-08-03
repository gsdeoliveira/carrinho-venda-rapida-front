export interface NavigationItem {
	label: string
	href: string
	icon: string
}

export interface NavigationSection {
	label: string
	items: NavigationItem[]
}

export const navigationData: NavigationSection[] = [
	{
		label: "Carrinho",
		items: [
			{ label: "Novo Carrinho", href: "/carrinho/novo", icon: "ShoppingCart" },
			{ label: "Meus Carrinhos", href: "/carrinho/lista", icon: "List" },
		],
	},
	{
		label: "Loja",
		items: [
			{ label: "Novo Pedido", href: "/loja/novo-pedido", icon: "Plus" },
			{
				label: "Acompanhamento de Pedidos",
				href: "/loja/acompanhamento",
				icon: "TrendingUp",
			},
		],
	},
	{
		label: "Produtos",
		items: [
			{ label: "Categoria A", href: "/produtos/categoria-a", icon: "Package" },
			{
				label: "Categoria B",
				href: "/produtos/categoria-b",
				icon: "ShoppingCart",
			},
		],
	},
]

export const userData = {
	name: "João Silva",
	avatarUrl: "https://i.pravatar.cc/150",
}
