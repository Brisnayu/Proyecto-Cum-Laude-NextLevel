import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ title, description, image, children }: Props) => {
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

        <h1>Formularios</h1>

        <Image
            src="/logo-cat.png"
            alt="logo cat"
            width={80}
            height={80}
            priority
            style={{ border: "2px solid #68bb6c", borderRadius: "50%", backgroundColor: "#68bb6c" }}
          />
      </header>

      <main className={styles.main}>{children}</main>
    </>
  );
};

export type Props = {
  title: string;
  description: string;
  image: string;
  children: React.ReactNode;
};

export default Layout;
