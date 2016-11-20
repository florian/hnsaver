class HNSaver {
  constructor({ storageKey }) {
    this.storageKey = storageKey
    this.stories = this.getStories()
    console.log(this.stories)

    this.TITLE_SELECTOR = ".athing .title a.storylink"
  }

  activate() {
    this.manipulateSite()

    let titles = this.parseSite()
    this.addStories(titles)

    this.addEventHandlers()
  }

  getStories() {
	let content = localStorage.getItem(this.storageKey)

    if (content == null) {
        return {}
    } else {
        return JSON.parse(content)
    }
  }

  saveStories() {
    let content = JSON.stringify(this.stories)
    localStorage.setItem(this.storageKey, content)
  }

  addStories(titles) {
    titles.forEach((title) => {
    	if(!(title in this.stories)) {
    		this.stories[title] = false
    	}
    })

    this.saveStories()
  }

  markStoryAsRead(title) {
    this.stories[title] = true
    this.saveStories()
  }

  parseSite() {
    let titles = []

    $(this.TITLE_SELECTOR).each((i, item) => {
        titles.push(item.text)
    })

    return titles
  }

  addEventHandlers() {
    $(this.TITLE_SELECTOR).on("click contextmenu", (ev) => {
        let el = ev.target
        let title = el.text

        this.markStoryAsRead(title)
    })
  }

  manipulateSite() {
    this.addMetaDataToSite()
    this.markStoriesOnSite()
  }

  addMetaDataToSite() {
    let keys = Object.keys(this.stories)
    let total = keys.length

    let read = keys.reduce((count, title) => {
      if (this.stories[title]) {
        return count + 1
      } else {
        return count
      }
    }, 0)

    $(".pagetop").eq(0).append(`| Saw ${total}, read ${read}`)
  }

  markStoriesOnSite() {
    $(this.TITLE_SELECTOR).each((i, item) => {
    	let el = $(item)
        let title = el.text()
        this.markSingleStory(el, title)
    })
  }

  markSingleStory(el, title) {
    if (title in this.stories) {
      let clicked = this.stories[title]

      el.css({ color: "grey" })

      if (clicked) {
        el.parent().append(" ★")
      } else {
        el.parent().append(" ✓")
      }
    }
  }
}

let hnSaver = new HNSaver({ storageKey: "hn-stories" })
$(document).ready(() => hnSaver.activate())
