# Zidex-Web Compomint Coding Standards

## Overview

This document outlines the coding standards for using the Compomint template engine in the zidex-web project.

## Basic Setup

### Template Loading

- Template files are loaded using the `compomint.addTmplByUrl()` method
- Multiple template files can be loaded simultaneously

```javascript
// Load multiple template files
compomint
  .addTmplByUrl([
    "templates/zd-Button.cmint",
    "templates/zd-MainPage.cmint",
    "templates/zd-UserCard.cmint",
  ])
  .then(() => {
    console.log("All templates loaded");
    const mainPage = tmpl.zd.MainPage({});
    document.body.appendChild(mainPage.element);
  });
```

### File Extension

- Template files use the `*.cmint` extension
- Small UI-related templates can be grouped in a single `*.cmint` file
- Generally, use one `*.cmint` file per template

### Template Prefix

- All template IDs must start with the `zd` prefix
- Examples: `zd-Button`, `zd-MainPage`, `zd-UserCard`

### Styling Rules

- **Use TailwindCSS 4**: All styling must use TailwindCSS 4
- **NO `<style>` blocks**: Do not use `<style>` blocks inside templates
- **Inline classes**: Apply Tailwind classes directly to HTML elements
- **Custom CSS**: If necessary, use the @apply directive in global CSS files

```html
<!-- Good: Using TailwindCSS classes -->
<div class="grid grid-cols-3 gap-5 p-5 min-h-screen bg-slate-50">
  <div class="bg-white rounded-lg p-5 shadow-lg">
    <!-- Content -->
  </div>
</div>

<!-- Bad: Using style blocks -->
<style>
  .custom-grid { display: grid; }
</style>
<div class="custom-grid">
  <!-- Content -->
</div>
```

### External Library Integration

- **IMPORTANT**: **NEVER use ES6 import/export statements in .cmint files**
  - `.cmint` files are NOT JavaScript modules
  - Using `import` or `export` will cause a "SyntaxError: Cannot use import statement outside a module"
- **Correct approach**: Load external libraries via CDN in `index.html`
- Access libraries through global window objects (e.g., `marked`, `Chart`, `firebase`)

```html
<!-- WRONG: This will cause an error -->
##!
import { marked } from 'marked';  // ❌ ERROR
##

<!-- CORRECT: Load via CDN in index.html -->
<!-- In index.html: -->
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/lib/marked.umd.min.js"></script>

<!-- In .cmint file: -->
##
// Access via global window object
if (typeof marked !== 'undefined') {
  const html = marked.parse(content);  // ✅ CORRECT
}
##
```

## Template Syntax

### Expression Syntax

#### `##= ##` - Data Insertion

```html
<span>##=data.userName##</span>
<span>##=data.userName || 'Guest'##</span>
<span class="##=data.isActive ? 'active' : 'inactive'##">##=data.status##</span>
```

#### `##- ##` - HTML Escaping

```html
<div>##-data.userComment##</div>
```

#### `##% ##` - Element Insertion

```html
<!-- Insert single component -->
<div class="container">##%childComponent##</div>

<!-- Insert array components -->
<div class="container">
  ##%data.items.map(item => tmpl.zd.ListItem({text: item}))##
</div>

<!-- Reference common templates -->
<div class="button-group">##%tmpl.zd.Button({})##</div>
```

#### `##! ##` - Pre-evaluation (executed on template load)

```html
##!
// Code executed once when template is loaded
compomint.addI18ns({
  'zd-component': {
    'greeting': {
      'en': 'Hello',
      'ja': 'こんにちは',
      'ko': '안녕하세요',
      'zh': '你好'
    }
  }
});
##
```

#### `## ##` - JavaScript Code Block

```html
##
// JavaScript code executed during rendering
const sortedProducts = data.products.sort((a, b) => a.price - b.price);

function formatPrice(price) {
  return '$' + price.toFixed(2);
}
##
```

#### `### ##` - Lazy Evaluation (executed after DOM rendering)

