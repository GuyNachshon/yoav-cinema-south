import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-white mb-4">404</h1>
      <p className="text-white/80 mb-6">הדף לא נמצא</p>
      <Link
        href="/"
        className="text-white underline focus:outline-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded"
      >
        חזרה לדף הבית
      </Link>
    </main>
  );
}
