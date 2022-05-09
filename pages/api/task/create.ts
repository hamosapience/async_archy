import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [`127.0.0.1:9092`],
});

const producer = kafka.producer();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  await producer.connect();
  await producer.send({
    topic: "topic-test",
    messages: [{ value: "Hello KafkaJS user!" }],
  });

  await producer.disconnect();

  res.send(JSON.stringify(session, null, 2));
};
