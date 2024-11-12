function getUniqueSourcesDestinationsStatusesAndDateRange(assets) {
  const locations = new Set();
  const assignedTo = new Set();
  const statuses = new Set();
  const assetTypes = new Set();
  const departments = new Set();
  const conditions = new Set();
  const warrantyExpiryDates = [];
  const purchaseDates = [];

  assets.forEach(asset => {
    // Collect unique locations
    if (asset.location) locations.add(asset.location);

    // Collect unique assigned_to values
    if (asset.assigned_to) assignedTo.add(asset.assigned_to);

    // Collect unique statuses
    if (asset.status) statuses.add(asset.status);

    // Collect unique asset types
    if (asset.asset_type) assetTypes.add(asset.asset_type);

    // Collect unique departments
    if (asset.department) departments.add(asset.department);

    // Collect unique conditions
    if (asset.condition) conditions.add(asset.condition);

    // Collect all warranty expiry dates
    if (asset.warranty_expiry) warrantyExpiryDates.push(new Date(asset.warranty_expiry));

    // Collect all purchase dates
    if (asset.purchase_date) purchaseDates.push(new Date(asset.purchase_date));
  });

  const purchaseDateRangeStart = new Date(Math.min(...purchaseDates)).toISOString().split('T')[0];
  const purchaseDateRangeEnd = new Date().toISOString().split('T')[0];
  
  const warrantyExpiryRangeEarliest = new Date(Math.min(...warrantyExpiryDates)).toISOString().split('T')[0];
  const warrantyExpiryRangeLatest = new Date(Math.max(...warrantyExpiryDates)).toISOString().split('T')[0];

  return {
    locations: Array.from(locations),
    assignedTo: Array.from(assignedTo),
    statuses: Array.from(statuses),
    assetTypes: Array.from(assetTypes),
    departments: Array.from(departments),
    conditions: Array.from(conditions),
    purchaseDateRangeStart,
    purchaseDateRangeEnd,
    warrantyExpiryRangeEarliest,
    warrantyExpiryRangeLatest
  };
}

// Example usage
return getUniqueSourcesDestinationsStatusesAndDateRange({{state.assets}});
