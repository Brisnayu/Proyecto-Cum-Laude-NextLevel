import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { DesignExtended } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/oneDesign.module.css";

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

      return result.data;
    };

    fetchDesign();
  }, [entity]);

  if (!individualDesign) {
    return;
  }

  return (
    <Layout
      title="Page Design"
      description="Página de los diseños"
      image="/silla.png"
    >
      <div className={styles.containerPrueba}>
        <Image
          className={styles.prueba}
          src="/prueba-eames.jpg"
          alt="imagen encabezado"
          width={500}
          height={200}
        />
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

        <div className={styles.containerPrueba}>
          <Image
            className={styles.prueba}
            src="/prueba-eames1.jpg"
            alt="imagen encabezado"
            width={500}
            height={200}
          />
        </div>

        <div>
          <h3>Curiosidades</h3>
          <p>
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor (N. del T.
            persona que se dedica a la imprenta) desconocido usó una galería de
            textos y los mezcló de tal manera que logró hacer un libro de textos
            especimen. No sólo sobrevivió 500 años, sino que tambien ingresó
            como texto de relleno en documentos electrónicos, quedando
            esencialmente igual al original. Fue popularizado en los 60s con la
            creación de las hojas Letraset, las cuales contenian pasajes de
            Lorem Ipsum, y más recientemente con software de autoedición, como
            por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem
            Ipsum.
          </p>
        </div>
      </div>

      <div className={styles.containerDesigner}>
        <h2>1904-1988</h2>
        {/* FALTARÍA INDICAR EL AÑO EXACTO */}
        <div className={styles.containerImageDesigner}>
          <Image
            className={styles.imageDesigner}
            key={uuidv4()}
            src={individualDesign.designer.image}
            alt={individualDesign.designer.name}
            width={250}
            height={250}
            priority
          />
        </div>
        <div className={styles.textDesigner}>
          <h2>
            {individualDesign.designer.name} {individualDesign.designer.surname}
          </h2>
          <h4>{individualDesign.designer.nationality}</h4>
          <br />
          <p>
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor (N. del T.
            persona que se dedica a la imprenta) desconocido usó una galería de
            textos y los mezcló de tal manera que logró hacer un libro de textos
            especimen. No sólo sobrevivió 500 años, sino que tambien ingresó
            como texto de relleno en documentos electrónicos, quedando
            esencialmente igual al original. Fue popularizado en los 60s con la
            creación de las hojas Letraset, las cuales contenian pasajes de
            Lorem Ipsum, y más recientemente con software de autoedición, como
            por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem
            Ipsum.
          </p>
        </div>
      </div>

      <Link href="/design/designs">
        <button>Volver atrás</button>
      </Link>
    </Layout>
  );
};

export default EntityPage;
