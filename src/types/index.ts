type Option = {
  option_label: string;
  option_value: string;
};

type Rule = {
  rule_field_key: string;
  rule_value: string;
  children: Rule[];
};

type Field = {
  field_key: string;
  field_name: string;
  options: Option[];
  rules: Rule[];
};

export type { Field, Option, Rule };
