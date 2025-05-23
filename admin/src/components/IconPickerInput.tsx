import React from 'react';
import { Field, SingleSelect, SingleSelectOption, Flex, useComposedRefs } from '@strapi/design-system';
import { useFocusInputField } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import * as LucideIcons from 'lucide-react';
import {
  allIcons,
} from './iconOptions';

type IconPickerInputProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  required?: boolean;
  error?: string;
  hint?: string | React.ReactNode;
  labelAction?: React.ReactNode;
};

const IconPickerInput = React.forwardRef<HTMLButtonElement, IconPickerInputProps>(({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  hint,
  labelAction,
  }, forwardedRef) => {
    const { formatMessage } = useIntl();
    const fieldRef = useFocusInputField<HTMLInputElement>(name);
    const composedRefs = useComposedRefs(forwardedRef, fieldRef);

    const handleChange = (newValue: string) => {
      onChange({ target: { name, value: newValue } });
    };

    return (
      <Field.Root name={name} error={error} hint={hint} required={required}>
        <Field.Label action={labelAction}>{label || formatMessage({ id: 'icon-picker.label', defaultMessage: 'Icon' })}</Field.Label>

        <SingleSelect
          ref={composedRefs}
          id={name}
          value={value}
          onChange={handleChange}
          placeholder={formatMessage({
            id: 'icon-picker.placeholder',
            defaultMessage: 'Select an icon',
          })}
          aria-label={formatMessage({
            id: 'icon-picker.aria-label',
            defaultMessage: 'Icon selection',
          })}
          required={required}
        >
          <SingleSelectOption value="">
            <Flex direction="row" alignItems="center" gap={2}>
              {formatMessage({
                id: 'icon-picker.no-icon',
                defaultMessage: 'No icon',
              })}
            </Flex>
          </SingleSelectOption>
          
          {allIcons.map((iconName) => {
            const IconComponent = (LucideIcons as any)[iconName];

            return (
              <SingleSelectOption key={iconName} value={iconName}>
                <Flex direction="row" alignItems="center" gap={2}>
                  {IconComponent ? <IconComponent size={16} /> : null}
                  {iconName}
                </Flex>
              </SingleSelectOption>
            );
          })}
        </SingleSelect>

        <Field.Hint>
          {hint ||
            formatMessage({
              id: 'icon-picker.hint',
              defaultMessage: 'Choose an icon for this field',
            })}
        </Field.Hint>
        <Field.Error>
          {error ||
            formatMessage({
              id: 'icon-picker.error',
              defaultMessage: 'Please select an icon',
            })}
        </Field.Error>
      </Field.Root>
    );
});

export default IconPickerInput;