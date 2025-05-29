
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, ChevronUp, Eye, MessageSquare, BookOpen, TrendingUp, Clock, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DrillDownTabProps {
  filters: any;
}

export const DrillDownTab = ({ filters }: DrillDownTabProps) => {
  const [sortConfig, setSortConfig] = useState({ key: 'avgScore', direction: 'desc' });
  const [selectedStudent, setSelectedStudent] = useState(null);

  const studentsData = [
    {
      id: 1,
      name: 'Sarah Chen',
      avgScore: 94.8,
      completion: 96.2,
      timeSpent: 52,
      sessions: 45,
      lastActive: '2 hours ago',
      tags: ['High-achiever', 'Advanced'],
      scoreHistory: [
        { week: 'W1', score: 88 }, { week: 'W2', score: 92 }, { week: 'W3', score: 95 }, { week: 'W4', score: 94 }
      ],
      assignments: [
        { name: 'Quadratic Equations Test', score: 96, date: '2024-01-15', type: 'Test' },
        { name: 'Algebra Quiz', score: 94, date: '2024-01-12', type: 'Quiz' },
        { name: 'Practice Set A', score: 98, date: '2024-01-10', type: 'Practice' },
      ],
      sessionCount: 45,
      avgSatisfaction: 4.8,
      resourcesAccessed: 23
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avgScore: 78.2,
      completion: 82.5,
      timeSpent: 38,
      sessions: 32,
      lastActive: '1 day ago',
      tags: ['Needs support'],
      scoreHistory: [
        { week: 'W1', score: 75 }, { week: 'W2', score: 78 }, { week: 'W3', score: 82 }, { week: 'W4', score: 85 }
      ],
      assignments: [
        { name: 'Quadratic Equations Test', score: 72, date: '2024-01-15', type: 'Test' },
        { name: 'Algebra Quiz', score: 78, date: '2024-01-12', type: 'Quiz' },
        { name: 'Practice Set A', score: 85, date: '2024-01-10', type: 'Practice' },
      ],
      sessionCount: 32,
      avgSatisfaction: 4.2,
      resourcesAccessed: 18
    },
    {
      id: 3,
      name: 'Emma Davis',
      avgScore: 86.7,
      completion: 91.8,
      timeSpent: 47,
      sessions: 41,
      lastActive: '5 hours ago',
      tags: ['High-achiever'],
      scoreHistory: [
        { week: 'W1', score: 82 }, { week: 'W2', score: 85 }, { week: 'W3', score: 88 }, { week: 'W4', score: 87 }
      ],
      assignments: [
        { name: 'Quadratic Equations Test', score: 89, date: '2024-01-15', type: 'Test' },
        { name: 'Algebra Quiz', score: 87, date: '2024-01-12', type: 'Quiz' },
        { name: 'Practice Set A', score: 92, date: '2024-01-10', type: 'Practice' },
      ],
      sessionCount: 41,
      avgSatisfaction: 4.6,
      resourcesAccessed: 21
    },
    {
      id: 4,
      name: 'Alex Kim',
      avgScore: 83.4,
      completion: 88.9,
      timeSpent: 43,
      sessions: 38,
      lastActive: '3 hours ago',
      tags: [],
      scoreHistory: [
        { week: 'W1', score: 80 }, { week: 'W2', score: 83 }, { week: 'W3', score: 85 }, { week: 'W4', score: 84 }
      ],
      assignments: [
        { name: 'Quadratic Equations Test', score: 81, date: '2024-01-15', type: 'Test' },
        { name: 'Algebra Quiz', score: 85, date: '2024-01-12', type: 'Quiz' },
        { name: 'Practice Set A', score: 88, date: '2024-01-10', type: 'Practice' },
      ],
      sessionCount: 38,
      avgSatisfaction: 4.3,
      resourcesAccessed: 19
    },
    {
      id: 5,
      name: 'Lisa Wang',
      avgScore: 90.1,
      completion: 93.4,
      timeSpent: 49,
      sessions: 43,
      lastActive: '1 hour ago',
      tags: ['High-achiever'],
      scoreHistory: [
        { week: 'W1', score: 87 }, { week: 'W2', score: 90 }, { week: 'W3', score: 92 }, { week: 'W4', score: 91 }
      ],
      assignments: [
        { name: 'Quadratic Equations Test', score: 93, date: '2024-01-15', type: 'Test' },
        { name: 'Algebra Quiz', score: 90, date: '2024-01-12', type: 'Quiz' },
        { name: 'Practice Set A', score: 95, date: '2024-01-10', type: 'Practice' },
      ],
      sessionCount: 43,
      avgSatisfaction: 4.7,
      resourcesAccessed: 22
    },
  ];

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = [...studentsData].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ChevronDown className="h-4 w-4 opacity-30" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'High-achiever': return 'bg-green-100 text-green-800';
      case 'At-risk': return 'bg-red-100 text-red-800';
      case 'Needs support': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-h3 font-semibold">Student Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      <SortIcon column="name" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('avgScore')}>
                    <div className="flex items-center space-x-1">
                      <span>Avg. Score</span>
                      <SortIcon column="avgScore" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('completion')}>
                    <div className="flex items-center space-x-1">
                      <span>Completion %</span>
                      <SortIcon column="completion" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('timeSpent')}>
                    <div className="flex items-center space-x-1">
                      <span>Time Spent</span>
                      <SortIcon column="timeSpent" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('sessions')}>
                    <div className="flex items-center space-x-1">
                      <span>Sessions</span>
                      <SortIcon column="sessions" />
                    </div>
                  </TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-md text-sm font-medium ${getScoreColor(student.avgScore)}`}>
                        {student.avgScore}%
                      </span>
                    </TableCell>
                    <TableCell>{student.completion}%</TableCell>
                    <TableCell>{student.timeSpent} min</TableCell>
                    <TableCell>{student.sessions}</TableCell>
                    <TableCell className="text-gray-600">{student.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.tags.map((tag, index) => (
                          <Badge key={index} className={`text-xs ${getTagColor(tag)}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(student)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[600px] sm:w-[800px]">
                          <SheetHeader>
                            <SheetTitle className="text-h2">{student.name}</SheetTitle>
                            <SheetDescription>
                              Detailed student analytics and performance overview
                            </SheetDescription>
                          </SheetHeader>
                          
                          <div className="mt-6 space-y-6">
                            {/* KPI Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Target className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium text-gray-600">Avg Score</span>
                                </div>
                                <div className="text-2xl font-bold text-charcoal">{student.avgScore}%</div>
                              </div>
                              
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <TrendingUp className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium text-gray-600">Completion</span>
                                </div>
                                <div className="text-2xl font-bold text-charcoal">{student.completion}%</div>
                              </div>
                              
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Clock className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium text-gray-600">Sessions</span>
                                </div>
                                <div className="text-2xl font-bold text-charcoal">{student.sessionCount}</div>
                              </div>
                              
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <BookOpen className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium text-gray-600">Resources</span>
                                </div>
                                <div className="text-2xl font-bold text-charcoal">{student.resourcesAccessed}</div>
                              </div>
                            </div>

                            {/* Performance Trend */}
                            <div className="bg-white border rounded-lg p-4">
                              <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
                              <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={student.scoreHistory}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                  <XAxis dataKey="week" stroke="#666" fontSize={12} />
                                  <YAxis stroke="#666" fontSize={12} domain={[0, 100]} />
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: 'white', 
                                      border: '1px solid #e0e0e0',
                                      borderRadius: '8px'
                                    }}
                                  />
                                  <Line 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#007AFF" 
                                    strokeWidth={3}
                                    dot={{ fill: '#007AFF', r: 4 }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>

                            {/* Recent Assignments */}
                            <div className="bg-white border rounded-lg p-4">
                              <h3 className="text-lg font-semibold mb-4">Recent Assignments</h3>
                              <div className="space-y-3">
                                {student.assignments.map((assignment, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                      <h4 className="font-medium text-charcoal">{assignment.name}</h4>
                                      <p className="text-sm text-gray-600">{assignment.date} • {assignment.type}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${getScoreColor(assignment.score)}`}>
                                      {assignment.score}%
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex space-x-3">
                              <Button className="flex-1">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Send Message
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Assign Practice
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
