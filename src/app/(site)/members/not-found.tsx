import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-80 w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">
        404
      </h1>
      <div className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-600 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <Link href={"/members"}>
        <div className="relative inline-block text-sm font-bold text-red-400 group active:text-red-400 focus:outline-none focus:ring mt-5">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-gradient-to-r from-pink-400 via-red-400 to-pink-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block px-8 py-3 bg-white  border border-current">
            Go Home
          </span>
        </div>
      </Link>
    </div>
  );
}
