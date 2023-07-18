import { rest } from "msw";
import { Hierarchy, Role } from "../../states/common/UserState";
import hierarchyTable from "../hierarchy/hierarchyTable";
import roleTable from "../role/roleTable";
import memberTable from "./memberTable";

export type MemberInfo = {
  id: number;
  email: string;
  name: string;
  hierarchy: Hierarchy;
  role: Role;
};

const memberDetailHandler = rest.get(
  "/api/members/:memberId",
  async (req, res, ctx) => {
    const memberId = Number.parseInt(req.params["memberId"] as string);

    const member = memberTable.filter((item) => item.id === memberId)[0];

    const memberInfo: MemberInfo = {
      id: member.id,
      email: member.email,
      name: member.name,
      hierarchy: hierarchyTable.filter(
        (item) => item.id === member.hierarchyId
      )[0].name,
      role: roleTable.filter((item) => item.id === member.roleId)[0].name,
    };

    return res(ctx.status(200), ctx.json({ data: memberInfo }));
  }
);

const memberJoinHandler = rest.post("/api/members", async (req, res, ctx) => {
  const body = await req.json();
  const name = body["name"];
  const phone = body["phone"];
  const email = body["email"];
  const password = body["password"];
  const address = body["address"];

  memberTable.push({
    id: memberTable.length + 1,
    name,
    phone,
    email,
    password,
    address,
    roleId: 1,
    hierarchyId: 1,
  });

  return res(ctx.status(200), ctx.json({ data: null }));
});

const memberHandlers = [memberDetailHandler, memberJoinHandler];

export default memberHandlers;
