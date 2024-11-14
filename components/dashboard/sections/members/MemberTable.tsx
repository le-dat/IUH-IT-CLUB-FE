"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";
import { ITeam } from "@/types/team-type";
import { IUser } from "@/types/user-type";

interface MemberTableProps {
  members: IUser[];
  isAdmin: boolean;
  onView: (member: IUser) => void;
  onEdit: (member: IUser) => void;
  onDelete: (member: IUser) => void;
}

export default function MemberTable({
  members,
  isAdmin,
  onView,
  onEdit,
  onDelete,
}: MemberTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Thành viên</TableHead>
          <TableHead>Năm học</TableHead>
          <TableHead>Ngày tham gia</TableHead>
          <TableHead>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member._id}>
            <TableCell>
              <div className="flex items-center gap-3">
                {/* <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full" /> */}
                <span>{member.username}</span>
              </div>
            </TableCell>
            <TableCell>{member.codeStudent}</TableCell>
            <TableCell>
              {/* <Badge variant="secondary">{member.status}</Badge> */}
            </TableCell>
            {/* <TableCell>{member.joinDate}</TableCell> */}
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onView(member)}>
                  <Eye className="h-4 w-4" />
                </Button>
                {isAdmin && (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(member)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
