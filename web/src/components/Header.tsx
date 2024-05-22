import { Trans } from "@lingui/macro";
import {
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Languages } from "lucide-react";
import { useChangeLanguage } from "@/hooks/useI18nProvider";
import { useLingui } from "@lingui/react";
import { useUserStore } from "@/stores/useUserStore";

export const Header = () => {
  const navigate = useNavigate();
  useLingui();
  const { toggleLocal } = useChangeLanguage();
  const [user, logout] = useUserStore((store) => [store.user, store.logout]);
  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: <Trans>退出登陆</Trans>,
    },
  ];

  return (
    <div className="h-14  flex justify-between items-center px-8 border-b">
      <p
        className=" text-xl cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Cargo Actions
      </p>
      <div className="flex gap-2 items-center">
        {user && (
          <Button
            type="primary"
            onClick={() => {
              navigate("/user-center");
            }}
          >
            <Trans>个人中心</Trans>
          </Button>
        )}

        <Tooltip title={<Trans>切换语言</Trans>} placement="bottom">
          <Button
            type="text"
            icon={<Languages size={16} />}
            onClick={toggleLocal}
          ></Button>
        </Tooltip>
        {user ? (
          <Space>
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => {
                  if (key === "logout") {
                    logout();
                  }
                },
              }}
              placement="bottom"
            >
              <Avatar className="cursor-pointer" src={user.avatar_url} />
            </Dropdown>
            <Typography.Text>{user.username}</Typography.Text>
          </Space>
        ) : (
          <Tooltip title={<Trans>登陆</Trans>} placement="bottom">
            <Button
              type="text"
              icon={<GithubOutlined />}
              onClick={() => navigate("/login")}
            >
              <>
                <Trans>登陆</Trans>
              </>
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
