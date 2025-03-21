import { useContext } from 'react';
import FieldContext from '../context/field-context';
import { Button } from '@mui/material';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Options({
  fieldKey,
}: {
  fieldKey: string | undefined;
}) {
  const { fields } = useContext(FieldContext);
  const field = fields?.find((item) => item.field_key == fieldKey);

  if (!field?.options) {
    return null;
  }

  return (
    <div className="mt-2 px-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Options</h3>
      <div className="w-full px-6 py-5 bg-white ring-1 rounded-sm shadow-sm ring-black/5 flex flex-col gap-y-2">
        <List className="space-y-4">
          {field.options.map((option, index) => (
            <ListItem
              key={option.option_label}
              className="flex justify-between items-center bg-white ring-1 rounded-sm shadow-sm ring-black/5"
            >
              <ListItemText primary={`${index + 1}`} />
              <ListItemText
                primary={option.option_label}
                className="flex-1 text-center"
              />
              <ListItemText
                primary={option.option_value}
                className="flex-1 text-center"
              />
              <IconButton color="error" size="small">
                <TrashIcon className="size-6" />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" className="self-end">
          Add option
        </Button>
      </div>
    </div>
  );
}