```html
<div class="chart-container" id="chart-##=data.id##"></div>
###
// Code executed after DOM is created
const chartElement = document.getElementById('chart-' + data.id);
new Chart(chartElement, {
  type: 'bar',
  data: data.chartData,
  options: data.chartOptions
});
##
```

#### `##* ##` - Comments

```html
##*
This is a comment area that will not be rendered.
Use it for documenting template code.
##
```

#### `#\# #\#` - Escape Syntax

```html
<div>Template syntax example: #\#=data.example#\#</div>
```

### HTML Attribute Expressions

#### `data-co-event` - Event Handling

```html
<!-- Single event -->
<button data-co-event="##:handleClick##">Click</button>

<!-- Multiple events -->
<input
  data-co-event="##:{
  focus: handleFocus,
  blur: handleBlur,
  input: handleInput
}##"
/>

<!-- Inline function -->
<button
  data-co-event="##:{
  click: function(event, {data, component}) {
    alert('Hello, ' + data.userName + '!');
  }
}##"
>
  Greet
</button>
```

#### `data-co-named-element` - Element Reference

```html
<input type="text" data-co-named-element="##:'nameInput'##" />
<button
  data-co-event="##:{
  click: function(event, {component}) {
    console.log('Input value:', component.nameInput.value);
  }
}##"
>
  Get Value
</button>
```

#### `data-co-element-ref` - Element Variable

```html
<input type="text" data-co-element-ref="##:nameInput##" />
```

#### `data-co-load` - Element Loading

```html
<div
  class="chart-container"
  data-co-load="##:initializeChart::data.chartData##"
></div>
```

## Advanced Features

### Internationalization (i18n)

The zidex-web project supports 4 languages: `en`, `jp`, `ko`, `zh`

```javascript
// Register i18n text
compomint.addI18n("greeting", {
  en: "Hello",
  jp: "こんにちは",
  ko: "안녕하세요",
  zh: "你好",
});

// Nested i18n text
compomint.addI18ns({
  "zd-button": {
    submit: {
      en: "Submit",
      jp: "送信",
      ko: "제출",
      zh: "提交",
    },
    cancel: {
      en: "Cancel",
      jp: "キャンセル",
      ko: "취소",
      zh: "取消",
    },
  },
});
```

Usage in templates:

```html
<template id="zd-Button">
  ##!
  compomint.addI18ns({
    'zd-button': {
      'click-me': {
        en: 'Click Me',
        jp: 'クリック',
        ko: '클릭하세요',
        zh: '点击我'
      }
    }
  });
  ##

  <button class="zd-button">
    ##=i18n['click-me']()##
  </button>
</template>
```

### Built-in Variables

#### `data`

Data passed when creating the component

```html
<span>##=data.userName##</span>
```

#### `status`

Object for storing component state (persists on refresh)

```html
##
status.count = status.count || 0;
##
<button
  data-co-event="##:{
  click: function(event, {component}) {
    status.count++;
    component.refresh();
  }
}##"
>
  Click count: ##=status.count##
</button>
```

#### `component`

Template scope reference

- `component.element` - Rendered DOM element
- `component.data` - Data used for rendering
- `component.status` - Status object
- `component.render(data)` - Re-render with new data
- `component.refresh(data)` - Partial data update

#### `i18n`

Access to i18n text

```html
<h1>##=i18n.greeting##</h1>
```

#### `tmpl`

Access to template registry

```html
<div>##%tmpl.zd.Button({label: 'Click'})##</div>
```

#### `compomint`

Access to global compomint object

```html
<div>##=compomint.tools.escapeHtml.escape(data.userInput)##</div>
```

### Template Remapping

```javascript
compomint.remapTmpl({
  "old-button": "zd-Button-v2",
  "legacy-form": "zd-Form-v3",
});
```

## Common UI Component References

Common UI components are written as templates and referenced:

