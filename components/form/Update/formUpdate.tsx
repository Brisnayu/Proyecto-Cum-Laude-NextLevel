import styles from "@/styles/pages/form/update/formUpdate.module.css";
import { Designer, Design } from "@/types";

const isDesigner = (obj: Designer | Design): obj is Designer => {
  return (obj as Designer).surname !== undefined;
}

const FormUpdate = ({ change, list, currentInformation, formUpdate }: Props) => {
  return (
    <div className={styles.updateDesign}>
      <div className={styles.containerSelect}>
        <h2>Selecciona la información que deseas modificar</h2>
        <select
          onChange={(e) => {
            change(e.target.value);
          }}
        >
          {list.map((info) => (
            <option key={info._id} value={info._id}>
              {`${info.name} ${
                isDesigner(info) ? `${info.surname}` : ""
              }`}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.update}>
        <div className={styles.containerCurrent}>
          {currentInformation}
        </div>

        <div>
          <h2>Introduce los datos que deseas modificar</h2>
          {formUpdate}
        </div>
      </div>
    </div>
  );
};

export type Props = {
  change: (value: string) => void;
  list: (Designer | Design)[];
  currentInformation: React.ReactNode;
  formUpdate: React.ReactNode;
};

export default FormUpdate;
