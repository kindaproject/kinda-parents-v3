import React from 'react';

interface Tab {
  id: string | number;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 pt-6">
        <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <a
                className={`nav-link ${tab.id === tabs[0].id ? 'active' : ''}`}
                data-bs-toggle="tab"
                href={`#${tab.id}`}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        <div className="tab-content" id="myTabContent">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab-pane fade ${tab.id === tabs[0].id ? 'show active' : ''}`}
              id={tab.id.toString()}
              role="tabpanel"
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;