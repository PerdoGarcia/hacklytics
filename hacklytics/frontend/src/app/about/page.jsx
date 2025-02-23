import styles from '../animations.module.css';
import aboutstyles from './about.module.css';
import React from 'react';
import Image from 'next/image';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";


  export default function About() {
    return (
      <div className="min-h-screen bg-[#232b2b] p-8">
        <h1 className={`${styles.box} max-w-2xl mx-auto text-3xl font-bold text-center py-4 px-6 bg-gradient-to-r bg-[#F5F5DC] text-#71797E rounded-lg shadow-lg`}>
          <span className="text-3xl font-bold text-center mb-4">
            Fun Fact: There are two members with the same name on this project.<br />
            This project was created by:
          </span>
        </h1>
  
        <div className="grid grid-cols-2 gap-8 pt-8 max-w-[900px] mx-auto">
          <div>
            <Card className={`w-full ${styles.slideLeft} bg-[#3b444b] px-4 py-4`}>
              <Image
                className="mx-auto rounded-lg pb-2"
                src="/John.jpeg"
                alt="John Zhang"
                width={500}
                height={200}
              />
              <CardTitle className={aboutstyles.name}>
                John Vizhco-Leon
              </CardTitle>
              <CardDescription className={aboutstyles.email}>
                Email: john_vizhcoleon@college.harvard.edu
              </CardDescription>
              <CardDescription>
                <a className={aboutstyles.linkedin} href="https://www.linkedin.com/in/john-vizhco-leon-a33746256/" target="_blank" rel="noopener noreferrer">
                  John's LinkedIn
                </a>
              </CardDescription>
            </Card>
          </div>
          <div>
            <Card className={`w-full ${styles.slideRight} bg-[#3b444b] px-4 py-4`}>
              <Image
                className="mx-auto rounded-lg pb-2"
                src="/Josh.jpeg"
                alt="Josh Zhang"
                width={300}
                height={200}
              />
              <CardTitle className={aboutstyles.name}>
                Josh Zhang
              </CardTitle>
              <CardDescription className={aboutstyles.email}>
                Email: joshzhang@college.harvard.edu
              </CardDescription>
              <CardDescription>
                <a className={aboutstyles.linkedin} href="https://joshzhang.tech/" target="_blank" rel="noopener noreferrer">
                  Josh's Personal Website.
                </a>
              </CardDescription>
            </Card>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-8 pt-8 max-w-[900px] mx-auto">
          <div>
            <Card className={`w-full ${styles.slideBottom} bg-[#3b444b] px-4 py-4`}>
              <Image
                className="mx-auto rounded-lg pb-2"
                src="/Joshua.jpg"
                alt="Joshua Zhang"
                width={360}
                height={200}
              />
              <CardTitle className={aboutstyles.name}>
                Joshua Zhang
              </CardTitle>
              <CardDescription className={aboutstyles.email}>
                Email: joshua_zhang@college.harvard.edu
              </CardDescription>
              <CardDescription>
                <a className={aboutstyles.linkedin} href="https://www.linkedin.com/in/jzhang2003/" target="_blank" rel="noopener noreferrer">
                  Joshua's LinkedIn
                </a>
              </CardDescription>
            </Card>
          </div>
          <div>
            <Card className={`w-full ${styles.slideBottom} bg-[#3b444b] px-4 py-4`}>
              <Image
                className="mx-auto rounded-lg pb-2"
                src="/Pedro.jpeg"
                alt="Pedro Garcia"
                width={325}
                height={200}
              />
              <CardTitle className={aboutstyles.name}>
                Pedro Garcia
              </CardTitle>
              <CardDescription className={aboutstyles.email}>
                Email: pedro_garcia@college.harvard.edu
              </CardDescription>
              <CardDescription>
                <a className={aboutstyles.linkedin} href="https://linkedin.com/in/pedro-garcia2026" target="_blank" rel="noopener noreferrer">
                  Pedro's LinkedIn
                </a>
              </CardDescription>
            </Card>
          </div>
        </div>
      </div>
    );
  }