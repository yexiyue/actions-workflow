import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { TemplateCard } from "@/components/TemplateCard";

const query = gql(`
  query Templates {
    templates {
      id
    }
  }
`);

export const Component = () => {
  const { data, loading, error } = useQuery(query);
  console.log(data);
  return (
    <div>
      <>
        {data?.templates?.map((item) => {
          return <TemplateCard key={item.id} id={item.id} />;
        })}
      </>
    </div>
  );
};
