import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { DesignExtended } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/oneDesign.module.css";
import Card from "@/components/Card";
import ButtonBack from "@/components/ButtonBack";

const EntityPage = () => {
  const router = useRouter();
  const entity = router.query.entity as string;

  const [individualDesign, setIndividualDesign] = useState<DesignExtended>();

  useEffect(() => {
    const fetchDesign = async (): Promise<DesignExtended> => {
      const response = await fetch(
        `https://project-api-design.vercel.app/api/design/${entity}`
      );
      const result = await response.json();
      setIndividualDesign(result.data);
      console.log(result.data);
      return result.data;
    };

    fetchDesign();
  }, [entity]);

  if (!individualDesign) {
    return;
  }
  

  const MockData = [
    {
      titulo: "Diseñada para la Exposición de Barcelona 1929",
      descripcion:
        "La Silla Barcelona se creó específicamente para el Pabellón Alemán en la Exposición Internacional de Barcelona de 1929.",
    },
    {
      titulo: "Estructura en forma de X",
      descripcion:
        "Su característica distintiva es una estructura de soporte en forma de X.",
    },
    {
      titulo: "Materiales de lujo",
      descripcion:
        "La silla original utiliza acero inoxidable y piel de cerdo de alta calidad.",
    },
    {
      titulo: "Pérdida y recuperación de derechos de autor",
      descripcion:
        "Los derechos de autor se perdieron después de la Segunda Guerra Mundial, pero se recuperaron en la década de 1950 cuando Knoll comenzó a fabricarla nuevamente.",
    },
  ];

  return (
    <Layout
      title="Page Design"
      description="Página de los diseños"
      image="/silla.png"
    >
      <div
        className={styles.containerPrueba}
        style={{
          width: "100%",
          height: "50vh",
          backgroundImage: "url('/wallpaper.jpg')",
          backgroundSize: "30rem 30rem",
          backgroundRepeat: "repeat",
        }}
      >
        <div className={styles.box}>
          <h1>{individualDesign.name.toUpperCase()}</h1>
          <p>Año de Lanzamiento {individualDesign.year}</p>
        </div>
      </div>

      <div className={styles.containerDesign}>
        <div className={styles.containerImages}>
          {individualDesign.images.map((photo) => (
            <Image
              className={styles.imageOneDesigns}
              key={uuidv4()}
              src={photo}
              alt="Imagen producto"
              width={300}
              height={300}
              priority
            />
          ))}
        </div>
      </div>

      <div className={styles.containerCard}>
        {MockData.map((data, index) => (
          <Card
            key={uuidv4()}
            titleCuriousFact={data.titulo}
            textCuriousFact={data.descripcion}
            numberCuriousFact={index + 1}
          />
        ))}
      </div>

      <div className={styles.containerDesigner}>
        <div className={styles.containerImageDesigner}>
          <Image
            className={styles.imageDesigner}
            key={uuidv4()}
            src={individualDesign.designer.image}
            alt={individualDesign.designer.name}
            width={350}
            height={350}
            priority
          />
        </div>
        <div className={styles.textDesigner}>
          <h2>
            {individualDesign.designer.name} {individualDesign.designer.surname}
          </h2>
          <h3>1904-1988</h3>
          <h4>{individualDesign.designer.nationality}</h4>
          <br />
          <p>{individualDesign.designer.summary}</p>
        </div>
      </div>

      <div
        className={styles.containerButtonBack}
        style={{
          width: "100%",
          height: "30vh",
          backgroundImage: "url('/sillitas1.jpg')",
          backgroundSize: "20rem 20rem",
          backgroundRepeat: "repeat",
        }}
      >
        <Link href="/design/designs">
          <ButtonBack title="Volver" color="button" />
        </Link>
      </div>
    </Layout>
  );
};

export default EntityPage;
