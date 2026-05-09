import { FC, useMemo } from "react";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import styles from "./CustomSelect.module.css";
interface ICustomSelectProps {
  label: string;
  options: { label: string; value: string }[];
  isAvailable?: boolean;
  value: string | null;
  onChange?: (value: string) => void;
}

export const CustomSelect: FC<ICustomSelectProps> = ({
  label,
  options,
  isAvailable,
  value,
  onChange,
}) => {
  const collection = useMemo(
    () => createListCollection({ items: options }),
    [options],
  );

  return (
    <Select.Root
      collection={collection}
      disabled={!isAvailable}
      value={value ? [value] : []}
      onValueChange={(e) => onChange?.(e.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Control className={styles.formField}>
        <Select.Trigger>
          <Select.ValueText placeholder=" " className={styles.formInput} />
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Trigger>
        <Select.Label data-has-value={!!value} className={styles.formLabel}>
          {label}
        </Select.Label>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
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
  );
};
