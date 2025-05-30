import { useState, useEffect, useCallback } from 'react'
import { TypeAnimation } from 'react-type-animation';
import { AnimatePresence, motion } from "motion/react";
import { useForm } from '@formspree/react';
import './index.css'
import React from 'react';

import image0 from "./assets/0.jpg";
import image1 from "./assets/1.JPG";
import image2 from "./assets/2.JPG";
import image3 from "./assets/3.jpg";
import image4 from "./assets/chat.png";
import quizcreator from "./assets/quizcreator.png";
import shootingwatch from "./assets/shootingwatch.png";
import cheatdle from "./assets/cheatdle.png";
import pantry from "./assets/pantry.png";
import MCIRetro_Vault from "./assets/MCIRetro_Vault.png";
import CTP from "./assets/CTP.jpg";
import BASTA from "./assets/BASTA.jpg";

console.warn = () => {};

function App() {

  const imageMap = {
    0: image0,
    1: image1,
    2: image2,
    3: image3,
    4: image4,
  }

  const projectItems = [
    {
      title: "AI Textbook Quiz Creator",
      image: quizcreator,
      about: "This is a project that allows users to upload a document containing study material, and then uses AI to generate a set of flashcards and multiple choice questions.",
      role: "I was responsible for this entire application, including frontend and backend development, as well as project documentation and pitch presentation.",
      tech: "This project uses a React frontend and a Flask backend. The AI inferences are powered by OpenAI's GPT-4o model.",
      repo: "https://github.com/luna-miguel/textbook-quiz-creator",
      try: "https://ai-textbook-quiz-creator.onrender.com/",
    },
    {
      title: "Shooting Watch",
      image: shootingwatch,
      about: "This is a project that recreates the Shooting Watch, a retro toy from the Japanese game company Hudson Soft. It's a stopwatch that measures your button mashing speed.",
      role: "This was a passion project that I worked on in my free time. I wrote all of the code as well as created all of the art assets.",
      tech: "This was originally an Electron.js application, using vanilla JavaScript and HTML/CSS.",
      repo: "https://github.com/luna-miguel/shooting-watch",
      try: "https://luna-miguel.github.io/shooting-watch/"
    },
    {
      title: "Cheatdle",
      image: cheatdle,
      about: "This is a project that uses machine learning and information theory to give users information and strategies for the game Wordle, inspired by the video from 3Blue1Brown.",
      role: "I was primarily responsible for implementing the random forest machine learning model for predicting word difficulty, as well as project documentation.",
      tech: "This application uses various Python data science libraries, including pandas, numpy, and scikit-learn. It was originally deployed on Streamlit.",
      repo: "https://github.com/ahmadbasyouni10/Cheatdle",
      try: ""
    },
    {
      title: "CUNY Pantry Finder",
      image: pantry,
      about: 'This is a project allows users to find nearby CUNY food pantries, as part of the hackathon "CTP Hacks 2024".',
      role: "I was responsible for implementing the backend and database that controls the information about the food pantries.",
      tech: "This application uses a React frontend and a Node.js backend. The database is powered by MongoDB.",
      repo: "https://github.com/Kevinorta/CUNYPantryFinder",
      try: "https://luna-miguel.github.io/cuny-pantry-finder/"
    },
    {
      title: "MCI RetroVault",
      image: MCIRetro_Vault,
      about: 'This is a project allows users to learn about and play classic video games.',
      role: "I was partially responsible for both the frontend and backend of this project, including implementation of the emulator and access to the API.",
      tech: 'This application uses a React frontend and a Node.js backend. The app uses an emulator called "EmulatorJS". The data is sourced from the Giant Bomb API.',
      repo: "https://github.com/CS9490/MCIRetroVault",
      try: ""
    },
  ]

  const experienceItems = [
    {
      title: "CUNY Tech Prep",
      image: CTP,
      description: "This was a two-semester program where I took courses and created projects in data science, and also learned general professional development skills in the tech industry.",
      period: "I participated in this program from September 2024 to May 2025.",
      outcome: "I learned a lot of key machine learning technologies, and practiced skills like creating projects in a team, networking with industry professionals, and interviewing for tech jobs."
    },
    { 
      title: "Basta B-SWEP",
      image: BASTA,
      description: "This was a 10-week fellowship program where I practiced technical interview skills with data structures and algorithms one-on-one with a Google software engineer.",
      period: "I participated in this fellowship for 10 weeks, from March 2025 to May 2025.",
      outcome: "I sharpened up my technical interviewing abilities (communication, problem-solving) and my knowledge of data structures and algorithms."
    },
  ]

  const commandList = [
    [["about", "ABOUT ME"], ["education", "EDUCATION"], ["projects", "PROJECTS"], ["experience", "EXPERIENCE"], ["chat", "AI CHAT"], ["contact", "CONTACT"]],
    [["general", "GENERAL"], ["hobbies", "HOBBIES"], ["start", "MY START"], ["interests", "INTERESTS"], ["back", "BACK"]],
    [["degree", "DEGREE"], ["gpa", "GPA"], ["coursework", "COURSES"], ["skills", "SKILLS"], ["back", "BACK"]],
    [["desc", "DESCRIBE"], ["role", "MY ROLE"], ["tech", "TECHNOLOGY"], ["repo", "VIEW CODE"], ["try", "TRY DEMO"], ["back", "BACK"]],
    [["desc", "DESCRIBE"], ["period", "PERIOD"], ["out", "OUTCOME"], ["back", "BACK"]],
    [["chat", "CHAT"], ["log", "LOG"], ["back", "BACK"]],
    [["github", "GITHUB"], ["linkedin", "LINKEDIN"], ["resume", "RESUME"], ["form", "FORM"], ["back", "BACK"]],
    [["back", "BACK"]],
  ]

  const [mode, setMode] = useState(0);

  const [textBody, setTextBody] = useState("Welcome! You found my website.\nSelect a command from the menu.");
  const [contentText, setContentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [input, setInput] = useState("");
  const [submit, setSubmit] = useState("");
  const [command, setCommand] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [animationKey, setAnimationKey] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [isFormExiting, setIsFormExiting] = useState(false);
  const [isTextUpdating, setIsTextUpdating] = useState(false);
  const [formSubmitCount, setFormSubmitCount] = useState(0);

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);
  const [isCarouselInitialLoad, setIsCarouselInitialLoad] = useState(false);
  const [isCarouselExiting, setIsCarouselExiting] = useState(false);

  const [isServerReady, setIsServerReady] = useState(false);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const [isCarouselTransitioning, setIsCarouselTransitioning] = useState(false);

  const [chatLogs, setChatLogs] = useState([]);

  useEffect(() => {
    const checkHealth = () => {
      fetch('https://portfolio-server-xc15.onrender.com/health', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit'
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setIsServerReady(true);
        setShowLoadingPopup(false);
      })
      .catch(error => {
        console.error('Error checking API health:', error);
        setIsServerReady(false);
      });
    };

    // Initial check
    checkHealth();

    // Set up interval for subsequent checks
    const intervalId = setInterval(checkHealth, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const nonCharKeys = ["Escape", "Tab", "CapsLock", "Shift", "Control", "Alt", "Meta", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]

  const handleKeyPress = useCallback((event) => {
    // Ignore key events if we're on mobile
    if (isMobile) {
      return;
    }

    // Ignore key events if the target is an input or textarea
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    // Ignore key events if any popup is open or transitioning
    if (showChat || showForm || isFormExiting) {
      return;
    }

    if (event.key === "Escape" && mode === 7 && !isWaitingForResponse && !isTyping) {
      setMode(5);
      setImageIndex(4);
      setTextBody("Got something to ask about me or my work? This AI assistant will answer your questions on my behalf.");
      return;
    }

    if (event.key === "Backspace") {
      setInput(input => input.slice(0, -1))
    }
    else if (event.key === "Enter") {
      if(mode === 7) {
        setSubmit(input)
      } else {
        setSubmit(input.toLowerCase())
      }
      setInput("")
    }
    else {
      if (!isTyping && !(nonCharKeys.includes(event.key))) {
        if (input.length < 25 || mode === 7) {
          setInput(input => input + event.key)
        }
      }
    }
  }, [input, isTyping, showChat, showForm, isFormExiting, mode, isWaitingForResponse, isMobile]);

  const handleInputChange = (e) => {
    if (!isTyping) {
      if (input.length < 25 || mode === 7) {
        setInput(e.target.value);
      }
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(mode === 7) {
        setSubmit(input);
      } else {
        setSubmit(input.toLowerCase());
      }
      setInput('');
      // Blur the input to close the keyboard
      e.target.blur();
      // Scroll back up after keyboard closes
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  // Add blur handler to scroll up when keyboard is dismissed
  const handleInputBlur = () => {
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Command parser
  useEffect(() => {
    if (submit !== "") {
      // Reset command state before processing new command
      setCommand("");
      setSubmit(""); // Reset submit state immediately after capturing it

      if (mode === 0) {
        if (submit.includes("about") || submit.includes("me") || submit.includes("1")) { setCommand("about") }
        else if (submit.includes("edu") || submit.includes("2")) { setCommand("education") }
        else if (submit.includes("pro") || submit.includes("3")) { setCommand("projects") }
        else if (submit.includes("exp") || submit.includes("4")) { setCommand("experience") }
        else if (submit.includes("ai") || submit.includes("chat") || submit.includes("5")) { setCommand("chat") }
        else if (submit.includes("contact") || submit.includes("6")) { setCommand("contact") }
        else { setCommand("invalid") }
      }
      else if (mode === 1) {
        if (submit.includes("gen") || submit.includes("1")) { setCommand("general") }
        else if (submit.includes("hob") || submit.includes("2")) { setCommand("hobbies") }
        else if (submit.includes("int") || submit.includes("3")) { setCommand("interests") }
        else if (submit.includes("start") || submit.includes("4")) { setCommand("start") }
        else if (submit.includes("back") || submit.includes("5")) { setCommand("back") }
        else { setCommand("invalid") }
      }
      else if (mode === 2) {
        if (submit.includes("deg") || submit.includes("1")) { setCommand("degree") }
        else if (submit.includes("gpa") || submit.includes("2")) { setCommand("gpa") }
        else if (submit.includes("course") || submit.includes("3")) { setCommand("coursework") }
        else if (submit.includes("skil") || submit.includes("4")) { setCommand("skills") }
        else if (submit.includes("back") || submit.includes("5")) { setCommand("back") }
        else { setCommand("invalid") }
      }
      else if (mode === 3) {
        if (submit.includes("des") || submit.includes("1")) { setCommand("desc") }
        else if (submit.includes("rol") || submit.includes("my") || submit.includes("2")) { setCommand("role") }
        else if (submit.includes("tech") || submit.includes("3")) { setCommand("tech") }
        else if (submit.includes("repo") || submit.includes("view") || submit.includes("code") || submit.includes("4")) { setCommand("repo") }
        else if (submit.includes("try") || submit.includes("demo") || submit.includes("5")) { setCommand("try") }
        else if (submit.includes("back") || submit.includes("6")) { setCommand("back") }
        else if(submit.includes("next")) { setCurrentCarouselIndex(prev => (prev + 1) % carouselItems.length); }
        else if(submit.includes("prev")) { setCurrentCarouselIndex(prev => (prev - 1 + carouselItems.length) % carouselItems.length); }
        else { setCommand("invalid") }
      }
      else if (mode === 4) {
        if (submit.includes("des") || submit.includes("1")) { setCommand("describe") }
        else if (submit.includes("per") || submit.includes("2")) { setCommand("period") }
        else if (submit.includes("out") || submit.includes("3")) { setCommand("outcome") }
        else if (submit.includes("back") || submit.includes("4")) { setCommand("back") }
        else if(submit.includes("next")) { setCurrentCarouselIndex(prev => (prev + 1) % carouselItems.length); }
        else if(submit.includes("prev")) { setCurrentCarouselIndex(prev => (prev - 1 + carouselItems.length) % carouselItems.length); }
        else { setCommand("invalid") }
      }
      else if (mode === 5) {
        if (submit.includes("chat") || submit.includes("1")) { setCommand("chat") }
        else if (submit.includes("log") || submit.includes("2")) { setCommand("log") }
        else if (submit.includes("back") || submit.includes("3")) { setCommand("back") }
        else { setCommand("invalid") }
      }
      else if (mode === 6) {
        if (submit.includes("git") || submit.includes("1")) { setCommand("github") }
        else if (submit.includes("link") || submit.includes("2")) { setCommand("linkedin") }
        else if (submit.includes("form") || submit.includes("3")) { setCommand("form") }
        else if (submit.includes("res") || submit.includes("4")) { setCommand("resume") }
        else if (submit.includes("back") || submit.includes("5")) { setCommand("back") }
        else { setCommand("invalid") }
      }
      else if (mode === 7) {
        setSubmit("");
        if (submit.trim().length > 0) {
        // Send submit to server for ChatGPT response
          const newChatLog = { role: "user", content: submit.trim() };
          setChatLogs(prev => [...prev, newChatLog]);
          setTextBody("...");
          setIsWaitingForResponse(true);
          fetch('https://portfolio-server-xc15.onrender.com/chat', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ content: submit }),
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setTextBody('"' + data.response.result + '"');
            setChatLogs(prev => [...prev, { role: "assistant", content: data.response.result }]);
            // Wait for text animation to complete before showing commands
            setTimeout(() => {
              setIsWaitingForResponse(false);
            }, 1000); // Adjust timing based on your text animation duration
          })
        }
      }
    }
  }, [submit, mode])

  // Command handler
  useEffect(() => {
    if (command !== "") {
      setInput("");
      setCommand(""); 
      setSubmit(""); 
      setContentText(""); 

      // Skip if the same command was chosen
      if (command === lastCommand && (mode !== 3 && mode !== 4 && mode !== 5 && mode !== 6)) {
        return;
      }
      setLastCommand(command);

      if (command === "invalid") {
        setTextBody("Sorry, I didn't understand that. Try again.");
      }
      else if (command === "back") {
        if (mode === 7) {
          setMode(5);
          setImageIndex(4);
          setTextBody("Got something to ask about me or my work? This AI assistant will answer your questions on my behalf.");
        } else {
          setTextBody("Select a command from the menu.");
          setIsTransitioning(true);
          if (showCarousel) {
            setIsCarouselExiting(true);
            setTimeout(() => {
              setMode(0);
              setImageIndex(0);
              setShowCarousel(false);
              setCurrentCarouselIndex(0);
              setIsCarouselExiting(false);
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 400);
          } else {
            setTimeout(() => {
              setMode(0);
              setImageIndex(0);
              setShowCarousel(false);
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 400);
          }
        }
      }
      else {
        if (mode === 0) {
          if (command === "about") {
            setIsTransitioning(true);
            setTextBody("Hi there! What would you like to know about me?");
            setTimeout(() => {
              setMode(1);
              setImageIndex(3);
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 300);
          }
          if (command === "education") {
            setIsTransitioning(true);
            setTextBody("What would you like to know about my education?");
            setTimeout(() => {
              setMode(2);
              setImageIndex(2);
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 300);
          }
          if (command === "projects") {
            setIsTransitioning(true);
            setTextBody("What would you like to know about my projects?");
            setTimeout(() => {
              setMode(3);
              setCarouselItems(projectItems);
              setShowCarousel(true);
              setIsCarouselInitialLoad(true);
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 300);
          }
          if (command === "experience") {
            setIsTransitioning(true);
            setTextBody("What would you like to know about my previous experience?");
            setTimeout(() => {
              setMode(4);
              setCarouselItems(experienceItems);
              setShowCarousel(true);
              setIsCarouselInitialLoad(true);
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 300);
          }
          if (command === "chat") {
            setIsTransitioning(true);
            setTextBody("Got something to ask about me or my work? This AI assistant will answer your questions on my behalf.");
            setShowLoadingPopup(true);
            setTimeout(() => {
              setMode(5);
              setImageIndex(4);
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 300);
          }
          if (command === "contact") {
            setIsTransitioning(true);
            setTextBody("How would you like to contact me?");
            setTimeout(() => {
              setMode(6);
              setImageIndex(-1);
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 300);
          }
        }

        if (mode === 1) {
          if (command === "general") {
            setTextBody("My name is Miguel Luna. My birthday's October 24th, 2002.\nI live in the New York / New Jersey area. My family's background is Filipino.");
          }
          if (command === "hobbies") {
            setTextBody("I love collecting and tinkering with retro games and tech.\nGame cartridges, CRT TVs, VHS and cassette tapes, you name it.\nBesides that, I also love art.");
          }
          if (command === "start") {
            setTextBody("I took computer science classes in high school, out of a desire to learn more about video game mechanics and coding.\nI've been programming for 9 years now, for work and for fun!");
          }
          if (command === "interests") {
            setTextBody("My primary interests are in web and game development,\n but I'm open to all SWE-adjacent tech fields. I'd love to learn more about machine learning and cybersecurity.");
          }
        }

        if (mode === 2) {
          if (command === "degree") {
            if(imageIndex === -1) {
                setIsTransitioning(true);
                setTimeout(()=> {
                  setImageIndex(2);
                setIsTransitioning(false);
                }, 300)
            }
            else {
              setImageIndex(2);
            }
            setTextBody("I got my undergraduate degree in Computer Science at The City College of New York.\nI graduated in May 2025.");
          }
          if (command === "gpa") {
            if(imageIndex === -1) {
              setIsTransitioning(true);
              setTimeout(()=> {
                setImageIndex(2);
              setIsTransitioning(false);
              }, 300)
            }
            else {
              setImageIndex(2);
            }
            setTextBody("My GPA after graduation was 3.794.");
          }
          if (command === "coursework") {
            setIsTransitioning(true);
            setTimeout(()=> {
              setImageIndex(-1);
              setIsTransitioning(false);
            }, 300)
            setTextBody("See above for some relevant coursework.");
            setIsTransitioning(true);
            setTimeout(() => {
              setContentText("Relevant coursework includes:\n\n    * Algorithms\n    * Data structures\n    * Database systems\n    * Software engineering\n    * Website design\n    * Machine learning\n    * Discrete mathematics");
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 300);
          }
          if (command === "skills") {
            setIsTransitioning(true);
            setTimeout(()=> {
              setImageIndex(-1);
              setIsTransitioning(false);
            }, 300)
            setTextBody("See above for some programming lanugages and technologies I use. Open to learning more, of course!");
            setIsTransitioning(true);
            setTimeout(() => {
              setContentText("I regularly work with:\n\n    * Python\n    * C++\n    * Java\n    * HTML + CSS\n    * JavaScript\n    * React\n    * SQL");
              setAnimationKey(prev => prev + 1);
              setIsTransitioning(false);
            }, 300);
          }
        }

        if(mode === 3) {
          setTextBody("");
          if(command === "desc") { setTextBody(projectItems[currentCarouselIndex].about); }
          if(command === "role") { setTextBody(projectItems[currentCarouselIndex].role); }
          if(command === "tech") { setTextBody(projectItems[currentCarouselIndex].tech); }
          if(command === "repo") { window.open(projectItems[currentCarouselIndex].repo, "_blank", "noreferrer"); }
          if(command === "try") { 
            if(projectItems[currentCarouselIndex].try !== "") { window.open(projectItems[currentCarouselIndex].try, "_blank", "noreferrer"); }
            else { setTextBody("Sorry, no demo is available for this project."); }
          }
        }

        if(mode === 4) {
          if(command === "desc") { setTextBody(experienceItems[currentCarouselIndex].description); }
          if(command === "period") { setTextBody(experienceItems[currentCarouselIndex].period); }
          if(command === "out") { setTextBody(experienceItems[currentCarouselIndex].outcome); }
        }

        if(mode === 5) {
          if(command === "chat") {
            setTextBody('"What is it, boss?"');
            setMode(7);
          }
          if(command === "log") {
            setTimeout(() => {
              setShowChat(true);
              setIsFormExiting(true);
            }, 300);
          }
        }

        if (mode === 6) {
          if (command === "github") { window.open("https://github.com/luna-miguel", "_blank", "noreferrer"); }
          if (command === "linkedin") { window.open("https://www.linkedin.com/in/miguel-lorenzo-luna/", "_blank", "noreferrer"); }
          if (command === "resume") { window.open("https://drive.google.com/file/d/1LN8FZqIaJrBciyeItKaaqaRTClevjm8O/view?usp=sharing", "_blank", "noreferrer"); }
          if (command === "form") {
            setShowForm(true);
          }
        }
      }
    }
  }, [command, mode, lastCommand, showCarousel])

  useEffect(() => {
    if (isCarouselInitialLoad) {
      const timer = setTimeout(() => {
        setIsCarouselInitialLoad(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCarouselInitialLoad]);

  function ContactForm({ onClose }) {
    console.log('ContactForm component mounted');
    const [state, handleSubmit] = useForm("xeogwryk");
    const [showContents, setShowContents] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
      document.documentElement.classList.add('popup-open');
      document.body.classList.add('popup-open');
      return () => {
        document.documentElement.classList.remove('popup-open');
        document.body.classList.remove('popup-open');
      };
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContents(true);
      }, 500);
      return () => clearTimeout(timer);
    }, []);

    const validateForm = () => {
      const newErrors = {};
      if (!formData.name.trim()) {
        newErrors.name = 'Please enter your name';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Please enter your email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.subject.trim()) {
        newErrors.subject = 'Please enter a subject';
      }
      if (!formData.message.trim()) {
        newErrors.message = 'Please enter a message';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        handleSubmit(e);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };

    const handleClose = () => {
      setShowContents(false);
      setIsExiting(true);
      setTimeout(() => {
        onClose();
      }, 500);
    };

    useEffect(() => {
      if (state.succeeded) {
        setShowContents(false);
        setIsExiting(true);
        const timer = setTimeout(() => {
          onClose();
          setIsTextUpdating(true);
          setFormSubmitCount(prev => prev + 1);
          setTextBody("Form was sent successfully. Thanks for your submission!");
          setTimeout(() => {
            setIsTextUpdating(false);
          }, 1000);
        }, 500);
        return () => clearTimeout(timer);
      }
    }, [state.succeeded, onClose]);

    return (
      <div class="popup-overlay">
        <div class="popup" style={{ animation: isExiting ? 'collapse 0.5s steps(1) forwards' : 'expand 0.5s steps(1) forwards' }} >
          <button className="close-button" onClick={handleClose} style={{ visibility: showContents ? "visible" : "hidden" }}>╳</button>
          <div className="popup-content" style={{ visibility: showContents ? "visible" : "hidden" }}>

            <form onSubmit={handleFormSubmit} className="contact-form" noValidate>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  id="name" 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  id="subject" 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <div class="form-check">
                {showContents && (
                  <TypeAnimation
                    sequence={["Leave a message, and I'll get back to you ASAP!"]}
                    style={{ whiteSpace: 'pre-line', marginTop: '10px' }}
                    cursor={false}
                    speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
                  />
                )}
                <button type="submit" disabled={state.submitting}>Submit</button>
              </div>

            </form>

          </div>
        </div>
      </div>
    );
  }

  function ChatPopup({ onClose }) {
    const [showContents, setShowContents] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
      document.documentElement.classList.add('popup-open');
      document.body.classList.add('popup-open');
      return () => {
        document.documentElement.classList.remove('popup-open');
        document.body.classList.remove('popup-open');
      };
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContents(true);
      }, 500);
      return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
      setShowContents(false);
      setIsExiting(true);
      setIsFormExiting(true);
      setTimeout(() => {
        onClose();
        setIsFormExiting(false);
      }, 500);
    };

    return (
      <motion.div 
        className="popup-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "linear" }}
        style={{ backgroundColor: 'transparent' }}
      >
        <motion.div 
          className="popup chat-popup"
          style={{
            animation: isExiting ? 'collapse 0.5s steps(1) forwards' : 'expand 0.5s steps(1) forwards'
          }}
        >
          <div className="close-button-wrapper">
            <button className="close-button" onClick={handleClose} style={{ visibility: showContents ? "visible" : "hidden" }}>╳</button>
          </div>
          <div className="popup-content" style={{ visibility: showContents ? "visible" : "hidden" }}>
            { chatLogs.length === 0 ? 
              <p className='no-messages'>No messages to show.</p>
            :
              chatLogs.map((log, index) => (
                <div key={index} className={`chat-message ${log.role}`}>
                  <div className="chat-role">{log.role === 'user' ? 'You' : 'AI Assistant'}</div>
                  <div className="chat-bubble">{log.content}</div>
                </div>
              ))
            }
          </div>
        </motion.div>
      </motion.div>
    );
  }

  function Carousel({ items }) {
    const handlePrev = () => {
      setIsCarouselTransitioning(true);
      setCurrentCarouselIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const handleNext = () => {
      setIsCarouselTransitioning(true);
      setCurrentCarouselIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const handleIndicatorClick = (index) => {
      if (index !== currentCarouselIndex) {
        setIsCarouselTransitioning(true);
        setCurrentCarouselIndex(index);
      }
    };

    return (
      <div className="carousel-container">
        <div className="carousel-content">
          {(mode === 3 || mode === 4) && (
            <button className="carousel-nav prev" onClick={handlePrev}>◀</button>
          )}
          <div className="carousel-item-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCarouselIndex}
                className="carousel-item"
                initial={isCarouselInitialLoad ? 
                  { WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)` } : 
                  isCarouselTransitioning ? 
                  { WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)` } : 
                  false
                }
                animate={{ 
                  WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)`
                }}
                exit={{ 
                  WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)`,
                  transition: { duration: 0.5, ease: "linear" }
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "linear"
                }}
                onAnimationComplete={() => {
                  if (isCarouselInitialLoad) {
                    setIsCarouselInitialLoad(false);
                  }
                  setIsCarouselTransitioning(false);
                }}
              >
                <img src={items[currentCarouselIndex].image} alt={items[currentCarouselIndex].title} />
                <p className="carousel-caption">{items[currentCarouselIndex].title}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          {(mode === 3 || mode === 4) && (
            <button className="carousel-nav next" onClick={handleNext}>▶</button>
          )}
        </div>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentCarouselIndex ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
            >
              {index === currentCarouselIndex ? '⚫' : '⚪'}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Wrap the carousel in a memo to prevent unnecessary re-renders
  const MemoizedCarousel = React.memo(Carousel, (prevProps, nextProps) => {
    return prevProps.items === nextProps.items;
  });

  const handleCommand = useCallback((command) => {
    setSubmit(command);
  }, []);

  function LoadingPopup() {
    const [showContents, setShowContents] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContents(true);
      }, 500);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (isServerReady) {
        setShowLoadingPopup(false);
      }
    }, [isServerReady]);

    useEffect(() => {
      const blinkInterval = setInterval(() => {
        setIsVisible(prev => !prev);
      }, 1000);
      return () => clearInterval(blinkInterval);
    }, []);

    return (
      <motion.div 
        className="popup-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "linear" }}
        style={{ backgroundColor: 'transparent' }}
      >
        <motion.div 
          className="popup loading-popup"
        >
          <div className="popup-content" style={{ visibility: showContents ? "visible" : "hidden" }}>
            <div className="loading-text" style={{ visibility: isVisible ? "visible" : "hidden" }}>
              Connecting to server...
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const handleFooterClick = () => {
    if (isMobile) {
      const hiddenInput = document.getElementById('hidden-input');
      if (hiddenInput) {
        hiddenInput.focus();
        // Scroll to a position that's closer to the input area
        setTimeout(() => {
          const scrollAmount = window.innerHeight * 0.3; // Scroll 30% of the viewport height
          window.scrollTo({
            top: scrollAmount,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="content">
          <AnimatePresence mode='wait'>
            <section key={animationKey}>
              {(!showLoadingPopup || isServerReady) && showCarousel && (mode === 3 || mode === 4) && (
                <motion.div 
                  className="content-text"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <AnimatePresence mode="wait">
                    {!isCarouselExiting && (
                      <motion.div
                        key="carousel"
                        initial={{ WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)` }}
                        animate={{ WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)` }}
                        exit={{ WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)`, transition: { duration: 0.5, ease: "linear" } }}
                        transition={{ duration: 1, ease: "linear" }}
                      >
                        <MemoizedCarousel items={carouselItems} onClose={() => {
                          setShowCarousel(false);
                        }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
              {(!showLoadingPopup || isServerReady) && !showCarousel && imageIndex !== -1 && !showChat && !showForm && (
                <div className={`content-text ${mode === 0 ? 'mode-0' : ''} ${mode === 5 ? 'mode-5' : ''} ${mode === 7 ? 'mode-7' : ''}`}>
                  <AnimatePresence mode="wait">
                    {!isTransitioning && (
                      <motion.div
                        key={mode === 5 || mode === 7 ? 'chat-image' : `image-${imageIndex}-${mode}`}
                        initial={mode === 7 ? false : { WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)` }}
                        animate={mode === 7 ? false : { WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)` }}
                        exit={mode === 7 ? false : { WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)`, transition: { duration: 0.3, ease: "linear" } }}
                        transition={mode === 7 ? undefined : { duration: 1, ease: "linear" }}
                      >
                        <img id='image' src={imageMap[imageIndex]} alt="Image" />
                        {mode === 0 && (
                          <div className="welcome-text">
                            <TypeAnimation
                              sequence={["MIGUEL LUNA"]}
                              style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
                              cursor={false}
                              speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
                            />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              {(!showLoadingPopup || isServerReady) && !showCarousel && imageIndex === -1 && (
                <div className="content-text">
                  <AnimatePresence mode="wait">
                    {!isTransitioning && (
                      <motion.div
                        key={`content-${animationKey}`}
                        initial={{ WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)` }}
                        exit={{ WebkitMaskImage: `repeating-linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)`, transition: { duration: 0.3, ease: "linear" } }}
                      >
                        {contentText && (
                          <TypeAnimation
                            key={`type-${contentText}`}
                            sequence={[contentText]}
                            style={{ whiteSpace: 'pre' }}
                            cursor={false}
                            speed={{ type: 'keyStrokeDelayInMs', value: 25 }}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </section>
          </AnimatePresence>
        </div>

        <div className="menu">
          <AnimatePresence mode='wait'>
            {(!showLoadingPopup || isServerReady) && mode >= 0 && !isTyping && !isTransitioning && !isTextUpdating && !isWaitingForResponse &&
              commandList[mode].map((command, i) => {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0, delay: i * 0.1 }}
                    className="command"
                    style={{ visibility: (showForm || isFormExiting) ? "hidden" : "visible" }}
                  >
                    <div className="command-pointer" id={`hover${i}`}>{'>'}</div>
                    <a
                      onMouseEnter={() => document.getElementById(`hover${i}`).style.visibility = "visible"}
                      onMouseLeave={() => document.getElementById(`hover${i}`).style.visibility = "hidden"}
                      onMouseDown={() => setCommand(command[0])}>
                      {command[1]}
                    </a>
                  </motion.div>
                )
              })
            }
          </AnimatePresence>
        </div>

        <div className="footer">
          <div className="text-start" style={{ visibility: (showForm || isFormExiting || (showLoadingPopup && !isServerReady)) ? "hidden" : "visible" }}>
            <div> * </div>
            {!isTyping && <div>{'>'}</div>}
          </div>

          <div className="text-body" 
               style={{ visibility: (showForm || isFormExiting || (showLoadingPopup && !isServerReady)) ? "hidden" : "visible" }}
               onClick={handleFooterClick}>
            <div className="typing-container">
              <TypeAnimation
                key={`text-${textBody}-${formSubmitCount}`}
                sequence={[() => { setIsTyping(true) }, textBody, () => { setIsTyping(false); }]}
                style={{ 
                  whiteSpace: 'pre-line',
                  display: 'inline-block',
                  width: '100%'
                }}
                cursor={false}
                speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
                wrapper="span"
              />
            </div>
            {!isTyping && <div id="input">{input}█ </div>}
            <input
              id="hidden-input"
              type="text"
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showForm && <ContactForm key="contact-form" onClose={() => {
          setInput("");
          setShowForm(false);
        }} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {showChat && <ChatPopup key="chat-popup" onClose={() => {
          setInput("");
          setShowChat(false);
        }} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {showLoadingPopup && <LoadingPopup key="loading-popup" />}
      </AnimatePresence>
    </>
  )
}

export default App
