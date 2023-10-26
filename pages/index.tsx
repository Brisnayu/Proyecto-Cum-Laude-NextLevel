import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import Link from "next/link";
import ButtonBack from "@/components/ButtonBack";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <Layout title="Page Home" description="Pagina de inicio" image="/silla.png">
      
      <div className={styles.home}>
        <div className={styles.flipCard}>
          <div className={styles.flipCardInner}>
            <div className={`${styles.flipCardFront} ${styles.design}`}>
              <p className={styles.title}>DISEÑOS</p>
            </div>
            <div className={styles.flipCardBack}>
              <Image
                src="/imageInit/chairDesign.png"
                alt="Icon chair"
                width={180}
                height={180}
                priority
              />
              <Link href="/design">
                <ButtonBack title="Ver diseños" color="buttonDesign" />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.flipCard}>
          <div className={styles.flipCardInner}>
            <div className={`${styles.flipCardFront} ${styles.designer}`}>
              <p className={styles.title}>DISEÑADORES</p>
            </div>
            <div className={styles.flipCardBack}>
              <Image
                src="/imageInit/designers.png"
                alt="Icon chair"
                width={150}
                height={150}
                priority
              />
              <Link href="/designer">
                <ButtonBack title="Ver diseñadores" color="buttonDesign" />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.flipCard}>
          <div className={styles.flipCardInner}>
            <div className={`${styles.flipCardFront} ${styles.form}`}>
              <p className={styles.title}>REGISTRO</p>
            </div>
            <div className={styles.flipCardBack}>
              <Image
                src="/imageInit/register.png"
                alt="Icon chair"
                width={150}
                height={150}
                priority
              />
              <Link href="/form">
                <ButtonBack title="Ir al registro" color="buttonDesign" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
