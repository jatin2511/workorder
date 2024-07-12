import React from 'react';
import WorkItem from './WorkItem';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function ActivityItem({
    packageName,
    activityData,
    expanded,
    handleExpandClick,
    checkedItems,
    activitycheckboxupdate,
    workitemcheckboxupdate,
  }){
    const { name, rate, Total, works } = activityData;
    const id = `${packageName}-${name}`;
    return (
      <div className="ml-4 pb-2 border-l-2">
        <div className="grid grid-cols-4 items-center justify-items-center gap-4 p-2">
           
          <h6 className="col-span-1 flex gap-2 items-center">
          <input type='checkbox'
            checked={checkedItems[id]}
            onChange={() => activitycheckboxupdate(packageName, name)}
            className="col-span-1 h-5"
          />
            {name}</h6>
          <div>{rate}</div>
          <div>{Total}</div>
          <div className='text-[#2bddce] cursor-pointer' onClick={() => handleExpandClick(id)}>
            {expanded[id] ? <ExpandLess /> : <ExpandMore />}
          </div>
        </div>
        <Collapse in={expanded[id]} timeout="auto" unmountOnExit>
          <div className="ml-4 border-l-2 cursor-pointer">
            {works.map(workItem => (
              <WorkItem
                key={workItem.name}
                id={`${id}-${workItem.name}`}
                workItemName={workItem.name}
                rate={rate}
                total={workItem.Total}
                checkedItems={checkedItems}
                workitemcheckboxupdate={workitemcheckboxupdate}
              />
            ))}
          </div>
        </Collapse>
      </div>
    );
  }

export default ActivityItem;