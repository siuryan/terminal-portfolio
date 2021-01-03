export const WELCOME_STRING = `Hello! This is an interactive portfolio modeled after a terminal that showcases my work differently from the main site.
\r
\rType \`help\` and press ENTER or RETURN to get started.
\r
\r`

function generateMenuString(desc, menu_dict) {
    var str = desc;
    Object.entries(menu_dict).forEach(function([key, value]) {
        str += "\n\r    " + key + "\t" + value;
    });
    return str;
}

const HELP_DICT = {
    "projects": "Take a look at some of my projects",
    "about": "Learn more about me",
    "contact": "Get my contact information",
    "resume": "View my resume",
    "links": "Find links to my professional profiles",
}
export const HELP_STRING = generateMenuString("Try the following commands:", HELP_DICT)

export const ERROR_STRING = "Invalid command. Type `help` and press ENTER or RETURN to get started."

export const ABOUT_STRING = `Hi! My name is Ryan Siu and I'm a software engineer from NYC, currently attending the University of Michigan.
\rI enjoy playing basketball, doing puzzles, and playing board games (especially social deduction games).
\rPlease reach out if you want to chat about anything!`

export const CONTACT_STRING = "Shoot me an email at rsiu05@gmail.com or send me a message on LinkedIn!"

const LINKS_DICT = {
    "LinkedIn": "https://www.linkedin.com/in/ryansiu5",
    "Medium": "https://medium.com/@ryansiu",
    "GitHub": "https://github.com/siuryan",
}
export const LINKS_STRING = generateMenuString("Links to some of my professional profiles:", LINKS_DICT)

export const RESUME_STRING = "Head to https://ryansiu.tech and click on the Resume link!"

const PROJECTS_HELP_DICT = {
    "Chron-x": "DIY smartwatch",
    "Augury": "Sentiment based stock trading recommender",
    "Graphics": "Graphics engine",
    "Simplicity": "Airline simulator game",
    "Robotics": "First Tech Challenge robot and website code"
}
export const PROJECTS_HELP_STRING = generateMenuString("Here are some projects I've worked on (try the command `projects <name>` to learn more about a project):", PROJECTS_HELP_DICT)

export const SMARTWATCH_STRING = `Chron-x is an open source, Arduino-based, Bluetooth-enabled smartwatch that can receive notifications from your Android phone once connected via an app.
\r    Medium: https://medium.com/@ryansiu/how-to-make-your-own-smartwatch-35ff8306c160
\r    GitHub: https://github.com/siuryan/watch`

export const AUGURY_STRING = `Augury is a web app that uses machine learning to display stock trading recommendations, based on public sentiment on Twitter.
\r    GitHub: https://github.com/siuryan/augury
\r    Devpost: https://devpost.com/software/augury`

export const GRAPHICS_ENGINE_STRING = `Created for a graphics class in high school, this command-based graphics engine, written in C, generates 2D and 3D images with realistic lighting and polygon meshes. It can also take .mdl script files as input to generate an image, and it can create basic animations as GIFs.
\r    GitHub: https://github.com/siuryan/graphics-engine`

export const SIMPLICITY_STRING = `Simplicity is an airline simulator game where you manage an airline company. Fly planes across the country as you try to build your fleet, and send your airplanes on the best routes to make the most money! This project was written for APCS / Data Structures and Algorithms, and implements a priority queue and Dijkstra's algorithm, amongst other data structures and algorithms.
\r    GitHub: https://github.com/siuryan/Simplicity`

export const ROBOTICS_STRING = `As the Head of Software Engineering on Stuy Fission, I created the Stuy Fission website and wrote the robot code for the '17-'18 season, Relic Recovery. Built using Jekyll and Materialize, the website served as a portfolio and a blog. The robot code, another “relic” of my time on Stuy Fission, was developed throughout the competition season and controlled our robot's driver-controlled and autonomous movement.
\r    GitHub organization: https://github.com/fission310
\r    GitHub website: https://github.com/fission310/fission310.github.io
\r    GitHub robot code: https://github.com/fission310/relic-recovery`
