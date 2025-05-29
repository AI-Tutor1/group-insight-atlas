
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

interface EngagementTabProps {
  filters: any;
}

export const EngagementTab = ({ filters }: EngagementTabProps) => {
  const sessionData = [
    { student: 'Sarah Chen', sessions: 45, avgLength: 52 },
    { student: 'Mike Johnson', sessions: 32, avgLength: 38 },
    { student: 'Emma Davis', sessions: 41, avgLength: 47 },
    { student: 'Alex Kim', sessions: 38, avgLength: 43 },
    { student: 'Lisa Wang', sessions: 43, avgLength: 49 },
  ];

  const resourceAccess = [
    { resource: 'Quadratic Equations Guide', views: 127 },
    { resource: 'Practice Problem Set A', views: 98 },
    { resource: 'Formula Reference Sheet', views: 156 },
    { resource: 'Sample Test Questions', views: 89 },
    { resource: 'Video: Solving Systems', views: 76 },
    { resource: 'Interactive Graph Tool', views: 145 },
    { resource: 'Study Tips Document', views: 67 },
    { resource: 'Previous Exam Papers', views: 134 },
  ];

  const studyPlanProgress = [
    { date: '2024-01-01', completed: 3 },
    { date: '2024-01-02', completed: 5 },
    { date: '2024-01-03', completed: 2 },
    { date: '2024-01-04', completed: 4 },
    { date: '2024-01-05', completed: 6 },
    { date: '2024-01-06', completed: 1 },
    { date: '2024-01-07', completed: 0 },
    { date: '2024-01-08', completed: 4 },
    { date: '2024-01-09', completed: 7 },
    { date: '2024-01-10', completed: 3 },
  ];

  const loginFrequency = [
    { student: 'Sarah Chen', logins: 28 },
    { student: 'Mike Johnson', logins: 19 },
    { student: 'Emma Davis', logins: 25 },
    { student: 'Alex Kim', logins: 22 },
    { student: 'Lisa Wang', logins: 26 },
  ];

  const getActivityLevel = (sessions: number) => {
    if (sessions >= 40) return { level: 'High', color: 'bg-green-100 text-green-800' };
    if (sessions >= 30) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'Low', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="space-y-6">
      {/* Session Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Total Sessions by Student</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis type="category" dataKey="student" stroke="#666" fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sessions" fill="#007AFF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Average Session Length</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis type="category" dataKey="student" stroke="#666" fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value} min`, 'Session Length']}
                />
                <Bar dataKey="avgLength" fill="#34C759" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resource Access and Login Frequency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Top Resources Accessed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {resourceAccess.map((resource, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-charcoal flex-1 mr-3">{resource.resource}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {resource.views} views
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Login Frequency (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={loginFrequency}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="student" stroke="#666" fontSize={12} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="logins" fill="#FF9500" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Study Plan Progress and Student Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Study Plan Completion Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-500 mb-2">
                <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {studyPlanProgress.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded text-xs flex items-center justify-center font-medium ${
                      day.completed === 0 ? 'bg-gray-100 text-gray-400' :
                      day.completed <= 2 ? 'bg-red-100 text-red-800' :
                      day.completed <= 4 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    {day.completed}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Less active</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <div className="w-3 h-3 bg-red-100 rounded"></div>
                  <div className="w-3 h-3 bg-yellow-100 rounded"></div>
                  <div className="w-3 h-3 bg-green-100 rounded"></div>
                </div>
                <span>More active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-semibold">Student Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessionData.map((student, index) => {
                const activity = getActivityLevel(student.sessions);
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-charcoal">{student.student}</h4>
                      <div className="text-sm text-gray-600 mt-1">
                        {student.sessions} sessions • {student.avgLength} min avg
                      </div>
                    </div>
                    <Badge className={activity.color}>
                      {activity.level}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
