import { Comment, User } from "@/__generated__/graphql";
import { useTime } from "@/hooks/useTime";
import {
  DeleteOutlined,
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Trans, t } from "@lingui/macro";
import { App, Avatar, Button, Typography } from "antd";
import { PropsWithChildren, useState } from "react";
import { CommentInput } from "./CommentInput";
import { useLingui } from "@lingui/react";
import { useMutation } from "@apollo/client";
import { COMMENT } from ".";
import { useUserStore } from "@/stores/useUserStore";
import { gql } from "@/__generated__";

type CommentProps = {
  user: Omit<User, "__typename">;
  comment: Omit<Comment, "__typename">;
} & PropsWithChildren;

const DELETE_COMMENT = gql(`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id)
  }
`);

export const CommentIem = ({ user, comment, children }: CommentProps) => {
  const { calcRelativeTimeNow } = useTime();
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [my] = useUserStore((store) => [store.user]);
  const { message } = App.useApp();
  useLingui();
  const [isReply, setIsReply] = useState(false);
  const [addComment] = useMutation(COMMENT);

  return (
    <div className="flex gap-4 my-2">
      <Avatar src={user.avatarUrl} />
      <div className="w-full">
        <Typography.Text type="secondary">{user.username}</Typography.Text>
        <Typography.Paragraph>{comment.content}</Typography.Paragraph>
        <div className="flex justify-between w-full">
          <Typography.Text type="secondary">
            {calcRelativeTimeNow(comment.createAt)}
          </Typography.Text>
          <div>
            <Button
              type="text"
              size="small"
              icon={
                <LikeOutlined
                  style={{
                    fontSize: 12,
                  }}
                />
              }
            ></Button>
            <Button
              type="text"
              size="small"
              icon={
                <DislikeOutlined
                  style={{
                    fontSize: 12,
                  }}
                />
              }
            ></Button>
            {my?.id === user.id && (
              <Button
                type="text"
                size="small"
                danger
                icon={
                  <DeleteOutlined
                    style={{
                      fontSize: 12,
                    }}
                  />
                }
                onClick={async () => {
                  try {
                    await deleteComment({
                      variables: {
                        id: comment.id,
                      },
                      refetchQueries: ["TemplateAndReadme", "QueryComments"],
                    });
                    message.success(t`删除成功`);
                  } catch (error) {
                    message.error(t`删除成功`);
                  }
                }}
              ></Button>
            )}
            <Button
              type="link"
              size="small"
              onClick={() => {
                setIsReply((pre) => !pre);
              }}
            >
              <Trans>回复</Trans>
            </Button>
          </div>
        </div>
        {isReply && (
          <CommentInput
            isReply
            placeholder={t`回复${user.username}`}
            onSubmit={async (value) => {
              try {
                await addComment({
                  variables: {
                    input: {
                      content: value,
                      templateId: comment.templateId,
                      parentCommentId: comment.id,
                    },
                  },
                  refetchQueries: ["TemplateAndReadme", "QueryComments"],
                });
                message.success(t`回复成功`);
              } catch (err) {
                message.error(t`回复失败`);
              } finally {
                setIsReply(false);
              }
            }}
          />
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};
