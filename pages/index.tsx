import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <Layout title="Page Home" description="Pagina de inicio" image="/silla.png">
      <h1>Proyecto diseño</h1>

      <Link href="/design">
        <button>Click here</button>
      </Link>

    </Layout>
  );
};

export default Home;
