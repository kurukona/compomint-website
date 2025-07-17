import { compomint, tmpl } from "compomint";
import "../css/input.css";

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", async function () {
  // Load all template files
  // NOTE: Template files are loaded once and cached. Changes to template files
  // require a page refresh to take effect as they are not dynamically reloaded.

  const promise = compomint.addTmplByUrl([
    "templates/app-layout.cmint",
    "templates/layout-header.cmint",
    "templates/layout-footer.cmint",
    "templates/section-hero.cmint",
    "templates/section-features.cmint",
    "templates/section-vscode-extension.cmint",
    "templates/section-examples.cmint",
    "templates/section-documentation.cmint",
    "templates/page-tutorial.cmint",

    "templates/ui-cookie-consent.cmint",
    "templates/ui-language-switcher.cmint",

    "templates/cmint-brui.cmint",
    "templates/cmint-playground.cmint",
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
  // Add core application i18n that's needed globally for meta tags and language switching
  compomint.addI18ns({
    examples: {
      basicComponent: {
        title: {
          en: "Basic Component",
          ko: "기본 컴포넌트",
          ja: "基本的なコンポーネント",
          zh: "基础组件",
        },
        description: {
          en: "Simple template definition and usage",
          ko: "간단한 템플릿 정의와 사용 방법",
          ja: "シンプルなテンプレート定義と使用方法",
          zh: "简单的模板定义和使用方法",
        },
      },
      stateManagement: {
        title: {
          en: "State Management",
          ko: "상태 관리",
          ja: "状態管理",
          zh: "状态管理",
        },
        description: {
          en: "How to manage internal component state and respond to events",
          ko: "컴포넌트 내부 상태를 관리하고 이벤트에 반응하는 방법",
          ja: "コンポーネントの内部状態を管理しイベントに応答する方法",
          zh: "如何管理组件内部状态并响应事件",
        },
      },
      complexComponent: {
        title: {
          en: "Complex Component",
          ko: "복잡한 컴포넌트",
          ja: "複雑なコンポーネント",
          zh: "复杂组件",
        },
        description: {
          en: "A more complex component example: Todo List",
          ko: "더 복잡한 컴포넌트 예제: Todo 리스트",
          ja: "より複雑なコンポーネントの例：Todoリスト",
          zh: "更复杂的组件示例：待办事项列表",
        },
      },
      userManagementTable: {
        title: {
          en: "Data Table Component",
          ko: "데이터 테이블 컴포넌트",
          ja: "データテーブルコンポーネント",
          zh: "数据表格组件",
        },
        description: {
          en: "Interactive table with sorting, filtering and pagination",
          ko: "정렬, 필터링, 페이지네이션이 포함된 인터랙티브 테이블",
          ja: "ソート、フィルタリング、ページネーションを備えたインタラクティブテーブル",
          zh: "具有排序、过滤和分页功能的交互式表格",
        },
      },
      multiTemplate: {
        title: {
          en: "Multi-Template Application",
          ko: "다중 템플릿 애플리케이션",
          ja: "マルチテンプレートアプリケーション",
          zh: "多模板应用程序",
        },
        description: {
          en: "Complete application example combining multiple templates",
          ko: "여러 템플릿을 결합한 완전한 애플리케이션 예제",
          ja: "複数のテンプレートを組み合わせた完全なアプリケーション例",
          zh: "结合多个模板的完整应用程序示例",
        },
      },
    },
  });

  // Define the header component
  const header = tmpl.layout.Header({});

  // Define the hero section
  const hero = tmpl.section.Hero({});

  // Define the features section
  const features = tmpl.section.Features({});

  // Define the VSCode extension section
  const vscodeExtension = tmpl.section.VSCodeExtension({});

  // Load templates for examples
  const counterTemplate = await (
    await fetch("templates/demo/demo.Counter.cmint")
  ).text();
  const todoTemplate = await (
    await fetch("templates/demo/demo.TodoList.cmint")
  ).text();
  const userManagementTemplate = await (
    await fetch("templates/demo/demo.UserManagement.cmint")
  ).text();
  const userManagementTemplateTable = await (
    await fetch("templates/demo/demo.UserManagementTable.cmint")
  ).text();

  // Define the examples section with example data
  const examples = tmpl.section.Examples({
    examples: () => {
      return [
        {
          class: "h-[500px]",
          interactive: true,
          title:
            compomint.i18n.examples?.basicComponent?.title("Basic Component"),
          description: compomint.i18n.examples?.basicComponent?.description(
            "Simple template definition and usage"
          ),
          code: `// Template definition
compomint.addTmpl('demo-Button', \`
  <button class="ui-Button p-2 ##=data.color ? 'bg-' + data.color + '-50' : ''##"
    data-co-event="##:data.onClick##">
    ##=data.label##
  </button>
\`);

// Create and use component
const button = tmpl.demo.Button({
  label: 'Click here',
  color: 'indigo',
  onClick: function() {
    alert('The button has been clicked!');
  }
});
document.body.appendChild(button.element);`,
        },
        {
          class: "h-[700px]",
          interactive: true,
          title:
            compomint.i18n.examples?.stateManagement?.title("State Management"),
          description: compomint.i18n.examples?.stateManagement?.description(
            "How to manage internal component state and respond to events"
          ),
          type: "codeIsTemplateFile",
          template: counterTemplate,
          code: `// Create a counter component for an example
const counter = tmpl.demo.Counter({
  initialCount: 1
});
document.body.appendChild(counter.element);`,
        },
        {
          class: "h-[1000px]",
          interactive: true,
          title:
            compomint.i18n.examples?.complexComponent?.title(
              "Complex Component"
            ),
          description: compomint.i18n.examples?.complexComponent?.description(
            "A more complex component example: Todo List"
          ),
          type: "codeIsTemplateFile",
          template: todoTemplate,
          code: `// Create a todo list component for an example
const todoList = tmpl.demo.TodoList({
  initialTodos: [
    { text: "Read Compomint documentation", completed: true },
    { text: "Create your first component", completed: false },
    { text: "Apply to website", completed: false }
  ]
});
document.body.appendChild(todoList.element);`,
        },
        {
          class: "h-[1400px]",
          interactive: true,
          title: compomint.i18n.examples?.userManagementTable?.title(
            "Data Table Component"
          ),
          description:
            compomint.i18n.examples?.userManagementTable?.description(
              "Interactive table with sorting, filtering and pagination"
            ),
          type: "codeIsTemplateFile",
          template: userManagementTemplateTable,
          imports: [],
          code: `// Create a user management system for an example
const userManagementTable = tmpl.demo.UserManagementTable({
  users: [
    { id: 1, name: 'Kim Chul-su', email: 'kim@example.com', role: 'admin', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Lee Young-hee', email: 'lee@example.com', role: 'moderator', status: 'active', joinDate: '2024-02-10' },
    { id: 3, name: 'Park Min-su', email: 'park@example.com', role: 'user', status: 'inactive', joinDate: '2024-03-05' },
    { id: 4, name: 'Choi Ji-eun', email: 'choi@example.com', role: 'user', status: 'pending', joinDate: '2024-06-20' }
  ]
});
document.body.appendChild(userManagementTable.element);`,
        },
        {
          class: "h-[1400px]",
          interactive: true,
          title: compomint.i18n.examples?.multiTemplate?.title(
            "Multi-Template Application"
          ),
          description: compomint.i18n.examples?.multiTemplate?.description(
            "Complete application example combining multiple templates"
          ),
          type: "codeIsTemplateFile",
          template: userManagementTemplate,
          imports: [],
          code: `// Create a user management system for an example
const userManagement = tmpl.demo.UserManagement({
  users: [
    { id: 1, name: 'Kim Chul-su', email: 'kim@example.com', role: 'admin', active: true, joinDate: '2024-01-15' },
    { id: 2, name: 'Lee Young-hee', email: 'lee@example.com', role: 'moderator', active: true, joinDate: '2024-02-10' },
    { id: 3, name: 'Park Min-su', email: 'park@example.com', role: 'user', active: false, joinDate: '2024-03-05' },
    { id: 4, name: 'Choi Ji-eun', email: 'choi@example.com', role: 'user', active: true, joinDate: '2024-06-20' }
  ]
});
document.body.appendChild(userManagement.element);`,
        },
      ];
    },
  });

  // Define the documentation section
  const documentation = tmpl.section.Documentation({});

  // Define the footer
  const footer = tmpl.layout.Footer({});

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
  window.appLayout = appLayout;

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

  // Store the original layout for navigation
  window.originalLayout = appLayout;
  window.currentPage = "home";
}

// Global function to show different pages
window.showPage = function (pageType) {
  const appContainer = document.getElementById("app-container");

  if (pageType === "tutorial") {
    // Show tutorial page
    window.currentPage = "tutorial";

    // Define tutorial examples data
    const tutorialExamples = [
      {
        id: "getting-started",
        title: "Getting Started",
        description:
          "Learn the basics of Compomint and create your first component.",
        code: `// Create a simple greeting component
compomint.addTmpl('demo-greeting', '<div class="p-4 bg-blue-100 dark:bg-blue-800 rounded-lg">Hello, ##=data.name##!</div>');

// Use the component
const greeting = tmpl.demo.greeting({name: 'World'});
document.body.appendChild(greeting.element);`,
        interactive: true,
        showConsole: false,
      },
      {
        id: "basic-usage",
        title: "Basic Usage",
        description: "Understand data binding and component rendering.",
        code: `// Template with data binding
compomint.addTmpl('user-card', \`
  <div class="p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800">
    <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">##=data.name##</h3>
    <p class="text-gray-600 dark:text-gray-300">##=data.email##</p>
    <p class="text-sm text-gray-500 dark:text-gray-400">Age: ##=data.age##</p>
  </div>\`);

// Create and render component
const userCard = tmpl.user.card({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

document.body.appendChild(userCard.element);`,
        interactive: true,
        showConsole: false,
      },
      {
        id: "template-syntax",
        title: "Template Syntax",
        description: "Explore different template expression types.",
        code: `// Template with various syntax types
compomint.addTmpl('syntax-demo', \`
    ##
      // JavaScript code block
      const currentTime = new Date().toLocaleTimeString();
      const items = ['Apple', 'Banana', 'Orange'];
    ##
    <div class="p-4 space-y-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 class="font-bold text-gray-900 dark:text-gray-100">Template Syntax Demo</h3>
      <p class="text-gray-700 dark:text-gray-300">Name: ##=data.name##</p>
      <p class="text-gray-700 dark:text-gray-300">HTML: ##-data.html##</p>
      <p class="text-gray-700 dark:text-gray-300">Time: ##=currentTime##</p>
      ##if (data.showList) {##
        <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300">
          ##items.forEach(item => {##
            <li>##=item##</li>
          ##})##
        </ul>
      ##}##
    </div>\`);

// Use the component
const syntaxDemo = tmpl.syntax.demo({
  name: 'Alice',
  html: '<strong>Bold Text</strong>',
  showList: true
});

document.body.appendChild(syntaxDemo.element);`,
        interactive: true,
        showConsole: false,
      },
      {
        id: "component-creation",
        title: "Component Creation",
        description:
          "Learn how to create reusable components with state management.",
        code: `// Counter component with state
compomint.addTmpl('demo-counter', \`
    ##
      // Initialize state
      status.count = status.count || data.initialCount || 0;

      function increment() {
        status.count++;
        component.refresh();
      }

      function decrement() {
        status.count--;
        component.refresh();
      }

      function reset() {
        status.count = 0;
        component.refresh();
      }
    ##
    <div class="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
      <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Counter: ##=status.count##</h3>
      <div class="space-x-2">
        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                data-co-event="##:{click: increment}##">+</button>
        <button class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                data-co-event="##:{click: decrement}##">-</button>
        <button class="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                data-co-event="##:{click: reset}##">Reset</button>
      </div>
    </div>
\`);

// Create counter component
const counter = tmpl.demo.counter({initialCount: 5});
document.body.appendChild(counter.element);`,
        interactive: true,
        showConsole: false,
      },
      {
        id: "advanced-features",
        title: "Advanced Features",
        description: "Explore component composition and lifecycle management.",
        code: `// Simple list component
compomint.addTmpl('item-list', \`
    ##
      status.items = status.items || data.items || [];

      function addItem() {
        const input = component.element.querySelector('input');
        if (input.value.trim()) {
          status.items.push(input.value.trim());
          input.value = \\'\\';
          component.refresh();
        }
      }

      function removeItem(index) {
        status.items.splice(index, 1);
        component.refresh();
      }
    ##
    <div class="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 max-w-md">
      <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">My List</h3>
      <div class="mb-4 flex gap-2">
        <input type="text" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
               placeholder="Add an item...">
        <button class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                data-co-event="##:{click: addItem}##">Add</button>
      </div>
      <ul class="space-y-2">
        ##status.items.forEach((item, index) => {##
          <li class="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-600 rounded">
            <span class="flex-1 text-gray-700 dark:text-gray-300">##=item##</span>
            <button class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    data-co-event="##:{click: () => removeItem(index)}##">✕</button>
          </li>
        ##})##
      </ul>
    </div>
\`);

// Create list component
const itemList = tmpl.item.list({
  items: ['Learn Compomint', 'Build awesome apps']
});

document.body.appendChild(itemList.element);`,
        interactive: true,
        showConsole: false,
      },
    ];

    const tutorialPage = tmpl.page.Tutorial({ examples: tutorialExamples });
    appContainer.innerHTML = "";
    appContainer.appendChild(tutorialPage.element);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else if (pageType === "home") {
    // Show home page
    window.currentPage = "home";
    appContainer.innerHTML = "";
    appContainer.appendChild(window.originalLayout.element);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};
