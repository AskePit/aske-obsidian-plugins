'use strict'
var obsidian = require('obsidian')

const DEFAULT_SETTINGS = {
    listLength: 10,
}

class RecentEditedNotesPlugin extends obsidian.Plugin {
    settings = null

    async onload() {
        await this.loadSettings()
        this.addSettingTab(new RecentEditedNotesSettingTab(this.app, this))

        this.registerView(
            VIEW_TYPE_RECENT_EDITED_NOTES,
            (leaf) => new RecentEditedNotesView(leaf, this)
        )
        this.activateView()
    }

    async activateView() {
        const { workspace } = this.app
    
        let leaf = null
        const leaves = workspace.getLeavesOfType(VIEW_TYPE_RECENT_EDITED_NOTES)
    
        if (leaves.length > 0) {
            // A leaf with our view already exists, use that
            leaf = leaves[0]
        } else {
            // Our view could not be found in the workspace, create a new leaf
            // in the right sidebar for it
            leaf = workspace.getRightLeaf(false)
            await leaf.setViewState({ type: VIEW_TYPE_RECENT_EDITED_NOTES, active: true })
        }
    
        // "Reveal" the leaf in case it is in a collapsed sidebar
        workspace.revealLeaf(leaf)
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
    }

    async saveSettings() {
        await this.saveData(this.settings)
    }
}

const VIEW_TYPE_RECENT_EDITED_NOTES = 'recent-edited-notes-view'

function getTopNFiles(plugin, n) {
	const files = plugin.app.vault.getMarkdownFiles().sort(
		(f1, f2) => {
			return f2.stat.mtime - f1.stat.mtime
		}
	)
	
	if (files.length > n) {
		files.length = n
	}
	
	return files
}

class RecentEditedNotesView extends obsidian.ItemView {
    plugin = null

    constructor(leaf, plugin) {
        super(leaf)
        this.plugin = plugin
    }

    getViewType() {
        return VIEW_TYPE_RECENT_EDITED_NOTES
    }

    getDisplayText() {
        return 'Recent edited notes'
    }

    async onOpen() {
        this.registerEvent(
            this.plugin.app.vault.on('modify', (file) => {
                this.update()
            })
        )
        this.registerEvent(
            this.plugin.app.vault.on('rename', (file) => {
                this.update()
            })
        )

        this.update()
    }

    update() {
        const container = this.containerEl.children[1]
        container.empty()

        container.createEl('h4', { text: `Top-${this.plugin.settings.listLength} recent edited notes` })

        const files = getTopNFiles(this.plugin, this.plugin.settings.listLength)
        const ul = container.createEl('ul')

        for (const file of files) {
            const li = ul.createEl('li')
            const link = li.createEl('a', { text: file.basename })
            link.addEventListener("click", (event) => {
                event.preventDefault() // Prevent default link behavior
                app.workspace.openLinkText(file.path, "", false) // Open the note
            })
        }
    }
}

class RecentEditedNotesSettingTab extends obsidian.PluginSettingTab {
    plugin
  
    constructor(app, plugin) {
        super(app, plugin)
        this.plugin = plugin
    }
  
    display() {
        let { containerEl } = this

        containerEl.empty()

        new obsidian.Setting(containerEl)
            .setName('List length')
            .setDesc('How long is your list of recently edited notes')
            .addText((text) =>
                text
                .setValue(this.plugin.settings.listLength)
                .onChange(async (value) => {
                    this.plugin.settings.listLength = value
                    await this.plugin.saveSettings()
                })
            )
    }
}

module.exports = RecentEditedNotesPlugin
