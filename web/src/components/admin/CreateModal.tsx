import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

type CreateModalProps = {
  open?: boolean;
  onClose?: () => void;
  onOk?: (
    operator: CreateModalProps["operator"],
    values: { name: string; description?: string }
  ) => Promise<void>;
  type?: string;
  operator?: "create" | "update";
  initialValues?: { name: string; description?: string };
};

export const CreateModal = (props: CreateModalProps) => {
  useLingui();
  const [loading, setLoading] = useState(false);
  const { open, onClose, onOk, type, operator, initialValues } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);
  const operatorString = operator === "create" ? t`添加` : t`更新`;

  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose?.();
        form.resetFields();
      }}
      title={`${operatorString}${type}`}
      centered
      okText={operatorString}
      onOk={async () => {
        setLoading(true);
        const res = await form.validateFields();
        await onOk?.(operator, res);
        setLoading(false);
      }}
      okButtonProps={{
        loading,
      }}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={<Trans>{type}名称</Trans>}
          name="name"
          rules={[{ required: true, message: t`请输入${type}名称` }]}
        >
          <Input placeholder={t`请输入${type}名称`} />
        </Form.Item>
        <Form.Item label={t`${type}描述`} name="description">
          <Input.TextArea
            style={{
              resize: "none",
              height: 100,
            }}
            count={{
              max: 100,
            }}
            showCount
            placeholder={t`请输入${type}描述`}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
