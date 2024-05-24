import { gql } from "@/__generated__";
import { CommentWithUser } from "@/__generated__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { t } from "@lingui/macro";
import { App } from "antd";
import { useMemo } from "react";
import { CommentIem } from "./CommentIem";
import { CommentInput } from "./CommentInput";
import { useLingui } from "@lingui/react";

type CommentsInputProps = {
  id: number;
};

export const COMMENT = gql(`
  mutation addComment($input: CommentInput!) {
    addComment(input: $input)
  }
`);

const QUERY_COMMENT = gql(`
  query QueryComments($templateId: Int!){
    comments(id: $templateId){
      user{
        id
        avatarUrl
        username
      }
      comment{
        id
        content
        parentCommentId
        createAt
        templateId
        userId
      }
    }
  }
`);

type CommentWithChildren = CommentWithUser & {
  children?: CommentWithChildren[];
};

function genCommentTree(data: CommentWithUser[]) {
  if (!data) return [];
  const len = data.length;
  const map = new Map();

  for (let i = 0; i < len; i++) {
    map.set(data[i].comment.id, data[i]);
  }
  const res: CommentWithChildren[] = [];
  for (let i = 0; i < len; i++) {
    if (data[i].comment.parentCommentId) {
      const comment = map.get(data[i].comment.parentCommentId);
      if (comment.children) {
        comment.children.push(data[i]);
      } else {
        comment.children = [data[i]];
      }
    } else {
      res.push(data[i]);
    }
  }
  return res;
}

function mapCommentTree(data: CommentWithChildren[]) {
  return data.map((i) => {
    return (
      <CommentIem key={i.comment.id} user={i.user} comment={i.comment}>
        {i.children && mapCommentTree(i.children)}
      </CommentIem>
    );
  });
}

export const Comments = (props: CommentsInputProps) => {
  useLingui();
  const [addComment, { loading }] = useMutation(COMMENT);
  const { data } = useQuery(QUERY_COMMENT, {
    variables: {
      templateId: props.id,
    },
  });
  const commentsData = useMemo(() => {
    if (data?.comments) {
      return genCommentTree(structuredClone(data.comments));
    } else {
      return [];
    }
  }, [data]);

  const { message } = App.useApp();
  return (
    <>
      <CommentInput
        showAvatar
        loading={loading}
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
              refetchQueries: ["TemplateAndReadme", "QueryComments"],
            });
            message.success(t`评论成功`);
          } catch (err) {
            message.error(t`评论失败`);
            console.error(err);
          }
        }}
      />

      {mapCommentTree(commentsData)}
    </>
  );
};
