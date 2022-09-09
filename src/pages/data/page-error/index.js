import DefaultTable from "../../../components/default-table";
import {fetchWebErrorList} from "../../../services/dataServices";

function PageError() {
    const columns = [];

    return (
        <DefaultTable
            columns={columns}
            request={fetchWebErrorList}
        >

        </DefaultTable>
    )
}

export default PageError;