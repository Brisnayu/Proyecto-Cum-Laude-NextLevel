import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import { getDesigns } from "@/libs/designs";
import { Design } from "@/types";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const Home = ({ designs }: Props) => {
  const { data, error } = useSWR("/api/designs", fetcher, {
    refreshInterval: 300000,
  });

  console.log("Estos son los diseños", designs)

  // console.log("La data es", data?.designs.data)

  const designList = (data?.designs.data as Design[]) || designs;

  return (
    <Layout title="Page Home" description="Pagina de inicio" image="/silla.png">
      <h1>Proyecto diseño</h1>

     
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
            <Image 
              src={design.images[1]}
              alt={design.name}
              width={200}
              height={200}
              priority
            />
          </div>
        ))}
    
    </Layout>
  );
};

// NOTA: QUEDA PENDIENTE RESOLVER PROBLEMA DE ASINCRONÍA

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

export default Home;
