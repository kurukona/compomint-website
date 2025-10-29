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
  "templates/header.html",
  "templates/main.html",
  "templates/footer.html"
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

---

## Template Syntax Quick Reference

### Expression Types

| Syntax | Purpose | Example |
|--------|---------|---------|
| `##= ##` | Data interpolation (outputs values) | `<span>##=data.name##</span>` |
| `##- ##` | HTML-escaped output | `<div>##-data.html##</div>` |
| `##% ##` | Element insertion | `<div>##%childComponent##</div>` |
| `##! ##` | Pre-evaluation (runs once) | `##! compomint.addI18ns({...}) ##` |
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

### Built-in Variables

- `data` - Data passed to the component
- `status` - Component state object (persists across refreshes)
- `component` - Component instance
- `i18n` - Internationalization object
- `tmpl` - Template registry
- `compomint` - Global compomint object

---

## Creating Components

### Basic Template Structure

```html
<template id="ui-Button">
  <style id="style-ui-Button">
    .ui-Button {
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      background-color: #3b82f6;
      color: white;
    }
  </style>
  ##
    // Component logic
    let classes = 'ui-Button';
    if (data.variant === 'secondary') {
      classes += ' ui-Button--secondary';
    }
  ##
  <button class="##=classes##" data-co-event="##:data.onClick##">
    ##=data.label##
  </button>
</template>
```

### Using Components

```javascript
// Method 1: Using tmpl namespace
const button = tmpl.ui.Button({
  label: 'Click Me',
  onClick: () => alert('Clicked!')
});

// Method 2: Using compomint.tmpl()
const button = compomint.tmpl('ui-Button')({
  label: 'Click Me'
});

// Add to DOM
document.body.appendChild(button.element);
```

---

## Event Handling

### Basic Event Handling

```html
<button data-co-event="##:data.onClick##">Click Me</button>
```

```javascript
const button = tmpl.ui.Button({
  onClick: (event, {data, element, component}) => {
    console.log('Button clicked!');
  }
});
```

### Multiple Event Types

```html
<input data-co-event="##:{
  focus: handleFocus,
  blur: handleBlur,
  input: handleInput
}##" />
```

### Event Handler Parameters

Event handlers receive:
1. `event` - The DOM event object
2. `eventData` - Object containing:
   - `data` - Component data
   - `customData` - Custom data passed after `::`
   - `element` - Element that triggered the event
   - `componentElement` - Main component element
   - `component` - Component instance
   - `compomint` - Global compomint object

---

## Internationalization (i18n)

### Adding Translations

```javascript
// Single i18n entry
compomint.addI18n('greeting', {
  'en': 'Hello',
  'ko': '안녕하세요',
  'ja': 'こんにちは',
  'zh': '你好'
});

// Multiple i18n entries (nested)
compomint.addI18ns({
  'ui-Button': {
    'submit': {
      'en': 'Submit',
      'ko': '제출',
      'ja': '送信',
      'zh': '提交'
    },
    'cancel': {
      'en': 'Cancel',
      'ko': '취소',
      'ja': 'キャンセル',
      'zh': '取消'
    }
  }
});
```

### Using Translations in Templates

```html
<template id="ui-Button">
  ##!
  compomint.addI18ns({
    'ui-Button': {
      'label': {
        'en': 'Button',
        'ko': '버튼',
        'ja': 'ボタン',
        'zh': '按钮'
      }
    }
  });
  ##
  <button class="ui-Button">
    ##=i18n.label##  <!-- Uses current language -->
    ##=i18n.label('Default')##  <!-- With fallback -->
  </button>
</template>
```

---

## Component Methods

### Component Instance Methods

```javascript
const button = tmpl.ui.Button({ label: 'Click' });

// Append to element
button.appendTo(document.body);

// Render with new data (replaces all data)
button.render({ label: 'New Label' });

// Refresh with partial data (updates only specified fields)
button.refresh({ label: 'Updated Label' });

// Remove from DOM
button.remove();

// Replace with another component
button.replace(tmpl.ui.OtherButton({}));

// Release resources
button.release();
```

---

## Common Patterns

### State Management

```html
<template id="ui-Counter">
  ##
    // Initialize persistent state
    status.count = status.count || data.initialCount || 0;

    function increment() {
      status.count++;
      component.refresh();
    }

    function decrement() {
      status.count--;
      component.refresh();
    }
  ##
  <div class="ui-Counter">
    <span>Count: ##=status.count##</span>
    <button data-co-event="##:{click: decrement}##">-</button>
    <button data-co-event="##:{click: increment}##">+</button>
  </div>
</template>
```

### Conditional Rendering

```html
<template id="ui-Message">
  ##
    let messageClass = 'ui-Message';
    if (data.type === 'error') {
      messageClass += ' ui-Message--error';
    } else if (data.type === 'success') {
      messageClass += ' ui-Message--success';
    }
  ##
  <div class="##=messageClass##">
    ##if (data.icon) {##
      <span class="ui-Message-icon">##=data.icon##</span>
    ##}##
    <span class="ui-Message-text">##=data.message##</span>
    ##if (data.dismissible) {##
      <button
        class="ui-Message-close"
        data-co-event="##:data.onClose##"
      >×</button>
    ##}##
  </div>
</template>
```

### List Rendering

```html
<template id="ui-List">
  <ul class="ui-List">
    ##data.items.forEach((item, index) => {##
      <li class="ui-List-item" data-index="##=index##">
        ##=item.text##
      </li>
    ##})##
  </ul>
</template>
```

### Component Composition

```html
<template id="ui-Card">
  ##
    // Create child components
    const header = tmpl.ui.CardHeader({ title: data.title });
    const footer = tmpl.ui.CardFooter({ actions: data.actions });
  ##
  <div class="ui-Card">
    ##%header##
    <div class="ui-Card-body">
      ##=data.content##
    </div>
    ##%footer##
  </div>
</template>
```

### Element References

```html
<template id="ui-Form">
  ##
    function handleSubmit(event) {
      event.preventDefault();
      const input = component.element.querySelector('[data-co-named-element="emailInput"]');
      console.log('Email:', input.value);
    }
  ##
  <form data-co-event="##:{submit: handleSubmit}##">
    <input
      type="email"
      data-co-named-element="##:'emailInput'##"
      placeholder="Email"
    />
    <button type="submit">Submit</button>
  </form>
</template>
```

---

## Tips and Best Practices

1. **Performance**: Use `refresh()` for minor updates instead of `render()`
2. **State**: Use `status` object for persistent state across refreshes
3. **Events**: Always use `data-co-event` for event handling
4. **i18n**: Define translations in `##!` block for early initialization
5. **Naming**: Use consistent naming conventions (kebab-case for IDs)
6. **Composition**: Break large components into smaller, reusable ones
7. **Error Handling**: Always validate data before using it
8. **Accessibility**: Include proper ARIA attributes for interactive elements

---

## Quick Examples

### Simple Button

```html
<template id="ui-Button">
  <button data-co-event="##:data.onClick##">##=data.label##</button>
</template>
```

### Counter with State

```html
<template id="ui-Counter">
  ##
    status.count = status.count || 0;
    const inc = () => { status.count++; component.refresh(); };
  ##
  <div>
    <span>##=status.count##</span>
    <button data-co-event="##:{click: inc}##">+</button>
  </div>
</template>
```

### List with Loop

```html
<template id="ui-List">
  <ul>
    ##data.items.forEach(item => {##
      <li>##=item##</li>
    ##})##
  </ul>
</template>
```

---

For more detailed information, please refer to the full Compomint documentation.
