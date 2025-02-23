"use server";
import React from "react";
import { CardWithForm } from "@/components/cardWithForm";
import { TopArbitrages } from "@/components/TopArbitrage";
import { api } from './utils/helpers';
import styles from "./homePage.module.css";


export default async function Home() {
  let data = [];
  let matrix = [];
  let market = [];
  try {
    data = await api.get("/api/all");
    matrix = await api.get("/api/s3/download/matrix.json");
    market = await api.get("/api/s3/download/market_data.json");
  } catch (error) {
    console.error('Failed to fetch initial data');
    // Use fallback data
    data = [];
    matrix = [];
    market = [];
  }
  return (
      <div className="min-h-screen bg-[#232b2b] p-8">
        <div className={styles.container}>

        <div className="flex gap-4">
          <div>
            <TopArbitrages data={data}/>
          </div>

          <div className="flex-1">
            <CardWithForm events={data} />
          </div>
        </div>
      </div>
    </div>
  );
}