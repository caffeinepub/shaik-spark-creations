import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    projectType : Text;
    budget : Text;
    deadline : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    description : Text;
    thumbnailUrl : Text;
    publishDate : Time.Time;
  };

  type Testimonial = {
    id : Nat;
    clientName : Text;
    company : Text;
    photoUrl : Text;
    starRating : Nat;
    review : Text;
  };

  type TeamMember = {
    id : Nat;
    name : Text;
    role : Text;
    photoUrl : Text;
    twitter : Text;
    linkedin : Text;
    instagram : Text;
  };

  type PortfolioItem = {
    id : Nat;
    title : Text;
    category : Text;
    thumbnailUrl : Text;
    description : Text;
  };

  type Stats = {
    projectCount : Nat;
    clientCount : Nat;
    expertCount : Nat;
    yearsOfExperience : Nat;
  };

  var nextId = 1;
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let blogPosts = Map.empty<Nat, BlogPost>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let teamMembers = Map.empty<Nat, TeamMember>();
  let portfolioItems = Map.empty<Nat, PortfolioItem>();
  var stats : Stats = {
    projectCount = 120;
    clientCount = 80;
    expertCount = 15;
    yearsOfExperience = 10;
  };

  public shared ({ caller }) func submitContact(
    name : Text,
    email : Text,
    phone : Text,
    projectType : Text,
    budget : Text,
    deadline : Text,
    message : Text,
  ) : async Nat {
    let id = nextId;
    nextId += 1;

    let submission : ContactSubmission = {
      id;
      name;
      email;
      phone;
      projectType;
      budget;
      deadline;
      message;
      timestamp = Time.now();
    };

    contactSubmissions.add(id, submission);
    id;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  public shared ({ caller }) func addBlogPost(title : Text, description : Text, thumbnailUrl : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let post : BlogPost = {
      id;
      title;
      description;
      thumbnailUrl;
      publishDate = Time.now();
    };

    blogPosts.add(id, post);
    id;
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  public query ({ caller }) func getBlogPost(id : Nat) : async ?BlogPost {
    blogPosts.get(id);
  };

  public shared ({ caller }) func addTestimonial(clientName : Text, company : Text, photoUrl : Text, starRating : Nat, review : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let testimonial : Testimonial = {
      id;
      clientName;
      company;
      photoUrl;
      starRating;
      review;
    };

    testimonials.add(id, testimonial);
    id;
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public shared ({ caller }) func addTeamMember(name : Text, role : Text, photoUrl : Text, twitter : Text, linkedin : Text, instagram : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let member : TeamMember = {
      id;
      name;
      role;
      photoUrl;
      twitter;
      linkedin;
      instagram;
    };

    teamMembers.add(id, member);
    id;
  };

  public query ({ caller }) func getAllTeamMembers() : async [TeamMember] {
    teamMembers.values().toArray();
  };

  public shared ({ caller }) func addPortfolioItem(title : Text, category : Text, thumbnailUrl : Text, description : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let item : PortfolioItem = {
      id;
      title;
      category;
      thumbnailUrl;
      description;
    };

    portfolioItems.add(id, item);
    id;
  };

  public query ({ caller }) func getAllPortfolioItems() : async [PortfolioItem] {
    portfolioItems.values().toArray();
  };

  public query ({ caller }) func getPortfolioItemsByCategory(category : Text) : async [PortfolioItem] {
    portfolioItems.values().toArray().filter(func(item) { item.category == category });
  };

  public query ({ caller }) func getStats() : async Stats {
    stats;
  };

  public shared ({ caller }) func updateStats(projectCount : Nat, clientCount : Nat, expertCount : Nat, yearsOfExperience : Nat) : async () {
    stats := {
      projectCount;
      clientCount;
      expertCount;
      yearsOfExperience;
    };
  };

  public shared ({ caller }) func seedData() : async () {
    ignore await addBlogPost("How to Build a Great Website", "Tips and tricks from our expert team", "https://example.com/thumbnail1.jpg");
    ignore await addBlogPost("The Importance of Branding", "Why your brand matters more than ever", "https://example.com/thumbnail2.jpg");

    ignore await addTestimonial("Alice Johnson", "ACME Corp", "https://example.com/photo1.jpg", 5, "Shaik Spark Creations did an amazing job on our website!");
    ignore await addTestimonial("Bob Smith", "Smith & Co", "https://example.com/photo2.jpg", 4, "Very professional and creative team.");

    ignore await addTeamMember("Shaik Mohammed", "Founder & CEO", "https://example.com/shaik.jpg", "https://twitter.com/shaik", "https://linkedin.com/in/shaik", "https://instagram.com/shaik");
    ignore await addTeamMember("Jane Doe", "Designer", "https://example.com/jane.jpg", "https://twitter.com/jane", "https://linkedin.com/in/jane", "https://instagram.com/jane");

    ignore await addPortfolioItem("Corporate Website", "Websites", "https://example.com/website.jpg", "Modern corporate website design");
    ignore await addPortfolioItem("Logo for StartUp", "Logos", "https://example.com/logo.jpg", "Logo design for new startup");
  };
};
