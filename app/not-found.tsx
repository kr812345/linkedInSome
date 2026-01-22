import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-background text-text-primary px-4">
      <div className="text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/images/not_found_avatar.png"
            alt="Page Not Found"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-6xl font-bold text-bg-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Oops! It looks like you're lost. The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-bg-primary hover:bg-bg-secondary text-white font-medium px-8 py-3 rounded-full transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
