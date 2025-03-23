import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import {
  ListItemButton,
  ListItemText,
  Collapse,
  ListItem,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import useFieldContext from '../context/field-context';

export default function FieldItem({
  fieldName,
  children,
  fieldKey,
}: {
  fieldName?: string;
  children?: React.ReactNode;
  fieldKey: string | undefined;
}) {
  const { fields, setFields } = useFieldContext();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFieldName, setUpdatedFieldName] = useState<string | undefined>(
    undefined
  );

  const handleAccordionClick = () => {
    setOpen(!open);
  };

  const handleEditingClick = () => {
    setIsEditing(true);
  };

  const handleUpdateFieldName = () => {
    const updatedFields = fields.map((f) =>
      f.field_key == fieldKey ? { ...f, field_name: updatedFieldName } : f
    );

    setFields(updatedFields);
    setIsEditing(false);
  };

  return (
    <ListItem className="rounded-md bg-white shadow-sm">
      <div className="w-full flex">
        <div className="w-full">
          <div className="flex flex-row items-center justify-between">
            {isEditing ? (
              <TextField
                value={updatedFieldName ?? fieldName}
                onChange={(e) => setUpdatedFieldName(e.target.value)}
                onBlur={() => handleUpdateFieldName()}
              />
            ) : (
              <div className="w-full">
                <ListItemText>{fieldName}</ListItemText>
              </div>
            )}
            <div className=" flex items-center justify-end">
              <PencilIcon
                onClick={() => handleEditingClick()}
                className="size-5 hover:cursor-pointer"
              />
              <ListItemButton onClick={handleAccordionClick}>
                {open ? (
                  <ChevronUpIcon className="size-6" />
                ) : (
                  <ChevronDownIcon className="size-6" />
                )}
              </ListItemButton>
            </div>
          </div>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex flex-col gap-y-4">{children}</div>
          </Collapse>
        </div>
      </div>
    </ListItem>
  );
}
