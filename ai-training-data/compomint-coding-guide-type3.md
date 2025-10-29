# Compomint Quick Reference Guide

## Introduction

This is a quick reference guide for Compomint - a lightweight JavaScript template-based component engine for web applications. This guide focuses on essential syntax and common patterns.

## Table of Contents

1. [Template Loading](#template-loading)
2. [Template Syntax Quick Reference](#template-syntax-quick-reference)
3. [Creating Components](#creating-components)
4. [Event Handling](#event-handling)
5. [Internationalization (i18n)](#internationalization-i18n)
6. [Component Methods](#component-methods)
7. [Common Patterns](#common-patterns)

---

## Template Loading

### Loading Templates with addTmplByUrl

```javascript
// Method 1: Callback-based loading
compomint.addTmplByUrl("templates.html", function() {
  console.log("Templates loaded successfully!");
  const mainScreen = tmpl.ui.MainScreen({});
  document.body.appendChild(mainScreen.element);
});

// Method 2: Promise-based loading (Version 1.0.3+)
compomint.addTmplByUrl("templates.html")
  .then(() => {
    console.log("Templates loaded successfully!");
    const mainScreen = tmpl.ui.MainScreen({});
    document.body.appendChild(mainScreen.element);
  })
  .catch((error) => {
    console.error("Failed to load templates:", error);
  });

// Method 3: Async/await support
async function loadAndInitialize() {
  try {
    await compomint.addTmplByUrl("templates.html");
    console.log("Templates loaded successfully!");
    const mainScreen = tmpl.ui.MainScreen({});
    document.body.appendChild(mainScreen.element);
  } catch (error) {
    console.error("Failed to load templates:", error);
  }
}

// Method 4: Load multiple template files
await compomint.addTmplByUrl([
  "templates/ui-Button.cmint",
  "templates/ui-Card.cmint",
  "templates/ui-Modal.cmint"
]);

// Method 5: With loading options
await compomint.addTmplByUrl({
  url: "templates.html",
  option: {
    loadScript: true, // Load and execute script tags
    loadStyle: true,  // Load style tags
    loadLink: true    // Load link tags
  }
});
```

### Other Loading Methods

```javascript
// Direct template string
compomint.addTmpl('my-component', '<div>##=data.text##</div>');

// From HTML template tags
compomint.addTmpls(templateString);
```

---

## Template Syntax Quick Reference

| Syntax | Purpose | Example |
|--------|---------|---------|
| `##= ##` | Data interpolation | `<span>##=data.name##</span>` |
| `##- ##` | HTML-escaped output | `<div>##-data.html##</div>` |
| `##% ##` | Element insertion | `<div>##%childComponent##</div>` |
| `##! ##` | Pre-evaluation (runs once) | `##! compomint.addI18ns({...}) ##` |
| `## ##` | JavaScript code | `## let x = 5; ##` |
| `### ##` | Lazy evaluation (after render) | `### initComponent() ##` |
| `##* ##` | Comments | `##* This is a comment ##` |

### HTML Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-co-event` | Event handling | `<button data-co-event="##:handleClick##">` |
| `data-co-named-element` | Element references | `<input data-co-named-element="##:'inputField'##">` |
| `data-co-element-ref` | Element variables | `<div data-co-element-ref="##:container##">` |
| `data-co-load` | Load callbacks | `<div data-co-load="##:initElement##">` |

---

## Creating Components

### Basic Template Structure

```html
<template id="ui-Button">
  <style id="style-ui-Button">
    .ui-Button {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
    }
  </style>
  ##!
    // Pre-evaluation: i18n, constants
    compomint.addI18ns({
      'ui-Button': {
        'label': {
          'en': 'Button',
          'ko': '„¼',
          'ja': 'Ü¿ó',
          'zh': '	®'
        }
      }
    });
  ##
  ##
    // Component logic
    const buttonClass = data.variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  ##
  <button class="ui-Button ##=buttonClass##" data-co-event="##:data.onClick##">
    ##=data.label || i18n.label##
  </button>
  ###
    // Post-render code
    console.log('Button rendered');
  ##
</template>
```

### Using Components

```javascript
// Method 1: Using tmpl namespace
const button = tmpl.ui.Button({
  label: 'Click Me',
  variant: 'primary',
  onClick: () => console.log('Clicked!')
});
document.body.appendChild(button.element);

// Method 2: Using compomint.tmpl()
const button = compomint.tmpl('ui-Button')({
  label: 'Click Me'
});
```

---

## Event Handling

### Basic Events

```html
<!-- Single event -->
<button data-co-event="##:handleClick##">Click</button>

<!-- Multiple events -->
<input data-co-event="##:{
  focus: handleFocus,
  blur: handleBlur,
  input: handleInput
}##" />

<!-- Inline function -->
<button data-co-event="##:{
  click: (event, {data, component}) => {
    alert('Hello!');
    component.refresh();
  }
}##">
  Greet
</button>
```

### Event Handler Parameters

Event handlers receive:
- `event` - The DOM event object
- `eventData` - Object containing:
  - `data` - Component data
  - `customData` - Custom data passed after `::`
  - `element` - Element that triggered the event
  - `componentElement` - Main component element
  - `component` - Component instance
  - `compomint` - Global compomint object

```html
<button data-co-event="##:handleClick::data.itemId##">
  View Item
</button>
```

```javascript
const component = tmpl.ui.Button({
  itemId: 123,
  handleClick: (event, {data, customData}) => {
    console.log('Item ID:', customData); // 123
  }
});
```

---

## Internationalization (i18n)

### Adding Translations

```javascript
// Single i18n entry
compomint.addI18n('greeting', {
  'en': 'Hello',
  'ko': 'HUX8”',
  'ja': 'S“kao',
  'zh': '`}'
});

// Multiple i18n entries (nested)
compomint.addI18ns({
  'ui-Button': {
    'submit': {
      'en': 'Submit',
      'ko': 'œ',
      'ja': 'á',
      'zh': 'Ð¤'
    },
    'cancel': {
      'en': 'Cancel',
      'ko': 'èŒ',
      'ja': '­ãó»ë',
      'zh': 'Öˆ'
    }
  }
});
```

### Using Translations

```html
<!-- Basic usage -->
<span>##=i18n.greeting##</span>

<!-- With default value -->
<span>##=i18n.greeting('Hello')##</span>

<!-- Accessing from specific namespace -->
<span>##=compomint.i18n['ui-Button'].submit##</span>
```

---

## Component Methods

### Component Instance Methods

```javascript
const component = tmpl.ui.Card({ title: 'My Card' });

// Add to DOM
document.body.appendChild(component.element);
component.appendTo(document.getElementById('container'));

// Update component
component.render({ title: 'New Title' });      // Full re-render
component.refresh({ title: 'Updated Title' }); // Partial update (faster)

// Remove from DOM
component.remove();

// Replace with another component
const newComponent = tmpl.ui.Card({ title: 'Replacement' });
component.replace(newComponent);
```

### Built-in Variables

| Variable | Description |
|----------|-------------|
| `data` | Data passed to the component |
| `status` | Component state object (persists across refreshes) |
| `component` | Component instance |
| `i18n` | Internationalization object |
| `tmpl` | Template registry |
| `compomint` | Global compomint object |

---

## Common Patterns

### State Management

```html
<template id="ui-Counter">
  ##
    // Initialize state
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

### Conditional Rendering

```html
##if (data.showHeader) {##
  <header>##=data.title##</header>
##}##

##if (data.type === 'success') {##
  <div class="success">Success!</div>
##} else if (data.type === 'error') {##
  <div class="error">Error!</div>
##} else {##
  <div class="info">Info</div>
##}##
```

### Loop Rendering

```html
<!-- Array forEach -->
<ul>
  ##data.items.forEach(item => {##
    <li>##=item.name##</li>
  ##})##
</ul>

<!-- Array map with components -->
<div class="card-list">
  ##data.items.forEach(item => {##
    ##%tmpl.ui.Card({ title: item.title, content: item.content })##
  ##})##
</div>

<!-- Traditional for loop -->
<ul>
  ##for (let i = 0; i < data.items.length; i++) {##
    <li>##=i + 1##. ##=data.items[i].name##</li>
  ##}##
</ul>
```

### Component Composition

```html
<template id="ui-UserCard">
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

### Element References

```html
<template id="ui-Form">
  ##
    function handleSubmit() {
      const value = component.nameInput.value;
      console.log('Submitted:', value);
    }
  ##
  <form>
    <input
      type="text"
      data-co-named-element="##:'nameInput'##"
      placeholder="Enter name"
    />
    <button
      type="button"
      data-co-event="##:{click: handleSubmit}##"
    >
      Submit
    </button>
  </form>
</template>
```

### Lazy Initialization

```html
<template id="ui-Chart">
  <canvas
    id="chart-##=component._id##"
    data-co-load="##:initChart::data.chartData##"
  ></canvas>

  ###
    function initChart(element, {customData}) {
      // Initialize chart after DOM is ready
      new Chart(element, {
        type: 'bar',
        data: customData
      });
    }
  ##
</template>
```

---

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

```html
<!-- Provide fallbacks -->
<img src="##=data.avatar || 'default-avatar.png'##" alt="User" />
<h3>##=data.name || 'Unknown User'##</h3>

<!-- Validate before using -->
##if (data.items && data.items.length > 0) {##
  <ul>
    ##data.items.forEach(item => {##
      <li>##=item.name##</li>
    ##})##
  </ul>
##} else {##
  <p>No items found</p>
##}##
```

---

## Utility Functions

```javascript
// Generate element
compomint.tools.genElement('div', { class: 'container' }, 'Content');

// Merge props
compomint.tools.props({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }

// Generate unique ID
compomint.tools.genId('prefix'); // 'prefix-123'

// Escape HTML
compomint.tools.escapeHtml.escape('<script>alert("xss")</script>');
```

---

This quick reference covers the essential Compomint features and patterns for building web applications efficiently.
