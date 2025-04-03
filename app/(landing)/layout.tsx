import { Header } from "./_components/header/header";
import { Footer } from "./_components/footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="mt-16 min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer />
    </div>
  );
}
