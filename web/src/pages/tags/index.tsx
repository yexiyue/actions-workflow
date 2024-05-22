import { gql } from "@/__generated__";
import { TemplateCard } from "@/components/TemplateCard";
import useUrlState from "@ahooksjs/use-url-state";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Trans, t } from "@lingui/macro";
import { Input, List, Typography } from "antd";
import { useState } from "react";
import { useParams } from "react-router";

const { Search } = Input;

const query = gql(`
  query TagTemplates($id:Int!,$pagination:Pagination,$search:String){
    tagByIdWithTemplates(id: $id,pagination: $pagination,search: $search){
      total
      templates{
        id
      }
      tag{
        name
        description
      }
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

  return (
    <>
      <div className=" bg-neutral-50 flex flex-col items-center">
        <Typography.Title level={4} className="mt-6">
          {data?.tagByIdWithTemplates.tag.name}
        </Typography.Title>
        <Typography.Paragraph className=" max-w-[300px]" type="secondary">
          {data?.tagByIdWithTemplates.tag.description}
        </Typography.Paragraph>
        <Typography.Text type="secondary" className="mb-4">
          <Trans>{data?.tagByIdWithTemplates.allCount}模版 (仅公开)</Trans>
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
            total: data?.tagByIdWithTemplates.total,
            onChange(page) {
              setState({ page });
            },
            current: state.page,
          }}
          dataSource={data?.tagByIdWithTemplates.templates}
          renderItem={(item) => <TemplateCard key={item.id} id={item.id} />}
        ></List>
      </div>
    </>
  );
};
