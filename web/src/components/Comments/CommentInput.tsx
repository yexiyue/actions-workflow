import { useUserStore } from "@/stores/useUserStore";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Avatar, Button, Input, Space, Tooltip } from "antd";
import { useControllableValue } from "ahooks";
import { useNavigate } from "react-router";
const { TextArea } = Input;

type CommentInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, userId: number) => void;
  disabled?: boolean;
};

export const CommentInput = (props: CommentInputProps) => {
  const [user] = useUserStore((store) => [store.user]);
  const [value, setValue] = useControllableValue<string>(props);
  const navigate = useNavigate();
  useLingui();

  return (
    <div className="flex gap-2">
      <Avatar src={user?.avatar_url} />
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <TextArea
          placeholder={t`请输入评论`}
          showCount
          maxLength={300}
          disabled={!user || props.disabled}
          style={{ height: 100, resize: "none" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Space>
          <Tooltip title={user ? t`添加评论` : t`请先登陆`}>
            <Button
              type="primary"
              disabled={!user || props.disabled}
              onClick={() => {
                props.onSubmit?.(value, user?.id!);
                setValue("");
              }}
            >
              <Trans>添加评论</Trans>
            </Button>
          </Tooltip>
          {!user && (
            <Button
              type="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              <Trans>登陆</Trans>
            </Button>
          )}
        </Space>
      </Space>
    </div>
  );
};
