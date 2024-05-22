import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";

const query = gql(`
  query MyTemplates{
    templatesByUser{
      total
      allCount
      templates{
        id
        isPublic
        name
      }
    }
  }
`);
export const Component = () => {
  const { data } = useQuery(query);
  console.log(data);
  return <div>个人中心</div>;
};
