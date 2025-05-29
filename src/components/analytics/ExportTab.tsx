import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, FileSpreadsheet, FileText, Presentation, Mail, Calendar, Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ExportTabProps {
  filters: any;
}

interface Metric {
  id: string;
  label: string;
  category: string;
}

export const ExportTab = ({ filters }: ExportTabProps) => {
  const [selectedMetrics, setSelectedMetrics] = useState([
    'avgScore', 'completion', 'timeSpent', 'sessions'
  ]);
  const [reportName, setReportName] = useState('Group Analytics Report');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');
  const [recipientEmail, setRecipientEmail] = useState('');

  const availableMetrics: Metric[] = [
    { id: 'avgScore', label: 'Average Score', category: 'Performance' },
    { id: 'completion', label: 'Completion Rate', category: 'Performance' },
    { id: 'timeSpent', label: 'Time Spent', category: 'Engagement' },
    { id: 'sessions', label: 'Session Count', category: 'Engagement' },
    { id: 'loginFreq', label: 'Login Frequency', category: 'Engagement' },
    { id: 'resourceAccess', label: 'Resource Access', category: 'Engagement' },
    { id: 'topicMastery', label: 'Topic Mastery', category: 'Performance' },
    { id: 'assessmentScores', label: 'Assessment Scores', category: 'Performance' },
    { id: 'studyPlanProgress', label: 'Study Plan Progress', category: 'Progress' },
    { id: 'lastActive', label: 'Last Active', category: 'Engagement' },
  ];

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const groupedMetrics: Record<string, Metric[]> = availableMetrics.reduce((acc, metric) => {
    if (!acc[metric.category]) {
      acc[metric.category] = [];
    }
    acc[metric.category].push(metric);
    return acc;
  }, {} as Record<string, Metric[]>);

  const exportFormats = [
    { id: 'csv', label: 'CSV', icon: FileSpreadsheet, description: 'Comma-separated values for Excel' },
    { id: 'pdf', label: 'PDF', icon: FileText, description: 'Formatted report document' },
    { id: 'pptx', label: 'PowerPoint', icon: Presentation, description: 'Presentation slides' },
  ];

  const handleExport = (format: string) => {
    // Mock export functionality
    console.log(`Exporting ${selectedMetrics.length} metrics as ${format}`);
    console.log('Selected metrics:', selectedMetrics);
  };

  const handleScheduleReport = () => {
    console.log('Scheduling report:', {
      name: reportName,
      frequency: scheduleFrequency,
      email: recipientEmail,
      metrics: selectedMetrics
    });
  };

  return (
    <div className="space-y-6">
      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h3 font-semibold">Custom Report Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="reportName" className="text-sm font-medium mb-2 block">Report Name</Label>
            <Input
              id="reportName"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-4 block">Select Metrics to Include</Label>
            <div className="space-y-4">
              {Object.entries(groupedMetrics).map(([category, metrics]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-charcoal">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-4">
                    {metrics.map((metric) => (
                      <div key={metric.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={metric.id}
                          checked={selectedMetrics.includes(metric.id)}
                          onCheckedChange={() => handleMetricToggle(metric.id)}
                        />
                        <label htmlFor={metric.id} className="text-sm font-medium leading-none">
                          {metric.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Selected Metrics ({selectedMetrics.length})</Label>
            <div className="flex flex-wrap gap-2">
              {selectedMetrics.map((metricId) => {
                const metric = availableMetrics.find(m => m.id === metricId);
                return (
                  <Badge key={metricId} variant="secondary" className="bg-primary/10 text-primary">
                    {metric?.label}
                    <button
                      onClick={() => handleMetricToggle(metricId)}
                      className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h3 font-semibold">Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exportFormats.map((format) => (
              <div key={format.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                <div className="flex items-center space-x-3 mb-3">
                  <format.icon className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium text-charcoal">{format.label}</h3>
                    <p className="text-sm text-gray-600">{format.description}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleExport(format.id)}
                  className="w-full"
                  disabled={selectedMetrics.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export as {format.label}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h3 font-semibold">Scheduled Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3">
            <Switch
              id="schedule-toggle"
              checked={scheduleEnabled}
              onCheckedChange={setScheduleEnabled}
            />
            <Label htmlFor="schedule-toggle" className="text-sm font-medium">
              Enable automatic report scheduling
            </Label>
          </div>

          {scheduleEnabled && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="frequency" className="text-sm font-medium mb-2 block">Frequency</Label>
                  <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium mb-2 block">Recipient Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="teacher@school.edu"
                  />
                </div>
              </div>

              <Button onClick={handleScheduleReport} className="w-full md:w-auto">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
            </div>
          )}

          {/* Existing Scheduled Reports */}
          <div>
            <h4 className="font-medium text-charcoal mb-3">Active Scheduled Reports</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-charcoal">Weekly Performance Summary</h5>
                  <p className="text-sm text-gray-600">Every Monday at 9:00 AM • teacher@school.edu</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    Delete
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-charcoal">Monthly Engagement Report</h5>
                  <p className="text-sm text-gray-600">First Monday of month • admin@school.edu</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
