"use server";
import React from "react";
import { CardWithForm } from "@/components/cardWithForm";
import { TopArbitrages } from "@/components/TopArbitrage";
import { api } from './utils/helpers';
import styles from "./homePage.module.css";


export default async function Home() {
  const data = await api.get("/api/all");
  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
        <header className="glass-effect border-b border-slate-700/30 sticky top-0 z-50">
          <div className="container mx-auto py-8 px-4 animate-fade-in text-center">
            <h1 className="text-5xl gradient-text font-bold mb-4">Crypto Arbitrage Dashboard</h1>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto">
              Discover real-time cryptocurrency arbitrage opportunities across multiple exchanges
            </p>
          </div>
        </header>
        
        <main className="container mx-auto p-8 flex-grow">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Volume</p>
                  <h3 className="text-2xl font-bold text-white mt-1">$2.4M</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">+12.5% from last week</p>
            </div>
            
            <div className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Markets</p>
                  <h3 className="text-2xl font-bold text-white mt-1">143</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                  </svg>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">+5 new today</p>
            </div>
            
            <div className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Avg. Opportunity</p>
                  <h3 className="text-2xl font-bold text-white mt-1">2.3%</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">+0.5% from yesterday</p>
            </div>
            
            <div className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Success Rate</p>
                  <h3 className="text-2xl font-bold text-white mt-1">98.2%</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-2">+0.8% this month</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl text-white">Top Opportunities</h2>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Live</span>
                </div>
                <TopArbitrages />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="dashboard-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl text-white mb-2">Market Analysis</h2>
                    <p className="text-slate-400">Search and analyze market opportunities</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Export Data
                  </button>
                </div>
                <CardWithForm events={data} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
}