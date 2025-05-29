
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Users, Clock, Target, AlertTriangle } from "lucide-react";

interface OverviewTabProps {
  filters: any;
}

export const OverviewTab = ({ filters }: OverviewTabProps) => {
  // Mock data
  const kpiData = [
    { title: "Avg. Group Score", value: "82.4%", trend: "+2.3%", isPositive: true, icon: Target },
    { title: "Completion Rate", value: "87.2%", trend: "+5.1%", isPositive: true, icon: TrendingUp },
    { title: "Avg. Time Spent", value: "47 min", trend: "-3.2%", isPositive: false, icon: Clock },
    { title: "Top Performer", value: "Sarah Chen", score: "94.8%", icon: Users },
    { title: "At-Risk Students", value: "3", trend: "-1", isPositive: true, icon: AlertTriangle },
    { title: "Plan Adherence", value: "91.5%", trend: "+1.8%", isPositive: true, icon: TrendingUp },
  ];

  const trendData = [
    { week: 'Week 1', score: 78 },
    { week: 'Week 2', score: 79 },
    { week: 'Week 3', score: 81 },
    { week: 'Week 4', score: 82 },
    { week: 'Week 5', score: 83 },
    { week: 'Week 6', score: 82 },
  ];

  const heatmapData = [
    { topic: 'Algebra', 'Sarah Chen': 95, 'Mike Johnson': 87, 'Emma Davis': 92, 'Alex Kim': 89, 'Lisa Wang': 94 },
    { topic: 'Geometry', 'Sarah Chen': 93, 'Mike Johnson': 78, 'Emma Davis': 85, 'Alex Kim': 91, 'Lisa Wang': 88 },
    { topic: 'Calculus', 'Sarah Chen': 96, 'Mike Johnson': 72, 'Emma Davis': 79, 'Alex Kim': 83, 'Lisa Wang': 90 },
    { topic: 'Statistics', 'Sarah Chen': 89, 'Mike Johnson': 85, 'Emma Davis': 87, 'Alex Kim': 92, 'Lisa Wang': 86 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
              <kpi.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-charcoal">
                {kpi.value}
                {kpi.score && (
                  <span className="text-sm font-normal text-gray-500 ml-2">({kpi.score})</span>
                )}
              </div>
              {kpi.trend && (
                <div className={`flex items-center text-sm ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {kpi.trend} from last period
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trend Line and Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Group Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="week" 
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#007AFF" 
                  strokeWidth={3}
                  dot={{ fill: '#007AFF', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#007AFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic Mastery Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Topic Mastery Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {heatmapData.map((topic, topicIndex) => (
                <div key={topicIndex} className="space-y-2">
                  <h4 className="font-medium text-charcoal">{topic.topic}</h4>
                  <div className="flex space-x-2">
                    {Object.entries(topic).filter(([key]) => key !== 'topic').map(([student, score], studentIndex) => (
                      <div
                        key={studentIndex}
                        className={`flex-1 p-3 rounded-lg text-center text-sm font-medium ${
                          score >= 90 ? 'bg-green-100 text-green-800' :
                          score >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <div className="truncate text-xs mb-1">{student}</div>
                        <div>{score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
