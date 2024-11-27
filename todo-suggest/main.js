'use strict'
var obsidian = require('obsidian')

const removePrefix = (value, prefix) =>
    value.startsWith(prefix) ? value.slice(prefix.length) : value;

function suggestTodoImpl(markdown) {
    const todos = markdown.split("\n")
        // find TODOs
        .filter(line => {
            if (line.startsWith('- [x]')) return
            return line.startsWith('- ') || line.startsWith('- [ ]')
        })
        // prettify TODOs
        .map(line => removePrefix(removePrefix(line, '- [ ]'), '- ').trim())

    if (todos.length === 0) {
        return null
    }

    const randomLine = todos[Math.floor(Math.random() * todos.length)]
    return randomLine
}

class TodoSuggestPlugin extends obsidian.Plugin {
    async onload() {
        this.addCommand({
            id: 'Suggest-random-todo',
            name: 'Suggest random TODO',
            callback: () => {this.suggestTodo()}
        })

        this.addRibbonIcon('dice', 'Suggest random TODO', (evt) => {
            this.suggestTodo()
        })
    }

    async suggestTodo() {
        const activeView = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)
        if (!activeView) {
            new Notice("No active note found!")
            return
        }

        let content
        if (activeView.getMode() === "source") {
            // Editor mode: Get content from the editor
            const editor = activeView.editor
            content = editor.getValue()
        } else if (activeView.getMode() === "preview") {
            // Reading mode: Read content from the file
            const file = activeView.file
            content = await this.app.vault.read(file)
        }

        if (!content) {
            new Notice("Could not read content!")
            return
        }

        const todo = suggestTodoImpl(content)
        
        if (!todo) {
            new Notice("No TODOs available!")
            return
        }

        new ResultModal(this.app, todo).open()
    }
}

class ResultModal extends obsidian.Modal {
    constructor(app, todo) {
        super(app)

        this.setTitle('Your TODO')
        this.setContent(todo)

        new obsidian.Setting(this.contentEl)
            .addButton((btn) =>
                btn
                .setButtonText('OK')
                .setCta()
                .onClick(() => {
                    this.close()
                })
            )
    }
}

module.exports = TodoSuggestPlugin