```html
<!-- zd-Button.cmint -->
<template id="zd-Button">
  <button class="zd-button" data-co-event="##:data.onClick##">
    ##=data.label##
  </button>
</template>

<!-- Reference from another template -->
<template id="zd-LoginForm">
  <form class="zd-login-form">
    <input type="text" placeholder="Username" />
    <input type="password" placeholder="Password" />
    ##%tmpl.zd.Button({label: 'Login', onClick: handleLogin})##
  </form>
</template>
```

## Best Practices

### 1. Performance Optimization

```javascript
// Good: Partial update
component.refresh({ counter: newCount });

// Avoid: Full re-render
component.render({ ...data, counter: newCount });
```

### 2. Error Handling

```html
<div class="user-card">
  <img src="##=data.avatar || 'images/default-avatar.png'##" alt="User" />
  <h3>##=data.name || 'Unknown User'##</h3>
</div>
```

### 3. Code Structure

```javascript
// Prepare data outside templates
function createUserCard(userData) {
  const isVerified = checkUserVerification(userData);

  return tmpl.zd.UserCard({
    user: userData,
    isVerified: isVerified,
    onEdit: () => openUserEditForm(userData.id),
  });
}
```

### 4. Template Naming Convention

```javascript
// Group by domain
"zd-Button";      // UI component
"zd-LoginForm";   // Form component
"zd-BarChart";    // Chart component
"zd-Dashboard";   // Page template
```

## Template Lifecycle

### Creation and Rendering

```javascript
const component = compomint.tmpl("zd-MyTemplate")({
  name: "John Doe",
  email: "john@example.com",
});
```

### DOM Insertion

```javascript
document.body.appendChild(component.element);
// or
component.appendTo(document.getElementById("container"));
```

### Update

```javascript
// Full re-render
component.render({ name: "Jane Doe", email: "jane@example.com" });

// Partial update
component.refresh({ name: "Jane Doe" });
```

### Removal

```javascript
component.remove();
```

## Real-world *.cmint File Sample

Below is a comprehensive sample of a real *.cmint file that can be used in the zidex-web project:

### zd-UserDashboard.cmint

