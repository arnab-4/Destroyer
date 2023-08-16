"use client"

import * as z from "zod";

import Heading from "@/components/heading"

import { zodResolver } from "@hookform/resolvers/zod"

import { MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"

import { formSchema } from "./cosntants"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConversationPage = () => {

    const form = useForm<z.infer<typeof  formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "" 
        }
    });

    const isloading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

  return (
    <div>
      <Heading
        title="Conversation"
        description = "Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"

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
                            placeholder="How do I calculate the area of a triangle"
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
            Messages Content
        </div>

       </div>
    </div>
  )
}

export default ConversationPage
