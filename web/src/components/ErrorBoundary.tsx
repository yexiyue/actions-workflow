import { Trans } from "@lingui/macro";
import { Button, Result } from "antd";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

export const ErrorBoundary = (props: any) => {
  console.log("props", props);
  const error: any = useRouteError();
  const navigate = useNavigate();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Result
          status="error"
          title={`${error.status} ${error.statusText}`}
          subTitle={
            error.status === 404 ? (
              <Trans>未找到该页面</Trans>
            ) : (
              <Trans>未知错误</Trans>
            )
          }
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                navigate("/");
              }}
            >
              <Trans>返回首页</Trans>
            </Button>,
          ]}
        ></Result>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Result
          status="error"
          title={<Trans>未知错误</Trans>}
          subTitle={error.message}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                navigate("/");
              }}
            >
              <Trans>返回首页</Trans>
            </Button>,
          ]}
        ></Result>
      </div>
    );
  }
};
