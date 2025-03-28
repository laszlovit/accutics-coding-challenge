import List from '@mui/material/List';
import FieldItem from './field-item';
import useFieldContext from '../context/field-context';
import Options from './options';
import Rules from './rules';

export default function FieldsList() {
  const { fields } = useFieldContext();

  return (
    <List className="order-2 sm:order-1 lg:col-span-8 bg-gray-100 rounded-lg">
      <div className="p-8 flex flex-col gap-y-6">
        {fields.map((field, index) => (
          <FieldItem
            fieldName={field.field_name}
            key={`field-${index}`}
            fieldKey={field.field_key}
          >
            <Options fieldKey={field.field_key} />
            <Rules fieldKey={field.field_key} fieldIndex={index} />
          </FieldItem>
        ))}
      </div>
    </List>
  );
}
