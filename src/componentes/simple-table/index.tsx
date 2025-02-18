import { ChangeEvent, FC, ReactNode } from 'react'
import { Table as MuiTable, Paper, TableBody } from '@mui/material'
import {
	EmptyTableTitle,
	TableCellBody,
	TableCellHead,
	TableHead,
	TablePagination,
	TableRowBody,
	TableRowHead,
} from './styles'
import { usarParametrosdePaginacao } from '../../hooks/params/pagination'

export interface Column {
	field: string
	headerName: string
}

interface TableProps {
	columns: Column[]
	data: Record<string, any>[]
	totalRows: number
	renderData: (row: Record<string, any>, columns: Column[]) => ReactNode
}

const Tabela: FC<TableProps> = ({ columns, data, totalRows, renderData }) => {
	const { page, pageSize, changePage, changePageSize } = usarParametrosdePaginacao()
	const rowsPerPageOptions = [5, 10, 15, 20]
	const isNextPageDisabled = totalRows <= (page + 1) * pageSize

	const handlePageChange = (_: unknown, newPage: number) => {
		changePage(newPage)
	}

	const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
		changePageSize(Number.parseInt(event.target.value, 10))
	}

	return (
		<Paper elevation={0}>
			<MuiTable>
				<TableHead>
					<TableRowHead>
						{columns.map((column) => (
							<TableCellHead key={column.field}>{column.headerName}</TableCellHead>
						))}
					</TableRowHead>
				</TableHead>
				<TableBody>
					{data.length === 0 ? (
						<TableRowBody>
							<TableCellBody colSpan={columns.length}>
								<EmptyTableTitle>Não foi possível encontrar nenhum registro</EmptyTableTitle>
							</TableCellBody>
						</TableRowBody>
					) : (
						data.map((row) => renderData(row, columns))
					)}
				</TableBody>
			</MuiTable>
			<TablePagination
				component="div"
				count={totalRows}
				rowsPerPage={pageSize}
				page={page}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
				rowsPerPageOptions={rowsPerPageOptions}
				labelRowsPerPage="Linhas por página:"
				labelDisplayedRows={({ from, to, count }) => `${from} a ${to} de ${count}`}
				nextIconButtonProps={{ disabled: isNextPageDisabled }}
			/>
		</Paper>
	)
}

export default Tabela