```html
<!-- zd-UserDashboard.cmint -->
<template id="zd-UserDashboard">

  ##!
  // Register i18n text on template load
  compomint.addI18ns({
    'zd-dashboard': {
      'welcome': {
        en: 'Welcome back',
        jp: 'おかえりなさい',
        ko: '돌아오신 것을 환영합니다',
        zh: '欢迎回来'
      },
      'profile': {
        en: 'Profile',
        jp: 'プロフィール',
        ko: '프로필',
        zh: '个人资料'
      },
      'analytics': {
        en: 'Analytics',
        jp: '分析',
        ko: '분석',
        zh: '分析'
      },
      'recent-activity': {
        en: 'Recent Activity',
        jp: '最近のアクティビティ',
        ko: '최근 활동',
        zh: '最近活动'
      },
      'total-users': {
        en: 'Total Users',
        jp: '総ユーザー数',
        ko: '총 사용자',
        zh: '总用户数'
      },
      'revenue': {
        en: 'Revenue',
        jp: '収益',
        ko: '수익',
        zh: '收入'
      },
      'toggle-theme': {
        en: 'Toggle Theme',
        jp: 'テーマ切替',
        ko: '테마 변경',
        zh: '切换主题'
      }
    }
  });
  ##

  ##
  // JavaScript code executed during rendering

  // Validate user data and set defaults
  const userData = {
    name: data.user?.name || 'Guest',
    avatar: data.user?.avatar || '/images/default-avatar.png',
    email: data.user?.email || '',
    role: data.user?.role || 'user',
    ...data.user
  };

  // Process statistics data
  const stats = data.stats || {};
  const processedStats = [
    {
      key: 'users',
      label: i18n['total-users'](),
      value: formatNumber(stats.totalUsers || 0),
      icon: '👥'
    },
    {
      key: 'revenue',
      label: i18n.revenue(),
      value: formatCurrency(stats.revenue || 0),
      icon: '💰'
    },
    {
      key: 'orders',
      label: 'Orders',
      value: formatNumber(stats.orders || 0),
      icon: '📦'
    },
    {
      key: 'growth',
      label: 'Growth',
      value: (stats.growth || 0) + '%',
      icon: '📈'
    }
  ];

  // Process activity data
  const activities = (data.activities || []).slice(0, 10).map(activity => ({
    ...activity,
    timeAgo: getTimeAgo(activity.timestamp)
  }));

  // Utility functions
  function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  function getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return diffMins + 'm ago';
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return diffHours + 'h ago';
    const diffDays = Math.floor(diffHours / 24);
    return diffDays + 'd ago';
  }

  // State management
  status.theme = status.theme || 'light';
  status.chartInitialized = false;

  // Event handlers
  function toggleTheme() {
    status.theme = status.theme === 'light' ? 'dark' : 'light';
    document.body.className = 'theme-' + status.theme;

    // Update chart theme if exists
    if (status.chartInitialized && window.myChart) {
      updateChartTheme(status.theme);
    }

    component.refresh();
  }

  function handleProfileEdit() {
    if (data.onProfileEdit && typeof data.onProfileEdit === 'function') {
      data.onProfileEdit(userData);
    } else {
      alert('Profile edit functionality not implemented');
    }
  }

  function handleActivityClick(activity) {
    console.log('Activity clicked:', activity);
    if (data.onActivityClick) {
      data.onActivityClick(activity);
    }
  }
  ##

  <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr_280px] gap-5 p-5 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200" data-theme="##=status.theme##">
    <!-- Theme toggle button -->
    <button
      class="fixed top-5 right-5 z-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 shadow-sm"
      data-co-event="##:{ click: toggleTheme }##"
      title="##=i18n['toggle-theme']()##"
    >
      <span class="text-lg">##=status.theme === 'light' ? '🌙' : '☀️'##</span>
    </button>

    <!-- Sidebar -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-fit">
      <div class="text-center mb-6">
        <img
          src="##=userData.avatar##"
          alt="##=userData.name##"
          class="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-slate-100 dark:border-slate-700 cursor-pointer hover:opacity-80 transition-opacity"
          data-co-event="##:{ click: handleProfileEdit }##"
        />
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">##=userData.name##</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">##=userData.email##</p>
        <span class="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full uppercase tracking-wide">##=userData.role##</span>
      </div>

      <nav class="space-y-2">
        ##%tmpl.zd.Button({
          label: i18n.profile(),
          variant: 'secondary',
          className: 'w-full',
          onClick: handleProfileEdit
        })##
      </nav>
    </div>

    <!-- Main content -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
          ##=i18n.welcome()##, ##=userData.name##!
          <span class="ml-2">👋</span>
        </h1>
      </div>

      <!-- Statistics grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        ##processedStats.forEach(stat => {##
          <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">##=stat.icon##</span>
              <span class="text-xs bg-white/20 px-2 py-1 rounded-full">##=stat.key##</span>
            </div>
            <div class="text-2xl font-bold mb-1">##=stat.value##</div>
            <div class="text-sm text-blue-100">##=stat.label##</div>
          </div>
        ##})##
      </div>

      <!-- Chart area -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">##=i18n.analytics()##</h2>
        <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
          <canvas
            class="w-full h-80"
            id="dashboard-chart-##=component._id##"
            data-co-load="##:initChart::data.chartData##"
          ></canvas>
        </div>
      </div>
    </div>

    <!-- Activity panel -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-fit">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">##=i18n['recent-activity']()##</h2>

      ##if (activities.length === 0) {##
        <div class="text-center py-8">
          <div class="text-slate-400 mb-2">📝</div>
          <p class="text-sm text-slate-500 dark:text-slate-400">##-'No recent activities'##</p>
        </div>
      ##} else {##
        <div class="space-y-3 max-h-96 overflow-y-auto">
          ##activities.forEach((activity, index) => {##
            <div
              class="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors duration-200 ##=index < activities.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''##"
              data-co-event="##:{ click: () => handleActivityClick(activity) }##"
            >
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm">
                ##=activity.icon || '📝'##
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm text-slate-900 dark:text-white line-clamp-2">##-activity.text##</div>
                ##if (activity.user) {##
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">by ##=activity.user##</div>
                ##}##
              </div>
              <div class="flex-shrink-0 text-xs text-slate-400 dark:text-slate-500">##=activity.timeAgo##</div>
            </div>
          ##})##
        </div>
      ##}##
    </div>
  </div>

  ###
  // Lazy evaluation code executed after DOM rendering

  function initChart(element, {customData}) {
    if (!customData || status.chartInitialized) return;

    // Check if Chart.js library is loaded
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not loaded');
      element.innerHTML = '<p>Chart library not available</p>';
      return;
    }

    const ctx = element.getContext('2d');
    const chartData = customData || {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: status.theme === 'dark' ? '#81C784' : '#4CAF50',
        backgroundColor: status.theme === 'dark' ? 'rgba(129, 199, 132, 0.1)' : 'rgba(76, 175, 80, 0.1)'
      }]
    };

    window.myChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: status.theme === 'dark' ? '#fff' : '#333'
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: status.theme === 'dark' ? '#fff' : '#333'
            }
          },
          x: {
            ticks: {
              color: status.theme === 'dark' ? '#fff' : '#333'
            }
          }
        }
      }
    });

    status.chartInitialized = true;
  }

  function updateChartTheme(theme) {
    if (!window.myChart) return;

    const textColor = theme === 'dark' ? '#fff' : '#333';
    const bgColor = theme === 'dark' ? 'rgba(129, 199, 132, 0.1)' : 'rgba(76, 175, 80, 0.1)';

    window.myChart.options.plugins.legend.labels.color = textColor;
    window.myChart.options.scales.y.ticks.color = textColor;
    window.myChart.options.scales.x.ticks.color = textColor;
    window.myChart.data.datasets[0].backgroundColor = bgColor;

    window.myChart.update();
  }

  // Clean up chart when component is removed
  component.beforeRemove = function() {
    if (window.myChart) {
      window.myChart.destroy();
      window.myChart = null;
    }
    status.chartInitialized = false;
  };
  ##
</template>

##*
Key features of this template:

1. TailwindCSS 4 styling: Uses Tailwind classes instead of <style> blocks
   - Responsive grid: grid-cols-1 lg:grid-cols-[300px_1fr_280px]
   - Dark mode support: automatic theme switching with dark: prefix
   - Latest CSS Grid syntax: grid-cols-[300px_1fr_280px]
   - Gradients: bg-gradient-to-br from-blue-500 to-purple-600
   - Opacity control: bg-white/20, dark:hover:bg-slate-700/50

2. i18n support: i18n setup in ##! ## block (en, jp, ko, zh)

3. Data processing: Complex data logic in ## ## block

4. State management: Component state management with status object

5. Event handling: Various event handling via data-co-event

6. Conditional rendering: Conditional UI display with ##if## syntax

7. Loop rendering: List rendering with forEach

8. Component references: Reference other components with ##%tmpl.zd.Button##

9. Lazy evaluation: Chart initialization after DOM load in ### ## block

10. HTML escaping: XSS prevention with ##-## syntax

11. Element references: Per-element initialization via data-co-load

12. Lifecycle: Resource cleanup with beforeRemove hook

13. TailwindCSS 4 specific features:
    - Arbitrary values: grid-cols-[300px_1fr_280px]
    - Improved dark mode: automatic dark: prefix application
    - Enhanced opacity: bg-white/20
    - Line clamp: line-clamp-2
    - Scroll area: overflow-y-auto, max-h-96

This sample can be used as a real dashboard component and is
a comprehensive example utilizing TailwindCSS 4 and all Compomint syntax.
##
```

Following these standards will help you write consistent and maintainable Compomint code for the zidex-web project.
