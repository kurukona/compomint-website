import { compomint, tmpl } from "compomint";
import "../css/input.css";

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", async function () {
  // Load all template files
  // NOTE: Template files are loaded once and cached. Changes to template files
  // require a page refresh to take effect as they are not dynamically reloaded.

  const promise = compomint.addTmplByUrl([
    "templates/layout.cmint",
    "templates/header.cmint",
    "templates/hero.cmint",
    "templates/features.cmint",
    "templates/vscode-extension.cmint",
    "templates/examples.cmint",
    "templates/documentation.cmint",
    "templates/footer.cmint",
    "templates/ui-components.cmint",
    "templates/ui.components.cmint",
    "templates/pg.components.cmint",
    "templates/demo-components.cmint",
    "templates/ui-cookie-consent.cmint",
    "templates/ui-language-switcher.cmint",
  ]);

  if (promise) {
    // Initialize the application
    promise.then(() => {
      console.log("loaded templates, now initialize app");
      initApp();
    });
  } else {
    console.error("Failed to load templates, cannot initialize app");
    document.getElementById("app-container").innerHTML =
      '<div class="text-center p-8"><h1 class="text-2xl text-red-600">Error loading application templates</h1></div>';
  }

  // Initialize dark mode
  initDarkMode();
});

// Initialize the dark mode
function initDarkMode() {
  // Check for saved theme preference
  let savedTheme;
  try {
    savedTheme = localStorage.getItem("compomint-theme");
  } catch (e) {
    console.warn("Couldn't access localStorage:", e);
  }

  // Apply preference from localStorage or system preference
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDarkMode =
    savedTheme === "dark" || (savedTheme === null && prefersDarkMode);

  // Apply dark mode if needed
  if (shouldUseDarkMode) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark-mode");
  }
}

// Initialize the application
async function initApp() {
  // Define the header component
  const header = tmpl.ui.Header({});

  // Define the hero section
  const hero = tmpl.ui.Hero({});

  // Define the features section
  const features = tmpl.ui.Features({});

  // Define the VSCode extension section
  const vscodeExtension = tmpl.ui.VSCodeExtension({});

  // Define the examples section with example data
  const examples = tmpl.ui.Examples({
    title: compomint.i18n.app.examplesTitle("Code Examples"),
    examples: [
      {
        class: "h-[500px]",
        interactive: true,
        title: compomint.i18n.examples.basicComponent.title("Basic Component"),
        description: compomint.i18n.examples.basicComponent.description(
          "Simple template definition and usage"
        ),
        code: `// Template definition
compomint.addTmpl('ui-Button', \` // Template definition
  <button class="ui-Button p-2 ##=data.color ? 'bg-' + data.color + '-50' : ''##"
    data-co-event="##:data.onClick##">
    ##=data.label##
  </button>
\`);

// Create and use component
const button = tmpl.ui.Button({
  label: 'Click here',
  color: 'indigo',
  onClick: function() {
    alert('The button has been clicked!');
  }
});
document.body.appendChild(button.element);`,
        //result: button,
      },
      {
        class: "h-[700px]",
        interactive: true,
        title:
          compomint.i18n.examples.stateManagement.title("State Management"),
        description: compomint.i18n.examples.stateManagement.description(
          "How to manage internal component state and respond to events"
        ),
        type: "codeIsTemplateFile",
        template: await (await fetch("templates/demo/ui.Counter.cmint")).text(),
        code: `// Create a counter component for an example
  const counter = tmpl.ui.Counter({
    initialCount: 1,
  });
  document.body.appendChild(counter.element);`,
        //result: counter,
      },
      {
        class: "h-[1000px]",
        interactive: true,
        title:
          compomint.i18n.examples.complexComponent.title("Complex Component"),
        description: compomint.i18n.examples.complexComponent.description(
          "A more complex component example: Todo List"
        ),
        type: "codeIsTemplateFile",
        template: await (
          await fetch("templates/demo/ui.TodoList.cmint")
        ).text(),
        code: `// Create a todo list component for an example
  const todoList = tmpl.ui.TodoList({
    initialTodos: [
      { text: "Read Compomint documentation", completed: true },
      { text: "Create your first component", completed: false },
      { text: "Apply to website", completed: false },
    ],
  });
  document.body.appendChild(todoList.element);`,
        //result: todoList,
      },
      {
        class: "h-[1400px]",
        interactive: true,
        title: compomint.i18n.examples.multiTemplate.title(
          "Multi-Template Application"
        ),
        description: compomint.i18n.examples.multiTemplate.description(
          "Complete application example combining multiple templates"
        ),
        type: "codeIsTemplateFile",
        template: await (
          await fetch("templates/demo/ui.UserManagement.cmint")
        ).text(),
        imports: [],
        code: `// Create a user management system for an example
const userManagement = tmpl.ui.UserManagement({
  users: [
    { id: 1, name: 'Kim Chul-su', email: 'kim@example.com', role: 'admin', active: true, joinDate: '2024-01-15' },
    { id: 2, name: 'Lee Young-hee', email: 'lee@example.com', role: 'moderator', active: true, joinDate: '2024-02-10' },
    { id: 3, name: 'Park Min-su', email: 'park@example.com', role: 'user', active: false, joinDate: '2024-03-05' },
    { id: 4, name: 'Choi Ji-eun', email: 'choi@example.com', role: 'user', active: true, joinDate: '2024-06-20' }
  ]
});
document.body.appendChild(userManagement.element);`,
        //result: userManagement,
      },
    ],
  });

  // Define the documentation section
  const documentation = tmpl.ui.Documentation({});

  // Define the footer
  const footer = tmpl.ui.Footer({});

  // Create the main app layout
  const appLayout = tmpl.app.Layout({
    header: header,
    hero: hero,
    features: features,
    vscodeExtension: vscodeExtension,
    examples: examples,
    documentation: documentation,
    footer: footer,
  });

  // Render the app to the DOM
  const appContainer = document.getElementById("app-container");
  appContainer.appendChild(appLayout.element);

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      console.log("Target ID:", targetId, "Target Element:", targetElement); // Debugging
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Accounting for fixed header
          behavior: "smooth",
        });
      } else {
        console.warn("Target element not found:", targetId);
      }
    });
  });
}
