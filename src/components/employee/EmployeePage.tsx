import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function EmployeePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/employees/list`);
  }, []);

  return <div></div>;
}

export default EmployeePage;
