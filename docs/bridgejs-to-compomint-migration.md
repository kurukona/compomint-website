# BridgeJS to Compomint Migration Guide

This guide helps developers migrate from BridgeJS to Compomint, covering syntax changes, API updates, and best practices for a smooth transition.

## Table of Contents

1. [Overview](#overview)
2. [Key Differences](#key-differences)
3. [API Migration](#api-migration)
4. [Template Syntax Changes](#template-syntax-changes)
5. [HTML Attributes](#html-attributes)
6. [Built-in Variables](#built-in-variables)
7. [Event Handling](#event-handling)
8. [Component Creation](#component-creation)
9. [Template Loading](#template-loading)
10. [Internationalization](#internationalization)
11. [Built-in Components](#built-in-components)
12. [Configuration Options](#configuration-options)
13. [Step-by-Step Migration](#step-by-step-migration)
14. [Common Migration Issues](#common-migration-issues)

## Overview

Compomint is the evolved version of BridgeJS, maintaining the core template-based component philosophy while introducing improved APIs, better performance, and enhanced developer experience. The migration from BridgeJS to Compomint involves updating namespace references, adjusting some syntax patterns, and taking advantage of new features.

## Key Differences

### Framework Name and Namespace

| BridgeJS | Compomint |
|----------|-----------|
| `bridge.tmplTool.*` | `compomint.*` |
| `bridge.tmpl()` | `compomint.tmpl()` |
| `bridge.i18n.*` | `compomint.i18n.*` |

### File Size and Performance
- **BridgeJS**: Variable size depending on version
- **Compomint**: ~14KB gzipped, optimized for performance

### Modern JavaScript Support
- **BridgeJS**: Traditional JavaScript patterns
- **Compomint**: ES6+ support, Promise-based APIs, async/await compatibility

## API Migration

### Core API Changes

| BridgeJS Method | Compomint Method | Notes |
|----------------|------------------|-------|
| `bridge.tmplTool.addTmpl()` | `compomint.addTmpl()` | Same functionality |
| `bridge.tmplTool.addTmpls()` | `compomint.addTmpls()` | Same functionality |
| `bridge.tmplTool.addTmplByUrl()` | `compomint.addTmplByUrl()` | Now returns Promise |
| `bridge.tmpl()` | `compomint.tmpl()` | Same functionality |
| `bridge.tmplTool.addI18n()` | `compomint.addI18n()` | Same functionality |
| `bridge.tmplTool.addI18ns()` | `compomint.addI18ns()` | Same functionality |

### Template Scope Variables

| BridgeJS | Compomint | Notes |
|----------|-----------|-------|
| `tmplScope` | `component` | Renamed for clarity |
| `bridge` | `compomint` | Global object reference |

### Utility Functions

| BridgeJS Method | Compomint Method |
|----------------|------------------|
| `bridge.tmplTool.tag()` | `compomint.tools.genElement()` |
| `bridge.tmplTool.props()` | `compomint.tools.props()` |
| `bridge.tmplTool.genId()` | `compomint.tools.genId()` |
| `bridge.tmplTool.escapeHtml.*` | `compomint.tools.escapeHtml.*` |

## Template Syntax Changes

The template expression syntax remains largely the same, with minor updates:

### Expression Delimiters (No Changes)

```html
<!-- Both BridgeJS and Compomint use the same syntax -->
##= ##  <!-- Data interpolation -->
##- ##  <!-- HTML escaping -->
##% ##  <!-- Element insertion -->
##! ##  <!-- Pre-evaluation -->
## ##   <!-- JavaScript code -->
### ##  <!-- Lazy evaluation -->
##* ##  <!-- Comments -->
```

### Global Object References

**BridgeJS:**
```html
<template id="my-component">
  ##
    // Using bridge namespace
    const element = bridge.tmplTool.tag('div', {class: 'container'});
  ##
  <div>##=bridge.i18n.greeting##</div>
</template>
```

**Compomint:**
```html
<template id="my-component">
  ##
    // Using compomint namespace
    const element = compomint.tools.genElement('div', {class: 'container'});
  ##
  <div>##=compomint.i18n.greeting##</div>
</template>
```

## HTML Attributes

### Attribute Name Changes

| BridgeJS | Compomint | Notes |
|----------|-----------|-------|
| `data-bridge-event` | `data-co-event` | Shortened for convenience |
| `data-bridge-element-ref` | `data-co-element-ref` | Shortened for convenience |
| `data-bridge-named-element` | `data-co-named-element` | Shortened for convenience |
| `data-bridge-load` | `data-co-load` | Shortened for convenience |

### Migration Example

**BridgeJS:**
```html
<button data-bridge-event="##:handleClick##">Click Me</button>
<input data-bridge-element-ref="##:inputField##" />
<div data-bridge-named-element="##:'container'##"></div>
```

**Compomint:**
```html
<button data-co-event="##:handleClick##">Click Me</button>
<input data-co-element-ref="##:inputField##" />
<div data-co-named-element="##:'container'##"></div>
```

## Built-in Variables

### Variable Name Changes

| BridgeJS | Compomint | Notes |
|----------|-----------|-------|
| `tmplScope` | `component` | More descriptive name |
| `bridge` | `compomint` | Framework namespace |
| `data`, `status`, `i18n`, `tmpl` | `data`, `status`, `i18n`, `tmpl` | Unchanged |

### Variable Access Updates

**BridgeJS:**
```html
<template id="my-component">
  ##
    function updateComponent() {
      tmplScope.refresh({message: 'Updated'});
    }
  ##
  <button data-bridge-event="##:updateComponent##">Update</button>
</template>
```

**Compomint:**
```html
<template id="my-component">
  ##
    function updateComponent() {
      component.refresh({message: 'Updated'});
    }
  ##
  <button data-co-event="##:updateComponent##">Update</button>
</template>
```

## Event Handling

Event handler signatures remain the same, but the parameter object structure has minor updates:

### Event Handler Parameters

**BridgeJS:**
```javascript
function handleClick(event, {data, customData, targetElement, tmplScope}) {
  // Handler logic
}
```

**Compomint:**
```javascript
function handleClick(event, {data, customData, element, componentElement, component, compomint}) {
  // Handler logic - note the additional parameters
}
```

### Parameter Changes

| BridgeJS | Compomint | Notes |
|----------|-----------|-------|
| `targetElement` | `componentElement` | More descriptive |
| `tmplScope` | `component` | Renamed for consistency |
| `element` | `element` | Unchanged (triggering element) |
| - | `compomint` | New global reference |

## Component Creation

Component creation patterns remain the same:

### Using Namespace

**BridgeJS:**
```javascript
// Same in both frameworks
const button = tmpl.ui.Button({label: 'Click Me'});
document.body.appendChild(button.element);
```

**Compomint:**
```javascript
// Same syntax
const button = tmpl.ui.Button({label: 'Click Me'});
document.body.appendChild(button.element);
```

### Using Framework Function

**BridgeJS:**
```javascript
const button = bridge.tmpl('ui-Button')({label: 'Click Me'});
```

**Compomint:**
```javascript
const button = compomint.tmpl('ui-Button')({label: 'Click Me'});
```

## Template Loading

### Promise Support (New in Compomint)

**BridgeJS (Callback only):**
```javascript
bridge.tmplTool.addTmplByUrl('templates.html', function() {
  console.log('Templates loaded!');
  const mainScreen = tmpl.do.MainScreen({});
  document.body.appendChild(mainScreen.element);
});
```

**Compomint (Callback + Promise):**
```javascript
// Callback style (still supported)
compomint.addTmplByUrl('templates.html', function() {
  console.log('Templates loaded!');
  const mainScreen = tmpl.do.MainScreen({});
  document.body.appendChild(mainScreen.element);
});

// Promise style (new)
compomint.addTmplByUrl('templates.html')
  .then(() => {
    console.log('Templates loaded!');
    const mainScreen = tmpl.do.MainScreen({});
    document.body.appendChild(mainScreen.element);
  });

// Async/await style (new)
async function loadTemplates() {
  await compomint.addTmplByUrl('templates.html');
  const mainScreen = tmpl.do.MainScreen({});
  document.body.appendChild(mainScreen.element);
}
```

## Internationalization

The i18n API remains largely the same:

### API Consistency

**BridgeJS:**
```javascript
bridge.tmplTool.addI18n('greeting', {
  'en': 'Hello',
  'fr': 'Bonjour'
});
```

**Compomint:**
```javascript
compomint.addI18n('greeting', {
  'en': 'Hello',
  'fr': 'Bonjour'
});
```

### Usage in Templates

**Both frameworks:**
```html
<span>##=i18n.greeting##</span>
<span>##=compomint.i18n.greeting('Hello')##</span>
```

## Built-in Components

### Component Name Changes

| BridgeJS | Compomint | Notes |
|----------|-----------|-------|
| `br-Tag` | `co-Ele` | Shorter, more consistent naming |
| `br-Div` | `co-Element` | More generic, flexible component |
| `br-Input` | - | Use `co-Element` with appropriate props |
| `br-Select` | - | Use `co-Element` with appropriate props |
| `br-Template-Viewer` | - | Feature removed in favor of simpler alternatives |

### Usage Migration

**BridgeJS:**
```javascript
// Creating a div
const div = bridge.tmpl('br-Tag')(['div', {id: 'myDiv', class: 'container'}]);

// Creating a generic element
const button = bridge.tmpl('br-Div')({
  tag: 'button',
  content: 'Click Me',
  event: {click: handleClick}
});
```

**Compomint:**
```javascript
// Creating a div
const div = compomint.tmpl('co-Ele')(['div', {id: 'myDiv', class: 'container'}]);

// Creating a generic element
const button = compomint.tmpl('co-Element')({
  tag: 'button',
  content: 'Click Me',
  event: {click: handleClick}
});
```

## Configuration Options

### Configuration Path Changes

| BridgeJS | Compomint |
|----------|-----------|
| `bridge.tmplTool.showTime` | `compomint.configs.printExecTime` |
| `bridge.tmplTool.debug` | `compomint.configs.debug` |
| `bridge.tmplTool.throwError` | `compomint.configs.throwError` |
| `bridge.tmplTool.requestCacheControl` | *(Removed)* |

### Usage

**BridgeJS:**
```javascript
bridge.tmplTool.debug = true;
bridge.tmplTool.showTime = true;
```

**Compomint:**
```javascript
compomint.configs.debug = true;
compomint.configs.printExecTime = true;
```

## Step-by-Step Migration

### 1. Update Script References

**Replace BridgeJS script tag:**
```html
<!-- Remove -->
<script src="js/bridge.template.js"></script>

<!-- Add -->
<script src="https://cdn.jsdelivr.net/gh/kurukona/compomint@latest/dist/compomint.umd.min.js"></script>
```

### 2. Global Find and Replace

Perform these replacements across your codebase:

```bash
# API namespace changes
bridge.tmplTool. → compomint.
bridge.tmpl → compomint.tmpl
bridge.i18n → compomint.i18n

# Variable name changes
tmplScope → component

# HTML attribute changes
data-bridge-event → data-co-event
data-bridge-element-ref → data-co-element-ref
data-bridge-named-element → data-co-named-element
data-bridge-load → data-co-load

# Built-in component changes
br-Tag → co-Ele
br-Div → co-Element
```

### 3. Update Event Handlers

**Before:**
```javascript
function handleClick(event, {data, customData, targetElement, tmplScope}) {
  tmplScope.refresh({clicked: true});
}
```

**After:**
```javascript
function handleClick(event, {data, customData, element, componentElement, component, compomint}) {
  component.refresh({clicked: true});
}
```

### 4. Update Configuration

**Before:**
```javascript
bridge.tmplTool.debug = true;
bridge.tmplTool.showTime = true;
```

**After:**
```javascript
compomint.configs.debug = true;
compomint.configs.printExecTime = true;
```

### 5. Modernize Template Loading (Optional)

**Before:**
```javascript
bridge.tmplTool.addTmplByUrl('templates.html', function() {
  initializeApp();
});
```

**After (modern approach):**
```javascript
async function loadApp() {
  await compomint.addTmplByUrl('templates.html');
  initializeApp();
}

loadApp();
```

### 6. Update Built-in Components

**Before:**
```javascript
const element = bridge.tmpl('br-Tag')(['div', {class: 'container'}]);
```

**After:**
```javascript
const element = compomint.tmpl('co-Ele')(['div', {class: 'container'}]);
```

## Common Migration Issues

### 1. Missing Global Reference

**Issue:** `bridge is not defined`

**Solution:** Ensure you've updated all `bridge` references to `compomint`

### 2. Event Handler Parameter Mismatch

**Issue:** Event handlers receiving unexpected parameters

**Solution:** Update event handler parameter destructuring:
```javascript
// Old
function handler(event, {tmplScope}) { }

// New
function handler(event, {component}) { }
```

### 3. HTML Attribute Recognition

**Issue:** HTML attributes not being processed

**Solution:** Update attribute names:
```html
<!-- Old -->
<div data-bridge-event="##:handler##"></div>

<!-- New -->
<div data-co-event="##:handler##"></div>
```

### 4. Built-in Component Not Found

**Issue:** `br-*` components not found

**Solution:** Use equivalent `co-*` components:
```javascript
// Old
bridge.tmpl('br-Tag')(['div', props]);

// New
compomint.tmpl('co-Ele')(['div', props]);
```

### 5. Configuration Not Applied

**Issue:** Debug or timing configuration not working

**Solution:** Update configuration paths:
```javascript
// Old
bridge.tmplTool.debug = true;

// New
compomint.configs.debug = true;
```

## Migration Checklist

- [ ] Replace script references from BridgeJS to Compomint
- [ ] Update all `bridge.tmplTool.*` to `compomint.*`
- [ ] Update all `bridge.tmpl` to `compomint.tmpl`
- [ ] Update all `bridge.i18n` to `compomint.i18n`
- [ ] Replace `tmplScope` with `component` in templates
- [ ] Update HTML attributes from `data-bridge-*` to `data-co-*`
- [ ] Update event handler parameter destructuring
- [ ] Replace built-in component names (`br-*` to `co-*`)
- [ ] Update configuration option paths
- [ ] Test all components and functionality
- [ ] Consider modernizing template loading with Promises/async-await
- [ ] Update any custom utility function calls
- [ ] Verify internationalization still works correctly

## Benefits of Migration

### Performance Improvements
- Smaller bundle size (~14KB gzipped)
- Optimized template compilation
- Better memory management

### Modern JavaScript Features
- Promise-based APIs
- Async/await support
- ES6+ compatibility

### Enhanced Developer Experience
- Cleaner API surface
- Better error messages
- Improved debugging tools

### Future-Proofing
- Active development and maintenance
- Regular updates and improvements
- Better browser compatibility

## Conclusion

Migrating from BridgeJS to Compomint is straightforward, involving primarily namespace changes and minor API updates. The core template philosophy and most syntax patterns remain identical, making it easy to take advantage of Compomint's improvements while maintaining your existing component architecture.

For additional help and examples, visit:
- [Compomint Website](https://compomint.dev/)
- [GitHub Repository](https://github.com/kurukona/compomint)
- [Documentation](https://compomint.dev/)