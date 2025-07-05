// Lua VM Sandbox Platform – Full Feature Edition
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots, FaShareAlt } from "react-icons/fa";

export default function LuaSandboxApp() {
  const [code, setCode] = useState("print('Hello Roblox!')");
  const [output, setOutput] = useState("");
  const [typeInfo, setTypeInfo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scripts, setScripts] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [comments, setComments] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState("");

  useEffect(() => {
    fetch("/api/community-scripts")
      .then(res => res.json())
      .then(setScripts);
  }, []);

  const runCode = async () => {
    const res = await fetch("/api/run-luau-vm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    setOutput(data.output);
    setTypeInfo(data.typeInfo);
  };

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setUser(data.user);
  };

  const saveScript = async () => {
    if (!user) return alert("Login required to save scripts");
    const res = await fetch("/api/save-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, title: "My Script", userId: user.id })
    });
    const data = await res.json();
    alert("Script saved: " + data.script.title);
  };

  const importLua = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => setCode(event.target.result);
    reader.readAsText(file);
  };

  const exportLua = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "script.lua";
    a.click();
  };

  const analyzeCode = async () => {
    const res = await fetch("/api/ai-analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    setAiAnalysis(data.analysis);
  };

  const filteredScripts = scripts.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Luau VM Playground – Community, Sharing & AI Tools
      </motion.h1>

      <Tabs defaultValue="sandbox" className="max-w-6xl mx-auto">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="sandbox">
          <Card>
            <CardContent className="space-y-4 p-6">
              <Textarea
                className="w-full h-40 bg-black text-green-400 font-mono"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className="flex gap-2 flex-wrap">
                <Button onClick={runCode}>Run Script</Button>
                <Button onClick={saveScript} disabled={!user}>Save</Button>
                <Button onClick={analyzeCode}>AI Analyze</Button>
                <Button onClick={exportLua}>Export</Button>
                <input type="file" accept=".lua" className="bg-gray-800 p-2" onChange={importLua} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Output:</h3>
                <pre className="bg-gray-800 p-2 rounded text-green-300 whitespace-pre-wrap">{output}</pre>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Type Info:</h3>
                <pre className="bg-gray-800 p-2 rounded text-yellow-300 whitespace-pre-wrap">{typeInfo}</pre>
              </div>
              {aiAnalysis && (
                <div>
                  <h3 className="text-xl font-semibold">AI Suggestions:</h3>
                  <pre className="bg-gray-800 p-2 rounded text-blue-300 whitespace-pre-wrap">{aiAnalysis}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardContent className="space-y-4 p-6">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button onClick={handleSignup}>Sign Up</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Input
                placeholder="Search scripts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800"
              />
              <ScrollArea className="h-[30rem]">
                <div className="space-y-4">
                  {filteredScripts.map((script, idx) => (
                    <div key={idx} className="p-4 bg-gray-800 rounded shadow space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{script.title}</h3>
                        <div className="flex gap-4 items-center">
                          <AiOutlineLike /> {script.likes || 0}
                          <FaCommentDots /> {script.comments?.length || 0}
                         <FaShareAlt
  onClick={() => navigator.clipboard.writeText(`/view/${script.id}`)}
  className="cursor-pointer"
/>
                        </div>
                      </div>
                      <pre className="text-sm text-green-200 whitespace-pre-wrap max-h-32 overflow-auto">{script.code}</pre>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6">
              {user ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
                  <p>Here you’ll be able to manage your saved scripts, contributions, and profile details.</p>
                </div>
              ) : (
                <p>Please sign up or log in to view your profile.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
