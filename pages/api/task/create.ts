import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "task-app",
  brokers: [`127.0.0.1:9092`],
});

const producer = kafka.producer();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  await producer.connect();

  const beValue = JSON.stringify({
    event: "taskAdded",
    taskId: "1234",
  });

  const cudValue = JSON.stringify({
    event: "taskRecordCreated",
    taskId: "1234",
  });

  await producer.send({
    topic: "topic-task",
    messages: [{ value: beValue }, { value: cudValue }],
  });

  await producer.disconnect();

  res.send(JSON.stringify(session, null, 2));
};
