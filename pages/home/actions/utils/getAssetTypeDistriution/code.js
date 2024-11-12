function calculateAssetTypeProportion(assets) {
  const typeCounts = {};

  assets.forEach((asset) => {
    if (typeCounts[asset.asset_type]) {
      typeCounts[asset.asset_type]++;
    } else {
      typeCounts[asset.asset_type] = 1;
    }
  });

  // Sort by count and get the top 4 types
  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const topTypes = sortedTypes.slice(0, 4);
  const topCounts = Object.fromEntries(topTypes);

  // Calculate the "Other" category
  const otherCount = sortedTypes.slice(4).reduce((acc, curr) => acc + curr[1], 0);

  // Prepare the result
  const result = Object.entries(topCounts).map(([name, value]) => ({ name, value }));

  if (otherCount > 0) {
    result.push({ name: 'Other', value: otherCount });
  }

  return result;
}

return calculateAssetTypeProportion({{state.filteredAssets}});