import { createContext } from 'react';
import { Field } from '../types';

type FieldContextType = {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
};

const FieldContext = createContext<FieldContextType>({
  fields: [],
  setFields: () => {}, // Placeholder function to prevent errors
});

export default FieldContext;
