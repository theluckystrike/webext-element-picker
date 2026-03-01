# webext-element-picker — Visual Element Selector
> **Built by [Zovo](https://zovo.one)** | `npm i webext-element-picker`

Click to select elements, generate unique CSS selectors, and inspect element info.

```typescript
import { ElementPicker } from 'webext-element-picker';
const picker = new ElementPicker();
picker.start((el, selector) => {
  console.log('Selected:', selector);
  console.log('Info:', ElementPicker.getInfo(el));
});
```
MIT License
