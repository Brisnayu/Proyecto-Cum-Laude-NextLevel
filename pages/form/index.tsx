import ButtonBack from "@/components/ButtonBack";
import Layout from "@/components/Layout";
// import { Design } from "@/types";
import Link from "next/link";
import {
  useForm,
  SubmitHandler,
  Controller,
  UseFormRegister,
} from "react-hook-form";
import styles from "@/styles/form.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import ModalForm from "@/components/ModalForm";
import { v4 as uuidv4 } from "uuid";

export type CategoryType = "Silla" | "Lámpara" | "Mesa" | "";

export type TypeFormData = {
  name: string;
  year: number;
  images: File[];
  category?: CategoryType;
  summary: string;
};

const FormPage = () => {
  const [maxImages, setMaxImages] = useState<boolean>();
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormData>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const selectedFiles = e.target.files;

      if (selectedFiles && selectedFiles.length > 4) {
        setMaxImages(true);
        e.target.value = "";
      } else {
        setMaxImages(false);

        if (selectedFiles && selectedFiles.length > 0) {
          const arrayImages: string[] = [];

          for (const file of selectedFiles) {
            const reader = new FileReader();

            reader.onload = (e) => {
              if (e.target) {
                arrayImages.push(e.target.result as string);
              }
            };

            reader.readAsDataURL(file);
          }
          console.log("dentro del if", arrayImages);
          setPreviewImage(arrayImages);
        }
      }
    }
  };

  console.log(previewImage);

  const onSubmit: SubmitHandler<TypeFormData> = async (data) => {
    console.log(data);
    data.year = Number(data.year);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("year", data.year ? data.year.toString() : "");
    formData.append("category", data.category || "");
    formData.append("summary", data.summary);

    for (const image of data.images) {
      formData.append("images", image);
    }

    try {
      const response = await fetch("http://localhost:4001/api/design", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.log("ERROR", response.status);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Layout
      title="Page Design"
      description="Página de los diseños"
      image="/silla.png"
    >
      <div>
        <h1>Bienvenido al formulario</h1>
      </div>

      <div className={styles.containerForm}>
        <div className={styles.containerLeft}>
          <Image
            src="/gatito.jpg"
            alt="image"
            width={250}
            height={200}
            priority
          />
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Nuevo diseño!</h2>

          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="text"
              {...register("name", { required: "Debes indicar este campo" })}
            />
            <span>Nombre del diseño</span>
          </div>

          <div className={styles.inputBox}>
            <input type="number" {...register("year")} />
            <span>Año del lanzamiento</span>
          </div>

          <div className={styles.inputImage}>
            <label className={styles.containerImage}>
              <span>Imagen</span>
              <input
                type="file"
                {...register("images")}
                multiple
                onChange={handleFileChange}
              />
            </label>
            <button>ver preview</button>
          </div>

          {/* MODAL! */}
          {maxImages === true ? (
            <p style={{ color: "red" }}>Selecciona un máximo de 4 imágenes.</p>
          ) : (
            ""
          )}

          <div className={styles.selectBox}>
            <span>Categoría</span>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field} required>
                  <option value="" disabled>
                    -
                  </option>
                  <option value="Silla">Silla</option>
                  <option value="Lámpara">Lámpara</option>
                  <option value="Mesa">Mesa</option>
                </select>
              )}
            />
            {errors.category && <p>{errors.category.message}</p>}
          </div>

          <div className={styles.inputBox}>
            <input type="text" {...register("summary")} />
            <span>Resumen</span>
          </div>

          <button type="submit">ENVIAR</button>
        </form>
      </div>

      {previewImage &&
        previewImage.map((image) => (
          <Image
            key={uuidv4()}
            src={image}
            alt="Preview"
            width={200}
            height={200}
            priority
          />
        ))}

      <ModalForm previewImage={previewImage} />

      <Link href="/">
        <ButtonBack title="Volver" color="button" />
      </Link>
    </Layout>
  );
};

// export type Props = {
//   data: Design[];
// };

export default FormPage;
