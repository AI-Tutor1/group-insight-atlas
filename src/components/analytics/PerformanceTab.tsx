
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface PerformanceTabProps {
  filters: any;
}

export const PerformanceTab = ({ filters }: PerformanceTabProps) => {
  const scoreDistribution = [
    { range: '0-20', count: 0 },
    { range: '21-40', count: 1 },
    { range: '41-60', count: 3 },
    { range: '61-80', count: 8 },
    { range: '81-100', count: 12 },
  ];

  const subjectBreakdown = [
    { subject: 'Algebra', avgScore: 85.2 },
    { subject: 'Geometry', avgScore: 78.9 },
    { subject: 'Calculus', avgScore: 82.1 },
    { subject: 'Statistics', avgScore: 87.3 },
  ];

  const assessmentTypes = [
    { name: 'Tests', value: 45, color: '#007AFF' },
    { name: 'Quizzes', value: 30, color: '#34C759' },
    { name: 'Study Plans', value: 25, color: '#FF9500' },
  ];

  const studentPerformance = [
    { 
      name: 'Sarah Chen', 
      data: [{ week: 'W1', score: 88 }, { week: 'W2', score: 92 }, { week: 'W3', score: 95 }, { week: 'W4', score: 94 }]
    },
    { 
      name: 'Mike Johnson', 
      data: [{ week: 'W1', score: 75 }, { week: 'W2', score: 78 }, { week: 'W3', score: 82 }, { week: 'W4', score: 85 }]
    },
    { 
      name: 'Emma Davis', 
      data: [{ week: 'W1', score: 82 }, { week: 'W2', score: 85 }, { week: 'W3', score: 88 }, { week: 'W4', score: 87 }]
    },
  ];

  const boxPlotData = [
    { type: 'Tests', min: 45, q1: 68, median: 78, q3: 88, max: 98 },
    { type: 'Quizzes', min: 52, q1: 72, median: 82, q3: 91, max: 100 },
    { type: 'Study Plans', min: 60, q1: 75, median: 85, q3: 92, max: 98 },
  ];

  return (
    <div className="space-y-6">
      {/* Score Distribution and Box Plot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#007AFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Score Range by Assessment Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {boxPlotData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium text-sm">{item.type}</h4>
                  <div className="relative h-8 bg-gray-100 rounded">
                    <div 
                      className="absolute h-full bg-primary/20 rounded"
                      style={{
                        left: `${item.q1}%`,
                        width: `${item.q3 - item.q1}%`
                      }}
                    />
                    <div 
                      className="absolute top-0 h-full w-0.5 bg-primary"
                      style={{ left: `${item.median}%` }}
                    />
                    <div className="absolute top-1/2 transform -translate-y-1/2 text-xs font-medium text-charcoal right-2">
                      {item.median}%
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Min: {item.min}%</span>
                    <span>Max: {item.max}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Breakdown and Assessment Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectBreakdown} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" fontSize={12} domain={[0, 100]} />
                <YAxis type="category" dataKey="subject" stroke="#666" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}%`, 'Average Score']}
                />
                <Bar dataKey="avgScore" fill="#007AFF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Assessment Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assessmentTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {assessmentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {assessmentTypes.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-charcoal">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Student Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h3 font-semibold">Individual Student Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentPerformance.map((student, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-charcoal mb-3">{student.name}</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={student.data}>
                    <XAxis dataKey="week" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#007AFF" 
                      strokeWidth={2}
                      dot={{ fill: '#007AFF', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
