import { compomint, tmpl } from "compomint";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/javascript/javascript.js";

// Import other modules
import "./theme-switcher.js";
import "./syntax-highlighter.js";
import "./language-switcher.js";

//import "/Users/choish/workspaces/kurukona/compomint-website/public/templates/section-examples.cmint";

// Make CodeMirror available globally
window.CodeMirror = CodeMirror;

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", async function () {
  await loadTemplate(initApp);
  // Initialize dark mode
  initDarkMode();
});

export async function loadTemplate(initApp) {
  // Load all template files
  // NOTE: Template files are loaded once and cached. Changes to template files
  // require a page refresh to take effect as they are not dynamically reloaded.

  const promise = compomint
    .addTmplByUrl([
      "templates/app-layout.cmint",
      "templates/layout-header.cmint",
      "templates/layout-footer.cmint",
      "templates/section-hero.cmint",
      "templates/section-features.cmint",
      "templates/section-vscode-extension.cmint",
      "templates/section-examples.cmint",
      "templates/section-architecture.cmint",
      "templates/section-syntax.cmint",
      "templates/section-installation.cmint",
      "templates/section-documentation.cmint",
      "templates/section-integrations.cmint",
      "templates/page-tutorial.cmint",

      "templates/ui-cookie-consent.cmint",
      "templates/ui-language-switcher.cmint",

      "templates/cmint-brui.cmint",
      "templates/cmint-playground.cmint",
    ])
    .then(() => {
      console.log("loaded templates, now initialize app");
      initApp(compomint, tmpl);
    });
}

