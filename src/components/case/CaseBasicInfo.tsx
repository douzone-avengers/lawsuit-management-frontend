import { fromHierarchy } from "../../lib/convert.ts";
import { Hierarchy } from "../../states/common/UserState.tsx";
import { LawsuitData } from "../../mock/lawsuit/lawsuitTable.ts";

type CaseBasicEmployee = { name: string; hierarchy: Hierarchy };
type CaseBasicClient = { name: string };
export type CaseBasicInfoType = {
  lawsuit: LawsuitData;
  employees: CaseBasicEmployee[];
  clients: CaseBasicClient[];
};

type Props = {
  info: CaseBasicInfoType | null;
};

function CaseBasicInfo({ info }: Props) {
  if (!info) {
    return null;
  }
  const { lawsuit, employees, clients } = info;

  return (
    <div>
      <div>
        <div>lawsuit</div>
        <div>{lawsuit?.name}</div>
        <div>{lawsuit?.lawsuitNum}</div>
        <div>{lawsuit?.lawsuitType}</div>
        <div>{lawsuit?.court}</div>
      </div>
      <div>
        <div>employees</div>
        {employees.map((item) => (
          <div key={item.name}>
            <div>{item.name}</div>
            <div>{fromHierarchy(item.hierarchy)}</div>
          </div>
        ))}
      </div>
      <div>
        <div>clients</div>
        {clients.map((item) => (
          <div key={item.name}>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CaseBasicInfo;
