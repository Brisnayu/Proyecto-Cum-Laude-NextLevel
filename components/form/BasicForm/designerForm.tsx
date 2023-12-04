import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "@/styles/pages/form/stylesForms.module.css";
import { ChangeEvent, useState } from "react";
import ModalForm from "@/components/form/ModalForm";
import PreviewDesigner from "@/components/designer/PreviewDesigner";
import PreviewImages from "@/components/design/PreviewImages";
import ButtonSelect from "@/components/ButtonSelect";

export type TypeFormDesignerData = {
  name: string;
  surname: string;
  nationality: string;
  summary: string;
  image: File;
  birthdate: string;
  dateOfDeath: string;
};

export type TypeFormDesignerDataExtended = Omit<
  TypeFormDesignerData,
  "image"
> & {
  image: string;
};

const DesignerForm = () => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenSend, setIsOpenSend] = useState<boolean>(false);
  const [infoSent, setInfoSent] = useState<TypeFormDesignerDataExtended>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalSend = () => {
    setIsOpenSend(true);
  };

  const closeModalSend = () => {
    setIsOpenSend(false);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeFormDesignerData>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const selectedFiles = e.target.files;

      let image: string = "";

      if (selectedFiles && selectedFiles[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            image = e.target.result as string;
            setPreviewImage(image);
          }
        };
        reader.readAsDataURL(selectedFiles[0]);
      }

      setIsEmpty(false);
    }
  };

  const handleDeleteFiles = () => {
    setPreviewImage("");
    setIsEmpty(true);
  };

  const onSubmit: SubmitHandler<TypeFormDesignerData> = async (data) => {
    console.log("DATOS", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("nationality", data.nationality);
    formData.append("summary", data.summary);
    formData.append("image", data.image);
    formData.append("birthdate", data.birthdate);
    formData.append("dateOfDeath", data.dateOfDeath);

    console.log(formData.get("name"));

    console.log(formData.get("image"));

    try {
      const response = await fetch("http://localhost:4001/api/designer", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setInfoSent(responseData.data);
        openModalSend();
        reset();
        setIsEmpty(true);
        console.log("RESPUESTA API OK", responseData);
      } else {
        console.log("ERROR", response.status);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.containerSup}>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="text"
            {...register("name", { required: "Debes indicar este campo" })}
          />
          <span>Nombre del diseñador</span>
        </div>

        <div className={styles.inputBox}>
          <input type="surname" {...register("surname")} />
          <span>Apellido del diseñador</span>
        </div>

        <div className={styles.inputBox}>
          <input type="nationality" {...register("nationality")} />
          <span>Nacionalidad</span>
        </div>
      </div>

      <div className={styles.containerLower}>
        <div className={`${styles.inputBox} ${styles.inputSummary}`}>
          <textarea rows={7} cols={50} {...register("summary")} />
          <span>Resumen</span>
        </div>
        <div className={styles.inputImage}>
          <span>Imagen</span>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]),
                    handleFileChange(e);
                  }}
                />
                <label
                  htmlFor="image"
                  className={styles.customFileLabel}
                  data-empty={isEmpty}
                >
                  {isEmpty ? (
                    <p className={styles.beforeImages}>Seleccionar archivo</p>
                  ) : (
                    <p className={styles.afterImages}>Archivo seleccionado</p>
                  )}
                </label>
              </>
            )}
          />

          <ModalForm isOpen={isOpen} closeModal={closeModal}>
            <PreviewImages arrayImages={previewImage} />
          </ModalForm>

          {isEmpty === false && (
            <div className={styles.buttonImages}>
              <ButtonSelect
                title="Vista previa"
                selectClass="buttonRun"
                selectSecondClass="buttonSend"
                functionElement={(e) => {
                  openModal(), e.preventDefault();
                }}
              />

              <ButtonSelect
                title="Eliminar"
                selectClass="buttonRun"
                selectSecondClass="buttonDelete"
                functionElement={handleDeleteFiles}
              />
            </div>
          )}
        </div>
      </div>

      <ButtonSelect
        title="ENVIAR"
        type="submit"
        selectClass="buttonRun"
        selectSecondClass="buttonSend"
      />

      <ModalForm isOpen={isOpenSend} closeModal={closeModalSend}>
        <PreviewDesigner
          closeModalSend={closeModalSend}
          infoSent={infoSent as TypeFormDesignerDataExtended}
        />
      </ModalForm>
    </form>
  );
};

export default DesignerForm;
