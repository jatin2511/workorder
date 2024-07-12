import React, { useState } from 'react';
import data from './utils/data.json'
import Overview from './Pages/Overview';
import { Tabs, Tab} from '@mui/material';
import {ArrowBackIos } from '@mui/icons-material';




function App() {
  const [tabname, settabname] = useState('overview');
  const [expandedPackages, setexpandedpackages] = useState({});
  const [expandedActivities, setexpandedactivities] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const changetab = ( newtab) => {
    settabname(newtab);
  };

  const expandpackage = (id) => {
    setexpandedpackages((pre) => ({
      ...pre,
      [id]: !pre[id],
    }));
  };

  const expandactivity = (id) => {
    setexpandedactivities((pre) => ({
      ...pre,
      [id]: !pre[id],
    }));
  };
   
  const allpackagecheckboxupdate = () => {
    const updatedCheckedItems = {};
    const anychecked = Object.values(checkedItems).some(item => item);
  
    data.forEach(pkg => {
      const isChecked = !anychecked;
      updatedCheckedItems[pkg.name] = isChecked;
  
      pkg.activities.forEach(activity => {
        updatedCheckedItems[`${pkg.name}-${activity.name}`] = isChecked;
        activity.works.forEach(workItem => {
          updatedCheckedItems[`${pkg.name}-${activity.name}-${workItem.name}`] = isChecked;
        });
      });
    });
  
    setCheckedItems(updatedCheckedItems);
  };

  const packagecheckboxupdate = (packagename) => {
    const ischecked = !checkedItems[packagename];
    const updatedcheckeditems
   = { ...checkedItems, [packagename]: ischecked };

    const packageData = data.find(pkg => pkg.name === packagename);
    packageData.activities.forEach((activity) => {
      updatedcheckeditems
    [`${packagename}-${activity.name}`] = ischecked;
      activity.works.forEach((workItem) => {
        updatedcheckeditems
      [`${packagename}-${activity.name}-${workItem.name}`] = ischecked;
      });
    });

    setCheckedItems(updatedcheckeditems
    
    );
  };

  const activitycheckboxupdate = (packagename, activityName) => {
    const ischecked = !checkedItems[`${packagename}-${activityName}`];
    const updatedcheckeditems
   = { ...checkedItems, [`${packagename}-${activityName}`]: ischecked };

    const packageData = data.find(pkg => pkg.name === packagename);
    const activityData = packageData.activities.find(act => act.name === activityName);
    activityData.works.forEach((workItem) => {
      updatedcheckeditems
    [`${packagename}-${activityName}-${workItem.name}`] = ischecked;
    });

    setCheckedItems(updatedcheckeditems
    
    );
  };

  const workitemcheckboxupdate = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };
  

  return (
    
    <div className="p-4">
      <div className='flex justify-between items-center p-4'>
        <div className='text-2xl font-semibold flex items-center'>
          <ArrowBackIos/>
          <span className='pt-1'>Create Workorder</span>
        </div>
        <button className='bg-[#2bddce] text-lgs font-medium rounded-lg p-2 px-10 hover:-translate-y-1 '>Save</button>
      </div>
      <div className='text-2xl flex cursor-pointer' >
        
        <div
          className={`${tabname === 'overview' ? 'font-bold ' : ''}`}
          onClick={(e) => changetab('overview')}
        >
          &nbsp;&nbsp;&nbsp;Overview&nbsp;&nbsp;&nbsp;&nbsp;
          <hr className={` ${tabname === 'overview' ? 'border-2 border-black' : ''}`}/>
        
        
        </div>
        <div
          className={`${tabname === 'other' ? 'font-bold ' : ''}`}
          onClick={(e) => changetab('other')}
        >
          &nbsp;&nbsp;&nbsp;Overview&nbsp;&nbsp;&nbsp;&nbsp;
          <hr className={` ${tabname === 'other' ? 'border-2 border-black' : ''}`}/>
        
        
        </div>
      </div>
      {tabname === 'overview' && (
        <Overview
          data={data}
          expandedPackages={expandedPackages}
          expandedActivities={expandedActivities}
          expandpackage={expandpackage}
          expandactivity={expandactivity}
          checkedItems={checkedItems}
          allpackagecheckboxupdate={allpackagecheckboxupdate}
          packagecheckboxupdate={packagecheckboxupdate}
          activitycheckboxupdate={activitycheckboxupdate}
          workitemcheckboxupdate={workitemcheckboxupdate}
        />
      )}
      { tabname === 'other' && <h2 className='m-5'>Hello World!</h2>}
    </div>
  );
}










export default App;
