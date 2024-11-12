function calculateDepartmentDistribution(assets) {
  const departmentCounts = assets.reduce((acc, asset) => {
    const department = asset.department || 'Unassigned';
    acc[department] = (acc[department] || 0) + 1;
    return acc;
  }, {});

  const sortedDepartments = Object.keys(departmentCounts)
    .map((department) => ({ name: department, value: departmentCounts[department] }))
    .sort((a, b) => b.value - a.value);

  const topDepartments = sortedDepartments.slice(0, 4);
  const otherCount = sortedDepartments.slice(4).reduce((acc, item) => acc + item.value, 0);

  if (otherCount > 0) {
    topDepartments.push({ name: 'Other', value: otherCount });
  }

  return topDepartments;
}

return  calculateDepartmentDistribution({{state.filteredAssets}});
