export const handleSelectedRows = (id, selectedRows, setSelectedRows) => {
  const selectedIndex = selectedRows.indexOf(id);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedRows, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selectedRows.slice(1));
  } else if (selectedIndex === selectedRows.length - 1) {
    newSelected = newSelected.concat(selectedRows.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selectedRows.slice(0, selectedIndex),
      selectedRows.slice(selectedIndex + 1),
    );
  }

  setSelectedRows(newSelected);
};
