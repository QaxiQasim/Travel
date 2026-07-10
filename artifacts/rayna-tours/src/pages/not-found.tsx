import { Link } from "wouter";
import { Search } from "lucide-react";
import Layout from "@/components/layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-background">
        <Search className="h-16 w-16 text-muted-foreground mb-6 opacity-20" />
        <h1 className="text-5xl font-serif font-medium text-foreground mb-4">
          404
        </h1>
        <h2 className="text-2xl font-serif text-muted-foreground mb-6">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved. Let us guide you back to the extraordinary.
        </p>
        <Link href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
          Return Home
        </Link>
      </div>
    </Layout>
  );
}
