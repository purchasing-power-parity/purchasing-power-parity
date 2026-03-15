"use client";

import { useQuery } from "@tanstack/react-query";
import type { PPPData } from "./ppp";

export function usePPP() {
  return useQuery<PPPData[]>({
    queryKey: ["ppp"],
    queryFn: () => fetch("/api/ppp").then((r) => r.json()),
  });
}
