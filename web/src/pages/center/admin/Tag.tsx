import { gql } from "@/__generated__";
import { Tag } from "@/__generated__/graphql";
import { CreateModal } from "@/components/admin/CreateModal";
import { useTime } from "@/hooks/useTime";
import useUrlState from "@ahooksjs/use-url-state";
import { LoadingOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useSize } from "ahooks";
import {
  App,
  Button,
  Input,
  Pagination,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import { ColumnType } from "antd/es/table";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";

const { Search } = Input;

const query = gql(`
  query Tags($pagination:Pagination,$search:String){
    tags(pagination:$pagination,search:$search){
      total
      tags{
        id
        name
        description
        updateAt
        createAt
      }
    }
  }
`);

const DELETE_TAG = gql(`
  mutation DeleteTag($id:Int!){
    deleteTag(id:$id)
  }
`);

const ADD_TAG = gql(`
  mutation AddTag($input:TagInput!){
    createTag(tag:$input)
  }
`);

const UPDATE_TAG = gql(`
  mutation UpdateTag($id:Int!,$input:TagInput!){
    updateTag(tag: $input,id: $id){
      name
    }
  }
`);

export const Component = () => {
  useLingui();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { formatTime, calcRelativeTimeNow } = useTime();
  const [state, setState] = useUrlState<{
    page: number;
    search?: string;
  }>({
    page: 1,
  });
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const pageSize = 10;
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery(query, {
    variables: {
      pagination: {
        page: state?.page > 1 ? state.page - 1 : 0,
        pageSize,
      },
      search: state.search,
    },
  });
  const [operator, setOperator] = useState<"create" | "update">("create");
  const [currentId, setCurrentId] = useState<number>();

  const [deleteTag] = useMutation(DELETE_TAG, {
    refetchQueries: ["Tags"],
  });

  const [updateTag] = useMutation(UPDATE_TAG, {
    refetchQueries: ["Tags"],
  });

  const [createTag] = useMutation(ADD_TAG, {
    refetchQueries: ["Tags"],
  });

  const initialValues = useMemo(() => {
    if (currentId) {
      return data?.tags.tags.find((tag) => tag.id === currentId);
    }
  }, [currentId]);

  const columns: ColumnType<Partial<Tag>>[] = [
    {
      dataIndex: "name",
      title: t`标签名称`,
      width: 100,
      render: (name: string, record) => {
        return (
          <Typography.Link
            onClick={() => {
              navigate(`/tag/${record.id}`);
            }}
          >
            {name}
          </Typography.Link>
        );
      },
    },
    {
      dataIndex: "description",
      title: t`标签描述`,
      width: 150,
      render: (description: string) => {
        return (
          <Typography.Text
            ellipsis={{
              tooltip: description,
            }}
          >
            {description}
          </Typography.Text>
        );
      },
    },
    {
      dataIndex: "createAt",
      title: t`创建时间`,
      width: 150,
      render: (time: string) => {
        return (
          <Typography.Text
            ellipsis={{
              tooltip: time,
            }}
          >
            {formatTime(time)}
          </Typography.Text>
        );
      },
      sorter: (a, b) =>
        new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
    },
    {
      dataIndex: "updateAt",
      title: t`更新时间`,
      width: 150,
      render: (time: string) => {
        return (
          <Typography.Text
            ellipsis={{
              tooltip: time,
            }}
          >
            {calcRelativeTimeNow(time)}
          </Typography.Text>
        );
      },
      sorter: (a, b) =>
        new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
    },
    {
      title: t`操作`,
      width: 100,
      render: (_, record) => {
        return (
          <Space size="large">
            <Typography.Link
              onClick={() => {
                setOperator("update");
                setCurrentId(record.id!);
                setOpen(true);
              }}
            >
              <Trans>修改</Trans>
            </Typography.Link>
            <Popconfirm
              title={t`删除标签`}
              description={t`你确定要删除该标签吗？`}
              okText={t`确定`}
              cancelText={t`取消`}
              onConfirm={async () => {
                try {
                  message.loading({
                    content: t`删除中...`,
                    duration: 0,
                    key: "delete",
                  });
                  await deleteTag({
                    variables: {
                      id: record.id!,
                    },
                  });
                  message.success({
                    content: t`删除成功`,
                    key: "delete",
                  });
                } catch (error) {
                  message.error({
                    content: t`删除失败`,
                    key: "delete",
                  });
                }
              }}
            >
              <Typography.Link
                className="m-0 "
                style={{
                  color: "#ff2442",
                }}
              >
                <Trans>删除</Trans>
              </Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="w-full h-full p-4">
      <div className="bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2">
        <div className="flex justify-center relative">
          <Search
            placeholder={t`搜索标签`}
            allowClear
            value={state.search}
            className=" max-w-[50%]"
            onChange={(e) => {
              setState({
                search: e.target.value,
              });
            }}
            loading={loading}
            enterButton
          />
          <Button
            className=" absolute left-0"
            type="primary"
            onClick={() => {
              setOpen(true);
              setOperator("create");
            }}
          >
            <>
              <Trans>添加标签</Trans>
            </>
          </Button>
        </div>
        <div className="flex-1 overflow-hidden" ref={ref}>
          <Table
            pagination={false}
            scroll={{
              y: size?.height,
              x: size?.width,
            }}
            loading={{
              spinning: loading,
              indicator: <LoadingOutlined style={{ fontSize: 24 }} />,
            }}
            rowKey={(record) => record.id!}
            columns={columns}
            virtual
            dataSource={data?.tags.tags}
          />
        </div>
        <div className="flex justify-end">
          <Pagination
            pageSize={pageSize}
            total={data?.tags.total}
            current={state.page}
            onChange={(page) => {
              setState({ page });
            }}
            showSizeChanger={false}
          />
        </div>
      </div>
      <CreateModal
        open={open}
        type={t`标签`}
        operator={operator}
        onClose={() => {
          setOpen(false);
          setCurrentId(undefined);
        }}
        onOk={async (operator, values) => {
          try {
            if (operator === "create") {
              message.loading({
                content: t`添加中...`,
                duration: 0,
                key: "create",
              });
              await createTag({
                variables: {
                  input: {
                    name: values.name,
                    description: values.description ?? "",
                  },
                },
              });
              message.success({
                content: t`添加成功`,
                key: "create",
              });
            } else if (operator === "update") {
              message.loading({
                content: t`更新中...`,
                duration: 0,
                key: "update",
              });
              await updateTag({
                variables: {
                  id: currentId!,
                  input: {
                    name: values.name,
                    description: values.description ?? "",
                  },
                },
              });
              message.success({
                content: t`更新成功`,
                key: "update",
              });
            }
          } catch (error) {
            if (operator === "create") {
              message.error({
                content: t`添加失败`,
                key: "create",
              });
            } else if (operator === "update") {
              message.error({
                content: t`更新失败`,
                key: "update",
              });
            }
          } finally {
            setCurrentId(undefined);
            setOpen(false);
          }
        }}
        initialValues={initialValues}
      />
    </div>
  );
};
