import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'green',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function TransferTable(info) {
    let rows = info.data ? info.data : []
    let emptyCaption;
    if(rows.length === 0) {
        emptyCaption = <caption style={{textAlign: 'center'}}>暂无数据</caption>
    }
    else emptyCaption = <div/>

    return (
        <TabContext>
            <TabPanel>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">时间</StyledTableCell>
                                <StyledTableCell align="center">转出俱乐部</StyledTableCell>
                                <StyledTableCell align="center">转入俱乐部</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow>
                                    <StyledTableCell align="center">{row.transferMonth}</StyledTableCell>
                                    <StyledTableCell align="center">{row.inClub}</StyledTableCell>
                                    <StyledTableCell align="center">{row.outClub}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        {emptyCaption}
                    </Table>
                </TableContainer>
            </TabPanel>
        </TabContext>
    );
}