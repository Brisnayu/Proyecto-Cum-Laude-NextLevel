import Head from "next/head";
import styles from "@/styles/components/layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TypeUser } from "@/types";

const Layout = ({ title, titlePage, description, image, children }: Props) => {
  const [openUser, setOpenUser] = useState<TypeUser>();

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

  console.log("Usuario registrado", openUser);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={image} />

        <meta property="og:type" content="webside" />
        <meta property="og:url" content={image} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" itemProp="image" content={image} />
      </Head>

      <header className={styles.header}>
        <div className={styles.initPage}>
          <Link href="/">
            <Image
              src="/logo-cat.png"
              alt="logo cat"
              width={80}
              height={80}
              priority
              style={{ border: "2px solid green", borderRadius: "50%" }}
            />
          </Link>

          <h1>{titlePage}</h1>
        </div>

        {!openUser ? (
          <div className={styles.homeUser}>
            <p>Iniciar sesión</p>
            <Link href="/login">
              <Image
                src="/closedUser.jpg"
                alt="logo cat"
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
            </Link>
          </div>
        ) : (
          <div className={styles.openUser}>
            <p>Hola, {openUser.name}</p>
            <Link href="/users">
              <Image
                src={
                  openUser.avatar !== undefined
                    ? openUser.avatar
                    : "/logo-cat.png"
                }
                alt="User avatar"
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
            </Link>
          </div>
        )}
      </header>

      <main className={styles.main}>{children}</main>
    </>
  );
};

export type Props = {
  title: string;
  titlePage: string;
  description: string;
  image: string;
  children: React.ReactNode;
};

export default Layout;
