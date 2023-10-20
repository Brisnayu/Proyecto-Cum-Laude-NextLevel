import { useFieldArray, useForm } from "react-hook-form";

function PruebaCuriosities() {
  const { control, register } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "curiosities",
  });

  const addCuriosity = () => {
    append({ value: "" });
    console.log("Curiosidad agregada:", fields);
  };

  const deleteCuriosity = (index: number) => {
    remove(index);
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`curiosities[${index}].value`)}
            placeholder={`Curiosidad ${index + 1}`}
          />
          <button onClick={() => deleteCuriosity(index)}>Eliminar</button>
        </div>
      ))}
      {fields.length < 4 && (
        <button
          onClick={(e) => {
            addCuriosity(), e.preventDefault();
          }}
        >
          Agregar Curiosidad
        </button>
      )}
    </>
  );
}

export default PruebaCuriosities;
