
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { KeyRound, Wrench, Sparkles, Wand2, Loader2, Link, Eye, EyeOff } from "lucide-react";

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
import { cn } from "@/lib/utils";

interface DomainFormProps {
  onSubmit: (data: FormSchemaType) => void;
  loading: boolean;
}

const API_KEYS_STORAGE_KEY = "news-to-name-api-keys";

type ApiKeyName = "geminiApiKey" | "mediaStackApiKey" | "gNewsApiKey" | "newsApiApiKey" | "currentsApiKey";

export function DomainForm({ onSubmit, loading }: DomainFormProps) {
  const [showApiKeys, setShowApiKeys] = useState<Record<ApiKeyName, boolean>>({
    geminiApiKey: false,
    mediaStackApiKey: false,
    gNewsApiKey: false,
    newsApiApiKey: false,
    currentsApiKey: false,
  });

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
      maxWordsInDomain: 1,
      tld: "com",
      numberOfDomains: 2,
    },
  });
  
  // Effect to load API keys from local storage on initial render.
  useEffect(() => {
    try {
      const savedKeysRaw = localStorage.getItem(API_KEYS_STORAGE_KEY);
      if (savedKeysRaw) {
        const savedKeys = JSON.parse(savedKeysRaw);
        if (savedKeys) {
            Object.keys(savedKeys).forEach((key) => {
                form.setValue(key as keyof FormSchemaType, savedKeys[key] || "");
            });
        }
      }
    } catch (error) {
        console.error("Failed to load or parse API keys from localStorage:", error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.setValue]); // Run only once on mount

  const watchedApiKeys = form.watch([
    "geminiApiKey",
    "mediaStackApiKey",
    "gNewsApiKey",
    "newsApiApiKey",
    "currentsApiKey",
  ]);

  // Effect to save API keys to local storage whenever they change.
  useEffect(() => {
    const [
      geminiApiKey,
      mediaStackApiKey,
      gNewsApiKey,
      newsApiApiKey,
      currentsApiKey,
    ] = watchedApiKeys;
    
    const apiKeysToSave = {
      geminiApiKey,
      mediaStackApiKey,
      gNewsApiKey,
      newsApiApiKey,
      currentsApiKey,
    };
    // We only save if the form has been mounted and the effect is not running for the first time
    // which might happen with default empty values.
    if(form.formState.isMounted) {
      localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(apiKeysToSave));
    }
  }, [watchedApiKeys, form.formState.isMounted]);



  const toggleApiKeyVisibility = (key: ApiKeyName) => {
    setShowApiKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
               <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <KeyRound className="w-5 h-5" /> API Keys
                </h3>
              </div>
              <FormField
                control={form.control}
                name="geminiApiKey"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Gemini API Key (Required)</FormLabel>
                      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                        Get Key <Link className="w-3 h-3" />
                      </a>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showApiKeys.geminiApiKey ? "text" : "password"}
                          placeholder="Enter your Gemini API key"
                          className="font-code pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute inset-y-0 right-0 h-full w-10"
                          onClick={() => toggleApiKeyVisibility("geminiApiKey")}
                        >
                          {showApiKeys.geminiApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          <span className="sr-only">Toggle visibility</span>
                        </Button>
                      </div>
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
                    <div className="flex items-center justify-between">
                      <FormLabel>MediaStack</FormLabel>
                      <a href="https://mediastack.com/signup/free" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                        Get Key <Link className="w-3 h-3" />
                      </a>
                    </div>
                    <FormControl>
                     <div className="relative">
                        <Input
                          type={showApiKeys.mediaStackApiKey ? "text" : "password"}
                          placeholder="Optional"
                          className="font-code pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute inset-y-0 right-0 h-full w-10"
                          onClick={() => toggleApiKeyVisibility("mediaStackApiKey")}
                        >
                          {showApiKeys.mediaStackApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          <span className="sr-only">Toggle visibility</span>
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gNewsApiKey"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>GNews</FormLabel>
                      <a href="https://gnews.io/dashboard" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                        Get Key <Link className="w-3 h-3" />
                      </a>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showApiKeys.gNewsApiKey ? "text" : "password"}
                          placeholder="Optional"
                          className="font-code pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute inset-y-0 right-0 h-full w-10"
                          onClick={() => toggleApiKeyVisibility("gNewsApiKey")}
                        >
                          {showApiKeys.gNewsApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          <span className="sr-only">Toggle visibility</span>
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="newsApiApiKey"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>NewsAPI</FormLabel>
                       <a href="https://newsapi.org/register" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                        Get Key <Link className="w-3 h-3" />
                      </a>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showApiKeys.newsApiApiKey ? "text" : "password"}
                          placeholder="Optional"
                          className="font-code pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute inset-y-0 right-0 h-full w-10"
                          onClick={() => toggleApiKeyVisibility("newsApiApiKey")}
                        >
                          {showApiKeys.newsApiApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          <span className="sr-only">Toggle visibility</span>
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="currentsApiKey"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Currents</FormLabel>
                      <a href="https://currentsapi.services/en/register?action=register" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                        Get Key <Link className="w-3 h-3" />
                      </a>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showApiKeys.currentsApiKey ? "text" : "password"}
                          placeholder="Optional"
                          className="font-code pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute inset-y-0 right-0 h-full w-10"
                          onClick={() => toggleApiKeyVisibility("currentsApiKey")}
                        >
                          {showApiKeys.currentsApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          <span className="sr-only">Toggle visibility</span>
                        </Button>
                      </div>
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
                        defaultValue={[1]}
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
                        defaultValue={[2]}
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
