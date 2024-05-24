import { gql } from "@/__generated__";
import { Comment, User } from "@/__generated__/graphql";
import { useTime } from "@/hooks/useTime";
import { useUserStore } from "@/stores/useUserStore";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { App, Avatar, Button, Typography } from "antd";
import { PropsWithChildren, useState } from "react";
import { COMMENT } from ".";
import { CommentInput } from "./CommentInput";

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
  const [addComment, { loading }] = useMutation(COMMENT);

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
            {/* <Button
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
            ></Button> */}
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
                    message.loading({
                      content: t`删除中...`,
                      duration: 0,
                      key: "delete",
                    });
                    await deleteComment({
                      variables: {
                        id: comment.id,
                      },
                      refetchQueries: ["TemplateAndReadme", "QueryComments"],
                    });
                    message.success({
                      content: t`删除成功`,
                      key: "delete",
                    });
                  } catch (error) {
                    message.error({
                      content: t`删除失败`,
                      key: "delete",
                    });
                  }
                }}
              ></Button>
            )}
            <Button
              type="link"
              size="small"
              loading={loading}
              onClick={() => {
                setIsReply(!isReply);
              }}
            >
              <Trans>回复</Trans>
            </Button>
          </div>
        </div>
        {isReply && (
          <CommentInput
            isReply
            loading={loading}
            placeholder={t`回复${user.username}`}
            onSubmit={async (value) => {
              try {
                message.loading({
                  content: t`回复中...`,
                  duration: 0,
                  key: "reply",
                });
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
                message.success({
                  content: t`回复成功`,
                  key: "reply",
                });
              } catch (err) {
                message.error({
                  content: t`回复失败`,
                  key: "reply",
                });
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
