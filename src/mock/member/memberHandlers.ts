import { rest } from "msw";
import { Hierarchy, Role } from "../../states/common/IsLoginState";
import hierarchyTable from "../hierarchy/hierarchyTable";
import roleTable from "../role/roleTable";
import memberTable, { MemberData } from "./memberTable";

export type MemberInfo = {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  hierarchy: Hierarchy;
  role: Role;
};

const toMemberInfo = function (member: MemberData) {
  const memberInfo: MemberInfo = {
    id: member.id,
    email: member.email,
    name: member.name,
    phone: member.phone,
    address: member.address,
    hierarchy: hierarchyTable.filter(
      (item) => item.id === member.hierarchyId,
    )[0].name,
    role: roleTable.filter((item) => item.id === member.roleId)[0].name,
  };
  return memberInfo;
};

const membersHandler = rest.get("/api/members", async (req, res, ctx) => {
  let memberInfoList = memberTable.map((memberData) =>
    toMemberInfo(memberData),
  );

  const roleParam = req.url.searchParams.get("role");
  if (roleParam) {
    const roles = roleParam.split(",");
    memberInfoList = memberInfoList.filter((member) =>
      roles.includes(member.role),
    );
  }
  return res(ctx.status(200), ctx.json({ data: memberInfoList }));
});

const memberDetailHandler = rest.get(
  "/api/members/:memberId",
  async (req, res, ctx) => {
    const memberId = Number.parseInt(req.params["memberId"] as string);

    const member = memberTable.filter((item) => item.id === memberId)[0];

    return res(ctx.status(200), ctx.json({ data: toMemberInfo(member) }));
  },
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

const memberHandlers = [memberDetailHandler, memberJoinHandler, membersHandler];

export default memberHandlers;
