import { compomint, tmpl } from "compomint";

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
    //"templates/demo-components.cmint",
  ]);

  if (promise) {
    // Initialize the application
    promise.then(() => {
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
  // Icons for features section
  const featureIcons = {
    lightweight: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>`,
    template: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
    </svg>`,
    component: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
    </svg>`,
    responsive: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>`,
    easy: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`,
    i18n: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
    </svg>`,
  };

  // Define the header component
  const header = tmpl.ui.Header({
    menuItems: [
      {
        label: compomint.i18n.footer.links.home("Home"),
        url: "#home",
        active: true,
      },
      {
        label: compomint.i18n.footer.links.features("Features"),
        url: "#features",
      },
      {
        label: compomint.i18n.vscode.title("VSCode"),
        url: "#vscode-extension",
      },
      {
        label: compomint.i18n.footer.links.examples("Examples"),
        url: "#examples",
      },
      {
        label: compomint.i18n.footer.links.docs("Documentation"),
        url: "#documentation",
      },
    ],
  });

  // Define the hero section
  const hero = tmpl.ui.Hero({
    title: compomint.i18n.app.title("How to Create Web Components Easily"),
    subtitle: compomint.i18n.app.subtitle(
      "Compomint is a lightweight JavaScript framework that provides a template-based component system."
    ),
    primaryButtonText: compomint.i18n.app.getStarted("Get Started"),
    primaryButtonUrl: "#documentation",
    secondaryButtonText: "GitHub",
    secondaryButtonUrl: "https://github.com/kurukona/compomint",
    codeExample: `<template id="hello-world">
  <style id="style-hello-world">
    .hello-world { color: ##=data.color || 'black'## }
  </style>
  <div class="hello-world">
    <h1>##=data.title || 'Hello'##</h1>
    <p>##=data.message##</p>
  </div>
</template>

// Create and use component
const hello = compomint.tmpl('hello-world')({
  title: 'Hello Compomint!',
  message: 'Easy and simple component',
  color: '#4F46E5'
});

document.body.appendChild(hello.element);`,
  });

  // Define the features section
  const features = tmpl.ui.Features({
    title: compomint.i18n.app.featuresTitle("Why Use Compomint?"),
    features: [
      {
        title: compomint.i18n.features.lightweight.title("Lightweight Size"),
        description: compomint.i18n.features.lightweight.description(
          "Fast loading and execution with a small footprint (~14KB gzipped)."
        ),
        icon: featureIcons.lightweight,
      },
      {
        title: compomint.i18n.features.template.title("Template-Based"),
        description: compomint.i18n.features.template.description(
          "Use a simple yet powerful string-based template syntax with JavaScript evaluation."
        ),
        icon: featureIcons.template,
      },
      {
        title: compomint.i18n.features.component.title("Component-Oriented"),
        description: compomint.i18n.features.component.description(
          "Build reusable UI components with proper encapsulation."
        ),
        icon: featureIcons.component,
      },
      {
        title: compomint.i18n.features.easy.title("Component Composition"),
        description: compomint.i18n.features.easy.description(
          "Combine components like building blocks to create complex UIs."
        ),
        icon: featureIcons.easy,
      },
      {
        title: compomint.i18n.features.responsive.title("State Management"),
        description: compomint.i18n.features.responsive.description(
          "Manage component state efficiently with automatic updates."
        ),
        icon: featureIcons.responsive,
      },
      {
        title: compomint.i18n.features.i18n.title("Internationalization"),
        description: compomint.i18n.features.i18n.description(
          "Built-in support for multiple languages with i18n system."
        ),
        icon: featureIcons.i18n,
      },
    ],
  });

  // VSCode Extension icons
  const vscodeIcons = {
    syntax: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
    </svg>`,
    autocomplete: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>`,
    snippets: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
    </svg>`,
    preview: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>`,
  };

  // Define the VSCode extension section
  const vscodeExtension = tmpl.ui.VSCodeExtension({
    title: compomint.i18n.vscode.title("VSCode Extension"),
    subtitle: compomint.i18n.vscode.subtitle(
      "Boost your Compomint development with powerful VSCode extension that provides syntax highlighting, auto-completion, and live preview."
    ),
    extensionUrl:
      "https://marketplace.visualstudio.com/items?itemName=compomint.compomint-vscode",
    buttonText: compomint.i18n.vscode.install("Install Extension"),
    features: [
      {
        title: compomint.i18n.vscode.features.syntax.title(
          "Syntax Highlighting"
        ),
        description: compomint.i18n.vscode.features.syntax.description(
          "Colored syntax highlighting for Compomint templates and expressions."
        ),
        icon: vscodeIcons.syntax,
      },
      {
        title:
          compomint.i18n.vscode.features.autocomplete.title("Auto-completion"),
        description: compomint.i18n.vscode.features.autocomplete.description(
          "Smart auto-completion for Compomint APIs and template syntax."
        ),
        icon: vscodeIcons.autocomplete,
      },
      {
        title: compomint.i18n.vscode.features.snippets.title("Code Snippets"),
        description: compomint.i18n.vscode.features.snippets.description(
          "Ready-to-use code snippets for common Compomint patterns."
        ),
        icon: vscodeIcons.snippets,
      },
      {
        title: compomint.i18n.vscode.features.preview.title("Live Preview"),
        description: compomint.i18n.vscode.features.preview.description(
          "Real-time preview of your Compomint templates and components."
        ),
        icon: vscodeIcons.preview,
      },
    ],
    screenshots: [
      {
        src: "img/compomint-template-support.png",
        alt: "Compomint Template Support in VSCode",
        title:
          compomint.i18n.vscode.screenshots.template.title("Template Support"),
        description: compomint.i18n.vscode.screenshots.template.description(
          "Advanced template editing with syntax highlighting and IntelliSense."
        ),
      },
      {
        src: "img/template-preview.png",
        alt: "Template Preview Feature",
        title: compomint.i18n.vscode.screenshots.preview.title("Live Preview"),
        description: compomint.i18n.vscode.screenshots.preview.description(
          "See your components rendered in real-time as you code."
        ),
      },
    ],
  });

  // Define the examples section
  const examples = tmpl.ui.Examples({
    title: compomint.i18n.app.examplesTitle("Code Examples"),
    examples: [
      {
        interactive: true,
        title: compomint.i18n.examples.basicComponent.title("Basic Component"),
        description: compomint.i18n.examples.basicComponent.description(
          "Simple template definition and usage"
        ),
        code: `// Template definition
compomint.addTmpl('ui-Button', \` // Template definition
  <button class="ui-Button ##=data.variant ? 'ui-Button--' + data.variant : ''##"
    data-co-event="##:data.onClick##">
    ##=data.label##
  </button>
\`);

// Create and use component
const button = tmpl.ui.Button({
  label: 'Click here',
  variant: 'primary',
  onClick: function() {
    alert('The button has been clicked!');
  }
});
document.body.appendChild(button.element);`,
        //result: button,
      },
      {
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
    ],
  });

  // Define the documentation section
  const documentation = tmpl.ui.Documentation({
    title: compomint.i18n.app.docTitle("Learn More"),
    description: compomint.i18n.app.docDescription(
      "Check out detailed documentation and resources for Compomint."
    ),
    links: [
      {
        label: "Getting Started",
        url: "https://kurukona.github.io/compomint/",
      },
      {
        label: "Basic Usage",
        url: "https://kurukona.github.io/compomint/#basic-usage",
      },
      {
        label: "Template Syntax",
        url: "https://kurukona.github.io/compomint/#template-syntax",
      },
      {
        label: "API Reference",
        url: "https://kurukona.github.io/compomint/#api-reference",
      },
      {
        label: "Examples",
        url: "https://github.com/kurukona/compomint/tree/master/examples",
      },
      { label: "GitHub", url: "https://github.com/kurukona/compomint" },
    ],
  });

  // Define the footer
  const footer = tmpl.ui.Footer({
    description: compomint.i18n.footer.description(
      "Compomint is a lightweight JavaScript framework for creating web applications with a component-based architecture."
    ),
    links: [
      { label: compomint.i18n.footer.links.home("Home"), url: "#home" },
      {
        label: compomint.i18n.footer.links.features("Features"),
        url: "#features",
      },
      {
        label: compomint.i18n.footer.links.examples("Examples"),
        url: "#examples",
      },
      { label: "샘플 코드", url: "samples.html" },
      {
        label: compomint.i18n.footer.links.docs("Documentation"),
        url: "#documentation",
      },
      { label: "GitHub", url: "https://github.com/kurukona/compomint" },
    ],
    email: "choish@kurukona.com",
    github: "kurukona/compomint",
    year: new Date().getFullYear(),
    copyright: "Compomint",
  });

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
