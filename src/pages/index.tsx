import React from 'react';
import {ProSidebarProvider} from 'react-pro-sidebar';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';

import store from '@/store';
import BaseSidebar from '@/components/Sidebar/BaseSidebar';
import TopNavigation from '@/components/TopNavigation/TopNavigation';
import IssueTable from '@/components/IssueTable/IssueTable';

const queryClient = new QueryClient();

/**
 * Entrypoint page for the application.
 * @constructor
 */
export default function Home() {
  return (
    <Provider store={store}>
      <TopNavigation />
      <ProSidebarProvider>
        <div
          style={{
            display: 'flex',
            height: '95vh',
            minHeight: '400px',
            width: '100%',
          }}
        >
          <BaseSidebar />
          <QueryClientProvider client={queryClient}>
            <div className="p-5 flex-grow">
              <IssueTable />
            </div>
          </QueryClientProvider>
        </div>
      </ProSidebarProvider>
    </Provider>
  );
}
