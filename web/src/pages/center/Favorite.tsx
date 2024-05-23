import { gql } from "@/__generated__";
import { TemplateCard } from "@/components/TemplateCard";
import useUrlState from "@ahooksjs/use-url-state";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Input, List, Pagination } from "antd";
import ScrollBar from "react-perfect-scrollbar";

const { Search } = Input;
const query = gql(`
query MyFavorite($pagination:Pagination,$search:String){
    favoriteTemplates(pagination: $pagination,search: $search){
      templates{
        id
      }
      total
      allCount
    }
}
`);

export const Component = () => {
  useLingui();
  const [state, setState] = useUrlState<{
    page: number;
    search?: string;
  }>({
    page: 1,
  });
  const pageSize = 10;
  const { data, loading } = useQuery(query, {
    variables: {
      pagination: {
        page: state?.page > 1 ? state.page - 1 : 0,
        pageSize,
      },
      search: state.search,
    },
  });

  return (
    <div className="w-full h-full p-4">
      <div className="bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2">
        <Search
          placeholder={t`搜索模板`}
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

        <ScrollBar>
          <List
            loading={{
              spinning: loading,
              indicator: <LoadingOutlined style={{ fontSize: 24 }} />,
            }}
            style={{
              height: 300,
            }}
            itemLayout="vertical"
            size="large"
            dataSource={data?.favoriteTemplates.templates}
            renderItem={(item) => <TemplateCard key={item.id} id={item.id} />}
          ></List>
        </ScrollBar>
        <div className="flex justify-end">
          <Pagination
            pageSize={pageSize}
            total={data?.favoriteTemplates.total}
            current={state.page}
            onChange={(page) => {
              setState({ page });
            }}
          />
        </div>
      </div>
    </div>
  );
};
