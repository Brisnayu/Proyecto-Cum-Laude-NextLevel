import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import styles from "@/styles/stylesForm/updateDesign.module.css";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { Design, DesignExtended } from "@/types";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { TypeFormData, TypeFormDataExtended } from "../../BasicForm/designForm";
import { v4 as uuidv4 } from "uuid";

const UpdateDesignPagePRUEBA = ({ designs }: Props) => {
  const [maxImages, setMaxImages] = useState<boolean>();
  const [previewImage, setPreviewImage] = useState<string[] | string>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenSend, setIsOpenSend] = useState<boolean>(false);
  const [infoSent, setInfoSent] = useState<TypeFormDataExtended>();

  const { data, error } = useSWR("/api/designs", fetcher, {
    refreshInterval: 300000,
  });

  const designList = (data?.designs.data as Design[]) || designs;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeFormData>();

  const { fields, append, remove } = useFieldArray<TypeFormData>({
    control,
    name: "curiosities",
  });

  const deleteCuriosity = (index: number) => {
    remove(index);
  };

  const addCuriosity = () => {
    append({ title: "", description: "" });
    console.log("Curiosidad agregada:", fields);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModalSend = () => {
    setIsOpenSend(false);
  };

  const handleDeleteFiles = () => {
    setPreviewImage([]);
    setIsEmpty(true);
    setMaxImages(false);
  };

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

  const onSubmit: SubmitHandler<TypeFormData> = async (data) => {
    console.log(data);
  };

  const [individualDesign, setIndividualDesign] = useState<DesignExtended>();
  const [idChange, setIdChange] = useState<string>(designList[0]._id);

  useEffect(() => {
    const fetchDesign = async (): Promise<DesignExtended> => {
      const response = await fetch(
        `https://project-api-design.vercel.app/api/design/${idChange}`
      );
      const result = await response.json();
      setIndividualDesign(result.data);
      return result.data;
    };

    fetchDesign();
  }, [idChange]);

  // useEffect(() => {
  //   if (individualDesign?.curiosities && fields.length === 0) {
  //     individualDesign.curiosities.forEach((curiosidad) => {
  //       append(curiosidad);
  //     });
  //   }
  // }, [individualDesign, append, fields, idChange]);

  const cambialo = async () => {
    if (fields.length > 0) {
      remove();
    }
  
    if (individualDesign?.curiosities) {
      const promises = individualDesign.curiosities.map(async (curiosidad) => {
        append(curiosidad);
      });
  
      await Promise.all(promises); // Esperar a que todas las promesas se completen
  
      console.log("Esto se está ejecutando", fields); // Aquí fields debe estar actualizado
    }
  };

  return (
    <div className={styles.containerUpdate}>
      <h2>ID: </h2>
      <select
        onChange={(e) => {
          setIdChange(e.target.value), cambialo();
        }}
      >
        {designList.map((design) => (
          <option key={design._id}>{design._id}</option>
        ))}
      </select>

      {/* <button onClick={cambialo}>CAMBIAAAALO!!!</button> */}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.containerSup}>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="text"
              {...register("name", { required: "Debes indicar este campo" })}
              defaultValue={individualDesign?.name}
            />
            <span>Nombre del diseño</span>
          </div>

          <div className={styles.inputBox}>
            <input
              type="number"
              {...register("year")}
              defaultValue={individualDesign?.year}
            />
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
                  <option defaultValue={individualDesign?.category}>
                    {individualDesign?.category}
                  </option>
                  <option defaultValue="Silla">Silla</option>
                  <option defaultValue="Lámpara">Lámpara</option>
                  <option defaultValue="Mesa">Mesa</option>
                </select>
              )}
            />
            {errors.category && <p>{errors.category.message}</p>}
          </div>
        </div>

        <div className={styles.containerMiddle}>
          <div className={`${styles.inputBox} ${styles.inputCuriosities}`}>
            <span>Curiosidades</span>

            {fields.map((field, index) => (
              <div key={field.id}>
                <input
                  type="text"
                  defaultValue={field.title}
                  {...register(`curiosities.${index}.title` as const)}
                />
                <input
                  type="text"
                  defaultValue={field.description}
                  {...register(`curiosities.${index}.description` as const)}
                />

                <button
                  className={`${styles.buttonModal} ${styles.buttonAdd} ${styles.buttonDelete}`}
                  onClick={() => deleteCuriosity(index)}
                >
                  Eliminar
                </button>
              </div>
            ))}
            {fields.length < 4 && (
              <button
                className={`${styles.buttonModal} ${styles.buttonAdd} ${styles.buttonSend}`}
                onClick={(e) => {
                  addCuriosity(), e.preventDefault();
                }}
              >
                Agregar Curiosidad
              </button>
            )}

            {/* {individualDesign?.curiosities.map((design) => (
              <div key={uuidv4()}>
                <input type="text" defaultValue={design.title} />
                <input type="text" defaultValue={design.description} />
              </div>
            ))} */}
          </div>

          <div className={`${styles.inputBox} ${styles.inputSummary}`}>
            <textarea
              defaultValue={individualDesign?.summary}
              rows={7}
              cols={50}
              {...register("summary")}
            />
            <span>Resumen</span>
          </div>
        </div>

        <div className={styles.containerLower}>
          <div className={styles.inputImage}>
            <span>Imágenes</span>

            {individualDesign?.images.map((image) => (
              <Image
                key={uuidv4()}
                src={image}
                alt="image design"
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
            ))}

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

            {isEmpty === false && (
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
            )}

            {maxImages === true && (
              <p style={{ color: "red" }}>
                Recuerda que puedes seleccionar un máximo de 4 imágenes.
              </p>
            )}
          </div>
        </div>

        <button className={styles.buttonSendForm} type="submit">
          ENVIAR
        </button>


      </form>
    </div>
  );
};

export type Props = {
  designs: Design[];
};

export default UpdateDesignPagePRUEBA;
