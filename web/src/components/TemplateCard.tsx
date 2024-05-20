import { gql } from "@/__generated__";
import tagMapColor from "@/assets/tagMapColor.json";
import {
  CommentOutlined,
  DownloadOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Avatar, Divider, List, Space, Tag, Typography } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const query = gql(`
  query Template($id:Int!){
      templateWithUser(id: $id){
        name
        config
        username,
        avatarUrl,
        category{
          name
        }
        tags{
          name
        }
      }
      templateDownloadCount(id: $id)
      templateFavoriteCount(id: $id)
      templateCommentCount(id: $id)
  }
`);

export const USER_FAVORITES_TEMPLATE = gql(`
query UserFavoriteTemplate{
  favoriteTemplates{
    id,
  }
}
`);

type TemplateCardProps = {
  id: number;
};
export const TemplateCard = ({ id }: TemplateCardProps) => {
  const { data } = useQuery(query, { variables: { id } });
  const { data: favoriteData } = useQuery(USER_FAVORITES_TEMPLATE);
  const config = useMemo(() => {
    if (data) {
      return JSON.parse(JSON.parse(data?.templateWithUser?.config ?? "{}"));
    }
  }, [data]);

  const userFavoriteIds = useMemo(() => {
    if (favoriteData) {
      return new Set<number>(
        favoriteData.favoriteTemplates
          .filter((item) => item != null)
          .map((item) => item!.id)
      );
    } else {
      return new Set<number>();
    }
  }, [favoriteData]);

  const navigate = useNavigate();

  return (
    <List.Item
      className=" cursor-pointer hover:shadow-lg transition"
      actions={[
        <Typography.Text type="secondary">
          <DownloadOutlined /> {data?.templateDownloadCount}
        </Typography.Text>,
        <Typography.Text type="secondary">
          {userFavoriteIds.has(id) ? (
            <HeartFilled
              style={{
                color: "#ff2442",
              }}
            />
          ) : (
            <HeartOutlined />
          )}{" "}
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
        avatar={<Avatar src={data?.templateWithUser.avatarUrl} />}
        title={data?.templateWithUser?.name}
        description={
          <Space>
            {data?.templateWithUser.category?.name}
            <Divider type="vertical" />
            {data?.templateWithUser.tags?.map((item) => (
              <Tag color={(tagMapColor as any)[item.name]}>{item.name}</Tag>
            ))}
          </Space>
        }
      />
      {config?.description}
    </List.Item>
  );
};
