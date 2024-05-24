import { gql } from "@/__generated__";
import { TAGS_CATEGORY } from "@/pages/Home";
import { useQuery } from "@apollo/client";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Form, Input, Modal, Select } from "antd";
import { useEffect, useMemo, useState } from "react";

const queryTemplate = gql(`
  query GetTemplateInfo($id:Int!){
    templateWithUser(id: $id){
      categoryId
      sourceCodeUrl
      tags{
        id
      }
    }
  }
`);

type UpdateModalProps = {
  id?: number;
  open: boolean;
  onClose: () => void;
  onOk?: (value: FormValues) => Promise<void>;
};

type FormValues = {
  categoryId: number;
  sourceCodeUrl: string;
  tagIds: number[];
};

export const UpdateModal = (props: UpdateModalProps) => {
  const { id, open, onClose, onOk } = props;
  if (!id) return null;

  const [loading, setLoading] = useState(false);
  useLingui();
  const { data: tagsAndCategories, loading: tagsAndCategoriesLoading } =
    useQuery(TAGS_CATEGORY);
  const { data, loading: dataLoading } = useQuery(queryTemplate, {
    variables: { id },
  });
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        categoryId: data.templateWithUser.categoryId,
        sourceCodeUrl: data.templateWithUser.sourceCodeUrl!,
        tagIds: data.templateWithUser.tags.map((i) => i.id),
      });
    }
  }, [data]);

  const categoriesOptions = useMemo(() => {
    return (
      tagsAndCategories?.categories.categories.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }) ?? []
    );
  }, [tagsAndCategories]);

  const tagsOptions = useMemo(() => {
    return (
      tagsAndCategories?.tags.tags.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }) ?? []
    );
  }, [tagsAndCategories]);

  return (
    <Modal
      open={open}
      centered
      title={t`修改模版`}
      onCancel={() => onClose()}
      onOk={async () => {
        setLoading(true);
        const res = await form.validateFields();
        await onOk?.(res);
        setLoading(false);
      }}
      okButtonProps={{
        loading,
      }}
      okText={t`更新`}
      cancelText={t`取消`}
    >
      <Form<FormValues> layout="vertical" form={form}>
        <Form.Item
          label={t`分类`}
          name="categoryId"
          rules={[
            {
              required: true,
              message: t`请选择分类`,
            },
          ]}
        >
          <Select
            options={categoriesOptions}
            loading={tagsAndCategoriesLoading || dataLoading}
            placeholder={t`请选择分类`}
          />
        </Form.Item>
        <Form.Item label={t`标签`} name="tagIds">
          <Select
            options={tagsOptions}
            placeholder={t`请选择标签`}
            allowClear
            loading={tagsAndCategoriesLoading || dataLoading}
            mode="multiple"
            maxCount={3}
          />
        </Form.Item>
        <Form.Item label={t`模版代码仓库URL`} name="sourceCodeUrl">
          <Input placeholder={t`请输入模版代码仓库URL`} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
