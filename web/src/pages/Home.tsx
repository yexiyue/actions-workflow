import { gql } from "@/__generated__/gql";
import tagMapColor from "@/assets/tagMapColor.json";
import { TemplateCard } from "@/components/TemplateCard";
import useUrlState from "@ahooksjs/use-url-state";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { t } from "@lingui/macro";
import { App, List, Menu, MenuProps, Tag } from "antd";
import { useEffect } from "react";
import PrefectScrollbar from "react-perfect-scrollbar";

type MenuItem = Required<MenuProps>["items"][number];

const query = gql(`
  query Dates($categoryId: Int, $pagination:Pagination) {
    categories{
      id
      name
    }
    tags{
      id
      name
    }
    templatesWithPagination(categoryId: $categoryId, pagination: $pagination) {
      templates{
        id
      }
      total
    }
  }
`);

export const Component = () => {
  const { message } = App.useApp();
  const [state, setState] = useUrlState<{
    category?: string;
    page: number;
  }>({
    page: 1,
  });
  const pageSize = 10;

  const { data, loading, error } = useQuery(query, {
    variables: {
      categoryId: state.category ? parseInt(state.category) : undefined,
      pagination: {
        page: state?.page > 1 ? state.page - 1 : 0,
        pageSize,
      },
    },
  });
  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);
  const items: MenuItem[] =
    data?.categories?.map((item) => {
      return {
        key: item.id,
        label: item.name,
      };
    }) ?? [];

  items.unshift({
    key: "all",
    label: t`全部`,
  });
  return (
    <div className="w-full h-[calc(100%-56px)] bg-gray-100">
      <PrefectScrollbar>
        <div className="w-[80%] flex gap-6 m-auto mt-4 relative pb-6 items-start">
          <div className="w-[180px] h-[500px] border sticky top-0">
            <PrefectScrollbar>
              <Menu
                items={items}
                defaultSelectedKeys={["all"]}
                onSelect={(e) => {
                  if (e.key === "all") {
                    setState({
                      category: undefined,
                    });
                  } else {
                    setState({
                      category: Number(e.key),
                    });
                  }
                }}
              />
            </PrefectScrollbar>
          </div>

          <div className="flex-1 bg-white p-4 min-w-[400px]">
            <List
              loading={{
                spinning: loading,
                indicator: <LoadingOutlined style={{ fontSize: 24 }} />,
              }}
              itemLayout="vertical"
              size="large"
              pagination={{
                pageSize,
                total: data?.templatesWithPagination.total,
                onChange(page) {
                  setState({ page });
                },
                current: state.page,
              }}
              dataSource={data?.templatesWithPagination.templates}
              renderItem={(item) => <TemplateCard key={item.id} id={item.id} />}
            ></List>
          </div>

          <div className="w-[280px] border sticky top-0 flex flex-wrap gap-3 p-4 rounded-lg bg-white">
            {data?.tags.map((item) => {
              return (
                <Tag color={(tagMapColor as any)[item.name]}>{item.name}</Tag>
              );
            })}
          </div>
        </div>
      </PrefectScrollbar>
    </div>
  );
};
