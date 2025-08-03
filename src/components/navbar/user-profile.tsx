"use client"

import { LogOut, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserProfile() {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-8 w-8 rounded-full hover:bg-white/20 transition-colors duration-200"
				>
					<Avatar className="h-8 w-8">
						<AvatarImage src="/avatars/01.png" alt="@usuario" />
						<AvatarFallback className="bg-primary text-primary-foreground">
							U
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-56 border-border bg-popover text-popover-foreground shadow-lg animate-in slide-in-from-top-2 duration-200"
				align="end"
				forceMount
			>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none text-foreground">
							Usuário
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							usuario@exemplo.com
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-border" />
				<DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground transition-colors duration-150">
					<User className="mr-2 h-4 w-4 text-muted-foreground" />
					<span>Perfil</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground transition-colors duration-150">
					<Settings className="mr-2 h-4 w-4 text-muted-foreground" />
					<span>Configurações</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-border" />
				<DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground transition-colors duration-150">
					<LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
