import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
	return (
		<Card className="border-border">
			<CardHeader className="text-center">
				<div className="flex justify-center mb-4">
					<Skeleton className="w-12 h-12 rounded-lg" />
				</div>
				<Skeleton className="h-6 w-3/4 mx-auto mb-2" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3 mx-auto" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-4/5 mx-auto" />
			</CardContent>
		</Card>
	)
}

export function FeatureCardsSkeleton() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{Array.from({ length: 3 }, (_, i) => (
				<CardSkeleton key={`skeleton-${i}`} />
			))}
		</div>
	)
}
