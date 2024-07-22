'use client'

import { Separator } from "@/components/ui/separator";
import { totalCategories, totalPosts, totalUsers } from "@/utils/actions/count/counts";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({ posts: 0, categories: 0, users: 0 });

  useEffect(() => {
    async function fetchData() {
      const [posts, categories, users] = await Promise.all([
        totalPosts(),
        totalCategories(),
        totalUsers(),
      ]);
      setStats({ posts, categories, users });
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.posts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.categories}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.users}</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Button defaultValue="primary" onClick={() => alert("Feature Coming Soon!")}>Manage Content</Button>
      </div>
    </div>
  );
}
