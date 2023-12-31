"use client"

import * as z from "zod"

export const formSchema = z.object({
      name: z.string().min(4).max(50),
})
