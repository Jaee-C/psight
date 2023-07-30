import { NextApiRequest, NextApiResponse } from "next";
import userRegister from "@/server/auth/UserAuth";
import { NewUser } from "@/lib/types";
import AppError from "@/server/service/AppError";
import { USER_CREATION_ERROR, USERNAME_TAKEN } from "@/lib/client-data/errors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | undefined>
): Promise<void> {
  const { password, ...user } = req.body;

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
  }

  // Validate if username is already taken
  if (await userRegister.checkUsernameExists(user.username)) {
    const error: AppError = new AppError(
      USERNAME_TAKEN,
      "Username already taken"
    );
    res.statusCode = 409;
    res.end(error.toJSONString());
    return;
  }

  try {
    await userRegister.saveUser(password, createUser(user));
    res.status(200).send("User created");
    return;
  } catch (err) {
    res.statusCode = 500;

    const error: AppError = AppError.generateAppError(err, USER_CREATION_ERROR);
    res.end(error.toJSONString());
    return;
  }
}

function createUser(user: any): NewUser {
  let displayName: string;

  if (user.displayName) displayName = user.displayName;
  else if (user.firstName && user.lastName)
    displayName = `${user.firstName} ${user.lastName}`;
  else displayName = user.username;

  return {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName,
  };
}
