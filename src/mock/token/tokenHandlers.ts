import { rest } from "msw";
import memberTable from "../member/memberTable";
import tokenTable, { TokenData } from "./tokenTable";

const loginHandler = rest.post("/api/tokens/login", async (req, res, ctx) => {
  const body = await req.json();
  const email = body["email"];
  const password = body["password"];

  const member = memberTable.filter(
    (item) => item.email === email && item.password === password
  )[0];

  if (!member) {
    return res(ctx.status(401), ctx.json(null));
  }

  let idx;
  if (
    (idx = tokenTable.findIndex((item) => item.memberId === member.id)) !== -1
  ) {
    const newToken = tokenTable[idx];

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          ...newToken,
          accessToken: `id=${member.id}`,
        },
      })
    );
  } else {
    const newToken: TokenData = {
      id: tokenTable.length + 1,
      memberId: member.id,
      refreshToken: `TODO`,
    };
    tokenTable.push(newToken);

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          ...newToken,
          accessToken: `id=${member.id}`,
        },
      })
    );
  }
});

const tokenHandlers = [loginHandler];

export default tokenHandlers;
