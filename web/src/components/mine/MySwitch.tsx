import { Switch } from "antd";
import { useState } from "react";

export const MySwitch = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Switch
      size="small"
      loading={loading}
      value={value}
      onChange={async (value) => {
        setLoading(true);
        await onChange(value);
        setLoading(false);
      }}
    />
  );
};
