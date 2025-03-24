import { create } from 'zustand';
import fieldData from '../data/test-data.json';
import { Field } from '../types';

type FieldStore = {
  fields: Field[];
  actions: {
    addField: (newField: Field) => void;
    updateField: (
      fieldKey: string | undefined,
      updatedName: string | undefined
    ) => void;
    addOption: (
      fieldKey: string | undefined,
      option_label: string,
      option_value: string
    ) => void;
    updateOption: (
      fieldKey: string | undefined,
      optionToUpdate: string,
      option_label: string,
      option_value: string
    ) => void;
    deleteOption: (
      fieldKey: string | undefined,
      optionToUDelete: string
    ) => void;
  };
};

const useFieldStore = create<FieldStore>((set) => ({
  fields: fieldData,
  actions: {
    addField: (newField: Field) =>
      set((state) => ({
        fields: [...state.fields, newField],
      })),
    updateField: (
      fieldKey: string | undefined,
      updatedName: string | undefined
    ) =>
      set((state) => ({
        fields: state.fields.map((field) =>
          field.field_key == fieldKey
            ? { ...field, field_name: updatedName }
            : field
        ),
      })),
    addOption: (
      fieldKey: string | undefined,
      optionLabel: string,
      optionValue: string
    ) =>
      set((state) => ({
        fields: state.fields.map((field) =>
          field.field_key == fieldKey
            ? {
                ...field,
                options: [
                  ...(field.options || []),
                  { option_label: optionLabel, option_value: optionValue },
                ],
              }
            : field
        ),
      })),
    updateOption: (
      fieldKey: string | undefined,
      optionToUpdate: string,
      optionLabel: string,
      optionValue: string
    ) =>
      set((state) => ({
        fields: state.fields.map((field) =>
          field.field_key == fieldKey
            ? {
                ...field,
                options: field.options?.map((option) =>
                  option.option_label == optionToUpdate
                    ? {
                        ...option,
                        option_label: optionLabel || option.option_label,
                        option_value: optionValue || option.option_value,
                      }
                    : option
                ),
              }
            : field
        ),
      })),
    deleteOption: (fieldKey: string | undefined, optionToDelete: string) =>
      set((state) => ({
        fields: state.fields.map((field) =>
          field.field_key == fieldKey
            ? {
                ...field,
                options: field.options?.filter(
                  (option) => option.option_label !== optionToDelete
                ),
              }
            : field
        ),
      })),
  },
}));

export const useFields = () => useFieldStore((state) => state.fields);

export const useFieldsActions = () => useFieldStore((state) => state.actions);
