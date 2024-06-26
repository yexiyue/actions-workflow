import { gql } from "@/__generated__";
import tagMapColor from "@/assets/tagMapColor.json";
import { Comments } from "@/components/Comments";
import { MySkeleton } from "@/components/MySkeleton";
import { useTime } from "@/hooks/useTime";
import { useUserStore } from "@/stores/useUserStore";
import {
  CommentOutlined,
  DownloadOutlined,
  GithubOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  App,
  Avatar,
  Button,
  Divider,
  Drawer,
  Empty,
  Space,
  Statistic,
  Tabs,
  TabsProps,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { ClipboardCopy, Undo2 } from "lucide-react";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./index.module.less";

const query = gql(`
query TemplateAndReadme($id:Int!){
  templateWithUser(id: $id){
    name
    config
    readme
    template,
    username,
    avatarUrl,
    userId,
    favorites{
      userId
    }
    createAt
    updateAt
    sourceCodeUrl
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

const ADD_FAVORITE = gql(`
  mutation addFavorite($id: Int!) {
    favorite(templateId: $id)
  }
`);

const DIS_FAVORITE = gql(`
  mutation disFavorite($id: Int!) {
    disFavorite(templateId: $id)
  }
`);

export const Component = () => {
  useLingui();
  const { id } = useParams();
  const [userId] = useUserStore((store) => [store.user?.id]);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { formatTime, calcRelativeTimeNow } = useTime();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favorite, { loading: favoriteLoading }] = useMutation(ADD_FAVORITE, {
    variables: {
      id: parseInt(id!),
    },
    refetchQueries: ["TemplateAndReadme"],
  });

  const [disFavorite, { loading: disFavoriteLoading }] = useMutation(
    DIS_FAVORITE,
    {
      variables: {
        id: parseInt(id!),
      },
      refetchQueries: ["TemplateAndReadme"],
    }
  );

  const { data, loading, error } = useQuery(query, {
    variables: {
      id: parseInt(id!),
    },
  });

  if (error) {
    throw error;
  }
  const config = useMemo(() => {
    if (data) {
      return JSON.parse(JSON.parse(data?.templateWithUser?.config ?? "{}"));
    }
  }, [data]);

  const favoriteUsers = useMemo(() => {
    if (data) {
      return new Set<number>(
        data.templateWithUser.favorites.map((favorite) => favorite.userId)
      );
    } else {
      return new Set<number>();
    }
  }, [data]);

  const items: TabsProps["items"] = [
    {
      key: "readme",
      label: "README",
      children: (
        <>
          <MySkeleton loading={loading} className="h-[300px] bg-white">
            {data?.templateWithUser.readme ? (
              <ReactMarkdown
                className="border p-4 rounded-lg w-full bg-white"
                components={{
                  code: (props) => {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      //@ts-ignore
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={vscDarkPlus}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {data?.templateWithUser.readme}
              </ReactMarkdown>
            ) : (
              <div className="border p-4 rounded-lg w-full bg-white">
                <Empty description="No README" />
              </div>
            )}
          </MySkeleton>
        </>
      ),
    },
    {
      key: "hbs",
      label: "HBS",
      children: (
        <MySkeleton loading={loading} className="h-[300px] bg-white">
          <div className="border p-4 rounded-lg w-full bg-white">
            <SyntaxHighlighter
              PreTag="div"
              children={data?.templateWithUser.template ?? ""}
              language="hbs"
              style={vscDarkPlus}
            />
          </div>
        </MySkeleton>
      ),
    },
  ];

  return (
    <>
      <div className="w-[80px] h-[300px]  fixed top-[200px] left-6 flex flex-col gap-4 justify-center">
        <Tooltip title={t`返回`} placement="right">
          <Button
            shape="circle"
            icon={<Undo2 className="w-4 h-4" />}
            onClick={() => navigate(-1)}
          ></Button>
        </Tooltip>
        <Tooltip title={!userId ? t`请先登录` : t`收藏`} placement="right">
          <Button
            type={favoriteUsers.has(userId!) ? "primary" : "default"}
            shape="circle"
            loading={disFavoriteLoading || favoriteLoading}
            icon={<HeartOutlined />}
            onClick={() => {
              if (favoriteUsers.has(userId!)) {
                disFavorite().then(() => message.success(t`取消收藏成功`));
              } else {
                favorite().then(() => message.success(t`收藏成功`));
              }
            }}
            disabled={!userId}
          ></Button>
        </Tooltip>
        <Tooltip title={t`评论`} placement="right">
          <Button
            shape="circle"
            icon={<CommentOutlined />}
            onClick={() => {
              setDrawerOpen(true);
            }}
          ></Button>
        </Tooltip>
      </div>
      <div
        className=" m-auto my-6"
        style={{
          width: "calc(100% - 200px)",
        }}
      >
        <div className=" bg-white p-6 rounded-xl relative min-w-[400px]">
          <MySkeleton loading={loading} className="w-[100px] h-8">
            <Typography.Text className="text-xl">
              {data?.templateWithUser?.name}
            </Typography.Text>
          </MySkeleton>

          <MySkeleton loading={loading} className="w-[300px] h- mt-2">
            <Typography.Paragraph className="mt-4">
              {config?.description}
            </Typography.Paragraph>
          </MySkeleton>
          <Space className="my-2">
            <MySkeleton loading={loading} className="w-[50px] h-6">
              <Typography.Text type="secondary">
                {data?.templateWithUser.category.name}
              </Typography.Text>
            </MySkeleton>
            <Divider type="vertical" />
            {loading
              ? Array.from(Array(3)).map((_, i) => (
                  <MySkeleton key={i} loading className="w-[50px] h-6" />
                ))
              : data?.templateWithUser.tags?.map((item) => (
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
                ))}
          </Space>
          <div className="flex gap-6">
            <Statistic
              className={styles.statistic}
              title={<Trans>下载次数</Trans>}
              prefix={<DownloadOutlined />}
              value={data?.templateDownloadCount}
            />
            <Statistic
              className={styles.statistic}
              title={<Trans>收藏次数</Trans>}
              prefix={<HeartOutlined />}
              value={data?.templateFavoriteCount}
            />
            <Statistic
              className={styles.statistic}
              title={<Trans>评论次数</Trans>}
              prefix={<CommentOutlined />}
              value={data?.templateCommentCount}
            />
          </div>
          {userId ? (
            favoriteUsers.has(userId) ? (
              <Button
                type="primary"
                danger
                loading={disFavoriteLoading}
                icon={<HeartOutlined />}
                className=" absolute top-[50%] translate-y-[-50%] right-8"
                onClick={() => {
                  disFavorite().then(() => message.success(t`取消收藏成功`));
                }}
              >
                <>
                  <Trans>取消收藏</Trans>
                </>
              </Button>
            ) : (
              <Button
                type="primary"
                loading={favoriteLoading}
                icon={<HeartOutlined />}
                className=" absolute top-[50%] translate-y-[-50%] right-8"
                onClick={() => {
                  favorite().then(() => message.success(t`收藏成功`));
                }}
              >
                <>
                  <Trans>收藏</Trans>
                </>
              </Button>
            )
          ) : (
            <Tooltip title={<Trans>请先登陆</Trans>}>
              <Button
                type="primary"
                icon={<HeartOutlined />}
                disabled
                className=" absolute top-[50%] translate-y-[-50%] right-8"
              >
                <>
                  <Trans>收藏</Trans>
                </>
              </Button>
            </Tooltip>
          )}
        </div>
        <div className="flex gap-4 w-full">
          <div
            style={{
              width: "calc(100% - 296px)",
            }}
          >
            <Tabs items={items} className={styles.tabs} />
            <div className="p-4 border rounded-lg py-6 mt-4 bg-white">
              <Comments id={parseInt(id!)} />
            </div>
          </div>
          <div className="w-[280px] h-[500px] bg-white mt-4 rounded-lg sticky top-4 p-4">
            <h4>
              <Trans>元数据</Trans>
            </h4>
            <MySkeleton loading={loading}>
              <p className="mt-2">
                <Trans>更新于：</Trans>
                {calcRelativeTimeNow(data?.templateWithUser.updateAt ?? "")}
              </p>
            </MySkeleton>
            <MySkeleton loading={loading} className="mt-2">
              <p className="mb-2">
                <Trans>创建于：</Trans>
                {formatTime(data?.templateWithUser.createAt ?? "")}
              </p>
            </MySkeleton>
            <h4>
              <Trans>安装</Trans>
            </h4>
            <p>
              <Trans>在项目目录中运行以下 Cargo 命令</Trans>
            </p>
            <div
              className="p-4 border rounded border-green-400 group hover:bg-white transition my-4 cursor-pointer relative"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `cargo actions init ${id} -i`
                );
                message.success(t`复制成功`);
              }}
            >
              <span className=" group-hover:text-green-400">
                cargo actions init {id} -i
              </span>
              <Tooltip title={<Trans>复制</Trans>}>
                <ClipboardCopy className="h-4 w-4 absolute top-[50%] right-4 translate-y-[-50%] group-hover:text-green-400" />
              </Tooltip>
            </div>

            <h4>
              <Trans>拥有者</Trans>
            </h4>
            <div
              className="flex gap-2 mt-2 cursor-pointer"
              onClick={() => {
                navigate(`/user/${data?.templateWithUser.userId}`);
              }}
            >
              <MySkeleton
                loading={loading}
                className="w-6 h-6 rounded-full mt-0"
              >
                <Avatar size="small" src={data?.templateWithUser.avatarUrl} />
              </MySkeleton>
              <MySkeleton loading={loading} className="w-[80px] mt-0">
                <Typography.Text
                  ellipsis={{
                    tooltip: data?.templateWithUser.username,
                  }}
                >
                  {data?.templateWithUser.username}
                </Typography.Text>
              </MySkeleton>
            </div>
            <h4>
              <Trans>存储库</Trans>
            </h4>
            <MySkeleton loading={loading}>
              {data?.templateWithUser.sourceCodeUrl ? (
                <Space>
                  <GithubOutlined />
                  <Typography.Link
                    href={data?.templateWithUser.sourceCodeUrl!}
                    target="_blank"
                  >
                    Github
                  </Typography.Link>
                </Space>
              ) : (
                <Trans>暂无存储库</Trans>
              )}
            </MySkeleton>
          </div>
        </div>
      </div>
      <Drawer
        title={<Trans>评论</Trans>}
        onClose={() => {
          setDrawerOpen(false);
        }}
        open={drawerOpen}
        width={500}
      >
        <Comments id={parseInt(id!)} />
      </Drawer>
    </>
  );
};
