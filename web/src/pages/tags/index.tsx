import { gql } from "@/__generated__";
import { MySkeleton } from "@/components/MySkeleton";
import { TemplateCard } from "@/components/TemplateCard";
import useUrlState from "@ahooksjs/use-url-state";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Input, List, Typography } from "antd";
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
  useLingui();
  const { id } = useParams();

  const [state, setState] = useUrlState<{
    category?: string;
    page: number;
    search?: string;
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
      search: state.search,
    },
  });

  return (
    <>
      <div className=" bg-neutral-50 flex flex-col items-center">
        <MySkeleton loading={loading} className="w-[100px] h-10 mt-6">
          <Typography.Title level={4} className="mt-6">
            {data?.tagByIdWithTemplates.tag.name}
          </Typography.Title>
        </MySkeleton>
        <MySkeleton loading={loading} className="w-[300px] mt-2">
          <Typography.Paragraph className=" max-w-[300px]" type="secondary">
            {data?.tagByIdWithTemplates.tag.description}
          </Typography.Paragraph>
        </MySkeleton>
        <MySkeleton loading={loading} className="w-[100px] mt-2 mb-4">
          <Typography.Text type="secondary" className="mb-4">
            <Trans>{data?.tagByIdWithTemplates.allCount}模版 (仅公开)</Trans>
          </Typography.Text>
        </MySkeleton>
      </div>
      <div className="flex justify-center my-4">
        <Search
          placeholder={t`搜索模板`}
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
      </div>
      <div className="flex-1 bg-white shadow-lg rounded-lg p-4 min-w-[400px] w-[80%] m-auto mt-4 mb-6">
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
