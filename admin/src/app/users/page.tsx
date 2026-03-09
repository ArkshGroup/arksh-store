import Wrapper from "@/layout/wrapper";
import UserTable from "../components/users/user-table";

export default function UsersPage() {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <div className="flex justify-between items-end flex-wrap">
          <div className="page-title mb-7">
            <h3 className="mb-0 text-4xl">Customers</h3>
            <p className="text-textBody m-0">All registered customers</p>
          </div>
        </div>

        <UserTable />
      </div>
    </Wrapper>
  );
}

