import { gql } from "@/__generated__";
import { CommentInput } from "./CommentInput";
import { useMutation, useQuery } from "@apollo/client";
import { App } from "antd";
import { t } from "@lingui/macro";

type CommentsInputProps = {
  id: number;
};

const COMMENT = gql(`
  mutation addComment($input: CommentInput!) {
    addComment(input: $input)
  }
`);

const QUERY_COMMENT = gql(`
  query QueryComments($templateId: Int!){
    comments(id: $templateId){
      user{
        avatarUrl
        username
      }
      comment{
        id
        content
        parentCommentId
        createAt
      }
    }
  }
`);

export const Comments = (props: CommentsInputProps) => {
  const [addComment] = useMutation(COMMENT);
  const { data } = useQuery(QUERY_COMMENT, {
    variables: {
      templateId: props.id,
    },
  });
  console.log(data);
  const { message } = App.useApp();
  return (
    <div>
      <CommentInput
        onSubmit={async (value) => {
          try {
            await addComment({
              variables: {
                input: {
                  content: value,
                  templateId: props.id,
                  parentCommentId: null,
                },
              },
              refetchQueries: ["TemplateAndReadme"],
            });
            message.success(t`评论成功`);
          } catch (err) {
            message.error(t`评论失败`);
            console.error(err);
          }
        }}
      />
      comments
    </div>
  );
};
