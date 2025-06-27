"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { KeyRound, Wrench, Sparkles, Wand2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

import { formSchema, type FormSchemaType } from "@/lib/types";

interface DomainFormProps {
  onSubmit: (data: FormSchemaType) => void;
  loading: boolean;
}

export function DomainForm({ onSubmit, loading }: DomainFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      geminiApiKey: "",
      mediaStackApiKey: "",
      gNewsApiKey: "",
      newsApiApiKey: "",
      currentsApiKey: "",
      newsTimeRange: "24h",
      articleFetchDepth: "Light",
      maxWordsInDomain: 3,
      tld: "com",
      numberOfDomains: 5,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="w-6 h-6" />
          Configuration
        </CardTitle>
        <CardDescription>
          Enter your keys and tune the generator.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <KeyRound className="w-5 h-5" /> API Keys
              </h3>
              <FormField
                control={form.control}
                name="geminiApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gemini API Key (Required)</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your Gemini API key"
                        className="font-code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-muted-foreground">Optional News API Keys:</p>
              <FormField
                control={form.control}
                name="mediaStackApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MediaStack</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Optional" className="font-code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gNewsApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GNews</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Optional" className="font-code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="newsApiApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NewsAPI</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Optional" className="font-code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="currentsApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currents</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Optional" className="font-code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Generator Settings
              </h3>
              <FormField
                control={form.control}
                name="newsTimeRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>News Time Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="24h">24 hours</SelectItem>
                        <SelectItem value="Week">Week</SelectItem>
                        <SelectItem value="Month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="articleFetchDepth"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Article Fetch Depth</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Light" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Light (Titles & Descriptions)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Deep" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Deep (Full Content)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="maxWordsInDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Words in Domain: {field.value}</FormLabel>
                    <FormControl>
                       <Slider
                        defaultValue={[3]}
                        max={5}
                        min={1}
                        step={1}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tld"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Top-Level Domain (TLD)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a TLD" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="com">.com</SelectItem>
                        <SelectItem value="ai">.ai</SelectItem>
                        <SelectItem value="io">.io</SelectItem>
                        <SelectItem value="net">.net</SelectItem>
                        <SelectItem value="org">.org</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="numberOfDomains"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Domains to Generate: {field.value}</FormLabel>
                    <FormControl>
                       <Slider
                        defaultValue={[5]}
                        max={10}
                        min={1}
                        step={1}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Domains
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
