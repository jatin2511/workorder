import React, { useState } from 'react';
import data from './utils/data.json';
import Overview from './Pages/Overview';
import { ArrowBackIos } from '@mui/icons-material';

function App() {
  const [tabName, setTabName] = useState('overview');
  const [expandedPackages, setExpandedPackages] = useState({});
  const [expandedActivities, setExpandedActivities] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const changeTab = (newTab) => {
    setTabName(newTab);
  };

  const expandPackage = (id) => {
    setExpandedPackages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandActivity = (id) => {
    setExpandedActivities((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateCheckedItems = (id, isChecked) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
  };

  const allPackageCheckboxUpdate = () => {
    const allChecked = Object.values(checkedItems).every(item => item);
    const newCheckedState = !allChecked;
    const updatedCheckedItems = {};
  
    data.forEach(pkg => {
      updatedCheckedItems[pkg.name] = newCheckedState; 
      pkg.activities.forEach(activity => {
        updatedCheckedItems[`${pkg.name}-${activity.name}`] = newCheckedState; 
        activity.works.forEach(workItem => {
          updatedCheckedItems[`${pkg.name}-${activity.name}-${workItem.name}`] = newCheckedState; 
        });
      });
    });
  
    setCheckedItems(updatedCheckedItems);
  };
  const packageCheckboxUpdate = (packageName) => {
    const isChecked = !checkedItems[packageName];
    const updatedCheckedItems = { ...checkedItems, [packageName]: isChecked };
  
    const packageData = data.find(pkg => pkg.name === packageName);
    packageData.activities.forEach(activity => {
      updatedCheckedItems[`${packageName}-${activity.name}`] = isChecked; 
      activity.works.forEach(workItem => {
        updatedCheckedItems[`${packageName}-${activity.name}-${workItem.name}`] = isChecked; 
      });
    });
  
    setCheckedItems(updatedCheckedItems);
  };
  const activityCheckboxUpdate = (packageName, activityName) => {
    const isChecked = !checkedItems[`${packageName}-${activityName}`];
    const updatedCheckedItems = { ...checkedItems, [`${packageName}-${activityName}`]: isChecked };
  
    const packageData = data.find(pkg => pkg.name === packageName);
    const activityData = packageData.activities.find(act => act.name === activityName);
  
    activityData.works.forEach(workItem => {
      updatedCheckedItems[`${packageName}-${activityName}-${workItem.name}`] = isChecked;
    });
  
    
    const allActivitiesChecked = packageData.activities.every(act => updatedCheckedItems[`${packageName}-${act.name}`]);
    updatedCheckedItems[packageName] = allActivitiesChecked;
  
    setCheckedItems(updatedCheckedItems);
  };

  const workItemCheckboxUpdate = (id) => {
    const isChecked = !checkedItems[id];
    const updatedCheckedItems = { ...checkedItems, [id]: isChecked };
  
    const [packageName, activityName] = id.split('-').slice(0, 2);
    const packageData = data.find(pkg => pkg.name === packageName);
    const activityData = packageData.activities.find(act => act.name === activityName);
  
    
    const allWorkItemsChecked = activityData.works.every(item => updatedCheckedItems[`${packageName}-${activityName}-${item.name}`]);
    updatedCheckedItems[`${packageName}-${activityName}`] = allWorkItemsChecked;
  
  
    const allActivitiesChecked = packageData.activities.every(act => updatedCheckedItems[`${packageName}-${act.name}`]);
    updatedCheckedItems[packageName] = allActivitiesChecked;
  
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="p-4">
      <div className='flex justify-between items-center p-4'>
        <div className='text-2xl font-semibold flex items-center'>
          <ArrowBackIos />
          <span className='pt-1'>Create Workorder</span>
        </div>
        <button className='bg-[#2bddce] text-lg font-medium rounded-lg p-2 px-10 hover:-translate-y-1'>Save</button>
      </div>
      <div className='text-2xl flex cursor-pointer'>
        <div
          className={`${tabName === 'overview' ? 'font-bold' : ''}`}
          onClick={() => changeTab('overview')}
        >
          &nbsp;&nbsp;&nbsp;Overview&nbsp;&nbsp;&nbsp;&nbsp;
          <hr className={`${tabName === 'overview' ? 'border-2 border-black' : ''}`} />
        </div>
        <div
          className={`${tabName === 'other' ? 'font-bold' : ''}`}
          onClick={() => changeTab('other')}
        >
          &nbsp;&nbsp;&nbsp;Other&nbsp;&nbsp;&nbsp;&nbsp;
          <hr className={`${tabName === 'other' ? 'border-2 border-black' : ''}`} />
        </div>
      </div>
      {tabName === 'overview' && (
        <Overview
          data={data}
          expandedPackages={expandedPackages}
          expandedActivities={expandedActivities}
          expandPackage={expandPackage}
          expandActivity={expandActivity}
          checkedItems={checkedItems}
          allPackageCheckboxUpdate={allPackageCheckboxUpdate}
          packageCheckboxUpdate={packageCheckboxUpdate}
          activityCheckboxUpdate={activityCheckboxUpdate}
          workItemCheckboxUpdate={workItemCheckboxUpdate}
        />
      )}
      {tabName === 'other' && <h2 className='m-5'>Hello World!</h2>}
    </div>
  );
}

export default App;