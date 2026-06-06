import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="es">
      <body className="grid min-h-screen place-items-center bg-background text-foreground">
        <div className="space-y-2 text-center">
          <h1 className="font-display text-4xl font-bold">404</h1>
          <p className="text-muted-foreground">Página no encontrada</p>
          <Link href="/" className="text-sm text-primary underline">
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
