import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip} from "@nextui-org/react";
import {columns, users} from "@/app/teptData";
import { CheckIcon } from '@nextui-org/shared-icons'

export default function Share() {
    const renderCell = React.useCallback((user: { [x: string]: any; avatar: any; email: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; team: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; status: string | number; }, columnKey: string | number) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{radius: "lg", src: user.avatar}}
                        description={user.email}
                        name={cellValue}
                        // isFocusable={true}
                    >
                        {user.email}
                    </User>
                )
            case 'send':
                return (
                    <Chip
                        variant="faded"
                        color="success"
                        startContent={<CheckIcon />}
                    >
                        send
                    </Chip>
                )
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                <TableColumn key={'name'} align={"start"}>
                    NAME
                </TableColumn>
                <TableColumn key={'send'} align={"end"}>
                    {''}
                </TableColumn>
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
