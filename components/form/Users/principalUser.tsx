import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "@/styles/pages/form/user.module.css";
import ButtonSelect from "@/components/ButtonSelect";
import { useState } from "react";

export type UserForm = {
  email: string;
  password: string;
};

const PrincipalUser = ({ setUser }: PrincipalUserProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserForm>();

  const onSubmit: SubmitHandler<UserForm> = async (formData) => {
    console.log("ESTOS SON LOS VALORES DEL FORMULARIO", formData);

    const dataParse = JSON.stringify(formData);

    console.log("Cómo está llegando esto", dataParse);

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
          <h1>Iniciar sesión</h1>
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
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export type PrincipalUserProps = {
  setUser: (newValue: boolean) => void;
};

export default PrincipalUser;
