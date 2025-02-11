# ViteKickstarter

Hey there! 😊

I built ViteKickstarter because sometimes I need a fast, modern starter for my Vite + React projects.

Even the Vite create command is very helpful, but you still need to answer some questions, install packages, and update Vite template pages manually. 

This script basically asks for your project name and lets you select one of several package lists, and then it does everything automatically:

- Installs the necessary basic packages.
- Installs additional packages from the selected list.
- Creates a commonly used folder structure (e.g., `/components`, `/pages`, etc.).
- Rewrites Vite’s basic template code with an improved layout that includes a Header, Footer, and basic structure.
- Runs the project in dev mode.
- Opens the project in your browser.

  * All folder structures and packages are set up according to my preferences, but you can easily edit them in the script file.

  * There is also an .exe version of the script that you can simply run by double-clicking it.

---

## Overview

**ViteKickstarter** is a command-line tool that automates the setup of a new Vite + React (JavaScript) project. It guides you through naming your project and choosing a package template, then scaffolds a project with a modern folder layout and preconfigured demos to get you started quickly.

---

## Features

1. **Interactive Project Setup:**
   - Prompts you for a project name and lets you choose from three package templates: Common Essentials, Expanded Essentials, or Full Essentials.

2. **Modern Folder Structure:**
   - Automatically creates an organized folder hierarchy including `src`, `src/components`, and `src/pages`.

3. **Integrated Package Showcase:**
   - Demonstrates features such as:
     - A Material UI button triggering React Confetti.
     - API data fetching using axios & lodash.
     - Form validation with Formik and Yup.
     - SWR-powered random joke fetching.
     - Immutable state updates using Immer.
     - Smooth animations with Framer Motion.
   - Also includes a Header with classnames, PropTypes, and Material icons.

4. **Advanced Theming:**
   - Sets up a light/dark mode system using modern CSS for a polished look.

5. **Automatic Dependency Installation:**
   - Installs the base dependencies and additional packages based on your chosen template.

6. **Dev Server Launch:**
   - Starts the Vite development server automatically and opens your browser to the project URL.

---

## Dependencies

- **Node.js:**  
  Ensure Node.js is installed (v18 or later recommended). Check by running:
  
      node -v

- **NPM:**  
  The script uses npm to create and install your Vite project.

- **Inquirer:**  
  This project uses the [inquirer](https://www.npmjs.com/package/inquirer) package for interactive command-line prompts. It is included in the `package.json` and `package-lock.json` for easy installation.

- **Built-in Node Modules:**  
  - `fs`
  - `path`
  - `child_process`

---

## Installation

Follow these steps to set up ViteKickstarter:

1. **Clone the Repository:**

       git clone https://github.com/uluutku/ViteKickstarter.git

2. **Navigate to the Project Directory:**

       cd ViteKickstarter

3. **Install Dependencies:**

       npm install

---

## Configuration

ViteKickstarter is ready to use right out of the box. However, you can tweak its behavior by modifying the source code:

1. **Template Packages:**  
   - Adjust the arrays (`commonPackages`, `expandedPackages`, `fullPackages`) in the script to change which additional dependencies are installed.

2. **Folder Structure:**  
   - Customize the generated file templates for components, pages, and main files if needed.

---

## Usage

Follow these steps to use ViteKickstarter:

1. **Run the Script:**

       node ViteKickstarter.js

2. **Follow the Prompts:**
   - Enter your desired project name.
   - Choose your preferred package template (Common, Expanded, or Full).

3. **Project Generation:**
   - The script scaffolds a new Vite + React project.
   - It installs the base dependencies and the additional packages based on your choice.
   - It creates a modern folder structure with demo components and pages.
   - The development server starts automatically and opens your browser to the project URL.

4. **Start Coding:**
   - Your new project is ready to go. Enjoy building your application!

---

## How It Works

1. **Interactive Setup:**  
   - Prompts for the project name and template selection, then converts your project name to kebab-case.
  
2. **Project Creation:**  
   - Runs Vite’s project creation command to scaffold a new React project.
  
3. **Dependency Installation:**  
   - Installs base dependencies followed by additional packages based on your chosen template.
  
4. **Folder Structure Setup:**  
   - Creates a modern folder layout (`src`, `src/components`, `src/pages`) and writes template files for essential components (Header, Footer), demo pages (Home, About), and main entry files (`App.jsx`, `main.jsx`, `main.css`).
  
5. **Development Server Launch:**  
   - Starts the Vite dev server and opens your browser to the default URL.

---

## Troubleshooting

1. **Setup Errors:**  
   - If you encounter any issues during setup, make sure your internet connection is stable and that Node.js and npm are correctly installed.

2. **Permission Issues:**  
   - Run the script with elevated permissions if you face file system errors.

3. **Template Issues:**  
   - If the generated files aren’t as expected, review and adjust the file templates within the script.

---

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository.**
2. **Create a New Branch** with a descriptive name.
3. **Make Your Changes** and ensure you update the documentation if needed.
4. **Submit a Pull Request** with clear commit messages and a detailed explanation of your changes.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
