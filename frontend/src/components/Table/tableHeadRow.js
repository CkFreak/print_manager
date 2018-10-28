import React from "react";
import { Table, TableHead, TableData } from "./styles";


export const TableHeadRow= ({header}) => {
    const headers = [];

    for (let i = 0; i < header.length; ++i) {
        headers.push(<TableHead>{header[i]}</TableHead>);
    }

    return (
        <tr>
            {headers}
        </tr>
    );
};
