'use strict'
var obsidian = require('obsidian')

const removePrefix = (value, prefix) =>
    value.startsWith(prefix) ? value.slice(prefix.length) : value;

class GuitarTabsViewerPlugin extends obsidian.Plugin {
    async onload() {
        this.registerMarkdownPostProcessor((element, context) => {
            const codeblocks = element.findAll('code')
      
            for (let codeblock of codeblocks) {
                const blockName = removePrefix(codeblock.className, 'language-')
                if (blockName != "tab" && blockName != "tabs") {
                    continue
                }

                const targetSymbol = '·'

                codeblock.innerHTML = codeblock.innerHTML
                    .replaceAll('-', targetSymbol) // minus sign
                    .replaceAll('–', targetSymbol) // en-dash
                    .replaceAll('—', targetSymbol) // em-dash
                    .replaceAll('─', targetSymbol) // horizontal line
                    .replaceAll('‒', targetSymbol) // figure dash
            }
        })
    }
}

module.exports = GuitarTabsViewerPlugin
