export const paginarVetor = <T>(array: T[], pageSize: number, currentPage: number) =>
	array.slice(currentPage * pageSize, (currentPage + 1) * pageSize)