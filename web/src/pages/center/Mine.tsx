import { gql } from "@/__generated__/gql";
import { Template } from "@/__generated__/graphql";
import { UpdateModal } from "@/components/mine/UpdateModal";
import { useTime } from "@/hooks/useTime";
import useUrlState from "@ahooksjs/use-url-state";
import { useMutation, useQuery } from "@apollo/client";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useSize } from "ahooks";
import {
  App,
  Input,
  Pagination,
  Popconfirm,
  Space,
  Switch,
  Table,
  Typography,
} from "antd";
import { ColumnType } from "antd/lib/table";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const { Search } = Input;
const query = gql(`
  query MyTemplates($pagination:Pagination,$search:String){
    templatesByUser(pagination: $pagination,search: $search){
      total
      allCount
      templates{
        id
        isPublic
        name
        createAt
        updateAt
        sourceCodeUrl
      }
    }
  }
`);

const DELETE_TEMPLATE = gql(`
  mutation DeleteTemplate($id:Int!){
    deleteTemplate(id:$id)
  }
`);

const UPDATE_TEMPLATE = gql(`
  mutation UpdateTemplate($id:Int!,$input:TemplateUpdateInput!){
    updateTemplate(id: $id,input: $input){
      id
    }
  }
`);

const UPDATE_TAGS = gql(`
  mutation UpdateTemplateTags($input:TemplateTagInput!){
    updateTags(input: $input)
  }
`);

export const Component = () => {
  useLingui();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [state, setState] = useUrlState<{
    page: number;
    search?: string;
  }>({
    page: 1,
  });
  const [currentId, setCurrentId] = useState<number>();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const pageSize = 10;
  const { formatTime, calcRelativeTimeNow } = useTime();

  const [deleteTemplate] = useMutation(DELETE_TEMPLATE, {
    refetchQueries: ["MyTemplates"],
  });

  const [updateTemplate] = useMutation(UPDATE_TEMPLATE, {
    refetchQueries: ["MyTemplates"],
  });

  const [updateTags] = useMutation(UPDATE_TAGS, {
    refetchQueries: ["MyTemplates"],
  });

  const { data, loading } = useQuery(query, {
    variables: {
      pagination: {
        page: state?.page > 1 ? state.page - 1 : 0,
        pageSize,
      },
      search: state.search,
    },
  });

  const columns: ColumnType<Partial<Template>>[] = [
    {
      dataIndex: "name",
      title: t`模版名称`,
      width: 100,
      render: (name: string, record) => {
        return (
          <Typography.Link onClick={() => navigate(`/template/${record.id}`)}>
            {name}
          </Typography.Link>
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
      dataIndex: "sourceCodeUrl",
      title: t`代码仓库`,
      width: 120,
      render: (sourceCodeUrl) => {
        return sourceCodeUrl ? (
          <Typography.Link href={sourceCodeUrl}>
            {sourceCodeUrl}
          </Typography.Link>
        ) : (
          <Typography.Text type="secondary">
            <Trans>无</Trans>
          </Typography.Text>
        );
      },
    },
    {
      dataIndex: "isPublic",
      title: t`是否公开`,
      width: 80,
      render: (isPublic: boolean, record) => {
        return (
          <Switch
            size="small"
            value={isPublic}
            onChange={async (e) => {
              try {
                await updateTemplate({
                  variables: {
                    id: record.id!,
                    input: {
                      isPublic: e.valueOf(),
                    },
                  },
                });
                message.success(t`更新成功`);
              } catch (error) {
                message.error(t`更新失败`);
              }
            }}
          />
        );
      },
    },
    {
      title: t`操作`,
      width: 100,
      render: (_, record) => {
        return (
          <Space size="large">
            <Typography.Link
              onClick={() => {
                setCurrentId(record.id!);
                setOpen(true);
              }}
            >
              <Trans>修改</Trans>
            </Typography.Link>
            <Popconfirm
              title={t`删除模版`}
              description={t`你确定要删除该模版吗？`}
              okText={t`确定`}
              cancelText={t`取消`}
              onConfirm={async () => {
                try {
                  await deleteTemplate({
                    variables: {
                      id: record.id!,
                    },
                  });
                  message.success(t`删除成功`);
                } catch (error) {
                  message.error(t`删除失败`);
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
        <Search
          placeholder={t`搜索模版`}
          allowClear
          value={state.search}
          className=" max-w-[50%] mx-auto"
          onChange={(e) => {
            setState({
              search: e.target.value,
            });
          }}
          loading={loading}
          enterButton
        />
        <div className="flex-1 overflow-hidden" ref={ref}>
          <Table
            pagination={false}
            scroll={{
              y: size?.height,
              x: size?.width,
            }}
            rowKey={(record) => record.id!}
            columns={columns}
            virtual
            dataSource={data?.templatesByUser.templates}
          />
        </div>
        <div className="flex justify-end">
          <Pagination
            pageSize={pageSize}
            total={data?.templatesByUser.total}
            current={state.page}
            onChange={(page) => {
              setState({ page });
            }}
            showSizeChanger={false}
          />
        </div>
      </div>
      <UpdateModal
        id={currentId}
        open={open}
        onClose={() => {
          setOpen(false);
          setCurrentId(undefined);
        }}
        onOk={async (values) => {
          try {
            await updateTemplate({
              variables: {
                id: currentId!,
                input: {
                  sourceCodeUrl: values.sourceCodeUrl,
                  categoryId: values.categoryId,
                },
              },
            });
            await updateTags({
              variables: {
                input: {
                  templateId: currentId!,
                  tagId: values.tagIds,
                },
              },
            });
            message.success(t`更新成功`);
          } catch (error) {
            message.error(t`更新失败`);
          } finally {
            setCurrentId(undefined);
            setOpen(false);
          }
        }}
      />
    </div>
  );
};
