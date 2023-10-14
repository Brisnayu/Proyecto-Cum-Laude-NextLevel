import Head from "next/head";
import styles from "@/styles/Home.module.css";

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
        <h1>NOMBRE DE LA PÁGINA</h1>
      </header>

      <main className={styles.main}>{children}</main>
      <footer>holi</footer>

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
