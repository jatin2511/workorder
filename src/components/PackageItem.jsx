import React from 'react'
import ActivityItem from './ActivityItem';
import { Collapse } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

function PackageItem({
    packageData,
    expanded,
    handleExpandClick,
    expandedActivities,
    expandactivity,
    checkedItems,
    packagecheckboxupdate,
    activitycheckboxupdate,
    workitemcheckboxupdate,
  }) {
    const { name, rate, total, activities } = packageData;
   
    return (
      <div className="mb-2">
        <div className="grid grid-cols-4 items-center justify-items-center gap-4 p-2">
          
          <h6 className="col-span-1 flex items-center gap-2">
          <input type='checkbox'
            checked={checkedItems[name]}
            onChange={() => packagecheckboxupdate(name)}
            className="col-span-1 h-5 w-5"
          />
            {name}</h6>
          <div>{rate}</div>
          <div>{total}</div>
          <div className='text-[#2bddce] cursor-pointer' onClick={() => handleExpandClick(name)}>
            {expanded[name] ? <Remove /> : <Add />}
          </div>
        </div>
        <Collapse in={expanded[name]} timeout="auto" unmountOnExit>
          {activities.map(activity => (
            <ActivityItem
              key={activity.name}
              packageName={name}
              activityData={activity}
              expanded={expandedActivities}
              handleExpandClick={expandactivity}
              checkedItems={checkedItems}
              activitycheckboxupdate={activitycheckboxupdate}
              workitemcheckboxupdate={workitemcheckboxupdate}
            />
          ))}
        </Collapse>
      </div>
    );
  }

export default PackageItem
