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

  const [userValid, setUserValid] = useState(true);

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
    console.log("ESTOS SON LOS VALORES DEL FORMULARIO", formData);

    const dataParse = JSON.stringify(formData);

    console.log("antes del cambio", formData);
    console.log("después del cambio: dataParse", dataParse);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("avatar", formData.avatar);

    console.log(formData.email);

    const response = await fetch("http://localhost:4001/api/user").then((res) =>
      res.json()
    );

    for (const emailUser of response.data) {
      console.log(emailUser.email);
      if (emailUser.email === formData.email) {
        console.log("ESTO ES IGUAL!");
        return setUserValid(false);
      }
    }

    try {
      const response = await fetch(
        "http://localhost:4001/api/user/auth/register",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        setUser(true);
        const userJson = await response.json();
        // console.log("AQUÍ ESTÁ LA RESPUETA", userJson)

        const authToken = userJson.token;
        // console.log("AQUÍ ESTÁ LA RESPUETA", authToken)
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("user", JSON.stringify(userJson));
        console.log("TODO OK", userJson);
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
              render={({ field }) => (
                <>
                  <input type="name" {...register("name")} />
                  {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                  )}
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: "Es obligatorio escribir un nombre de usuario",
                },
              }}
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
                    field.onChange(e.target.files?.[0]), handleFileChange(e);
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
              render={({ field }) => (
                <>
                  <input type="text" {...field} />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                  )}
                  {userValid === false && (
                    <p style={{ color: "red" }}>Usuario ya registrado</p>
                  )}
                </>
              )}
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Introduce un email válido.",
                },
                required: {
                  value: true,
                  message: "Es obligatorio escribir un email",
                },
              }}
            />
          </div>

          <div className={styles.containerInput}>
            <label>Contraseña</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <input type="password" {...field} />
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                  )}
                </>
              )}
              rules={{
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres.",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])/,
                  message:
                    "La contraseña debe tener al menos una letra mayúsucula y una minúscula",
                },
                required: {
                  value: true,
                  message: "Escriba una contraseña",
                },
              }}
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
