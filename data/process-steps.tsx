import React from 'react'
import { Layout, PenTool, FileText } from '@/components/ui/Icons'

export interface ProcessStep {
  id: number
  title: string
  intro: string
  points: string[]
  icon: React.ReactNode
  img: string
  outro?: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  { id: 1, title: "Consultation (Free)", intro: "We visit your property in person to asses your problem and understand your goals. You'll receive:", points: ["Creative solutions that maximize function and aesthetics", "Material recommendations with cost estimates & trade-offs", "Clear execution timeline and schedule", "An enjoyable conversation with two enthusiastic builders!"], icon: <Layout className="w-6 h-6" />, img: "/assets/cal-fynn-outdoor-design.jpg" },
  { id: 2, title: "Design (Free)", intro: "If your problem and our capabilities are aligned, Cal & Fynn assemble a complete proposal. You'll receive:", points: ["Detailed designs including measurments and material specs", "Precise project timeline and detailed scope of work", "Itemized and exact project costs (no false 'estimates')", "A full professional proposal, sent via docusign, directly to your email"], outro: "We leave this phase with a design contractors can execute with minimal risk.", icon: <PenTool className="w-6 h-6" />, img: "/assets/diagram_collage.jpg" },
  { id: 3, title: "Build", intro: "If you decide CFD is the right team to execute, we execute. You'll receive:", points: ["Complete, clear, & continuous project communications", "Premium build quality (we enjoy going the extra mile for a better product)", "Flexible execution without affecting price", "Complete site clean up"], icon: <FileText className="w-6 h-6" />, img: "/assets/cal-fynn-build.jpg" },
]
