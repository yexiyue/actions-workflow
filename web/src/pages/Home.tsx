import { gql } from "@/__generated__/gql";
import tagMapColor from "@/assets/tagMapColor.json";
import { LayoutOutletContext } from "@/components/Layout";
import { MySkeleton } from "@/components/MySkeleton";
import { TemplateCard } from "@/components/TemplateCard";
import useUrlState from "@ahooksjs/use-url-state";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { App, Input, List, Menu, MenuProps, Tag } from "antd";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";

const { Search } = Input;

type MenuItem = Required<MenuProps>["items"][number];

const query = gql(`
  query Dates($categoryId: Int, $pagination:Pagination,$search:String) {
    templatesWithPagination(categoryId: $categoryId, pagination: $pagination,search: $search) {
      templates{
        id
      }
      total
    }
  }
`);

export const TAGS_CATEGORY = gql(`
  query TagsAndCategories{
    categories{
      categories{
        id
        name
      }
    }
    tags{
      tags{
        id
        name
      }
    }
  }
`);

export const Component = () => {
  useLingui();
  const { message } = App.useApp();
  const { scrollToTop } = useOutletContext<LayoutOutletContext>();
  const navigate = useNavigate();
  const [state, setState] = useUrlState<{
    category?: string;
    page: number;
    search?: string;
  }>({
    page: 1,
  });
  const pageSize = 10;
  const { data: tagsAndCategories, loading: tagsAndCategoriesLoading } =
    useQuery(TAGS_CATEGORY);

  const { data, loading, error } = useQuery(query, {
    variables: {
      categoryId: state.category ? parseInt(state.category) : undefined,
      pagination: {
        page: state?.page > 1 ? state.page - 1 : 0,
        pageSize,
      },
      search: state.search,
    },
  });

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);
  const items: MenuItem[] =
    tagsAndCategories?.categories?.categories.map((item) => {
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
    <div className="w-[80%] flex gap-6 m-auto mt-4 relative pb-6 items-start">
      {tagsAndCategoriesLoading ? (
        <div className="flex gap-2 bg-white w-[180px] flex-shrink-0 rounded-lg flex-col p-2">
          {Array.from(Array(15)).map((_, i) => (
            <MySkeleton key={i} loading className=" h-[40px]" />
          ))}
        </div>
      ) : (
        <Menu
          className="w-[180px] rounded-lg flex-shrink-0"
          items={items}
          selectedKeys={[state.category ?? "all"]}
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
            scrollToTop();
          }}
        />
      )}

      <div className="flex-1 bg-white p-4 min-w-[400px]">
        <Search
          placeholder={t`搜索模板`}
          allowClear
          value={state.search}
          className="my-2"
          onChange={(e) => {
            setState({
              search: e.target.value,
            });
          }}
          loading={loading}
          enterButton
        />
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

      <div className="w-[280px] shadow-lg  flex flex-wrap gap-3 p-4 rounded-lg bg-white">
        {tagsAndCategoriesLoading
          ? Array.from(Array(80)).map((_, i) => {
              const width = Math.floor(Math.random() * 80) + 50;
              return (
                <MySkeleton
                  key={i}
                  loading
                  className="h-6"
                  style={{
                    width,
                  }}
                />
              );
            })
          : tagsAndCategories?.tags.tags.map((item) => {
              return (
                <Tag
                  className="cursor-pointer"
                  color={(tagMapColor as any)[item.name]}
                  onClick={() => {
                    navigate(`/tag/${item.id}`);
                  }}
                  key={item.id}
                >
                  {item.name}
                </Tag>
              );
            })}
      </div>
    </div>
  );
};
