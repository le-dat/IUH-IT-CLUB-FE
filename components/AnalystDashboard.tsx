"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  Download,
  FileText,
  Users,
  Trophy,
  TrendingUp,
  FileSpreadsheet,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const analysts = [
  {
    id: 1,
    name: "Sarah Chen",
    achievements: 89,
    projectsCompleted: 34,
    accuracy: 96,
    teamSize: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    achievements: 75,
    projectsCompleted: 28,
    accuracy: 94,
    teamSize: 4,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Emily Thompson",
    achievements: 92,
    projectsCompleted: 41,
    accuracy: 98,
    teamSize: 6,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
  },
];

export default function AnalystDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const exportToExcel = () => {
    // In a real application, implement Excel export functionality
    console.log("Exporting to Excel...");
  };

  const exportToWord = () => {
    // In a real application, implement Word export functionality
    console.log("Exporting to Word...");
  };

  const handleJoinTeam = (analystId: number) => {
    // In a real application, implement team joining logic
    console.log("Joining team:", analystId);
  };

  const filteredAnalysts = analysts.filter((analyst) =>
    analyst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Analyst Achievements</h1>
            <p className="text-muted-foreground mt-2">
              Track performance metrics and join top-performing analyst teams
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportToExcel} className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Export Excel
            </Button>
            <Button variant="outline" onClick={exportToWord} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export Word
            </Button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Achievements</p>
              <h3 className="text-2xl font-bold">256</h3>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Teams</p>
              <h3 className="text-2xl font-bold">15</h3>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Performance</p>
              <h3 className="text-2xl font-bold">94%</h3>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Growth Rate</p>
              <h3 className="text-2xl font-bold">+23%</h3>
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center gap-4">
          <Input
            placeholder="Search analysts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {/* Analysts Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Analyst</TableHead>
                <TableHead>Achievements</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Team Size</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnalysts.map((analyst) => (
                <TableRow key={analyst.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={analyst.image}
                        alt={analyst.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {analyst.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={analyst.achievements} className="h-2" />
                      <span className="text-sm text-muted-foreground">{analyst.achievements}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{analyst.projectsCompleted}</TableCell>
                  <TableCell>{analyst.accuracy}%</TableCell>
                  <TableCell>{analyst.teamSize}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Join Team
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Join {analyst.name}&apos;s Team</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p>Are you sure you want to join this team? You&apos;ll be able to:</p>
                          <ul className="list-disc list-inside space-y-2">
                            <li>Collaborate on ongoing projects</li>
                            <li>Access team resources and tools</li>
                            <li>Participate in team achievements</li>
                          </ul>
                          <Button onClick={() => handleJoinTeam(analyst.id)} className="w-full">
                            Confirm Join Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
