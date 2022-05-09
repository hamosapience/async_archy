import React from "react";
import { useSession } from "next-auth/react";
import AccessDenied from "components/AccessDenied";

const TaskList = () => {
  const { data: session, status } = useSession();

  console.log(session, status);

  // When rendering client side don't display anything until loading is complete
  if (status === "loading") return null;

  if (!session) {
    return <AccessDenied />;
  }

  return <div>TASK LIST</div>;
};

export default TaskList;
