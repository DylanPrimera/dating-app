import { GiSelfLove } from "react-icons/gi";
import { RegisterForm } from "./components/RegisterForm";

export default function RegisterPage() {
	return (
		<div className="flex min-h-full flex-col justify-center py-12 sm:px-6">
			<div className="sm:mx-auto sm:w-full sm:max-w-md ">
				<GiSelfLove size={60} className="mx-auto text-red-400" />
				<h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-transparent bg-clip-text  bg-gradient-to-r from-pink-400 via-red-400 to-pink-600">
					Neinter
				</h2>
			</div>
			<RegisterForm />
		</div>
	);
}
