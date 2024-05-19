import { gql } from "@/__generated__";
import {
  CommentOutlined,
  DownloadOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Avatar, Flex, Space, Typography } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const query = gql(`
  query Template($id:Int!){
      templateWithUser(id: $id){
        name
        config
        username,
        avatarUrl,
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
    <div
      className="border p-4 hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/template/${id}`)}
    >
      <Typography.Text className="text-xl">
        {data?.templateWithUser?.name}
      </Typography.Text>

      <Typography.Paragraph>{config?.description}</Typography.Paragraph>

      <Flex justify="space-between" align="center">
        <Space>
          <Avatar src={data?.templateWithUser.avatarUrl} size="small"></Avatar>

          <Typography.Text>{data?.templateWithUser.username}</Typography.Text>
        </Space>
        <Space size={16}>
          <Typography.Text type="secondary">
            <DownloadOutlined /> {data?.templateDownloadCount}
          </Typography.Text>
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
          </Typography.Text>
          <Typography.Text type="secondary">
            <CommentOutlined /> {data?.templateCommentCount}
          </Typography.Text>
        </Space>
      </Flex>
    </div>
  );
};
