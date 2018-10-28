import React from "react";
import PropTypes from "prop-types";
import { TableData } from "./styles";

export const TableDataRow = ({rowData}) => {
    const rows = [];

    for (let i = 0; i < rowData.length; ++i) {
        rows.push(<TableData key={i * 7}>{rowData[i]}</TableData>);
    }

    return (
        <tbody>
            <tr>
                {rows}
            </tr>
        </tbody>
    )
};

TableDataRow.propTypes = {
    rowData: PropTypes.array.isRequired,
};
