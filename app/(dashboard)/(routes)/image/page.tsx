"use client";

import axios from "axios";

import * as z from "zod";

import Heading from "@/components/heading"

import { zodResolver } from "@hookform/resolvers/zod"

import {  Download, ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { amountOptions, formSchema, resolutionOptions } from "./cosntants"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty }  from "@/components/empty";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {

    const router = useRouter();

    const [Images , setImages] = useState<string[]>([]);

    

    const form = useForm<z.infer<typeof  formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "",
          amount : "1",
          resolution: "512x512"
        }
    });

    const isloading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

          setImages([]);
          const response = await axios.post('/api/image', values);

          const urls = response.data.map((image: { url: string }) => image.url)
          setImages(urls)
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
        title="Image Generation"
        description = "Turn yuor prompt into in image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"

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
                            placeholder="A picture of a horse in Swiss alps"
                            {...field}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    {/* <Button className="col-span-12 lg:col-span-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-500 ease-in-out w-full" disabled={isloading}>
    Generate
</Button> */}
                    <FormField 
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem  className="col-span-12 lg:col-span-6">

                          <Select
                          disabled={isloading}
                          onValueChange={field.onChange}
                          value= {field.value}
                          defaultValue={field.value}
                          >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue defaultValue={field.value} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {amountOptions.map((option) => (
                                    <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>  
                        </FormItem>
                        
                    )} 
                    />         
                    <FormField 
                    control={form.control}
                    name="resolution"
                    render={({ field }) => (
                        <FormItem  className="col-span-12 lg:col-span-6">

                          <Select
                          disabled={isloading}
                          onValueChange={field.onChange}
                          value= {field.value}
                          defaultValue={field.value}
                          >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue defaultValue={field.value} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {resolutionOptions.map((option) => (
                                    <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>  
                        </FormItem>
                        
                    )} 
                    />         

                    <Button className=" col-span-12 lg:col-span-2 w-full" disabled={isloading}>
                        Generate
                    </Button>

                </form>
            </Form>
        </div>
        <div className="space-y-4 mt-4">
            {isloading && (
                <div className=" p-20">
                    <Loader />
                </div>
            )}
            {Images.length === 0 && !isloading && (
                <Empty label="No images Generated" />
            )}
            <div className=" grid grid-cols-1 md:grid-cols lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                {Images.map((src) => (
                    <Card
                    key={src}
                    className=" rounded-lg overflow-hidden"
                    >
                    <div className=" relative aspect-square">
                    <Image 
                     alt="Image"
                     fill
                     src={src}
                    />
                    </div>
                    <CardFooter className="p-2">
                        <Button
                         onClick={() => window.open(src)}
                         variant={"secondary"} className="w-full">
                            <Download className="h-4 w-4 mr-2"/>
                            Download
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
            
       </div>
    </div>
  )
}

export default ImagePage;
