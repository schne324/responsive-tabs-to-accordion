# Responsive Tabs to Accordion

Responsive tabs that snap down to accordion for mobile viewports

- Fully tested:
    - FireFox with NVDA
    - IE with JAWS
    - Safari with VoiceOver
- No use of media queries, so this will work in IE8 :)
- Just the tabs markup is needed...In mobile views, the dom is shifted around to create ideal accordion markup

- Full keyboard / a11y support:
    - Use arrow keys to move between tabs / accordion heads
    - For the tabs...
        - `role="tablist"` is applied to the `<ul />` (parent of each tab item)
        - `role="tab"` is applied to each tab element
        - `role="tabpanel"` is applied to each tab panel
        - `aria-selected="true"` is applied to a tab when it is selected
        - `aria-selected="false"` is applied to a tab when it is NOT selected
        - `aria-hidden="false"` is applied to a tabpanel when it is active
        - `aria-hidden="true"` is applied to each tabpanel that is NOT active
        - `aria-controls` is applied to each tab element which provides association between a tab and it's associated panel
    - For the accordion...
        - same attributes as tabs


## LICENSE:
The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
