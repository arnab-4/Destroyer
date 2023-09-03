"use client";

import axios from "axios";

import * as z from "zod";

import Heading from "@/components/heading"

import { zodResolver } from "@hookform/resolvers/zod"

import {  MessageSquare, Music } from "lucide-react"
import { useForm } from "react-hook-form"

import { formSchema } from "./cosntants"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty }  from "@/components/empty";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ChatCompletionRequestMessage } from "openai";
import Loader from "@/components/loader";


const MusicPage = () => {

    const router = useRouter();

    const [music , setMusic] = useState<string>();

    const form = useForm<z.infer<typeof  formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "" 
        }
    });

    const isloading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          setMusic(undefined);

          const response = await axios.post('/api/music', values);
          setMusic(response.data.audio);
          
          form.reset();

        } catch (error: any) {
            //TODO : Open Pro Modal
            console.log(error);
        } finally {
            router.refresh();
            //  Refresh the current route. Making a new request to the server, re-fetching data requests, and re-rendering Server Components.

        }
    };

  return (
    <div>
      <Heading
        title="Music Generation"
        description = "Turn Your prompt into music"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"

       />
       <div className=" px-4 lg:px-8">

        <div>
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="
                rounded-lg
                border
                w-full
                p-4
                px-3
                md:px-6
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2

                " 
                 >
                    <FormField 
                    name = "prompt"
                    render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-10">
                        <FormControl className="m-0 p-0">
                            <Input 
                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                            disabled={isloading}
                            placeholder="Piano Solo"
                            {...field}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    {/* <Button className="col-span-12 lg:col-span-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-500 ease-in-out w-full" disabled={isloading}>
    Generate
</Button> */}

                    <Button className=" col-span-12 lg:col-span-2 w-full" disabled={isloading}>
                        Generate
                    </Button>

                </form>
            </Form>
        </div>
        <div className="space-y-4 mt-4">
            {isloading && (
                <div className=" p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader />
                </div>
            )}
            {!music && !isloading && (
                <Empty label="No music generated" />
            )}
            {music && (
                <audio controls className=" w-full mt-8">
                    <source src={music} />
                </audio>
            )}
        </div>
            
       </div>
    </div>
  )
}

export default MusicPage;
