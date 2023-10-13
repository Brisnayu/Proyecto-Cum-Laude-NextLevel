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

  const numberRandom = Math.floor(Math.random() * (designList.length));

  // console.log(designList)
  // console.log(numberRandom)

  const designRandom = designList[numberRandom];

  // console.log(designRandom);

  return (
    <Layout
      title="Page Design"
      description="Página de los diseños"
      image="/silla.png"
    >
      <h1>Listado de Diseños</h1>

      {designRandom === undefined ? (
        ""
      ) : (
        <div>
          <p>ID: {designRandom._id}</p>
          <h2>{designRandom.name}</h2>
          <p>{designRandom.year}</p>
          <Image
            src={designRandom.images[0]}
            alt={designRandom.name}
            width={200}
            height={200}
            priority
          />
        </div>
      )}

      <Link href="/design/designs">
        <button>Ver todos</button>
      </Link>

      <Link href="/">
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
