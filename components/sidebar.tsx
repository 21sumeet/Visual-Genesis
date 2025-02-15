"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";

import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Freecounter from './free-counter';

const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      color: "text-green-700",
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      href: "/image",
      color: "text-pink-700",
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      href: "/video",
      color: "text-orange-700",
    },
    {
      label: "Music Generation",
      icon: Music,
      href: "/music",
      color: "text-emerald-500",
    },
    
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];
  interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
  }

const Sidebar = ({ apiLimitCount =0, isPro = false }) => {
    const pathname = usePathname();
  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
        <p></p>
        <div className='flex-1 px-3 py-2'>
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold")}>Visual Genesis</h1>
        </Link>
        </div>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "bg-white/10 text-white" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        <Freecounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  )
}

export default Sidebar