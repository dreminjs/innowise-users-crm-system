"use client";
import { FC, useMemo } from "react";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import clsx from "clsx";
import styles from "./CustomSelect.module.css";

type SelectOption = {
  label: string;
  value: string;
};

type SelectGroup = {
  label: string;
  items: SelectOption[];
};

interface ICustomSelectProps {
  label: string;
  options: SelectOption[] | SelectGroup[];
  disabled?: boolean;
  value: string | null;
  error?: string;
  testId?: string;
  onChange?: (value: string) => void;
}

const isGroupedOptions = (
  options: SelectOption[] | SelectGroup[],
): options is SelectGroup[] => {
  return options.length > 0 && "items" in options[0];
};

export const CustomSelect: FC<ICustomSelectProps> = ({
  label,
  options,
  disabled,
  value,
  error,
  onChange,
  testId,
}) => {
  const flatItems = useMemo(() => {
    if (!options.length) {
      return [];
    }
    if (isGroupedOptions(options)) {
      return options.flatMap((group) => group.items);
    }
    return options;
  }, [options]);

  const collection = useMemo(
    () => createListCollection({ items: flatItems }),
    [flatItems],
  );

  return (
    <div className={styles.wrapper}>
      <Select.Root
        collection={collection}
        disabled={disabled}
        value={value ? [value] : []}
        onValueChange={(e) => onChange?.(e.value[0])}
      >
        <Select.HiddenSelect />

        <Select.Control
          className={clsx(styles.formField, {
            [styles.errorBorder]: error,
          })}
        >
          <Select.Trigger data-testid={testId}>
            <Select.ValueText
              suppressHydrationWarning
              placeholder=" "
              className={styles.formInput}
            />

            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Trigger>

          <Select.Label
            suppressHydrationWarning
            data-has-value={!!value}
            className={clsx(styles.formLabel, {
              [styles.errorLabel]: error,
            })}
          >
            {label}
          </Select.Label>
        </Select.Control>
        <Portal>
          <Select.Positioner className={styles.selectPositioner}>
            <Select.Content className={styles.selectContent}>
              {isGroupedOptions(options)
                ? options.map((group) => (
                    <Select.ItemGroup key={group.label}>
                      <Select.ItemGroupLabel className={styles.groupLabel}>
                        {group.label}
                      </Select.ItemGroupLabel>

                      {group.items.map((item) => (
                        <Select.Item
                          item={item}
                          className={styles.selectItem}
                          key={item.value}
                        >
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.ItemGroup>
                  ))
                : options.map((item) => (
                    <Select.Item
                      item={item}
                      className={styles.selectItem}
                      key={item.value}
                    >
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
