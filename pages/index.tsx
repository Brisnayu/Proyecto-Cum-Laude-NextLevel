import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import Link from "next/link";
import ButtonBack from "@/components/ButtonBack";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <Layout title="Page Home" description="Pagina de inicio" image="/silla.png">
      <h1>¿Qué deseas hacer?</h1>

      <div>
        <Link href="/design">
          <ButtonBack title="Ver diseños" color="button" />
        </Link>
      </div>

      <Link href="/designer">
        <ButtonBack title="Ver diseñadores" color="button" />
      </Link>

      <Link href="/form">
        <ButtonBack title="Agregar un nuevo diseñador" color="button" />
      </Link>
    </Layout>
  );
};

export default Home;
