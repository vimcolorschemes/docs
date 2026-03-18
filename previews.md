# Colorscheme code previews

## Collecting the colors

During the `generate` job of [The Worker](/worker), all potential colorschemes
are downloaded to the server.

Using those files, a real Neovim instance is launched and all colorscheme
variants are tried (colorscheme names found, as well as `light` and `dark`
backgrounds) on a very specific code snippet.

Using [extractor.nvim](https://github.com/vimcolorschemes/extractor.nvim), the
cursor moves through every token in the code snippet, and both the color and
the highlight group name under the cursor are stored. Each group is written as
a row in the `colorscheme_groups` table.

The data is stored across two tables. First, a row in `colorschemes`:

| column | example |
|---|---|
| `id` | `1` |
| `repository_id` | `397434315` |
| `name` | `catppuccin-macchiato` |

Then one row per highlight group in `colorscheme_groups`:

| column | example |
|---|---|
| `id` | `1` |
| `colorscheme_id` | `1` |
| `background` | `dark` |
| `name` | `NormalFg` |
| `hex_code` | `#CAD3F5` |

## Code sample template

A fixed code sample is used to generate color data from a vim color scheme.
The same sample is also rendered in the app as a shared preview template (via
React), and only the CSS custom properties are changed for each colorscheme.

The sample content is stored in the Worker at `vim/code_sample.vim`, and the app
renders matching classes in its preview component.

Here's a simplified sample of the rendered template:

```html
<span class="vimLet">let</span><span class="vimFuncBody"> </span>
<span class="vimVar">l:raw_color</span><span class="vimFuncBody"> </span>
<span class="vimOper">=</span><span class="vimFuncBody"> </span>
<span class="vimFuncName">trim</span><span class="vimParenSep">(</span>
<span class="vimFuncVar">a:color</span><span class="vimOperParen">, </span>
<span class="vimString">'#'</span><span class="vimParenSep">)</span>
```

## Applying the colors

You might have noticed that the classes generated in the HTML template match the
exact names of the color groups stored in the database.

Each class is added to a stylesheet, and each one gets a [CSS custom
property](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) that is
overwritten for each vim colorscheme preview, applying its syntax colors to the
shared code sample template:

```css
.vimParenSep {
  color: var(--colorscheme-vimParenSepFg);
}
```
