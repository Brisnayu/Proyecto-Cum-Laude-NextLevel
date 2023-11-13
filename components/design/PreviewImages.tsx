import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/components/designs/previewImages.module.css";

const PreviewImages = ({ arrayImages }: Props) => {
  return (
    <>
      <h2>Vista previa</h2>
      <div className={styles.containerImages}>
        {typeof arrayImages === "string" ? (
          <div className={styles.prueba}>
            <Image
              key={uuidv4()}
              className={styles.modalImage}
              src={arrayImages}
              alt="Preview"
              width={200}
              height={200}
              priority
            />
          </div>
        ) : (
          <>
            <div className={styles.imagesModal}>
              {arrayImages.map((image) => (
                <Image
                  key={uuidv4()}
                  className={styles.modalImage}
                  src={image}
                  alt="Preview"
                  width={200}
                  height={200}
                  priority
                />
              ))}
            </div>
            <p>Total de imágenes seleccionadas: {arrayImages.length}</p>
          </>
        )}
      </div>
    </>
  );
};

export type Props = {
  arrayImages: string[] | string;
};

export default PreviewImages;
