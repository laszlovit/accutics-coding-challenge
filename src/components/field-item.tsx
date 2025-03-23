import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import {
  ListItemButton,
  ListItemText,
  Collapse,
  ListItem,
} from '@mui/material';
import { useState } from 'react';

export default function FieldItem({
  fieldName,
  children,
}: {
  fieldName?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ListItem className="rounded-md bg-white shadow-sm">
      <div className="w-full">
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={fieldName} />
          {open ? (
            <ChevronUpIcon className="size-6" />
          ) : (
            <ChevronDownIcon className="size-6" />
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="flex flex-col gap-y-4">{children}</div>
        </Collapse>
      </div>
    </ListItem>
  );
}
