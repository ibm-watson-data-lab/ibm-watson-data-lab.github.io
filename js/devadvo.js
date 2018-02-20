/* global $, telescopicIntro, recentArticles, authorLinks */

var shuffleStrategies = function () {
  var li = $('.strategies-list > ul > li')
  li.detach().sort(function (a, b) {
    return parseInt(Math.random() * 10) % 2
  })
  $('.strategies-list > ul').empty().append(li)
}

var initTelescopicText = function (telescopicTextJSON, telescopicTextContainer) {
  var compose = function (textObject) {
    var story = []
    var keys = Object.keys(textObject)

    for (var i in keys) {
      var key1 = keys[i]
      var key2 = ''
      var lastIndex = key1.length - 1
      if (key1.indexOf(',') === lastIndex) {
        key1 = key1.substring(0, lastIndex)
        key2 = ','
      }
      var val = textObject[keys[i]]
      if (val === null || typeof val === 'undefined') {
        story.push('<span class="telescopic-text">' + keys[i] + '</span>')
      } else if (typeof val === 'string') {
        story.push('<a class="telescopic-link" href="' + val + '">' + key1 + '</a>' + key2)
      } else if (typeof val === 'object') {
        var chapter = compose(val)
        var id = i + '-' + keys[i].toLowerCase().replace(/([^A-Z0-9])+/ig, '')
        story.push('<span class="telescopic-root"><span id="telescopic-link-' + id + '" data-controls="telescopic-text-' + id + '" class="telescopic-link">' + key1 + '</span>' + key2 + '</span>')
        story.push('<span id="telescopic-text-' + id + '" data-controlledby="telescopic-link-' + id + '" class="telescopic-content hidden">' + chapter + '</span>')
      }
    }

    return story.join(' ')
  }

  var textobj = typeof telescopicTextJSON === 'string' ? JSON.parse(telescopicTextJSON) : telescopicTextJSON
  var telescopicTextContent = compose(textobj)

  $(telescopicTextContainer).html(telescopicTextContent)
  var reset = $('<i class="fa fa-reply telescopic-reset" tabindex"0"></i>')
  reset.on('click', function () {
    $('.telescopic-content:not(.hidden').addClass('hidden')
    $('.telescopic-root.hidden').removeClass('hidden')
  })
  $(telescopicTextContainer).append(reset)

  $('span[data-controls].telescopic-link')
    .each(function () {
      $(this).on('click', function (event) {
        $(this).parent().addClass('hidden')
        $('#' + $(this).data('controls')).removeClass('hidden')
      })
    })
}

var getIconClass = function (service) {
  if (service) {
    var s = service.toLowerCase().replace(/\s/g, '')
    if (s.indexOf('github') > -1) {
      return 'fa fa-github'
    } else if (s.indexOf('twitter') > -1) {
      return 'fa fa-twitter'
    } else if (s.indexOf('stackoverflow') > -1) {
      return 'fa fa-stack-overflow'
    } else if (s.indexOf('medium') > -1) {
      return 'fa fa-medium'
    } else if (s.indexOf('linkedin') > -1) {
      return 'fa fa-linkedin'
    } else if (s.indexOf('http') === -1 && s.indexOf('@') > -1) {
      return 'fa fa-envelope'
    } else if (s.indexOf('http') > -1) {
      return 'fa fa-laptop'
    }
  }
}

var initAuthorLinks = function (authorLinks, authorLinksContainer) {
  var links = []
  var icon = null
  var mail = false
  var authorlinks = typeof authorLinks === 'string' ? JSON.parse(authorLinks) : authorLinks
  if (!authorlinks.length) {
    var keys = Object.keys(authorLinks)
    for (var i = 0; i < keys.length; i++) {
      icon = getIconClass(keys[i])
      mail = keys[i] && keys[i].indexOf('http') === -1 && keys[i].indexOf('@') > -1
      if (icon) {
        if (mail) {
          links.push('<a href="mailto:' + authorLinks[keys[i]] + '"><i class="' + icon + '" aria-hidden="true"></i></a>')
        } else {
          links.push('<a href="' + authorLinks[keys[i]] + '" target="_blank"><i class="' + icon + '" aria-hidden="true"></i></a>')
        }
      }
    }
  } else {
    for (var j = 0; j < authorLinks.length; j++) {
      icon = getIconClass(authorLinks[j])
      mail = authorLinks[j] && authorLinks[j].indexOf('http') === -1 && authorLinks[j].indexOf('@') > -1
      if (icon) {
        if (mail) {
          links.push('<a href="mailto:' + authorLinks[j] + '"><i class="' + icon + '" aria-hidden="true"></i></a>')
        } else {
          links.push('<a href="' + authorLinks[j] + '" target="_blank"><i class="' + icon + '" aria-hidden="true"></i></a>')
        }
      }
    }
  }

  $(authorLinksContainer).html(links)
}

var randomizeRecent = function (newArticles, recentContainer) {
  var hero = newArticles[Math.floor(Math.random() * 5)]
  var mainLink
  var pubName
  var icon

  if (hero.links['Compose Articles']) {
    mainLink = hero.links['Compose Articles']
    pubName = 'Compose.com/articles'
    icon = 'cubes'
  } else if (hero.links['Medium']) {
    mainLink = hero.links['Medium']
    pubName = 'Medium.com'
    icon = 'medium'
  } else if (hero.links['GitHub']) {
    mainLink = hero.links['GitHub']
    pubName = 'GitHub'
    icon = 'github'
  } else if (hero.links['Notebook']) {
    mainLink = hero.links['Notebook']
    pubName = 'Data Science Notebook'
    icon = 'book'
  } else if (hero.links['npm']) {
    mainLink = hero.links['npm']
    pubName = 'npmjs.com'
    icon = 'code'
  } else if (hero.links['dataset']) {
    mainLink = hero.links['dataset']
    pubName = 'Dataset'
    icon = 'database'
  } else {
    mainLink = hero.links[ Object.keys(hero.links)[0] ]
    pubName = 'External Site'
    icon = 'newspaper-o'
  }

  var html = `<a href="${mainLink}" title="Find it on ${pubName}" class="latest-title">${hero.title}</a>
    <br/><div class="latest-headline">${hero.headline}</div>
    <a href="${mainLink}" class="latest-link"><i class="fa fa-${icon}" aria-hidden="true"></i>${pubName}</a>`

  $(recentContainer).append(html)
}

$(document).ready(function () {
  $('.button-collapse').sideNav()

  shuffleStrategies()

  if (typeof telescopicIntro === 'object') {
    initTelescopicText(telescopicIntro, '#telescopicText')
  }

  if (typeof recentArticles === 'object') {
    randomizeRecent(recentArticles, '#hero')
  }

  if (typeof authorLinks !== 'undefined') {
    var links = authorLinks
    if (typeof authorLinks === 'object' && !authorLinks.length) {
      links = []
      var keys = Object.keys(authorLinks)
      for (var i = 0; i < keys.length; i++) {
        links.push(authorLinks[keys[i]])
      }
    }
    initAuthorLinks(links, '#authorLinks')
  }

  $('[data-author-img]').each(function (index, author) {
    var links = $(author).data('author-img').split('!$!')
    for (var i = 0; i < links.length; i++) {
      if (links[i].indexOf('github.com') !== -1) {
        $(author).attr('src', links[i] + '.png?size=200')
        break
      }
    }
  })

  $('#pintar').pushpin({
    top: 0,
    offset: 100
  })
})
