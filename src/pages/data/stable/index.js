import { fetchWebStabilityList } from '../../../services/dataServices';
import DefaultTable from "../../../components/default-table";

function DataStable() {
    const columns = [];

    return (
        <DefaultTable
            columns={columns}
            request={fetchWebStabilityList}
        >

        </DefaultTable>
    )
}


export default DataStable;