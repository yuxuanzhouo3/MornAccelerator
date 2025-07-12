"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Brain, Globe, ChevronRight, Star, Users, Award } from "lucide-react"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Zap,
      title: "Speed Boost",
      description: "Advanced acceleration technology that increases your connection speed by up to 300%",
      details:
        "Our proprietary speed optimization algorithms analyze network conditions in real-time to provide the fastest possible connection.",
    },
    {
      icon: Brain,
      title: "AI-Assisted Routing",
      description: "Smart routing powered by machine learning for optimal path selection",
      details:
        "AI continuously learns from network patterns to automatically select the best routes and servers for your specific needs.",
    },
    {
      icon: Globe,
      title: "GPT/Google Unlock",
      description: "Seamless access to ChatGPT, Google services, and other geo-restricted content",
      details:
        "Specialized servers optimized for accessing AI services and bypassing geographical restrictions with minimal latency.",
    },
    {
      icon: Shield,
      title: "Secure Global Access",
      description: "Military-grade encryption with servers in 50+ countries worldwide",
      details:
        "AES-256 encryption with multiple protocol support ensures your data remains private and secure across our global network.",
    },
  ]

  const stats = [
    { icon: Users, value: "10M+", label: "Active Users" },
    { icon: Globe, value: "50+", label: "Countries" },
    { icon: Zap, value: "99.9%", label: "Uptime" },
    { icon: Award, value: "4.8/5", label: "User Rating" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">MorVPN</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#support" className="text-slate-600 hover:text-blue-600 transition-colors">
              Support
            </a>
          </nav>
          <Link href="/onboarding">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
          <Star className="w-3 h-3 mr-1" />
          Trusted by 10M+ users worldwide
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
          The World's Fastest
          <span className="text-blue-600 block">VPN Accelerator</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Experience blazing-fast speeds with AI-powered routing, unlock global content, and protect your privacy with
          military-grade security.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/onboarding">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              Start Free Trial
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 bg-transparent">
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Powerful Features for Modern Users</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Advanced technology meets user-friendly design to deliver the ultimate VPN experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  activeFeature === index ? "border-blue-500 shadow-lg bg-blue-50" : "hover:border-slate-300"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activeFeature === index ? "bg-blue-600" : "bg-slate-100"
                      }`}
                    >
                      <feature.icon
                        className={`w-5 h-5 ${activeFeature === index ? "text-white" : "text-slate-600"}`}
                      />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:pl-8">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    {features[activeFeature] &&
                      React.createElement(features[activeFeature].icon, {
                        className: "w-6 h-6 text-white",
                      })}
                  </div>
                  <CardTitle className="text-xl text-blue-800">{features[activeFeature]?.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 text-lg leading-relaxed">{features[activeFeature]?.details}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Fastest VPN?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust MorVPN for secure, fast, and reliable internet access.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
              Start Your Free Trial
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <p className="text-sm text-slate-400 mt-4">30-day money-back guarantee • No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm">© 2025 MornHub, Inc. All rights reserved.</footer>
    </div>
  )
}
