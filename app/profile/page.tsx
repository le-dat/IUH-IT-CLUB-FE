"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User, Mail, Github, Linkedin, Twitter, Edit2, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js"]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Profile Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full shadow-lg"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Le Dat</h1>
                <p className="text-muted-foreground">Full Stack developer</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "secondary" : "default"}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>

          {/* Profile Content */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Left Column - Personal Info */}
            <Card className="md:col-span-2 p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        defaultValue="Le Dat"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    ) : (
                      <p>Le Dat</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    {isEditing ? (
                      <Input
                        id="studentId"
                        defaultValue="2022222"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    ) : (
                      <p>2022222</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        defaultValue="Full stack developer passionate about building great user experiences."
                        className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    ) : (
                      <p>Full stack developer passionate about building great user experiences.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Skills</h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="group">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <form onSubmit={handleAddSkill} className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add skill"
                        className="max-w-[200px]"
                      />
                      <Button type="submit" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </Card>

            {/* Right Column - Social Links & Activity */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Social Links</h2>
                <div className="space-y-3">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        defaultValue="alex@example.com"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Github className="h-4 w-4" />
                      Email
                    </Button>
                  )}

                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Điện thoại (Zalo)</Label>
                      <Input
                        id="phone"
                        defaultValue="0123456789"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Github className="h-4 w-4" />
                      Điện thoại (Zalo)
                    </Button>
                  )}

                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        type="email"
                        id="linkedin"
                        defaultValue="alex@example.com"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Github className="h-4 w-4" />
                      linkedin
                    </Button>
                  )}
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Hoạt động</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Projects</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Teams</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Events Participated</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
