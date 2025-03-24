import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useFields, useFieldsActions } from '../stores/field-store';

export default function AddField() {
  const fields = useFields();
  const { addField } = useFieldsActions();

  const [fieldName, setFieldName] = useState('');

  const handleAddField = () => {
    addField({
      field_key: `field_${fields.length + 1}`,
      field_name: fieldName,
    });

    setFieldName('');
  };

  return (
    <div className="order-1 sm:order-2 lg:col-span-4 bg-gray-100 rounded-lg p-6">
      <div className="bg-white p-6 -md flex flex-col gap-y-2  ring-1 rounded-sm shadow-sm ring-black/5">
        <TextField
          required
          id="fieldName"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          label="Field name"
          placeholder="Enter field name"
          className="w-full"
        />
        <div className="self-end">
          <Button onClick={() => handleAddField()} variant="contained">
            Add field
          </Button>
        </div>
      </div>
    </div>
  );
}
