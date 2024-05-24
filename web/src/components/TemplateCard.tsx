import { gql } from "@/__generated__";
import tagMapColor from "@/assets/tagMapColor.json";
import {
  CommentOutlined,
  DownloadOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Avatar, Divider, List, Space, Tag, Typography } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { MySkeleton } from "./MySkeleton";

const query = gql(`
  query Template($id:Int!){
      templateWithUser(id: $id){
        userId
        name
        config
        username,
        avatarUrl,
        category{
          name
        }
        tags{
          id
          name
        }
      }
      templateDownloadCount(id: $id)
      templateFavoriteCount(id: $id)
      templateCommentCount(id: $id)
  }
`);

type TemplateCardProps = {
  id: number;
};
export const TemplateCard = ({ id }: TemplateCardProps) => {
  const { data, loading } = useQuery(query, { variables: { id } });

  const config = useMemo(() => {
    if (data) {
      return JSON.parse(JSON.parse(data?.templateWithUser?.config ?? "{}"));
    }
  }, [data]);

  const navigate = useNavigate();

  return (
    <List.Item
      className=" cursor-pointer hover:shadow-lg transition"
      actions={[
        <Typography.Text type="secondary">
          <DownloadOutlined /> {data?.templateDownloadCount}
        </Typography.Text>,
        <Typography.Text type="secondary">
          <HeartOutlined />
          {data?.templateFavoriteCount}
        </Typography.Text>,
        <Typography.Text type="secondary">
          <CommentOutlined /> {data?.templateCommentCount}
        </Typography.Text>,
      ]}
      onClick={() => {
        navigate(`/template/${id}`);
      }}
    >
      <List.Item.Meta
        avatar={
          <MySkeleton loading={loading} className="w-8 h-8 rounded-full">
            <Avatar
              src={data?.templateWithUser.avatarUrl}
              onClick={(e) => {
                e?.stopPropagation();
                navigate(`/user/${data?.templateWithUser.userId}`);
              }}
            />
          </MySkeleton>
        }
        title={
          <MySkeleton loading={loading} className="w-[100px]">
            {data?.templateWithUser?.name}
          </MySkeleton>
        }
        description={
          <Space>
            <MySkeleton loading={loading} className="w-[50px]">
              {data?.templateWithUser.category?.name}
            </MySkeleton>
            <Divider type="vertical" />
            {loading
              ? Array.from(Array(3)).map((_, i) => (
                  <MySkeleton key={i} loading className="w-[50px] h-6" />
                ))
              : data?.templateWithUser.tags?.map((item) => (
                  <Tag
                    color={(tagMapColor as any)[item.name]}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tag/${item.id}`);
                    }}
                    key={item.id}
                  >
                    {item.name}
                  </Tag>
                ))}
          </Space>
        }
      />
      <MySkeleton loading={loading}>
        {config?.description}
      </MySkeleton>
    </List.Item>
  );
};
