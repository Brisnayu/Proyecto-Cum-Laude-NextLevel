import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { DesignExtended } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const EntityPage = () => {
  const router = useRouter();
  const entity = router.query.entity as string;

  const [individualDesign, setIndividualDesign] = useState<DesignExtended>();

  useEffect(() => {
    const fetchDesign = async () => {
      const response = await fetch(
        `https://project-api-design.vercel.app/api/design/${entity}`
      );
      const result = await response.json();
      setIndividualDesign(result.data);
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
      <h1>Información del diseño</h1>

      <div>
        <h2>{individualDesign.name}</h2>
        <p>Año de Lanzamiento {individualDesign.year}</p>
        {individualDesign.images.map((photo) => (
          <Image
            key={uuidv4()}
            src={photo}
            alt="Imagen producto"
            width={200}
            height={200}
            priority
          />
        ))}
        <p>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta) desconocido usó una galería de
          textos y los mezcló de tal manera que logró hacer un libro de textos
          especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como
          texto de relleno en documentos electrónicos, quedando esencialmente
          igual al original. Fue popularizado en los 60s con la creación de las
          hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más
          recientemente con software de autoedición, como por ejemplo Aldus
          PageMaker, el cual incluye versiones de Lorem Ipsum.
        </p>
      </div>

      <div>
        <h2>Info del diseñador</h2>
        <div>
          <h4>
            {individualDesign.designer.name} {individualDesign.designer.surname}
          </h4>
          <h5>{individualDesign.designer.nationality}</h5>
          <Image
            key={uuidv4()}
            src={individualDesign.designer.image}
            alt={individualDesign.designer.name}
            width={200}
            height={200}
            priority
          />
        </div>
        <div>
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
