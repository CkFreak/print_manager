import React from "react";
import PropTypes from "prop-types";
import { TableHead } from "./styles";


export const TableHeadRow = ({header}) => {
    const headers = [];

    for (let i = 0; i < header.length; ++i) {
        headers.push(<TableHead key={i * 3}>{header[i]}</TableHead>);
    }

    return (
        <tbody>
            <tr>
             {headers}
            </tr>
        </tbody>
    );
};

TableHeadRow.propTypes = {
    header: PropTypes.array.isRequired,
};
