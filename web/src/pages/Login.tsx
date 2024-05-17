import { Trans } from "@lingui/macro";
import { App, Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import useAxios from "axios-hooks";
import { useEffect } from "react";

export const Component = () => {
  const { message } = App.useApp();

  const [{ data, loading, error }, login] = useAxios(
    {
      method: "GET",
      url: "/api/login",
    },
    { manual: true }
  );

  useEffect(() => {
    if (data) {
      // 这里得使用open，使用请求会有跨域问题，并且重定向不生效
      window.open(data.url, "_self");
    }
  }, [data]);

  if (error) {
    message.error(error.message);
  }
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-gradient-to-tr from-red-300 via-blue-400 to-green-300">
      <div className="border w-[200px] h-[200px] p-4 rounded-lg hover:shadow-lg transition flex flex-col gap-4 justify-center items-center">
        <p className=" text-center text-xl">
          <Trans>登陆</Trans>
        </p>
        <Button
          icon={<GithubOutlined />}
          type="primary"
          onClick={() => login()}
          loading={loading}
        >
          <>
            <Trans>Github</Trans>
          </>
        </Button>
      </div>
    </div>
  );
};
