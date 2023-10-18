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

export type CategoryType = "Silla" | "Lámpara" | "Mesa" | "";

export type FormData = {
  name: string;
  year: number;
  images: File;
  category?: CategoryType;
  summary: string;
};

const FormPage = () => {
  const [maxImages, setMaxImages] = useState<boolean>();
  const [previewImage, setPreviewImage] = useState<string>();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const selectedFiles = e.target.files;

      if (selectedFiles && selectedFiles.length > 4) {
        setMaxImages(true);
        e.target.value = "";
      } else {
        setMaxImages(false);

        const reader = new FileReader();

        if (selectedFiles && selectedFiles.length > 0) {
          reader.onload = (e) => {
            if (e.target) {
              setPreviewImage(e.target.result as string);
            }
          };
          reader.readAsDataURL(selectedFiles[0]);
        }
      }
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      const response = await fetch(
        "https://project-api-design.vercel.app/api/design",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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

      {previewImage && (
        <Image
          src={previewImage}
          alt="Preview"
          width={200}
          height={200}
          priority
        />
      )}

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
