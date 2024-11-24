export default async function useGraphqlQuery({
  query,
  variables = {},
}: {
  query: any;
  variables?: Record<string, any>;
}) {
  // a unique key to ensure that data fetching can be properly de-duplicated across requests,
  const key = JSON.stringify({
    query,
    variables,
  });

  const runtimeConfig = useRuntimeConfig();

  // perform the GraphQL request to the DatoCMS Content Delivery API
  return useFetch('https://graphql.datocms.com', {
    key,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${runtimeConfig.public.datocms.apiToken}`,
      'Content-Type': 'application/json', // Ensure the content type is set correctly
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    transform: ({ data, errors }) => {
      if (errors) {
        console.log('errors', errors);

        throw new Error(errors); // Fix error handling syntax
      }
      return data;
    },
  });

  // const fetchedData = await fetch(fullEndpoint, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify({
  //     query,
  //     variables,
  //   }),
  // }).then((response) => response.json());

  // if ('errors' in fetchedData) {
  //   throw JSON.stringify(fetchedData.errors);
  // }

  // if ('data' in fetchedData) {
  //   data.value = fetchedData.data;
  // }

  // return { data };
}
