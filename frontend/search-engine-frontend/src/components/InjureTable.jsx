import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import Tabs from '@material-ui/core/Tabs';
import { twitterTabsStylesHook } from '@mui-treasury/styles/tabs';
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

export default function InjureTable(info) {
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
                                <StyledTableCell align="center">俱乐部</StyledTableCell>
                                <StyledTableCell align="center">病因</StyledTableCell>
                                <StyledTableCell align="center">时间</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow>
                                    <StyledTableCell align="center">{row.club}</StyledTableCell>
                                    <StyledTableCell align="center">{row.injury}</StyledTableCell>
                                    <StyledTableCell align="center">{row.period}</StyledTableCell>
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