import DefaultTable from "../../../components/default-table";
import {fetchNetworkErrorList} from "../../../services/dataServices";

function InterfaceError() {
    const columns = [];

    return (
        <DefaultTable
            columns={columns}
            request={fetchNetworkErrorList}
        >

        </DefaultTable>
    )
}

export default InterfaceError;