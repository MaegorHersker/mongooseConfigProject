export const dateFormatter = (date: string) => {
	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
	const day = parseInt(dateObj.getDate().toString().padStart(2, "0")) + 1;
	return `${year}-${month}-${day}`;
};