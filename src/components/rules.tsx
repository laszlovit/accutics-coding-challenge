import { useContext } from 'react';
import FieldContext from '../context/field-context';
import { Rule } from '../types';
import { IconButton } from '@mui/material';
import { Select, MenuItem, TextField, Button } from '@mui/material';
import { TrashIcon } from '@heroicons/react/24/outline';

function RuleItem({ rule }: { rule: Rule }) {
  return (
    <div className="mb-3 px-6 py-5 bg-white ring-1 rounded-sm shadow-sm ring-black/5 w-full">
      <div>
        <div className="flex gap-4 items-center">
          <Select value={rule.rule_field_key} className="w-1/3">
            <MenuItem value={rule.rule_field_key}>
              {rule.rule_field_key}
            </MenuItem>
          </Select>
          <TextField
            value={rule.rule_value}
            className="w-1/2"
            placeholder="Enter value"
            variant="outlined"
          />
          <IconButton color="error" size="small">
            <TrashIcon className="size-6" />
          </IconButton>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="contained" color="primary">
            Add Group
          </Button>
        </div>
        {rule.children.length > 0 && (
          <div className="pl-6 mt-4 border-l border-gray-200">
            {rule.children.map((childRule) => (
              <RuleItem key={childRule.rule_field_key} rule={childRule} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Rules({ fieldKey }: { fieldKey: string | undefined }) {
  const { fields } = useContext(FieldContext);
  const field = fields.find((item) => item.field_key === fieldKey);

  if (!field?.rules) {
    return null;
  }

  return (
    <div className="p-4 flex flex-col gap-y-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Rules</h3>
      <div className="flex flex-col gap-4">
        {field.rules.map((rule, index) => (
          <div className="flex justify-between gap-x-4">
            <span className="font-semibold">{`${index + 1}`}</span>
            <RuleItem key={rule.rule_field_key} rule={rule} />
          </div>
        ))}
      </div>
      <Button variant="contained" color="primary" className="self-end">
        Add Rule
      </Button>
    </div>
  );
}
