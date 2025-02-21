import { getMemberPhotos } from "@/actions";
import { CardInnerWrapper } from "@/components";
import Image from "next/image";

interface Props {
	params: Promise<{ userId: string }>;
}

export default async function PhotosPage({ params }: Props) {
	const { userId } = await params;
	const memberPhotos = await getMemberPhotos(userId);
	return (
		<CardInnerWrapper
			header="Member Photos"
			body=<div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 p-5">
				{memberPhotos?.map((photo) => (
					<Image
						key={photo.id}
						src={photo.url}
						width={200}
						height={200}
						alt="User photo"
						className="h-full object-cover rounded-2xl"
					/>
				))}
			</div>
		/>
	);
}
