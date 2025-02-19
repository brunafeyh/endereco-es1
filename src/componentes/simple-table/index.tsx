import { ChangeEvent, FC, ReactNode } from 'react'
import { CircularProgress, Table as MuiTable, Paper, TableBody } from '@mui/material'
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
import { UNIOESTE_COLORS } from '../../temas/cores'

export interface Column {
	field: string
	headerName: string
}

interface TableProps {
	columns: Column[]
	data: Record<string, any>[]
	totalRows: number
	renderData: (row: Record<string, any>, columns: Column[]) => ReactNode
	error?: Error | null
	isLoading?: boolean
}

const Tabela: FC<TableProps> = ({ columns, data, totalRows, renderData, error, isLoading }) => {
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

					{data.length === 0 || error ? (
						<TableRowBody>
							<TableCellBody colSpan={columns.length}>
								{isLoading ? (
									<CircularProgress sx={{ color: UNIOESTE_COLORS.primary.p60 }} />
								) : <EmptyTableTitle>{error ? 'Erro ao receber registrs' : 'Não foi possível encontrar nenhum registro'}</EmptyTableTitle>}

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
