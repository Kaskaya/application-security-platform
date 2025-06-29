"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminPage() {
  const [vulnerabilities, setVulnerabilities] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch vulnerabilities
        const { data: vulns } = await supabase
          .from("vulnerabilities")
          .select("*")
          .order("created_at", { ascending: false });

        // Fetch users
        const { data: userData } = await supabase
          .from("users")
          .select("id, username, email, created_at")
          .order("created_at", { ascending: false });

        setVulnerabilities(vulns || []);
        setUsers(userData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Supabase Data Viewer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vulnerabilities */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Vulnerabilities ({vulnerabilities.length})
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {vulnerabilities.map((vuln) => (
              <div key={vuln.id} className="bg-gray-700 p-3 rounded">
                <div className="font-semibold">{vuln.title}</div>
                <div className="text-sm text-gray-300">
                  {vuln.severity} | Risk: {vuln.risk_score} | {vuln.status}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(vuln.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Users */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Users ({users.length})
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {users.map((user) => (
              <div key={user.id} className="bg-gray-700 p-3 rounded">
                <div className="font-semibold">{user.username}</div>
                <div className="text-sm text-gray-300">{user.email}</div>
                <div className="text-xs text-gray-400">
                  {new Date(user.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
