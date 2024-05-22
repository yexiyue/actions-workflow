import { gql } from "@/__generated__";
import { TemplateCard } from "@/components/TemplateCard";
import { useTime } from "@/hooks/useTime";
import useUrlState from "@ahooksjs/use-url-state";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Trans, t } from "@lingui/macro";
import { Avatar, Input, List, Typography } from "antd";
import { useState } from "react";
import { useParams } from "react-router";

const { Search } = Input;

const query = gql(`
  query UserTemplates($id:Int!,$pagination:Pagination,$search:String){
    userById(id:$id) {
      id
      username
      avatarUrl
      createAt
    }
    templatesByUserId(userId:$id,pagination: $pagination,search: $search) {
      templates{
        id
      }
      total
      allCount
    }
  }
`);

export const Component = () => {
  const { id } = useParams();
  const [search, setSearch] = useState<string>();
  const [state, setState] = useUrlState<{
    category?: string;
    page: number;
  }>({
    page: 1,
  });
  const pageSize = 10;
  const { data, loading } = useQuery(query, {
    variables: {
      id: parseInt(id!),
      pagination: {
        page: state?.page > 1 ? state.page - 1 : 0,
        pageSize,
      },
      search: search,
    },
  });
  const { formatTime } = useTime();

  return (
    <div>
      <div className="flex gap-2 items-center flex-col bg-neutral-50 p-4">
        <Avatar size="large" src={data?.userById?.avatarUrl} />
        <Typography.Text>
          <Trans>用户名称: {data?.userById?.username}</Trans>
        </Typography.Text>
        <Typography.Text type="secondary">
          <Trans>注册时间: {formatTime(data?.userById?.createAt)}</Trans>
        </Typography.Text>
        <Typography.Text type="secondary">
          <Trans>
            模版数量: {data?.templatesByUserId.allCount} (仅公开数量)
          </Trans>
        </Typography.Text>
      </div>
      <div className="flex justify-center my-4">
        <Search
          placeholder={t`搜索模板`}
          allowClear
          value={search}
          className=" max-w-[50%]"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          loading={loading}
          enterButton
        />
      </div>
      <div className="flex-1 bg-white p-4 min-w-[400px] w-[80%] m-auto mt-4 mb-6">
        <List
          loading={{
            spinning: loading,
            indicator: <LoadingOutlined style={{ fontSize: 24 }} />,
          }}
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize,
            total: data?.templatesByUserId.total,
            onChange(page) {
              setState({ page });
            },
            current: state.page,
          }}
          dataSource={data?.templatesByUserId.templates}
          renderItem={(item) => <TemplateCard key={item.id} id={item.id} />}
        ></List>
      </div>
    </div>
  );
};
