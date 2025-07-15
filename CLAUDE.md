# Compomint Framework Knowledge Base

## Overview
Compomint is a lightweight JavaScript template-based component engine (~14KB) for web applications with component-based architecture. It provides a powerful template system for creating, combining, and reusing UI components efficiently.

## Important Instructions
- **Make sure to think step-by-step when answering** - Break down complex problems into smaller, manageable steps and explain your reasoning process clearly.
- **Playwright Testing**: When testing with Playwright, do NOT write test files. Instead, directly manipulate Playwright to check JavaScript execution and DOM elements. Use Playwright programmatically to:
  - Navigate to the target URL
  - Wait for elements to load
  - Verify DOM structure and content
  - Execute JavaScript in the browser context
  - Check console outputs and errors
  - Take screenshots if needed

## Development and Testing Commands

### NPM Commands Available
- `npm run dev` - Start development server with Vite and Tailwind CSS
- `npm run build` - Build production version
- `npm run preview` - Preview built version
- `npm run test` - Run tests (if available)

### Playwright Testing via NPM (MCP Required)
- **IMPORTANT**: Always use MCP (Claude Code) to execute Playwright commands directly via npx
- **Install Playwright**: Use MCP Bash tool: `npm install @playwright/test playwright`
- **MCP Direct Execution Rules**:
  1. **Use Bash tool with npx**: `npx playwright test` 
  2. **Use Bash tool for codegen**: `npx playwright codegen http://localhost:3000`
  3. **Use Bash tool for headed browser**: `npx playwright test --headed`
  4. **Never create script files** - Use MCP tools directly

- **Required MCP Execution**: 
  - NEVER run Playwright directly in terminal
  - NEVER create script files for Playwright
  - ALWAYS use MCP Bash tool with npx commands
  - Use `npx playwright` commands through MCP for direct browser manipulation

### Development Server
- **Start Dev Server**: `./dev.sh` or `npm run dev`
- **Local URLs**:
  - Main site: http://localhost:3000
  - Playground: http://localhost:3000/cmint.playground.html
- **File Protocol**: `file:///Users/choish/workspaces/kurukona/compomint-website/index.html`

## Core Features
- **Lightweight**: ~14KB gzipped footprint
- **Template-Based**: String-based template syntax with JavaScript evaluation
- **All-in-One Templates**: HTML, CSS, and JavaScript in single template
- **Component-Oriented**: Reusable UI components with proper encapsulation
- **State Management**: Efficient component state with automatic updates
- **Internationalization**: Built-in i18n support
- **Lazy Loading**: Load templates from external files when needed
- **SPA Support**: Easy Single Page Application creation

## Template Syntax

### Expression Types
| Syntax | Purpose | Example |
|--------|---------|---------|
| `##= ##` | Data interpolation (outputs values) | `<span>##=data.name##</span>` |
| `##- ##` | HTML-escaped output | `<div>##-data.html##</div>` |
| `##% ##` | Element insertion | `<div>##%childComponent##</div>` |
| `##! ##` | Pre-evaluation (runs once when template loads) | `##! compomint.addI18ns({...}) ##` |
| `## ##` | JavaScript code blocks | `## let x = 5; ##` |
| `### ##` | Lazy evaluation (runs after render) | `### initComponent() ##` |
| `##* ##` | Comments | `##* This is a comment ##` |

### HTML Attributes
| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-co-event` | Event handling | `<button data-co-event="##:handleClick##">` |
| `data-co-named-element` | Element references | `<input data-co-named-element="##:'inputField'##">` |
| `data-co-element-ref` | Element variables | `<div data-co-element-ref="##:container##">` |
| `data-co-load` | Load callbacks | `<div data-co-load="##:initElement##">` |

## Built-in Variables
- `data` - Data passed to the component
- `status` - Component state object (persists across refreshes)
- `component` - Component instance with methods (render, refresh, remove, etc.)
- `i18n` - Internationalization object
- `tmpl` - Template registry
- `compomint` - Global compomint object

## Template Structure

### Basic Template Format
```html
<template id="component-name">
  <style id="style-component-name">
    /* Component styles */
  </style>
  ##!
    // Pre-evaluation code (i18n definitions)
  ##
  ##
    // Component logic
  ##
  <div class="component-name">
    <!-- Component content -->
  </div>
  ###
    // Post-render code
  ##
</template>
```

### Naming Conventions
- **Template IDs**: Use kebab-case (e.g., `my-component`)
- **Style IDs**: Prefix with `style-` (e.g., `style-my-component`)
- **CSS Classes**: Base class should match template ID
- **Child Elements**: Use BEM-like naming

## Component Lifecycle

1. **Creation**: Template compiled and rendered with data
2. **Rendering**: HTML generated and inserted into DOM
3. **Post-rendering**: Lazy evaluation code executed
4. **Updates**: Component updated with `refresh()` or `render()`
5. **Removal**: Component removed from DOM with `remove()`

### Component Methods
- `component.render(data)` - Re-render with new data
- `component.refresh(data)` - Update with partial data
- `component.remove()` - Remove from DOM
- `component.appendTo(element)` - Append to element
- `component.replace(newScope)` - Replace with another template

## Usage Patterns

### Creating Components
```javascript
// Method 1: Using tmpl namespace
const button = tmpl.ui.Button({ label: 'Click Me' });

