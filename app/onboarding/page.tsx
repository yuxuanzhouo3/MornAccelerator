"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, ArrowLeft, Mail, Chrome, Github, MapPin, Wifi, Signal, ChevronRight, Check } from "lucide-react"

const servers = [
  {
    id: "us-east",
    name: "United States (East)",
    city: "New York",
    ping: 12,
    load: 23,
    flag: "🇺🇸",
    recommended: true,
  },
  {
    id: "japan",
    name: "Japan",
    city: "Tokyo",
    ping: 45,
    load: 18,
    flag: "🇯🇵",
  },
  {
    id: "singapore",
    name: "Singapore",
    city: "Singapore",
    ping: 38,
    load: 31,
    flag: "🇸🇬",
  },
  {
    id: "germany",
    name: "Germany",
    city: "Frankfurt",
    ping: 67,
    load: 15,
    flag: "🇩🇪",
  },
  {
    id: "india",
    name: "India",
    city: "Mumbai",
    ping: 89,
    load: 42,
    flag: "🇮🇳",
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedServer, setSelectedServer] = useState("us-east")
  const [email, setEmail] = useState("")

  const getSignalStrength = (ping: number) => {
    if (ping < 30) return { strength: "Excellent", color: "text-green-600", bars: 4 }
    if (ping < 60) return { strength: "Good", color: "text-blue-600", bars: 3 }
    if (ping < 90) return { strength: "Fair", color: "text-yellow-600", bars: 2 }
    return { strength: "Poor", color: "text-red-600", bars: 1 }
  }

  const renderStep1 = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl">Welcome to MorVPN</CardTitle>
        <CardDescription>Sign in to your account or create a new one to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setStep(2)} disabled={!email}>
          <Mail className="w-4 h-4 mr-2" />
          Continue with Email
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full bg-transparent">
            <Chrome className="w-4 h-4 mr-2" />
            Google
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>

        <p className="text-xs text-slate-500 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-blue-600" />
          Choose Your Server Location
        </CardTitle>
        <CardDescription>
          Select the server location that best fits your needs. We recommend the closest server for optimal performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {servers.map((server) => {
            const signal = getSignalStrength(server.ping)
            const isSelected = selectedServer === server.id

            return (
              <div
                key={server.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setSelectedServer(server.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{server.flag}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-slate-800">{server.name}</h3>
                        {server.recommended && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{server.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center space-x-1">
                        <Wifi className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium">{server.ping}ms</span>
                      </div>
                      <span className={`text-xs ${signal.color}`}>{signal.strength}</span>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center space-x-1">
                        <Signal className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium">{server.load}%</span>
                      </div>
                      <span className="text-xs text-slate-500">Load</span>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setStep(1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Connect to MorVPN
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">MorVPN</span>
          </Link>

          <div className="flex items-center space-x-2">
            <div className={`w-8 h-2 rounded-full ${step >= 1 ? "bg-blue-600" : "bg-slate-200"}`} />
            <div className={`w-8 h-2 rounded-full ${step >= 2 ? "bg-blue-600" : "bg-slate-200"}`} />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </div>
    </div>
  )
}
