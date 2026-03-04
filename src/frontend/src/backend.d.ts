import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    thumbnailUrl: string;
    publishDate: Time;
    description: string;
}
export type Time = bigint;
export interface ContactSubmission {
    id: bigint;
    projectType: string;
    name: string;
    deadline: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
    budget: string;
}
export interface PortfolioItem {
    id: bigint;
    title: string;
    thumbnailUrl: string;
    description: string;
    category: string;
}
export interface Stats {
    yearsOfExperience: bigint;
    clientCount: bigint;
    expertCount: bigint;
    projectCount: bigint;
}
export interface TeamMember {
    id: bigint;
    linkedin: string;
    twitter: string;
    instagram: string;
    name: string;
    role: string;
    photoUrl: string;
}
export interface Testimonial {
    id: bigint;
    review: string;
    starRating: bigint;
    clientName: string;
    photoUrl: string;
    company: string;
}
export interface backendInterface {
    addBlogPost(title: string, description: string, thumbnailUrl: string): Promise<bigint>;
    addPortfolioItem(title: string, category: string, thumbnailUrl: string, description: string): Promise<bigint>;
    addTeamMember(name: string, role: string, photoUrl: string, twitter: string, linkedin: string, instagram: string): Promise<bigint>;
    addTestimonial(clientName: string, company: string, photoUrl: string, starRating: bigint, review: string): Promise<bigint>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllPortfolioItems(): Promise<Array<PortfolioItem>>;
    getAllTeamMembers(): Promise<Array<TeamMember>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getBlogPost(id: bigint): Promise<BlogPost | null>;
    getPortfolioItemsByCategory(category: string): Promise<Array<PortfolioItem>>;
    getStats(): Promise<Stats>;
    seedData(): Promise<void>;
    submitContact(name: string, email: string, phone: string, projectType: string, budget: string, deadline: string, message: string): Promise<bigint>;
    updateStats(projectCount: bigint, clientCount: bigint, expertCount: bigint, yearsOfExperience: bigint): Promise<void>;
}