// Method 2: Using compomint.tmpl()
const button = compomint.tmpl('ui-Button')({ label: 'Click Me' });

// Add to DOM
document.body.appendChild(button.element);
```

### Event Handling
```javascript
// Event handlers receive: (event, {data, customData, element, componentElement, component, compomint})
const button = tmpl.ui.Button({
  label: 'Click Me',
  onClick: (event, {data, component}) => {
    console.log('Button clicked!');
    component.refresh({ label: 'Clicked!' });
  }
});
```

### State Management
```html
<template id="counter">
  ##
    // Initialize persistent state
    status.count = status.count || data.initialCount || 0;
    
    function increment() {
      status.count++;
      component.refresh();
    }
  ##
  <div>
    <span>Count: ##=status.count##</span>
    <button data-co-event="##:{click: increment}##">+</button>
  </div>
</template>
```

## Internationalization (i18n)

### Adding Translations
```javascript
// Pre-evaluation block in template
##!
compomint.addI18ns({
  'my-component': {
    'greeting': {
      'en': 'Hello',
      'ko': 'HUX8�',
      'ja': 'S�kao',
      'zh': '`}'
    }
  }
});
##
```

### Using Translations
```html
<!-- In template -->
<span>##=i18n.greeting##</span>
<!-- or with default -->
<span>##=i18n.greeting('Hello')##</span>
```

## Template Loading

### Multiple Methods
```javascript
// Method 1: Direct template string
compomint.addTmpl('my-component', '<div>##=data.text##</div>');

// Method 2: From HTML template tags
compomint.addTmpls(templateString);

// Method 3: From external URL with callback
compomint.addTmplByUrl("templates.html", function() {
  console.log("Templates loaded successfully!");
  const mainScreen = tmpl.do.MainScreen({});
  document.body.appendChild(mainScreen.element);
});

// Method 4: Promise-based loading (NEW: Version 1.0.3+)
compomint.addTmplByUrl("templates.html")
  .then(() => {
    console.log("Templates loaded successfully!");
    const mainScreen = tmpl.do.MainScreen({});
    document.body.appendChild(mainScreen.element);
  })
  .catch((error) => {
    console.error("Failed to load templates:", error);
  });

// Method 5: Async/await support
async function loadAndInitialize() {
  try {
    await compomint.addTmplByUrl("templates.html");
    console.log("Templates loaded successfully!");
    const mainScreen = tmpl.do.MainScreen({});
    document.body.appendChild(mainScreen.element);
  } catch (error) {
    console.error("Failed to load templates:", error);
  }
}

// Method 6: With loading options
await compomint.addTmplByUrl({
  url: "templates.html",
  option: {
    loadScript: true, // Load and execute script tags
    loadStyle: true,  // Load style tags
    loadLink: true    // Load link tags
  }
});

// Method 7: Load multiple template files
await compomint.addTmplByUrl([
  "templates/header.html", 
  "templates/main.html", 
  "templates/footer.html"
]);
```

### addTmplByUrl API Details
- **Returns Promise** if no callback is provided (Version 1.0.3+)
- **Accepts multiple formats**:
  - Single URL string
  - Array of URL strings
  - Object with URL and options
- **Loading options**:
  - `loadScript: true` - Load and execute script tags
  - `loadStyle: true` - Load style tags  
  - `loadLink: true` - Load link tags

## Component Composition

### Including Child Components
```html
<template id="user-card">
  ##
    const avatar = tmpl.ui.Avatar({ src: data.avatarUrl });
    const details = tmpl.ui.UserDetails({ name: data.name });
  ##
  <div class="user-card">
    <div class="user-card-avatar">##%avatar##</div>
    <div class="user-card-details">##%details##</div>
  </div>
</template>
```

## Best Practices

### Performance
- Use `refresh()` for minor updates instead of `render()`
- Use non-blocking insertion: `##%heavyComponent::true##`
- Cache element references with `data-co-named-element`

### Code Organization
- Keep components focused on single responsibility
- Use consistent naming conventions
- Prepare data before passing to templates
- Break large components into smaller, reusable ones

### Error Handling
- Validate data before rendering
- Provide fallbacks for missing data
- Use try/catch for error-prone operations

## Built-in Components
- `co-Ele` - Direct DOM element creation
- `co-Element` - Generic HTML element with common attributes

## API Reference

### Core Functions
- `compomint.addTmpl(id, content, settings)`
- `compomint.addTmpls(source, removeInnerTemplate, settings)`
- `compomint.addTmplByUrl(url, options, callback)`
- `compomint.tmpl(id)(data, container, callback, component)`
- `compomint.addI18n(key, translations)`
- `compomint.addI18ns(translationsObject)`

### Utility Functions
- `compomint.tools.genElement(tagName, attrs, ...children)`
- `compomint.tools.props(...propsObjects)`
- `compomint.tools.genId(prefix)`
- `compomint.tools.escapeHtml.escape(string)`

## Website Project Context
This is the official Compomint website project showcasing:
- Compomint framework capabilities
- Interactive examples and demos
- Multi-language support (EN, KO, JA, ZH)
- Responsive design with Tailwind CSS
- Dark/light mode themes

The main library is maintained separately at: https://github.com/kurukona/compomint