const universeProjects = [
  // --- SOFTWARE (RIGHT SIDE) ---
  
  // Close (Importance: 1)
  { 
    title: "Personal Portfolio V1", 
    tech: "HTML/CSS • JS", 
    desc: "My first personal portfolio website featuring a clean UI design to showcase my skills and projects.", 
    type: "software", 
    importance: 1, 
    media: "assets/project_images/software/portfolio_v1.webp" 
  },
  { 
    title: "SpotifMe Music Player", 
    tech: "Vanilla JS • HTML/CSS", 
    desc: "A fully functional music player web application. Instead of using a framework, I used complex Vanilla Javascript to dynamically fetch playlists from a local JSON database, manage audio playback states, and update the UI in real-time with a custom responsive layout.", 
    type: "software", 
    importance: 1, 
    media: "assets/project_images/software/spotify.webp" 
  },
  { 
    title: "Advanced Face Recognizer", 
    tech: "Python • OpenCV • ML", 
    desc: "A biometric identification system. It uses a script to process images of known people and saves their facial data into a database. A second script scans live video feeds, compares the faces to the database, and identifies people in real-time.", 
    type: "software", 
    importance: 1, 
    media: "assets/project_images/software/face_recognizer.webp" 
  },

  // Mid (Importance: 2)
  { 
    title: "AuraPlay Netflix Clone", 
    tech: "HTML/CSS • UI/UX", 
    desc: "A premium streaming platform landing page clone. It features a visually striking hero section, an email signup form, and a responsive Trending Now content carousel, demonstrating a strong grasp of modern UI aesthetics.", 
    type: "software", 
    importance: 2, 
    media: "assets/project_images/software/netflix.webp" 
  },
  { 
    title: "SpaceX Landing Page", 
    tech: "HTML/CSS • Animations", 
    desc: "A high-fidelity clone of the SpaceX landing page focusing heavily on frontend layout structure, bold typography, and replicating sleek aerospace-themed design using pure CSS.", 
    type: "software", 
    importance: 2, 
    media: "assets/project_images/software/spacex.webp" 
  },
  { 
    title: "Jarvis AI Assistant", 
    tech: "Python • NLP • APIs", 
    desc: "A voice-activated virtual assistant utilizing speech recognition to listen to user commands and fetch real-time information from the web to answer questions dynamically.", 
    type: "software", 
    importance: 2, 
    media: "assets/project_images/software/jarvis.webp" 
  },

  // Far (Importance: 3)
  { 
    title: "Real-time Face Detector", 
    tech: "Python • OpenCV", 
    desc: "A computer vision utility that actively scans video feeds or images to detect the presence of human faces, drawing bounding boxes around them in real-time.", 
    type: "software", 
    importance: 3, 
    media: "assets/project_images/software/face_detector.webp" 
  },

  // --- ROBOTICS (LEFT SIDE) ---

  // Close (Importance: 1)
  { 
    title: "CyberRover V2", 
    tech: "ESP32 • LoRa • Autonomous Robotics", 
    desc: "An autonomous AI-powered inspection rover developed for post-blast underground mine safety. It navigates hazardous environments using ultrasonic sensors, monitors carbon monoxide and air quality with MQ-7 and MQ-135 sensors, transmits live environmental data through LoRa communication.", 
    type: "robotics", 
    importance: 1, 
    media: "assets/project_images/robotics/cyberrover_v2.webp" 
  },
  { 
    title: "High Speed Racer", 
    tech: "RC • Hardware", 
    desc: "A custom built high-speed racing robot designed for agility and rapid response.", 
    type: "robotics", 
    importance: 1, 
    media: "assets/project_images/robotics/high_speed_racer.webp" 
  },
  { 
    title: "8-Wheeled Modular Fighter", 
    tech: "ESP32 • Hardware", 
    desc: "The standard agility configuration of the modular combat rover, featuring 8 wheels for high maneuverability during robo fights.", 
    type: "robotics", 
    importance: 1, 
    media: "assets/project_images/robotics/8_wheeled_modular_fighter.webp" 
  },

  // Mid (Importance: 2)
  { 
    title: "12-Wheeled Combat Fighter", 
    tech: "ESP32 • Wi-Fi", 
    desc: "The extreme power configuration of the combat robot. Utilizing 12 wheels, it maximizes traction and pushing force against opponents.", 
    type: "robotics", 
    importance: 2, 
    media: "assets/project_images/robotics/12_wheeled_modular_fighter.webp" 
  },
  { 
    title: "CyberRover V1", 
    tech: "Hardware • Sensors", 
    desc: "The first iteration of the CyberRover inspection robot series, laying the foundation for autonomous navigation.", 
    type: "robotics", 
    importance: 2, 
    media: "assets/project_images/robotics/cyberrover_v1.webp" 
  },
  { 
    title: "Obstacle Avoider", 
    tech: "Arduino Uno • IR Sensors", 
    desc: "An autonomous robot capable of detecting nearby obstacles using infrared sensors and making movement decisions without human intervention.", 
    type: "robotics", 
    importance: 2, 
    media: "assets/project_images/robotics/obstacle_avoider.webp" 
  },

  // Far (Importance: 3)
  { 
    title: "Object Distance Estimator", 
    tech: "Arduino • Ultrasonic Sensor", 
    desc: "A hardware utility project that uses an ultrasonic sensor to accurately measure and estimate the distance of physical objects in front of it in real-time.", 
    type: "robotics", 
    importance: 3, 
    media: "assets/project_images/robotics/object_distance_estimator.webp" 
  },
  { 
    title: "Driver's Sleep Detector", 
    tech: "Python • OpenCV • dlib", 
    desc: "A real-time safety monitoring system using dlib and a 68-point facial landmark predictor to actively track a driver's eyes. It calculates the Eye Aspect Ratio (EAR) to detect drowsiness.", 
    type: "robotics", 
    importance: 3, 
    media: "assets/project_images/robotics/driver sleep detector.jpeg" 
  },

  // --- MODELS (OUTER SHELL - IMPORTANCE: 4) ---
  
  { 
    title: "H2O Powered Rocket", 
    tech: "Physical Model", 
    desc: "A physical science model demonstrating propulsion using pressurized water.", 
    type: "models", 
    importance: 4, 
    media: "assets/project_images/models/H2O powered rocket.webp" 
  },
  { 
    title: "Boat Model", 
    tech: "Physical Model", 
    desc: "A detailed physical model of a boat.", 
    type: "models", 
    importance: 4, 
    media: "assets/project_images/models/boat.webp" 
  },
  { 
    title: "Castle", 
    tech: "Physical Model", 
    desc: "A creative structural model of a castle.", 
    type: "models", 
    importance: 4, 
    media: "assets/project_images/models/castle.webp" 
  },
  { 
    title: "Flower Vase", 
    tech: "Physical Model", 
    desc: "A creatively crafted flower vase model.", 
    type: "models", 
    importance: 4, 
    media: "assets/project_images/models/flower vase.webp" 
  },
  { 
    title: "Popstick House", 
    tech: "Physical Model", 
    desc: "An architectural model house built entirely using popsicle sticks.", 
    type: "models", 
    importance: 4, 
    media: "assets/project_images/models/popstick house.webp" 
  }
];
