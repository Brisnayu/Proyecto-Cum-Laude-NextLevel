import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "@/styles/pages/form/user.module.css";
import ButtonSelect from "@/components/ButtonSelect";
import { useRouter } from "next/router";

export type UserForm = {
  email: string;
  password: string;
};

const PrincipalUser = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserForm>();

  const onSubmit: SubmitHandler<UserForm> = async (formData) => {

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
        const userJson = await response.json();
        const authToken = userJson.token;

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("user", JSON.stringify(userJson));
        router.push("/");
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
            selectSecondClass="buttonSend"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default PrincipalUser;
