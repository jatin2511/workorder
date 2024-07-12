import React from 'react'



function WorkItem({ id, workItemName, rate, total, checkedItems, workitemcheckboxupdate }){

    return(
    <div className="grid grid-cols-4 items-center justify-items-center gap-4 p-2 mb-1">
      
      <div className="col-span-1 flex items-center gap-2 ">
      <input type='checkbox' 
        checked={checkedItems[id]}
        onChange={() => workitemcheckboxupdate(id)}
        className="col-span-1 h-5"
      />
        {workItemName}</div>
      <div>{rate}</div>
      <div>{total}</div>
    </div>
  )
}
export default WorkItem;

