export const createPineconeIndex = async (
  client,
  indexName,
  vectorDimension
) => {
  console.log(`Checking "${indexName}"...`);
  // Get list of existing indexes
  const existingIndexes = await client.listIndexes();
  // If index doesn't exist, create it
  if (!existingIndexes.includes(indexName)) {
    console.log(`Creating "${indexName}"...`);
    const createClient = await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: vectorDimension,
        metric: "cosine",
      },
    });
    console.log(`Created with client:`, createClient);
    // Wait 60 seconds for index initialization, it usually takes about a minute
    await new Promise((resolve) => setTimeout(resolve, 60000));
  } else {
    console.log(`"${indexName}" already exists.`);
  }
};
