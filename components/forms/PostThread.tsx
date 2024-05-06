"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
// import { Input } from "../ui/input";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  console.log(startUpload, "startUpload")
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const colors = searchParams.get("c") || "primary";

  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
      thought_image: "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) {
        return;
      }

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    const blob = values.thought_image;
    console.log(files, "files")

    const hasImageChanged = isBase64Image(blob);
    console.log("inside onsubmit",hasImageChanged)
    
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      console.log(imgRes, "imgRes")

      if (imgRes && imgRes[0].url) {
        values.thought_image = imgRes[0].url;
      }
    }
    console.log("Going to create thought")
    await createThread({
      image: values.thought_image,
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/?" + searchParams.toString());
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thought_image"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-4">
              <FormLabel className="w-full h-[50vh] border-blue">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="thought_image"
                    width={300}
                    height={300}
                    priority
                    className="rounded-xl object-contain h-[50vh] w-full"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add thought image"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-dark-4 dark:text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-light-2 bg-light-2 dark:border-dark-4 dark:bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className={`gradient-${colors} dark:text-white`}>
          Post Thought
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
