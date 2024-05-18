import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";

const query = gql(`
  query Templates {
    templates {
      id
      name
      categoryId
      createAt
      sourceCodeUrl
    }
  }
`);

export const Component = () => {
  const { data, loading, error } = useQuery(query);
  console.log(data?.templates[0]);
  return <div className="text-3xl font-bold underline">hello</div>;
};
