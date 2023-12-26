/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

import VLTabPanel from 'src/components/common/VLTabPanel';
import { useRouter } from 'next/router';
import MonetizationModelsPanel from 'src/components/Panels/MonetizationModelsPanel';

const PlansNewPanel = dynamic(() => import('src/components/Panels/PlansNew'));
const OffersPanel = dynamic(() => import('src/components/Panels/Offers').then(c => c.Offers));

const tabs = [
  {
    key: 'MonetizationModels',
    title: 'Monetization Models',
  },
  {
    key: 'Plans',
    title: 'Plans',
  },
  {
    key: 'Offers',
    title: 'Offers',
  },
];
const ContentModels = () => {
  const { tab } = useRouter().query;

  const [currentTab, setCurrentTab] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const onTabChange = (val) => {
    setSelectedTab(val);
  };

  useEffect(() => {
    setCurrentTab('MonetizationModels');
  }, []);

  return (
    <Box className="contentModel">
      <VLTabPanel tabs={tabs} onTabChange={onTabChange}>
        <Box>
          <MonetizationModelsPanel />
        </Box>
        <Box>
          <PlansNewPanel />
        </Box>
        <Box>
          <OffersPanel />
        </Box>
      </VLTabPanel>
    </Box>
  );
};

export default ContentModels;
