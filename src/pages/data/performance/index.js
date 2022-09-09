import {fetchNetworkStabilityList} from '../../../services/dataServices';
import DefaultTable from "../../../components/default-table";

function DataPerformance() {
    const columns = [];

    return (
        <DefaultTable
            columns={columns}
            request={fetchNetworkStabilityList}
        >

        </DefaultTable>
    )
}


export default DataPerformance;