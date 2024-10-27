"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import MembersSection from "./sections/MembersSection";
import TeamsSection from "./sections/TeamsSection";
import EventsSection from "./sections/EventsSection";
import DevicesSection from "./sections/DevicesSection";

export default function TechClubDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleRole = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader isAdmin={isAdmin} />

      <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-end">
          <Button variant={isAdmin ? "destructive" : "default"} onClick={toggleRole}>
            Switch to {isAdmin ? "User" : "Admin"} Mode
          </Button>
        </div>

        <DashboardStats />

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">Thành viên</TabsTrigger>
            <TabsTrigger value="teams">Đội tuyển</TabsTrigger>
            <TabsTrigger value="events">Sự kiện</TabsTrigger>
            <TabsTrigger value="devices">Thiết bị</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <MembersSection isAdmin={isAdmin} />
          </TabsContent>

          <TabsContent value="teams">
            <TeamsSection isAdmin={isAdmin} />
          </TabsContent>

          <TabsContent value="events">
            <EventsSection isAdmin={isAdmin} />
          </TabsContent>

          <TabsContent value="devices">
            <DevicesSection isAdmin={isAdmin} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