// Initialize hash navigation
function initHashNavigation() {
  // Function to scroll to target element
  function scrollToElement(targetId) {
    if (!targetId || targetId === "#") return false;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Accounting for fixed header
        behavior: "smooth",
      });
      return true;
    }
    return false;
  }

  // Handle initial hash on page load
  function handleInitialHash() {
    if (window.location.hash) {
      // Wait for DOM to be fully rendered
      setTimeout(() => {
        scrollToElement(window.location.hash);
      }, 100);
    }
  }

  // Add click handlers for hash links
  function addHashLinkHandlers() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");

        if (scrollToElement(targetId)) {
          // Update URL hash without triggering hashchange event
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // Handle browser back/forward navigation
  window.addEventListener("hashchange", function () {
    scrollToElement(window.location.hash);
  });

  // Handle popstate for browser navigation
  window.addEventListener("popstate", function () {
    if (window.location.hash) {
      scrollToElement(window.location.hash);
    }
  });

  // Initialize everything
  addHashLinkHandlers();
  handleInitialHash();

  // Re-initialize when DOM changes (for dynamic content)
  const observer = new MutationObserver(function (mutations) {
    let shouldReinitialize = false;
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function (node) {
          if (
            node.nodeType === 1 &&
            node.querySelector &&
            node.querySelector('a[href^="#"]')
          ) {
            shouldReinitialize = true;
          }
        });
      }
    });

    if (shouldReinitialize) {
      setTimeout(addHashLinkHandlers, 100);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

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
async function initApp(compomint, tmpl) {
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
      fetchDataLoading: {
        title: {
          en: "Fetch Data Loading",
          ko: "데이터 가져오기 로딩",
          ja: "データ取得ローディング",
          zh: "数据获取加载",
        },
        description: {
          en: "Real-time data fetching with pagination and loading states.",
          ko: "페이지네이션과 로딩 상태를 포함한 실시간 데이터 가져오기",
          ja: "ページネーションとローディング状態を含むリアルタイムデータ取得",
          zh: "具有分页和加载状态的实时数据获取",
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
      reactIntegration: {
        title: {
          en: "React + Compomint Integration",
          ko: "React + Compomint 통합",
          ja: "React + Compomint統合",
          zh: "React + Compomint 集成",
        },
        description: {
          en: "Using Compomint templates inside React components for flexible UI templating",
          ko: "유연한 UI 템플릿을 위해 React 컴포넌트 내에서 Compomint 템플릿 사용",
          ja: "柔軟なUIテンプレートのためにReactコンポーネント内でCompomintテンプレートを使用",
          zh: "在React组件中使用Compomint模板以获得灵活的UI模板",
        },
      },
      vueIntegration: {
        title: {
          en: "Vue + Compomint Integration",
          ko: "Vue + Compomint 통합",
          ja: "Vue + Compomint統合",
          zh: "Vue + Compomint 集成",
        },
        description: {
          en: "Using Compomint templates within Vue.js components for enhanced templating",
          ko: "Vue.js 컴포넌트 내에서 Compomint 템플릿을 사용하여 향상된 템플릿 기능 제공",
          ja: "Vue.jsコンポーネント内でCompomintテンプレートを使用した拡張テンプレート機能",
          zh: "在Vue.js组件中使用Compomint模板以增强模板功能",
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
  const fetcherTemplate = await (
    await fetch("templates/demo/demo.DataFetcher.cmint")
  ).text();
  const userManagementTemplate = await (
    await fetch("templates/demo/demo.UserManagement.cmint")
  ).text();
  const userManagementTemplateTable = await (
    await fetch("templates/demo/demo.UserManagementTable.cmint")
  ).text();

  // Define the architecture section
  const architecture = tmpl.section.Architecture({});

  // Define the syntax section
  const syntax = tmpl.section.Syntax({});

  // Define the installation section
  const installation = tmpl.section.Installation({});

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
          class: "h-[1000px]",
          interactive: true,
          title:
            compomint.i18n.examples?.fetchDataLoading?.title(
              "Fetch Data Loading"
            ),
          description: compomint.i18n.examples?.fetchDataLoading?.description(
            "Real-time data fetching with pagination and loading states."
          ),
          type: "codeIsTemplateFile",
          template: fetcherTemplate,
          code: `// Create and render the data fetcher component
console.log('[App] Initializing Data Fetcher Demo');
const dataFetcher = tmpl.demo.DataFetcher({
  dataFiles: [
    'templates/fetch-data/data1.json',
    'templates/fetch-data/data2.json', 
    'templates/fetch-data/data3.json',
    'templates/fetch-data/data4.json',
    'templates/fetch-data/data5.json'
  ]
});
document.body.appendChild(dataFetcher.element);`,
          showConsole: true,
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

  // Define the integrations section
  const integrations = tmpl.section.Integrations({
    integrationExamples: () => [
      {
        title:
          compomint.i18n.examples?.reactIntegration?.title("React Integration"),
        description: compomint.i18n.examples?.reactIntegration?.description(
          "Using Compomint templates inside React components for flexible UI templating"
        ),
        icon: "⚛️",
        gradient: "from-blue-500 to-cyan-500",
        class: "h-[600px]",
        interactive: true,
        code: `// Load React if not already loaded - Please Click Run Button!
if (!window.React) {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
  script.onload = () => {
    const reactDomScript = document.createElement('script');
    reactDomScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
    reactDomScript.onload = initializeApp;
    document.head.appendChild(reactDomScript);
  };
  document.head.appendChild(script);
} else {
  initializeApp();
}

function initializeApp() {
  // 1. Create simple Compomint template
  compomint.addTmpl('status-card', \`
    ##
      // text-green-800 text-yellow-800 text-blue-800
      const statusColor = data.status === 'success' ? 'green' : 
                         data.status === 'warning' ? 'yellow' : 'blue';
    ##
    <div class="p-4 bg-##=statusColor##-50 border border-##=statusColor##-200 rounded-lg">
      <div class="flex items-center">
        <span class="text-2xl mr-3">##=data.icon##</span>
        <div>
          <h3 class="font-bold text-##=statusColor##-800">##=data.title##</h3>
          <p class="text-##=statusColor##-600">##=data.message##</p>
        </div>
      </div>
    </div>
  \`);

  // 2. Simple React Hook for Compomint
  function useCompomint(templateId, data) {
    const [element, setElement] = React.useState(null);
    const containerRef = React.useRef(null);
    
    React.useEffect(() => {
      if (containerRef.current) {
        const comp = compomint.tmpl(templateId)(data);
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(comp.element);
      }
    }, [templateId, JSON.stringify(data)]);
    
    return containerRef;
  }

  // 3. React Component using Compomint template
  function StatusCard({ title, message, icon, status }) {
    const containerRef = useCompomint('status-card', {
      title, message, icon, status
    });
    
    return React.createElement('div', { ref: containerRef });
  }

  // 4. Main React App
  function App() {
    const [count, setCount] = React.useState(0);
    
    return React.createElement('div', { className: 'p-6 space-y-4' },
      React.createElement('h1', { className: 'text-2xl font-bold mb-4' }, 
        'React + Compomint Demo'),
      
      React.createElement('div', { className: 'space-y-3' },
        React.createElement(StatusCard, {
          title: 'Counter Status',
          message: \`Current count: \${count}\`,
          icon: '📊',
          status: count > 5 ? 'success' : count > 2 ? 'warning' : 'blue'
        }),
        
        React.createElement(StatusCard, {
          title: 'System Status', 
          message: 'All systems operational',
          icon: '✅',
          status: 'success'
        })
      ),
      
      React.createElement('div', { className: 'pt-4' },
        React.createElement('button', {
          className: 'px-4 py-2 bg-blue-500 text-white rounded mr-2',
          onClick: () => setCount(count + 1)
        }, 'Increment: ' + count),
        
        React.createElement('button', {
          className: 'px-4 py-2 bg-gray-500 text-white rounded',
          onClick: () => setCount(0)
        }, 'Reset')
      )
    );
  }

  // 5. Render the app
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(React.createElement(App), container);
}`,
      },
      {
        title:
          compomint.i18n.examples?.vueIntegration?.title("Vue Integration"),
        description: compomint.i18n.examples?.vueIntegration?.description(
          "Using Compomint templates within Vue.js components for enhanced templating"
        ),
        icon: "🔧",
        gradient: "from-green-500 to-emerald-500",
        class: "h-[600px]",
        interactive: true,
        code: `// Load Vue.js if not already loaded - Please Click Run Button!
if (!window.Vue) {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/vue@3/dist/vue.global.js';
  script.onload = initializeVueApp;
  document.head.appendChild(script);
} else {
  initializeVueApp();
}

function initializeVueApp() {
  const { createApp, ref, onMounted, onUnmounted, watchEffect } = Vue;

  // 1. Create Compomint templates for Vue components
  compomint.addTmpl('product-card', \`
    ##
      const priceColor = data.onSale ? 'text-red-600' : 'text-gray-800';
      const badgeClass = data.onSale ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
    ##
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <img src="##=data.image##" alt="##=data.name##" class="w-full h-32 object-cover rounded mb-3">
      <h3 class="font-semibold text-gray-900 mb-2">##=data.name##</h3>
      <p class="text-sm text-gray-600 mb-3">##=data.description##</p>
      <div class="flex justify-between flex-row-reverse items-center">
        <span class="##=priceColor## font-bold">##=data.price##</span>
        ##if (data.onSale) {##
          <span class="px-2 text-xs font-semibold ##=badgeClass## rounded-full mb-2">
            SALE
          </span>
        ##}##
      </div>
      <button class="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600" data-co-event="##:data.onAddToCart##">
        Add to Cart
      </button>
    </div>
  \`);

  compomint.addTmpl('shopping-cart', \`
    ##
      const totalPrice = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    ##
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 class="font-semibold text-gray-900 mb-3">Shopping Cart (##=data.items.length##)</h3>
      ##if (data.items.length === 0) {##
        <p class="text-gray-500">Your cart is empty</p>
      ##} else {##
        <div class="space-y-2 mb-3">
          ##data.items.forEach(item => {##
            <div class="flex justify-between items-center py-1">
              <span class="text-sm">##=item.name## x##=item.quantity##</span>
              <span class="text-sm font-medium">$##=(item.price * item.quantity).toFixed(2)##</span>
            </div>
          ##})##
        </div>
        <div class="border-t pt-2">
          <div class="flex justify-between items-center font-semibold">
            <span>Total:</span>
            <span>$##=totalPrice.toFixed(2)##</span>
          </div>
        </div>
      ##}##
    </div>
  \`);

  // 2. Vue composable for Compomint integration
  function useCompomint(templateId, data) {
    const containerRef = ref(null);
    let compomintInstance = null;

    const updateCompomint = () => {
      if (containerRef.value) {
        // Remove previous instance
        if (compomintInstance) {
          compomintInstance.remove();
        }
        
        // Create new instance
        compomintInstance = compomint.tmpl(templateId)(data.value);
        containerRef.value.innerHTML = '';
        containerRef.value.appendChild(compomintInstance.element);
      }
    };

    onMounted(() => {
      updateCompomint();
    });

    watchEffect(() => {
      updateCompomint();
    });

    onUnmounted(() => {
      if (compomintInstance) {
        compomintInstance.remove();
      }
    });

    return containerRef;
  }

  // 3. Vue app with Compomint components
  const app = createApp({
    setup() {
      // State
      const cartItems = ref([]);
      
      const products = ref([
        {
          id: 1,
          name: 'Wireless Headphones',
          description: 'High-quality sound with noise cancellation',
          price: 99.99,
          onSale: true,
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmMGYwZjAiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIyMCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg=='
        },
        {
          id: 2,
          name: 'Smart Watch',
          description: 'Track your fitness and stay connected',
          price: 199.99,
          onSale: false,
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSIzMCIgeT0iMzAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg=='
        }
      ]);

      // Methods
      const addToCart = (product) => {
        const existingItem = cartItems.value.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cartItems.value.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
          });
        }
      };

      // Compomint refs
      const cartRef = useCompomint('shopping-cart', ref({
        items: cartItems
      }));

      return {
        products,
        cartItems,
        addToCart,
        cartRef
      };
    },

    template: \`
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Vue + Compomint Shop</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Products (Vue components using Compomint templates) -->
          <div class="lg:col-span-2">
            <h2 class="text-lg font-semibold mb-4">Products</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CompomintProductCard 
                v-for="product in products" 
                :key="product.id"
                :product="product"
                @add-to-cart="addToCart"
              />
            </div>
          </div>
          
          <!-- Cart (Compomint template) -->
          <div>
            <h2 class="text-lg font-semibold mb-4">Cart</h2>
            <div ref="cartRef"></div>
          </div>
        </div>
      </div>
    \`
  });

  // 4. Register Vue component that uses Compomint
  app.component('CompomintProductCard', {
    props: ['product'],
    emits: ['add-to-cart'],
    setup(props, { emit }) {
      const productData = ref({
        ...props.product,
        onAddToCart: () => emit('add-to-cart', props.product)
      });

      const containerRef = useCompomint('product-card', productData);

      return { containerRef };
    },
    template: '<div ref="containerRef"></div>'
  });

  // 5. Mount the app
  const container = document.createElement('div');
  document.body.appendChild(container);
  app.mount(container);
}`,
      },
    ],
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
    architecture: architecture,
    syntax: syntax,
    installation: installation,
    examples: examples,
    integrations: integrations,
    documentation: documentation,
    footer: footer,
  });

  // Render the app to the DOM
  const appContainer = document.getElementById("app-container");
  appContainer.appendChild(appLayout.element);
  window.appLayout = appLayout;

  // Initialize hash navigation
  initHashNavigation();

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
        //runOnStart: true,
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
