# ddu-source-colorscheme

Colorscheme source for ddu.vim

This source collects all of installed colorschemes.

Please read [help](doc/ddu-source-colorscheme.txt) for details.

## Requirements

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [ddu.vim](https://github.com/Shoguo/ddu.vim)

## Configuration

```vim
" Set kind default action.
call ddu#custom#patch_global({
      \ 'kindOptions': {
      \   'colorscheme': {
      \     'defaultAction': 'set',
      \   },
      \ },
      \ })

" Use colorscheme source.
call ddu#start({'sources': [{'name': 'colorscheme'}]})
```
