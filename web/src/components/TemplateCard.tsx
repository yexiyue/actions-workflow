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
  const { data } = useQuery(query, { variables: { id } });

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
          <Avatar
            src={data?.templateWithUser.avatarUrl}
            onClick={(e) => {
              e?.stopPropagation();
              navigate(`/user/${data?.templateWithUser.userId}`);
            }}
          />
        }
        title={data?.templateWithUser?.name}
        description={
          <Space>
            {data?.templateWithUser.category?.name}
            <Divider type="vertical" />
            {data?.templateWithUser.tags?.map((item) => (
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
      {config?.description}
    </List.Item>
  );
};
