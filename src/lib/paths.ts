import { useRegions } from "@/components/RegionsProvider";
import { pagesPath } from "@/lib/$path";

export const usePaths = () => {
  const { currentChannel, currentLocale: locale } = useRegions();
  return pagesPath._locale(locale);
};

export default usePaths;
