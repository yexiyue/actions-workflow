import relativeTime from "dayjs/plugin/relativeTime";
import zh from "dayjs/locale/zh-cn";
import en from "dayjs/locale/en";
import dayjs from "dayjs";
import { useChangeLanguage } from "./useI18nProvider";

const LocaleMap: any = {
  zh,
  en,
};

export const useTime = () => {
  const { local } = useChangeLanguage();
  dayjs.locale(LocaleMap[local]);
  dayjs.extend(relativeTime);

  /**
   * 计算指定时间和当前时间的相对时间
   * @param time 指定时间
   * @param config 配置
   * @returns 相对时间差值的结果
   */
  const calcRelativeTimeNow = (
    time: string | number,
    config?: {
      type?: "fromNow" | "toNow";
      withoutSuffix?: boolean;
    }
  ) => {
    const { type = "fromNow", withoutSuffix = false } = config || {};
    return dayjs(time)[type](withoutSuffix);
  };

  /**
   * 格式化时间
   * @param time 指定时间
   * @param format 格式
   * @param config 配置
   * @returns
   */
  const formatTime = (
    time: string | number,
    format?: string,
    locale: string = local
  ) => {
    return dayjs(time)
      .locale(LocaleMap[locale])
      .format(format || "YYYY-MM-DD HH:mm:ss");
  };

  return {
    formatTime,
    calcRelativeTimeNow,
  };
};
