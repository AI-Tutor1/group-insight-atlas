
import { useState } from "react";
import { HeaderBar } from "@/components/analytics/HeaderBar";
import { FilterPanel } from "@/components/analytics/FilterPanel";
import { OverviewTab } from "@/components/analytics/OverviewTab";
import { PerformanceTab } from "@/components/analytics/PerformanceTab";
import { EngagementTab } from "@/components/analytics/EngagementTab";
import { DrillDownTab } from "@/components/analytics/DrillDownTab";
import { ExportTab } from "@/components/analytics/ExportTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState({
    subjects: [],
    grades: [],
    assignmentTypes: [],
    topics: [],
    curriculum: [],
    studentTags: [],
    performanceRange: [0, 100],
    engagementLevel: [0, 100],
    dateRange: "30days"
  });

  return (
    <div className="min-h-screen bg-white text-charcoal font-sans">
      <HeaderBar 
        onToggleFilters={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
        isFilterPanelOpen={isFilterPanelOpen}
        filters={filters}
        setFilters={setFilters}
      />
      
      <div className="flex w-full">
        <FilterPanel 
          isOpen={isFilterPanelOpen}
          filters={filters}
          setFilters={setFilters}
        />
        
        <main className={`flex-1 transition-all duration-300 ${isFilterPanelOpen ? 'ml-80' : 'ml-0'} p-6`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-gray-50 p-1 rounded-lg">
              <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="text-sm font-medium">Performance Metrics</TabsTrigger>
              <TabsTrigger value="engagement" className="text-sm font-medium">Engagement & Activity</TabsTrigger>
              <TabsTrigger value="drilldown" className="text-sm font-medium">Drill-Downs</TabsTrigger>
              <TabsTrigger value="export" className="text-sm font-medium">Export & Reporting</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="animate-fade-in">
              <OverviewTab filters={filters} />
            </TabsContent>

            <TabsContent value="performance" className="animate-fade-in">
              <PerformanceTab filters={filters} />
            </TabsContent>

            <TabsContent value="engagement" className="animate-fade-in">
              <EngagementTab filters={filters} />
            </TabsContent>

            <TabsContent value="drilldown" className="animate-fade-in">
              <DrillDownTab filters={filters} />
            </TabsContent>

            <TabsContent value="export" className="animate-fade-in">
              <ExportTab filters={filters} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
