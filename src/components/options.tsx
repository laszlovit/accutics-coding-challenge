import { useState } from 'react';
import useFieldContext from '../context/field-context';

import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Options({
  fieldKey,
}: {
  fieldKey: string | undefined;
}) {
  const { fields, setFields } = useFieldContext();
  const field = fields.find((item) => item.field_key == fieldKey);

  const [addOptionLabel, setAddOptionLabel] = useState('');
  const [addOptionValue, setAddOptionValue] = useState('');
  const [editedOptions, setEditedOptions] = useState<{
    [key: string]: { label: string; value: string };
  }>({});

  const handleAddOption = () => {
    const newOption = {
      option_label: addOptionLabel,
      option_value: addOptionValue,
    };

    const updatedFields = fields.map((f) =>
      f.field_key == fieldKey
        ? { ...f, options: [...(f.options || []), newOption] }
        : f
    );

    setFields(updatedFields);
    setAddOptionLabel('');
    setAddOptionValue('');
  };

  const handleUpdateOption = ({
    optionToUpdate,
  }: {
    optionToUpdate: string;
  }) => {
    const updatedFields = fields.map((f) =>
      f.field_key == fieldKey
        ? {
            ...f,
            options: f.options?.map((o) =>
              o.option_label == optionToUpdate
                ? {
                    ...o,
                    option_label:
                      editedOptions[optionToUpdate].label || o.option_label,
                    option_value:
                      editedOptions[optionToUpdate].value || o.option_value,
                  }
                : o
            ),
          }
        : f
    );

    setFields(updatedFields);
  };

  const handleDeleteOption = ({
    optionToDelete,
  }: {
    optionToDelete: string;
  }) => {
    const updatedFields = fields.map((f) =>
      f.field_key == fieldKey
        ? {
            ...f,
            options: f.options?.filter(
              (o) => o.option_label !== optionToDelete
            ),
          }
        : f
    );

    setFields(updatedFields);
  };

  return (
    <div className="mt-2 px-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Options</h3>
      <div className="w-full px-6 py-5 bg-white ring-1 rounded-sm shadow-sm ring-black/5 flex flex-col gap-y-2">
        {field?.options && field.options.length > 0 ? (
          <>
            {field.options.map((o, index) => (
              <List key={`${fieldKey}-${o.option_label}`} className="space-y-4">
                <ListItem className="flex justify-between items-center bg-white ring-1 rounded-sm shadow-sm ring-black/5">
                  <ListItemText primary={index + 1} />
                  <div className="flex gap-x-4">
                    <TextField
                      value={
                        editedOptions[o.option_label]?.label ?? o.option_label
                      }
                      onChange={(e) =>
                        setEditedOptions((prev) => ({
                          ...prev,
                          [o.option_label]: {
                            ...prev[o.option_label],
                            label: e.target.value,
                          },
                        }))
                      }
                      onBlur={() =>
                        handleUpdateOption({ optionToUpdate: o.option_label })
                      }
                      placeholder="Enter label"
                    />
                    <TextField
                      value={
                        editedOptions[o.option_label]?.value ?? o.option_value
                      }
                      onChange={(e) =>
                        setEditedOptions((prev) => ({
                          ...prev,
                          [o.option_label]: {
                            ...prev[o.option_label],
                            value: e.target.value,
                          },
                        }))
                      }
                      onBlur={() =>
                        handleUpdateOption({ optionToUpdate: o.option_label })
                      }
                      placeholder="Enter value"
                    />
                  </div>
                  <IconButton
                    onClick={() =>
                      handleDeleteOption({
                        optionToDelete: o.option_label,
                      })
                    }
                    color="error"
                    size="small"
                  >
                    <TrashIcon className="size-6" />
                  </IconButton>
                </ListItem>
              </List>
            ))}
          </>
        ) : null}
        <div className="self-end flex gap-x-2">
          <TextField
            label="Option label"
            placeholder="Enter option label"
            onChange={(e) => setAddOptionLabel(e.target.value)}
            value={addOptionLabel}
          />
          <TextField
            label="Option value"
            placeholder="Enter option value"
            onChange={(e) => setAddOptionValue(e.target.value)}
            value={addOptionValue}
          />
        </div>
        <Button
          onClick={handleAddOption}
          variant="contained"
          color="primary"
          className="self-end"
        >
          Add option
        </Button>
      </div>
    </div>
  );
}
