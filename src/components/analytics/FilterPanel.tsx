
import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterPanelProps {
  isOpen: boolean;
  filters: any;
  setFilters: (filters: any) => void;
}

export const FilterPanel = ({ isOpen, filters, setFilters }: FilterPanelProps) => {
  const [openSections, setOpenSections] = useState({
    subjects: true,
    performance: true,
    engagement: true,
    tags: true,
  });

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English"];
  const grades = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];
  const assignmentTypes = ["Test", "Quiz", "Study Plan", "Practice"];
  const studentTags = ["At-risk", "High-achiever", "Needs support", "Advanced"];

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (category: string, value: any) => {
    setFilters({ ...filters, [category]: value });
  };

  const clearAllFilters = () => {
    setFilters({
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
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto z-40">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h3 font-semibold text-charcoal">Filters</h2>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-primary">
            Clear All
          </Button>
        </div>

        <div className="space-y-6">
          {/* Subjects Filter */}
          <Collapsible open={openSections.subjects} onOpenChange={() => toggleSection("subjects")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="font-medium text-charcoal">Subjects</span>
              {openSections.subjects ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject}
                    checked={filters.subjects.includes(subject)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleFilterChange("subjects", [...filters.subjects, subject]);
                      } else {
                        handleFilterChange("subjects", filters.subjects.filter((s: string) => s !== subject));
                      }
                    }}
                  />
                  <label htmlFor={subject} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {subject}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Grades Filter */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="font-medium text-charcoal">Grades</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {grades.map((grade) => (
                <div key={grade} className="flex items-center space-x-2">
                  <Checkbox
                    id={grade}
                    checked={filters.grades.includes(grade)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleFilterChange("grades", [...filters.grades, grade]);
                      } else {
                        handleFilterChange("grades", filters.grades.filter((g: string) => g !== grade));
                      }
                    }}
                  />
                  <label htmlFor={grade} className="text-sm font-medium leading-none">
                    {grade}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Performance Range */}
          <Collapsible open={openSections.performance} onOpenChange={() => toggleSection("performance")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="font-medium text-charcoal">Performance Range</span>
              {openSections.performance ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filters.performanceRange[0]}%</span>
                  <span>{filters.performanceRange[1]}%</span>
                </div>
                <Slider
                  value={filters.performanceRange}
                  onValueChange={(value) => handleFilterChange("performanceRange", value)}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Student Tags */}
          <Collapsible open={openSections.tags} onOpenChange={() => toggleSection("tags")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="font-medium text-charcoal">Student Tags</span>
              {openSections.tags ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {studentTags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag}
                    checked={filters.studentTags.includes(tag)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleFilterChange("studentTags", [...filters.studentTags, tag]);
                      } else {
                        handleFilterChange("studentTags", filters.studentTags.filter((t: string) => t !== tag));
                      }
                    }}
                  />
                  <label htmlFor={tag} className="text-sm font-medium leading-none">
                    {tag}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Active Filters */}
        {(filters.subjects.length > 0 || filters.grades.length > 0 || filters.studentTags.length > 0) && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-charcoal mb-3">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {[...filters.subjects, ...filters.grades, ...filters.studentTags].map((filter, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                  {filter}
                  <button
                    onClick={() => {
                      // Remove filter logic here
                    }}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
