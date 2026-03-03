# webext-element-picker — Visual Element Selector

[![npm version](https://img.shields.io/npm/v/webext-element-picker)](https://npmjs.com/package/webext-element-picker)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/webext-element-picker/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-element-picker/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/webext-element-picker?style=social)](https://github.com/theluckystrike/webext-element-picker)

> Click to select elements, generate unique CSS selectors, and inspect element info.

**webext-element-picker** is a visual element selector for Chrome extensions. Let users click to select elements on any webpage, generate unique CSS selectors, and inspect element properties — perfect for creating selectors or debugging.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **Click to Select** - Interactive element selection mode
- ✅ **CSS Selector Generation** - Generate unique, stable selectors
- ✅ **Element Inspection** - Get element properties and attributes
- ✅ **Visual Highlighting** - Highlight selected elements
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install webext-element-picker
```

## Quick Start

```typescript
import { ElementPicker } from 'webext-element-picker';

const picker = new ElementPicker();
picker.start((el, selector) => {
  console.log('Selected:', selector);
  console.log('Info:', ElementPicker.getInfo(el));
});
```

## Usage Examples

### Basic Selection

```typescript
const picker = new ElementPicker();

picker.start((element, selector) => {
  // User selected an element
  console.log('CSS Selector:', selector);
  
  // Get detailed element info
  const info = ElementPicker.getInfo(element);
  console.log('Tag:', info.tagName);
  console.log('ID:', info.id);
  console.log('Classes:', info.classes);
  console.log('Attributes:', info.attributes);
});
```

### Stop Picker

```typescript
const picker = new ElementPicker();
picker.start(onSelect);

// Later, stop the picker
picker.stop();
```

### Custom Selector Options

```typescript
const picker = new ElementPicker({
  // Minimum specificity level
  minSpecificity: 'id',
  
  // Include data attributes
  includeDataAttrs: true,
  
  // Custom class prefix
  classPrefix: 'my-extension',
});

picker.start((el, selector) => {
  console.log('Generated selector:', selector);
});
```

## API

### ElementPicker Class

| Method | Description |
|--------|-------------|
| `new ElementPicker(options?)` | Create a new picker instance |
| `picker.start(callback)` | Start selection mode |
| `picker.stop()` | Stop selection mode |
| `ElementPicker.getInfo(el)` | Get element properties |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| minSpecificity | string | 'class' | Minimum selector specificity |
| includeDataAttrs | boolean | true | Include data attributes |
| classPrefix | string | - | Prefix for generated classes |

### Callback Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| element | HTMLElement | The selected DOM element |
| selector | string | Generated CSS selector |

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/picker-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/picker-feature`
7. **Submit** a Pull Request

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [webext-tooltip](https://github.com/theluckystrike/webext-tooltip) - Tooltip component
- [chrome-page-info](https://github.com/theluckystrike/chrome-page-info) - Page data extraction
- [chrome-dom-observer](https://github.com/theluckystrike/chrome-dom-observer) - DOM observer
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Extension template

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
