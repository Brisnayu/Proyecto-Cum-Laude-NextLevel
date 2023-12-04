import styles from "@/styles/pages/form/user.module.css";
import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ButtonSelect from "@/components/ButtonSelect";

export type RegisterNewUserForm = {
  name: string;
  avatar: File;
  email: string;
  password: string;
};

const RegisterNewUser = ({ setUser }: RegisterNewUserProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterNewUserForm>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const selectedFiles = e.target.files;

      let image: string = "";

      if (selectedFiles && selectedFiles[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            image = e.target.result as string;
            // setPreviewImage(image);
          }
        };
        reader.readAsDataURL(selectedFiles[0]);
      }

      // setIsEmpty(false);
    }
  };

  const onSubmit: SubmitHandler<RegisterNewUserForm> = async (formData) => {
    // console.log("ESTOS SON LOS VALORES DEL FORMULARIO", formData);

    const dataParse = JSON.stringify(formData);

    try {
      const response = await fetch(
        "http://localhost:4001/api/user/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setUser(true);
        const userJson = await response.json();
        // console.log("AQUÍ ESTÁ LA RESPUETA", userJson)

        const authToken = userJson.token;
        // console.log("AQUÍ ESTÁ LA RESPUETA", authToken)
        localStorage.setItem("authToken", authToken);
        // window.location.href = "/form/register";
      } else {
        console.log("ERROR", response.status);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <>
      <div className={styles.containerFormUser}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Crear nuevo usuario</h1>

          <div className={styles.containerInput}>
            <label>Nombre de usuario</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <input type="password" {...field} />}
            />
          </div>

          <div className={styles.containerInput}>
            <label>Avatar</label>
            <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              
                <input
                  type="file"
                  id="image"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]),
                    handleFileChange(e);
                  }}
                />
              
            )}
          />
          </div>

          <div className={styles.containerInput}>
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>

          <div className={styles.containerInput}>
            <label>Contraseña</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <input type="password" {...field} />}
            />
          </div>

          <ButtonSelect
            title="ENVIAR"
            selectClass="buttonRun"
            selectSecondClass="buttonSend"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export type RegisterNewUserProps = {
  setUser: (newValue: boolean) => void;
};

export default RegisterNewUser;
