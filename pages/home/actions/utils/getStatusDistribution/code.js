function calculateAssetStatusDistribution(assets) {
    const statusCounts = {
        "In Use": 0,
        "Available": 0,
        "Under Maintenance": 0,
        "Decommissioned": 0
    };

    assets.forEach(asset => {
        if (statusCounts[asset.status] !== undefined) {
            statusCounts[asset.status]++;
        }
    });

    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
}


return calculateAssetStatusDistribution({{state.filteredAssets}})