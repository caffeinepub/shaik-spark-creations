import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  BlogPost,
  PortfolioItem,
  Stats,
  TeamMember,
  Testimonial,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPortfolioItems() {
  const { actor, isFetching } = useActor();
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolioItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPortfolioItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPortfolioByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolioItems", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllPortfolioItems();
      return actor.getPortfolioItemsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTeamMembers() {
  const { actor, isFetching } = useActor();
  return useQuery<TeamMember[]>({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTeamMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) {
        return {
          projectCount: BigInt(120),
          clientCount: BigInt(85),
          expertCount: BigInt(15),
          yearsOfExperience: BigInt(5),
        };
      }
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      projectType: string;
      budget: string;
      deadline: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContact(
        data.name,
        data.email,
        data.phone,
        data.projectType,
        data.budget,
        data.deadline,
        data.message,
      );
    },
  });
}

export function useSeedData() {
  const { actor, isFetching } = useActor();
  return useQuery<void>({
    queryKey: ["seedData"],
    queryFn: async () => {
      if (!actor) return;
      return actor.seedData();
    },
    enabled: !!actor && !isFetching,
  });
}
