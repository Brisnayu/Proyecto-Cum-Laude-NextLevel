import Image from "next/image";
import styles from "@/styles/pages/form/homeForm.module.css";
import ButtonSelect from "@/components/ButtonSelect";

const HomeForm = ({
  firstTitle,
  secondTitle,
  titleImage,
  image,
  showDesign,
  showDesigner,
}: Props) => {
  return (
    <>
      <div className={styles.containerButtons}>
        <ButtonSelect
          title={firstTitle}
          functionElement={showDesign}
          selectClass="buttonUp"
        />
        <ButtonSelect
          title={secondTitle}
          functionElement={showDesigner}
          selectClass="buttonUp"
        />
      </div>
      <div className={styles.containerImage}>
        <h2>{titleImage}</h2>
        <Image
          src={image}
          alt="Image Form"
          width={300}
          height={300}
          priority
        />
      </div>
    </>
  );
};

export type Props = {
  firstTitle: string;
  secondTitle: string;
  titleImage: string;
  image: string;
  showDesign: (() => void) | ((e: React.MouseEvent) => void);
  showDesigner: (() => void) | ((e: React.MouseEvent) => void);
};

export default HomeForm;
