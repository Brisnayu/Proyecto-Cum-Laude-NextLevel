import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { DesignerExtended } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/pages/designer/oneDesigner.module.css";
import Card from "@/components/Card";
import ButtonBack from "@/components/ButtonBack";

const EntityPage = () => {
  const router = useRouter();
  const entity = router.query.entity as string;

  const [designer, setDesigner] = useState<DesignerExtended>();

  useEffect(() => {
    const fetchDesigner = async (): Promise<DesignerExtended> => {
      const response = await fetch(
        `https://project-api-design.vercel.app/api/designer/${entity}`
      );
      const result = await response.json();
      setDesigner(result.data);
      return result.data;
    };

    fetchDesigner();
  }, [entity]);

  if (!designer) {
    return;
  }

  console.log(designer);

  return (
    <Layout
      title="Page Design"
      titlePage="Información diseñadores"
      description="Página de los diseños"
      image="/silla.png"
    >
      <div className={styles.containerPrincipal}>
        <div>
          <Image
            className={styles.imageAvatar}
            src={designer.image}
            alt={designer.name}
            width={400}
            height={400}
            priority
          />
          <h2>23 ENE. 1234 - 23 FEB. 2345</h2>
        </div>
        <div className={styles.containerText}>
          <div>
            <h2>
              {designer.name} {designer.surname}
            </h2>
            <h3>{designer.nationality}</h3>
            <br />
            <p>{designer.summary}</p>
          </div>
          <div className={styles.containerDesigns}>
            <h2>Diseños</h2>
            <div className={styles.containerCards}>
              {designer.design.map((design) => (
                <div className={styles.containerCard} key={design._id}>
                  <Link href={`/design/${design._id}`}>
                    <Image
                      src={design.images[0]}
                      alt={design.name}
                      width={120}
                      height={120}
                      priority
                    />
                    <h5>{design.name}</h5>
                    <p>{design.year}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.containerButtonBack}
        style={{
          width: "100%",
          height: "14vh",
          backgroundImage: "url('/sillitas1.jpg')",
          backgroundSize: "20rem 20rem",
          backgroundRepeat: "repeat",
        }}
      >
        <Link href="/designer">
          <ButtonBack title="Volver" color="button" />
        </Link>
      </div>
    </Layout>
  );
};

export default EntityPage;
