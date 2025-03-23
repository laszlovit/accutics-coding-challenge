import { createContext, useContext } from 'react';
import { Field } from '../types';

type FieldContextType = {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
};

export const FieldContext = createContext<FieldContextType>({
  fields: [],
  setFields: () => {}, // Placeholder function to prevent errors
});

function useFieldContext() {
  const fields = useContext(FieldContext);

  if (fields == undefined) {
    throw new Error('useFieldContext must be used with a FieldContext');
  }

  return fields;
}

export default useFieldContext;
