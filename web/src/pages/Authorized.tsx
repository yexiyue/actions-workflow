import { Trans, t } from "@lingui/macro";
import { App, Button, Spin } from "antd";
import useAxios from "axios-hooks";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { useLingui } from "@lingui/react";
import { useUserStore } from "@/stores/useUserStore";

export const Component = () => {
  useLingui();
  const navigate = useNavigate();
  const [setUser] = useUserStore((store) => [store.setUser]);
  const { message } = App.useApp();
  const [params] = useSearchParams();
  const code = params.get("code");
  const state = params.get("state");
  const [{ data, loading, error }] = useAxios({
    method: "post",
    url: "/api/authorized",
    data: { code, state },
  });

  const [_, send] = useAxios(
    {
      method: "post",
      url: "http://localhost:7743",
      data: data,
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (data) {
      message.success(t`登陆成功`);
      if (data.user) {
        setUser(data.user);
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("id", data.user.id);
      }
      send();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      message.error(t`登陆失败`);
    }
  }, [error]);

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-gradient-to-tr from-red-300 via-blue-400 to-green-300">
      <Spin
        tip={<Trans>授权中...</Trans>}
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
      >
        <div className="border w-[200px] h-[200px] p-4 rounded-lg hover:shadow-lg transition flex flex-col gap-4 justify-center items-center">
          <div className="flex justify-center items-end">
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={() => {
                if (history.length > 2) {
                  navigate(-2);
                } else {
                  navigate("/", { replace: true });
                }
              }}
            >
              <>
                {history.length > 2 ? <Trans>返回</Trans> : <Trans>首页</Trans>}
              </>
            </Button>
          </div>
        </div>
      </Spin>
    </div>
  );
};
