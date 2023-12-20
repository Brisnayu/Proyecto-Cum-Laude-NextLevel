import Layout from "@/components/Layout";
import { useState, useEffect, ChangeEvent } from "react";
import { TypeUser } from "@/types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";
import ButtonSelect from "@/components/ButtonSelect";
import { useRouter } from "next/router";
import BoxContent from "@/components/BoxContent";
import styles from "@/styles/pages/users/indexUsers.module.css";
import { GetStaticProps } from "next";
import { getUsers } from "@/libs/users";

const UserPage = ({ users }: Props) => {
  const [openUser, setOpenUser] = useState<TypeUser>();
  const [previewAvatar, setPreviewAvatar] = useState<string>();
  const [viewUsers, setViewUsers] = useState<boolean>(false);

  const [deleteElement, setDeleteElement] = useState(new Set());
  const [selectedUser, setSelectedUser] = useState(new Set());

  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeUser>();

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const selectedFile = e.target.files;

      let image: string = "";

      if (selectedFile && selectedFile[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            image = e.target.result as string;
            setPreviewAvatar(image);
          }
        };
        reader.readAsDataURL(selectedFile[0]);
      }
    }
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const userAvatar = localStorage.getItem("user");
      if (userAvatar !== null) {
        const parseUser = JSON.parse(userAvatar);
        setOpenUser(parseUser.data);
      }
    } else {
      console.error("Todavía no se ha iniciado sesión");
    }
  }, []);

  const signOff = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  // Eliminar elemento:

  const toggleDesignSelection = (designId: string) => {
    const newSelectedDesigns = new Set(selectedUser);

    if (newSelectedDesigns.has(designId)) {
      newSelectedDesigns.delete(designId);
    } else {
      newSelectedDesigns.add(designId);
    }

    setSelectedUser(newSelectedDesigns);
  };

  const deletedElement = (designId: string) => {
    const newDeletedElement = new Set(deleteElement);

    if (newDeletedElement.has(designId)) {
      newDeletedElement.delete(designId);
    } else {
      newDeletedElement.add(designId);
    }

    setDeleteElement(newDeletedElement);
  };

  const tokenAuth = async (id: string) => {
    const token = localStorage.getItem("authToken");

    console.log(token);

    if (token) {
      await UserDelete(id, token);
    } else {
      console.error("Usuario no autenticado");
    }
  };

  const UserDelete = async (id: string, token: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:4001/api/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error(
          `Error al eliminar la información. Código de estado: ${response.status}`
        );
      } else {
        console.log("Información eliminada correctamente.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud DELETE:", error);
    }
  };

  return (
    <Layout
      title="Page Registered User"
      titlePage="Bienvenid@ a la información de usuarios"
      description="Página principal de usuarios"
      image="/silla.png"
    >
      <div className={styles.containerUserBox}>
        <BoxContent title="Datos">
          <div className={styles.userBox}>
            <div className={styles.containerUser}>
              <Image
                src={
                  openUser?.avatar !== undefined
                    ? openUser.avatar
                    : "/logo-cat.png"
                }
                alt="Avatar image"
                width={80}
                height={80}
                priority
                style={{
                  border: "2px solid #68bb6c",
                  borderRadius: "50%",
                  backgroundColor: "#68bb6c",
                  objectFit: "cover",
                }}
              />
              <div>
                <h3>
                  Nombre: <span>{openUser?.name}</span>
                </h3>
                <h3>
                  email: <span>{openUser?.email}</span>
                </h3>
              </div>
            </div>

            <div className={styles.containerUpdate}>
              <h3>Modificar avatar:</h3>
              <br />
              <div className={styles.updateAvatar}>
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]),
                          handleAvatarChange(e);
                      }}
                    />
                  )}
                />

                {previewAvatar && (
                  <div className={styles.previewAvatar}>
                    <ButtonSelect
                      title="Actualizar"
                      type="submit"
                      selectClass="buttonRun"
                      selectSecondClass="buttonSend"
                    />
                    <ButtonSelect
                      title="Cancelar"
                      selectClass="buttonRun"
                      selectSecondClass="buttonDelete"
                      functionElement={() => setPreviewAvatar("")}
                    />
                    <p>Vista previa:</p>
                    <Image
                      src={previewAvatar}
                      alt="New avatar image"
                      width={80}
                      height={80}
                      priority
                      style={{
                        border: "2px solid #68bb6c",
                        borderRadius: "50%",
                        backgroundColor: "#68bb6c",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <ButtonSelect
              title="Cerrar sesión"
              functionElement={signOff}
              selectClass="buttonRun"
              selectSecondClass="buttonDelete"
            />
          </div>
        </BoxContent>
      </div>

      <div className={styles.buttonViewUsers}>
        <h3>Puedes consultar el resto de usuarios</h3>
        <ButtonSelect
          title={
            viewUsers === false
              ? "Mostrar usuarios registrados"
              : "Ocultar usuarios registrados"
          }
          selectClass="buttonUp"
          selectSecondClass="buttonSend"
          functionElement={() => setViewUsers(!viewUsers)}
        />
      </div>

      {viewUsers === true && (
        <div className={styles.containerUserBox}>
          {users.map((user) => (
            <BoxContent title={user.name} key={user._id}>
              {selectedUser.has(user._id) ? (
                <div className={styles.containerDelete}>
                  <h3>¿Quieres eliminar ese elemento?</h3>
                  <div className={styles.buttonsModal}>
                    <ButtonSelect
                      title="Sí"
                      selectClass="buttonRun"
                      selectSecondClass="buttonSend"
                      functionElement={() => {
                        tokenAuth(user._id);
                        deletedElement(user._id);
                        toggleDesignSelection(user._id);
                      }}
                    />
                    <ButtonSelect
                      title="No"
                      selectClass="buttonRun"
                      selectSecondClass="buttonDelete"
                      functionElement={() => toggleDesignSelection(user._id)}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.userBox} ${
                    deleteElement.has(user._id) ? styles.deleteElement : ""
                  }`}
                >
                  <div className={styles.containerUser}>
                    <Image
                      src={
                        user?.avatar !== undefined
                          ? user.avatar
                          : "/logo-cat.png"
                      }
                      alt="Avatar user"
                      width={80}
                      height={80}
                      priority
                      style={{
                        border: "2px solid #68bb6c",
                        borderRadius: "50%",
                        backgroundColor: "#68bb6c",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h3>
                        Nombre: <span>{user.name}</span>
                      </h3>
                      <h3>
                        email: <span>{user.email}</span>
                      </h3>
                    </div>
                  </div>

                  <ButtonSelect
                    title="Eliminar usuario"
                    selectClass="buttonRun"
                    selectSecondClass="buttonDelete"
                    functionElement={() => toggleDesignSelection(user._id)}
                  />
                </div>
              )}
            </BoxContent>
          ))}
        </div>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const users = await getUsers();

  return {
    props: {
      users: users,
    },
    revalidate: 30,
  };
};

export type Props = {
  users: TypeUser[];
};

export default UserPage;
