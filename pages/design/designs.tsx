import Layout from "@/components/Layout";
import { getDesigns } from "@/libs/designs";
import { Design } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const DesignPage = ({ designs }: Props) => {
  const { data, error } = useSWR("/api/designs", fetcher, {
    refreshInterval: 300000,
  });

  const designList = (data?.designs.data as Design[]) || designs;

  return (
    <Layout
      title="Page Design"
      description="Página de los diseños"
      image="/silla.png"
    >
      <h1>Listado de Diseños</h1>

      {designList.map((design) => (
        <div key={design._id}>
          <p>ID: {design._id}</p>
          <h2>{design.name}</h2>
          <p>{design.year}</p>
          <Image
            src={design.images[0]}
            alt={design.name}
            width={200}
            height={200}
            priority
          />
          <Link href={`/design/${design._id}`}>
            <button>Leer más</button>
          </Link>
        </div>
      ))}

      <Link href="/design">
        <button>Volver al inicio</button>
      </Link>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const designs = await getDesigns();

  return {
    props: {
      designs: designs,
    },
    revalidate: 30,
  };
};

export type Props = {
  designs: Design[];
};

export default DesignPage;
