import React from 'react'
import PackageItem from '../components/PackageItem';

function Overview({
    data,
    expandedPackages,
    expandedActivities,
    expandpackage,
    expandactivity,
    checkedItems,
    allpackagecheckboxupdate,
    packagecheckboxupdate,
    activitycheckboxupdate,
    workitemcheckboxupdate,
}) {

    return (
        <div>
            <div className="mt-4">
                <div className="grid grid-cols-4 items-center justify-items-center  gap-4 bg-blue-100 p-2 rounded">
                    <h6 className="col-span-1  flex gap-2">
                        <input
                            type='checkbox'
                            checked={Object.keys(checkedItems).length > 0 && Object.values(checkedItems).every(item => item)}
                            onChange={() => allpackagecheckboxupdate()}
                            className="col-span-1 h-5 w-5"
                        />
                        Packages</h6>
                    <h6>Rate (in sqft)</h6>
                    <h6>Total</h6>

                </div>
                {data.map(pkg => (
                    <PackageItem
                        key={pkg.name}
                        packageData={pkg}
                        expanded={expandedPackages}
                        handleExpandClick={expandpackage}
                        expandedActivities={expandedActivities}
                        expandactivity={expandactivity}
                        checkedItems={checkedItems}
                        packagecheckboxupdate={packagecheckboxupdate}
                        activitycheckboxupdate={activitycheckboxupdate}
                        workitemcheckboxupdate={workitemcheckboxupdate}
                    />
                ))}
            </div>
        </div>
    )
}
export default Overview;