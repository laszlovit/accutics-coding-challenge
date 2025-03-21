import List from '@mui/material/List';
import FieldItem from './field-item';
import { useContext } from 'react';
import FieldContext from '../context/field-context';
import Options from './options';
import Rules from './rules';

export default function FieldsList() {
  const { fields } = useContext(FieldContext);

  return (
    <List className="order-2 sm:order-1 lg:col-span-8 bg-gray-100 rounded-lg">
      <div className="p-8 flex flex-col gap-y-6">
        {fields.map((item) => (
          <FieldItem fieldName={item.field_name} key={item.field_name}>
            <Options fieldKey={item.field_key} />
            <Rules fieldKey={item.field_key} />
          </FieldItem>
        ))}
      </div>
    </List>
  );
}
