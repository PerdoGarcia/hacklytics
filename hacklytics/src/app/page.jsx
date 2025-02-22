"use client";
import React from "react";
import { CardWithForm } from "@/components/cardWithForm";
import { TopArbitrages } from "@/components/TopArbitrage";
import fakeData from "../components/fakeData.json";
import styles from "./homePage.module.css";

export default function Home() {
  const eventTicker = 'KXOSCARWINNERS-25AA559';
  return (
      <div className="min-h-screen bg-[#f5f5f5] p-8">
        <div className={styles.container}>

        <div className="flex gap-4">
          <div>
            <TopArbitrages />
          </div>

          <div className="flex-1">
            <CardWithForm events={fakeData.Events} />
          </div>
        </div>
      </div>
    </div>
  );
}