import { userColumns } from "@users/composites/users-columns";
import UsersDataTable from "@users/composites/users-data-table";
import useUsersTableHandler from "@users/hooks/use-users-table-handler";

import { Fragment, memo } from "react";

export default memo(function UsersTable() {
	const { data: res } = useUsersTableHandler();

	return (
		<Fragment>
			<UsersDataTable
				columns={userColumns as []}
				data={res?.data?.data ?? []}
				meta={res?.data?.meta?.pagination}
				className="mt-4 w-full"
			/>
		</Fragment>
	);
});
