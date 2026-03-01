/**
 * Element Picker — Visual element selection with CSS selector generation
 */
export class ElementPicker {
    private overlay: HTMLElement | null = null;
    private active = false;
    private onSelect: ((el: Element, selector: string) => void) | null = null;

    /** Start picking mode */
    start(onSelect: (el: Element, selector: string) => void): this {
        this.active = true; this.onSelect = onSelect;
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = 'position:fixed;pointer-events:none;border:2px solid #3B82F6;background:rgba(59,130,246,0.1);border-radius:2px;z-index:999999;transition:all 0.1s ease';
        document.body.appendChild(this.overlay);
        document.addEventListener('mousemove', this.handleMove);
        document.addEventListener('click', this.handleClick, true);
        document.addEventListener('keydown', this.handleEsc);
        document.body.style.cursor = 'crosshair';
        return this;
    }

    /** Stop picking mode */
    stop(): void {
        this.active = false;
        this.overlay?.remove(); this.overlay = null;
        document.removeEventListener('mousemove', this.handleMove);
        document.removeEventListener('click', this.handleClick, true);
        document.removeEventListener('keydown', this.handleEsc);
        document.body.style.cursor = '';
    }

    /** Generate unique CSS selector for element */
    static getSelector(el: Element): string {
        if (el.id) return `#${el.id}`;
        const parts: string[] = [];
        let current: Element | null = el;
        while (current && current !== document.body) {
            let selector = current.tagName.toLowerCase();
            if (current.id) { parts.unshift(`#${current.id}`); break; }
            if (current.className) {
                const classes = Array.from(current.classList).filter((c) => !c.startsWith('__')).slice(0, 2).join('.');
                if (classes) selector += `.${classes}`;
            }
            const siblings = current.parentElement ? Array.from(current.parentElement.children).filter((c) => c.tagName === current!.tagName) : [];
            if (siblings.length > 1) { const idx = siblings.indexOf(current) + 1; selector += `:nth-of-type(${idx})`; }
            parts.unshift(selector);
            current = current.parentElement;
        }
        return parts.join(' > ');
    }

    /** Get element info */
    static getInfo(el: Element): { tag: string; id: string; classes: string[]; text: string; rect: DOMRect; attributes: Record<string, string> } {
        const attrs: Record<string, string> = {};
        Array.from(el.attributes).forEach((a) => { attrs[a.name] = a.value; });
        return {
            tag: el.tagName.toLowerCase(), id: el.id, classes: Array.from(el.classList),
            text: (el.textContent || '').trim().slice(0, 100), rect: el.getBoundingClientRect(), attributes: attrs
        };
    }

    private handleMove = (e: MouseEvent): void => {
        if (!this.active || !this.overlay) return;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && el !== this.overlay) {
            const rect = el.getBoundingClientRect();
            Object.assign(this.overlay.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
        }
    };

    private handleClick = (e: MouseEvent): void => {
        if (!this.active) return;
        e.preventDefault(); e.stopPropagation();
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && el !== this.overlay) { this.onSelect?.(el, ElementPicker.getSelector(el)); this.stop(); }
    };

    private handleEsc = (e: KeyboardEvent): void => { if (e.key === 'Escape') this.stop(); };
}
