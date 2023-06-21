import * as dotenv from "dotenv";
dotenv.config();
import { PineconeClient } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { createPineconeIndex } from "./createPineconeIndex.js";
import { updatePinecone } from "./updatePinecone.js";
import { queryPineconeVectorStoreAndQueryLLM } from "./queryPineconeAndQueryGPT.js";

const loader = new DirectoryLoader("src/documents", {
  ".txt": (path) => new TextLoader(path),
  ".pdf": (path) => new PDFLoader(path),
});
const docs = await loader.load();
const indexName = "blue-tarf";
const vectorDimension = 1536;

const initializePineClient = async () => {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  }).catch(console.error);
  return client;
};

export const teachGpt = async () => {
  const client = await initializePineClient();
  // Check if Pinecone index exists and create if necessary
  await createPineconeIndex(client, indexName, vectorDimension);
  // Update Pinecone vector store with document embeddings
  await updatePinecone(client, indexName, docs);
  // const question = `What can be a single line description for use case "When a message is posted in a channel, send an event"?`;
};

export const askQuestion = async (q) => {
  const client = await initializePineClient();
  // Query Pinecone vector store and GPT model for an answer
  return queryPineconeVectorStoreAndQueryLLM(client, indexName, q)
}
