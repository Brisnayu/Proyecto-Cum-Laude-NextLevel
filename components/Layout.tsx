import Head from "next/head";

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

      <main>{children}</main>
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
