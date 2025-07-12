"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Settings,
  Power,
  Brain,
  Wifi,
  Activity,
  Globe,
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Smartphone,
} from "lucide-react"

export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connecting" | "connected" | "reconnecting"
  >("disconnected")
  const [aiBoostEnabled, setAiBoostEnabled] = useState(true)
  const [selectedProtocol, setSelectedProtocol] = useState("wireguard")
  const [latency, setLatency] = useState(12)
  const [throughput, setThroughput] = useState(0)
  const [packetLoss, setPacketLoss] = useState(0)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        setLatency((prev) => Math.max(8, prev + (Math.random() - 0.5) * 4))
        setThroughput((prev) => Math.max(0, prev + (Math.random() - 0.5) * 20))
        setPacketLoss(Math.random() * 0.5)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isConnected])

  const handleConnect = () => {
    if (isConnected) {
      setConnectionStatus("disconnected")
      setIsConnected(false)
      setThroughput(0)
    } else {
      setConnectionStatus("connecting")
      setTimeout(() => {
        setConnectionStatus("connected")
        setIsConnected(true)
        setThroughput(85)
      }, 3000)
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-green-600"
      case "connecting":
        return "text-yellow-600"
      case "reconnecting":
        return "text-orange-600"
      default:
        return "text-slate-600"
    }
  }

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case "connected":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Connected</Badge>
      case "connecting":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Connecting...</Badge>
      case "reconnecting":
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Reconnecting...</Badge>
      default:
        return <Badge variant="secondary">Disconnected</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">MorVPN</span>
          </div>
          <div className="flex items-center space-x-4">
            {getStatusBadge()}
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Connection Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connection Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Power className={`w-5 h-5 mr-2 ${getStatusColor()}`} />
                    Connection Status
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🇺🇸</span>
                    <div className="text-right">
                      <div className="font-semibold">United States</div>
                      <div className="text-sm text-slate-500">New York</div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold mb-2 ${getStatusColor()}`}>
                    {connectionStatus === "connected" ? "●" : connectionStatus === "connecting" ? "◐" : "○"}
                  </div>
                  <p className={`text-lg font-semibold ${getStatusColor()}`}>
                    {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
                  </p>
                  {isConnected && <p className="text-sm text-slate-600 mt-2">Connected via ChatGPT-optimized route</p>}
                </div>

                <Button
                  onClick={handleConnect}
                  className={`w-full py-6 text-lg font-semibold ${
                    isConnected ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={connectionStatus === "connecting"}
                >
                  {connectionStatus === "connecting" ? "Connecting..." : isConnected ? "Disconnect" : "Connect"}
                </Button>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-600" />
                    AI Smart Routing
                  </CardTitle>
                  <CardDescription>Automatically optimize your connection path</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-boost">AI Boost</Label>
                    <Switch id="ai-boost" checked={aiBoostEnabled} onCheckedChange={setAiBoostEnabled} />
                  </div>
                  {aiBoostEnabled && (
                    <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-700">🤖 AI is optimizing your route for ChatGPT access</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wifi className="w-5 h-5 mr-2 text-blue-600" />
                    Protocol
                  </CardTitle>
                  <CardDescription>Choose your connection protocol</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedProtocol} onValueChange={setSelectedProtocol}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="wireguard" className="text-xs">
                        WireGuard
                      </TabsTrigger>
                      <TabsTrigger value="v2ray" className="text-xs">
                        V2Ray
                      </TabsTrigger>
                      <TabsTrigger value="shadowsocks" className="text-xs">
                        Shadowsocks
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="mt-3 text-sm text-slate-600">
                    {selectedProtocol === "wireguard" && "Fast and secure modern protocol"}
                    {selectedProtocol === "v2ray" && "Advanced protocol with obfuscation"}
                    {selectedProtocol === "shadowsocks" && "Lightweight and efficient"}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-600" />
                  Performance Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-4 h-4 mr-1 text-blue-600" />
                      <span className="text-sm font-medium">Latency</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800">{Math.round(latency)}ms</div>
                    <div className="text-xs text-slate-500">Excellent</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                      <span className="text-sm font-medium">Throughput</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800">{Math.round(throughput)} Mbps</div>
                    <Progress value={throughput} className="mt-2 h-2" />
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingDown className="w-4 h-4 mr-1 text-red-600" />
                      <span className="text-sm font-medium">Packet Loss</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800">{packetLoss.toFixed(2)}%</div>
                    <div className="text-xs text-slate-500">Minimal</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Data Used Today</span>
                  <span className="font-semibold">2.4 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Session Time</span>
                  <span className="font-semibold">1h 23m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Speed Boost</span>
                  <Badge className="bg-green-100 text-green-700">+247%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Server Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  Server Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="font-medium">New York, US</div>
                    <div className="text-sm text-slate-500">40.7128° N, 74.0060° W</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="font-medium">Server Load</div>
                    <div className="text-sm text-slate-500">23% (Low)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="font-medium">Encryption</div>
                    <div className="text-sm text-slate-500">AES-256-GCM</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Connected to US East</span>
                    <span className="text-slate-500 ml-auto">2m ago</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>AI route optimized</span>
                    <span className="text-slate-500 ml-auto">5m ago</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>ChatGPT access verified</span>
                    <span className="text-slate-500 ml-auto">8m ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
