import {
    FaYoutube,
    FaInstagram,
    FaTiktok,
    FaLinkedin,
    FaTwitter,
    FaBlogger,
  } from "react-icons/fa";
  
  export const contentTemplates = [
   
    {
        name: "Blog Post",
        desc: "An AI tool that generate youtube video description from your information",
        category: "Blog",
        icon: FaBlogger,
        aiPrompt:
          "Give me an seo optimised and human-generated  blog post content with more than 3000 words and make it clean and sounds like natural, make it engaging and informative ",
      },

   
    {
      name: "Youtube Video Description",
      desc: "An AI tool that generate youtube video description from your information",
      category: "Youtube",
      icon: FaYoutube,
      aiPrompt:
        "Give me youtube video description Ideas based on given video description outline and title and give me result in Rich Text Editor format",
      slug: "youtube-description",
    },
      {
      name: "Youtube Video Idea",
      desc: "An AI tool that generate Youtube Video Idea based on given information",
      category: "Youtube",
      icon: FaYoutube,
      aiPrompt:
        "Give me youtube video idea on given video niche & outline topic and give me result in Rich Text Editor format",
      slug: "generate-youtube-video-idea",
    },
    {
      name: "Instagram Hashtags",
      desc: "An AI tool that generate Instagram hashtags based on your post niche and outline information",
      category: "Instagram",
      icon: FaInstagram,
      aiPrompt:
        "Give me some good examples of instagram hashtags on given niche & outline topic and give me result in Rich Text Editor format",
      slug: "generate-instagram-hashtags",
      
    },
    {
      name: "Tiktok Hashtags",
      desc: "An AI tool that generate Tiktok topic idea based on your post niche and outline information",
      category: "Tiktok",
      icon: FaTiktok,
      aiPrompt:
        "Give me some good examples of instagram hashtags on given niche & outline topic and give me result in Rich Text Editor format",
      slug: "generate-tiktok-hashtags",
    
    },
    {
      name: "Linkedin Post",
      desc: "An AI tool that generate Linkedin Post idea based on your post niche and outline information",
      category: "Linkedin",
      icon: FaLinkedin,
      aiPrompt:
        "Give me some good examples of Linkedin Post idea on given niche & outline topic and give me result in Rich Text Editor format",
      slug: "generate-likedin-post",
    },
    {
      name: "Tweet",
      desc: "An AI tool that generate Linkedin Post idea based on your post niche and outline information",
      category: "Tweet",
      icon: FaTwitter,
      aiPrompt:
        "Give me 280 characters of tweet example on given niche & outline topic",
      slug: "generate-tweet-post",
    },
  ];