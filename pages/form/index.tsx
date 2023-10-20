import ButtonBack from "@/components/ButtonBack";
import Layout from "@/components/Layout";
import Link from "next/link";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import styles from "@/styles/form.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import ModalForm from "@/components/ModalForm";

export type CategoryType = "Silla" | "Lámpara" | "Mesa" | "";

export type TypeFormData = {
  name: string;
  year: number;
  images: File[];
  category?: CategoryType;
  summary: string;
  curiosities: { title: string; description: string}[];
};

const FormPage = () => {
  const [maxImages, setMaxImages] = useState<boolean>();
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addCuriosity = () => {
    append({ title: "", description: "" });
    console.log("Curiosidad agregada:", fields);
  };

  const deleteCuriosity = (index: number) => {
    remove(index);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormData>();

  const { fields, append, remove } = useFieldArray<TypeFormData>({
    control,
    name: "curiosities",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const selectedFiles = e.target.files;

      if (selectedFiles && selectedFiles.length > 4) {
        setMaxImages(true);
        e.target.value = "";
      } else {
        setMaxImages(false);
        setIsEmpty(false);

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
          setPreviewImage(arrayImages);
        }
      }
    }
  };

  const handleDeleteFiles = () => {
    setPreviewImage([]);
    setIsEmpty(true);
    setMaxImages(true);
  };

  const onSubmit: SubmitHandler<TypeFormData> = async (data) => {
    console.log("DATOS", data);

    console.log("CURIOSIDADES", data.curiosities)

    data.year = Number(data.year);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("year", data.year ? data.year.toString() : "");
    formData.append("category", data.category || "");
    formData.append("summary", data.summary);
    formData.append("curiosities", JSON.stringify(data.curiosities));
    
    for (const image of data.images) {
      formData.append("images", image);
    }

    console.log("CURIOSIDADES EN FORMDATA", formData.getAll("curiosities"))

    try {
      const response = await fetch("http://localhost:4001/api/design", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("RESPUESTA API OK", responseData);
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
          <div className={styles.containerSup}>
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
          </div>

          <div className={styles.containerMiddle}>
            <div className={`${styles.inputBox} ${styles.inputCuriosities}`}>
              <input type="text" />
              <span>Curiosidades</span>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <input
                    type="text"
                    {...register(`curiosities.${index}.title` as const)}
                    placeholder={`Título: ${index + 1}`}
                  />
                  <input
                    type="text"
                    {...register(`curiosities.${index}.description` as const)}
                    placeholder={`Descripción: ${index + 1}`}
                  />
                  <button onClick={() => deleteCuriosity(index)}>
                    Eliminar
                  </button>
                </div>
              ))}
              {fields.length < 4 && (
                <button
                  onClick={(e) => {
                    addCuriosity(), e.preventDefault();
                  }}
                >
                  Agregar Curiosidad
                </button>
              )}
            </div>

            <div className={`${styles.inputBox} ${styles.inputSummary}`}>
              <textarea rows={7} cols={50} {...register("summary")} />
              <span>Resumen</span>
            </div>
          </div>

          <div className={styles.containerLower}>
            <div className={styles.inputImage}>
              <span>Imágenes</span>
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      id="images"
                      multiple
                      onChange={(e) => {
                        field.onChange(
                          Array.from(e.target.files as ArrayLike<File>)
                        );
                        handleFileChange(e);
                      }}
                    />
                    <label
                      htmlFor="images"
                      className={styles.customFileLabel}
                      data-empty={isEmpty}
                    >
                      {isEmpty ? (
                        <p className={styles.beforeImages}>
                          Seleccionar archivo/s
                        </p>
                      ) : (
                        <p className={styles.afterImages}>
                          Archivo/s seleccionado
                        </p>
                      )}
                    </label>
                  </>
                )}
              />

              <ModalForm
                previewImage={previewImage}
                isOpen={isOpen}
                closeModal={closeModal}
              />

              {maxImages === false ? (
                <div className={styles.buttonImages}>
                  <button
                    className={`${styles.buttonModal} ${styles.buttonSend}`}
                    onClick={(event) => {
                      openModal(), event.preventDefault();
                    }}
                  >
                    Vista previa
                  </button>

                  <button
                    className={`${styles.buttonModal} ${styles.buttonDelete}`}
                    onClick={handleDeleteFiles}
                  >
                    Eliminar
                  </button>
                </div>
              ) : (
                ""
              )}

              {maxImages === true ? (
                <p style={{ color: "red" }}>
                  Recuerda que puedes seleccionar un máximo de 4 imágenes.
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <button type="submit">ENVIAR</button>
        </form>
      </div>

      <Link href="/">
        <ButtonBack title="Volver" color="button" />
      </Link>
    </Layout>
  );
};

export default FormPage;
