import { useUserStore } from "@/stores/useUserStore";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Menu, MenuProps } from "antd";
import { Boxes, FileBadge, FileHeart, Tag } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router";

export const Component = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user] = useUserStore((store) => [store.user]);
  useLingui();
  const items: MenuProps["items"] = [
    {
      key: "/user-center/mine",
      label: t`我的模版`,
      icon: <FileBadge className="w-4 h-4" />,
    },
    {
      key: "/user-center/favorite",
      label: t`收藏模版`,
      icon: <FileHeart className="w-4 h-4" />,
    },
  ];

  if (user?.id === 72074435) {
    items.push(
      {
        key: "/user-center/admin/category",
        label: t`分类管理`,
        icon: <Boxes className="w-4 h-4" />,
      },
      {
        key: "/user-center/admin/tag",
        label: t`标签管理`,
        icon: <Tag className="w-4 h-4" />,
      }
    );
  }

  return (
    <div className="w-full flex h-full">
      <Menu
        items={items}
        className="h-full bg-white w-[200px] p-2"
        selectedKeys={[pathname]}
        onSelect={(e) => {
          navigate(e.key);
        }}
      />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
