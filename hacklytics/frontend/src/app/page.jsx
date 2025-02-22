"use server";
import React from "react";
import { CardWithForm } from "@/components/cardWithForm";
import { TopArbitrages } from "@/components/TopArbitrage";
import { api } from './utils/helpers';
import styles from "./homePage.module.css";


export default async function Home() {
  const data = await api.get("/api/all");
  console.log(data);
  return (
      <div className="min-h-screen bg-[#d4bf79] p-8">
        <div className={styles.container}>

        <div className="flex gap-4">
          <div>
            <TopArbitrages />
          </div>

          <div className="flex-1">
            <CardWithForm events={data} />
          </div>
        </div>
      </div>
    </div>
  );
}