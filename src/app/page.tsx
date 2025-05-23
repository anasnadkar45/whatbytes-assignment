import Image from "next/image";
import { Header } from "./components/Header";
import { Sidebar } from "./components/sidebar";
import { Footer } from "./components/footer";
import ProductListing from "./components/ProductListing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 py-6 gap-6">
        <Sidebar />
        <ProductListing />
      </div>
      <Footer />
    </main>
  );
}
