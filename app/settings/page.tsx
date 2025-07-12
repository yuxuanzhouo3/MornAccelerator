"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  ArrowLeft,
  Globe,
  Palette,
  FileText,
  Info,
  Fingerprint,
  Split,
  Languages,
  Moon,
  Sun,
  Download,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react"

export default function SettingsPage() {
  const [splitTunneling, setSplitTunneling] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [showLogs, setShowLogs] = useState(false)
  const [copied, setCopied] = useState(false)

  const splitTunnelingApps = [
    { name: "ChatGPT", enabled: true, icon: "🤖" },
    { name: "Google Chrome", enabled: false, icon: "🌐" },
    { name: "Netflix", enabled: true, icon: "📺" },
    { name: "Spotify", enabled: false, icon: "🎵" },
    { name: "Steam", enabled: true, icon: "🎮" },
  ]

  const logs = [
    { time: "14:32:15", level: "INFO", message: "Connected to US-East server successfully" },
    { time: "14:32:12", level: "INFO", message: "AI routing optimization completed" },
    { time: "14:32:10", level: "INFO", message: "WireGuard tunnel established" },
    { time: "14:32:08", level: "INFO", message: "Authentication successful" },
    { time: "14:32:05", level: "WARN", message: "High latency detected, switching routes" },
    { time: "14:32:02", level: "INFO", message: "Connection initiated" },
  ]

  const certificateFingerprint =
    "SHA256:a1:b2:c3:d4:e5:f6:07:08:09:0a:1b:2c:3d:4e:5f:60:71:82:93:a4:b5:c6:d7:e8:f9:0a:1b:2c:3d:4e:5f:60"

  const copyFingerprint = () => {
    navigator.clipboard.writeText(certificateFingerprint)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">MorVPN Settings</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="general" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-purple-600" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel of MorVPN</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                  </div>
                  <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Languages className="w-4 h-4" />
                    <Label>Language</Label>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-1 border rounded-md bg-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  Connection Preferences
                </CardTitle>
                <CardDescription>Configure your connection behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-connect on startup</Label>
                    <p className="text-sm text-slate-500">Automatically connect when MorVPN starts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Kill switch</Label>
                    <p className="text-sm text-slate-500">Block internet if VPN disconnects</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-reconnect</Label>
                    <p className="text-sm text-slate-500">Automatically reconnect if connection drops</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Network Settings */}
          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Split className="w-5 h-5 mr-2 text-green-600" />
                  Split Tunneling
                </CardTitle>
                <CardDescription>Choose which apps use the VPN connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="split-tunneling">Enable Split Tunneling</Label>
                  <Switch id="split-tunneling" checked={splitTunneling} onCheckedChange={setSplitTunneling} />
                </div>

                {splitTunneling && (
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium text-slate-800">App-specific routing</h4>
                    {splitTunnelingApps.map((app, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{app.icon}</span>
                          <span className="font-medium">{app.name}</span>
                        </div>
                        <Switch defaultChecked={app.enabled} />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DNS Settings</CardTitle>
                <CardDescription>Configure DNS servers for enhanced privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Use MorVPN DNS</Label>
                  <Switch defaultChecked />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <Label className="text-sm text-slate-600">Primary DNS</Label>
                    <div className="mt-1 p-2 bg-slate-50 rounded text-sm font-mono">1.1.1.1</div>
                  </div>
                  <div>
                    <Label className="text-sm text-slate-600">Secondary DNS</Label>
                    <div className="mt-1 p-2 bg-slate-50 rounded text-sm font-mono">1.0.0.1</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-orange-600" />
                    Connection Logs
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setShowLogs(!showLogs)}>
                      {showLogs ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                      {showLogs ? "Hide" : "Show"} Logs
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>View recent connection activity and troubleshooting information</CardDescription>
              </CardHeader>
              {showLogs && (
                <CardContent>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                    {logs.map((log, index) => (
                      <div key={index} className="mb-1">
                        <span className="text-slate-400">[{log.time}]</span>{" "}
                        <span
                          className={
                            log.level === "INFO"
                              ? "text-blue-400"
                              : log.level === "WARN"
                                ? "text-yellow-400"
                                : "text-red-400"
                          }
                        >
                          {log.level}
                        </span>{" "}
                        <span className="text-green-400">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </TabsContent>

          {/* About */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Application Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-slate-600">Version</Label>
                    <div className="font-semibold">MorVPN 2.4.1</div>
                  </div>
                  <div>
                    <Label className="text-sm text-slate-600">Build</Label>
                    <div className="font-semibold">20241201.1</div>
                  </div>
                  <div>
                    <Label className="text-sm text-slate-600">Protocol</Label>
                    <div className="font-semibold">WireGuard 1.0.20210914</div>
                  </div>
                  <div>
                    <Label className="text-sm text-slate-600">Platform</Label>
                    <div className="font-semibold">Cross-platform</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Fingerprint className="w-5 h-5 mr-2 text-purple-600" />
                  Certificate Fingerprint
                </CardTitle>
                <CardDescription>Verify the authenticity of your connection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <code className="text-sm font-mono text-slate-700 flex-1 mr-3">{certificateFingerprint}</code>
                  <Button variant="outline" size="sm" onClick={copyFingerprint}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance & Legal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Privacy Policy</span>
                  <Button variant="link" className="p-0 h-auto">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Terms of Service</span>
                  <Button variant="link" className="p-0 h-auto">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Processing Agreement</span>
                  <Button variant="link" className="p-0 h-auto">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Reports</span>
                  <Badge variant="secondary">SOC 2 Type II</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
