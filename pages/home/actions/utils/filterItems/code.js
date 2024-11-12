function filterAssets(assets, filters) {
  const {
    locations,
    assignedTo,
    statuses,
    assetTypes,
    warrantyExpiryRangeEarliest,
    warrantyExpiryRangeLatest,
    purchaseDateRangeStart,
    purchaseDateRangeEnd,
    conditions, // Added condition filter
  } = filters;

  return assets.filter(asset => {
    const isLocationMatch = locations.length === 0 || locations.includes(asset.location);
    const isAssignedToMatch = assignedTo.length === 0 || assignedTo.includes(asset.assigned_to);
    const isStatusMatch = statuses.length === 0 || statuses.includes(asset.status);
    const isAssetTypeMatch = assetTypes.length === 0 || assetTypes.includes(asset.asset_type);
    const isConditionMatch = conditions.length === 0 || conditions.includes(asset.condition); // Condition check

    const isWarrantyExpiryMatch =
      (!warrantyExpiryRangeEarliest || new Date(asset.warranty_expiry) >= new Date(warrantyExpiryRangeEarliest)) &&
      (!warrantyExpiryRangeLatest || new Date(asset.warranty_expiry) <= new Date(warrantyExpiryRangeLatest));

    const isPurchaseDateMatch =
      (!purchaseDateRangeStart || new Date(asset.purchase_date) >= new Date(purchaseDateRangeStart)) &&
      (!purchaseDateRangeEnd || new Date(asset.purchase_date) <= new Date(purchaseDateRangeEnd));

    return (
      isLocationMatch &&
      isAssignedToMatch &&
      isStatusMatch &&
      isAssetTypeMatch &&
      isConditionMatch && // Include condition match in the final return
      isWarrantyExpiryMatch &&
      isPurchaseDateMatch
    );
  });
}

return filterAssets({{state.assets}}, {{state.filters}});
