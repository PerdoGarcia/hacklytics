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
        <>
            <h1 className="max-w-2xl mx-auto text-3xl font-bold text-center py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
                Fun Fact: There are two members with the same name on this project. This project was created by:
            </h1>

            <div className="flex gap-8 pt-8 items-center justify-center">
                <div className="flex items-center justify-center">
                    <Card className="w-[400px] px-4 py-4">
                        <Image
                            className="mx-auto rounded-lg pb-2"
                            src="/John.jpeg" 
                            alt="John Zhang"
                            width={500}
                            height={200}
                        />
                            <CardTitle className="py-2">
                                John Vizhco
                            </CardTitle>
                            <CardDescription className="py-1">
                                Email: joshua_zhang@college.harvard.edu
                            </CardDescription>
                            <CardDescription>
                                <a href="linkedin.com/in/john-vizhco-leon-a33746256">John's LinkedIn.</a> 
                            </CardDescription>
                    </Card>
                </div>
                <div className="flex items-center justify-center">
                    <Card className="w-[400px] px-4 py-4">
                        <Image
                            className="mx-auto rounded-lg pb-2"
                            src="/Josh.jpeg" 
                            alt="Josh Zhang"
                            width={320}
                            height={200}
                        />
                            <CardTitle className="py-2">
                                Josh Zhang
                            </CardTitle>
                            <CardDescription className="py-1">
                                Email: joshzhang@college.harvard.edu
                            </CardDescription>
                            <CardDescription>
                                <a href="linkedin.com/in/thejoshzhang">Josh's LinkedIn.</a> 
                            </CardDescription>
                    </Card>
                </div>
            </div>

            <div className="flex gap-8 pt-8 items-center justify-center">
                <div className="flex items-center justify-center">
                    <Card className="w-[400px] px-4 py-4">
                        <Image
                            className="mx-auto rounded-lg pb-2"
                            src="/Joshua.jpg" 
                            alt="Joshua Zhang"
                            width={360}
                            height={200}
                        />
                            <CardTitle className="py-2">
                                Joshua Zhang
                            </CardTitle>
                            <CardDescription className="py-1">
                                Email: joshua_zhang@college.harvard.edu
                            </CardDescription>
                            <CardDescription>
                                <a href="https://www.linkedin.com/in/jzhang2003/">Joshua's LinkedIn.</a> 
                            </CardDescription>
                    </Card>
                </div>
                <div className="flex items-center justify-center">
                    <Card className="w-[400px] px-4 py-4">
                        <Image
                            className="mx-auto rounded-lg pb-2"
                            src="/Pedro.jpeg" 
                            alt="Pedro Garcia"
                            width={340}
                            height={200}
                        />
                            <CardTitle className="py-2">
                                Pedro Garcia
                            </CardTitle>
                            <CardDescription className="py-1">
                                Email: pedro_garcia@college.harvard.edu
                            </CardDescription>
                            <CardDescription>
                                <a href="linkedin.com/in/pedro-garcia2026">Pedro's LinkedIn.</a> 
                            </CardDescription>
                    </Card>
                </div>
            </div>



        </>
    );
}