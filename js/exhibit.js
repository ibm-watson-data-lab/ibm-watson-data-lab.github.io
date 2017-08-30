/* global $, location */
$(document).ready(function () {
  var searchuserGithub = 'https://wdp-advo-team.mybluemix.net/search?q=%22github%20username%22:{username}&limit=1'
  var searchuserTwitter = 'https://wdp-advo-team.mybluemix.net/search?q=%22twitter%20username%22:{username}&limit=1'
  var searchuserMedium = 'https://wdp-advo-team.mybluemix.net/search?q=%22medium%20username%22:{username}&limit=1'

  $('.button-collapse').sideNav()
  $('.modal').modal()

  var onBefore = function (q, options, paging, searchurl) {
    $('.simplesearch-more').prop('disabled', true)
  }

  var onFail = function (error) {
    console.error('failed:', error)
    $('.simplesearch-more').prop('disabled', false)
  }

  var searchOnData = function (results) {
    // limit the fields to display
    if (results.data.rows) {
      results.fields = [
        { name: 'name' },
        { name: 'url' },
        { name: 'description' }
      ]
    }
    return results
  }

  var searchOnSuccess = function (results) {
    // turn urls into links
    var dl = $('.simplesearch-result dl:not(.devcenter-result)')
    $.each(dl, function (index, value) {
      var link = $(this).find('.simplesearch-value-url')
      var html = '<a href="' + link.text() + '" target="_blank">' + link.text() + '</a>'
      link.html(html)
      $(this).addClass('devcenter-result')
    })
    $('.simplesearch-more').prop('disabled', false)
  }

  var teamOnSuccess = function (results) {
    var li = $('.simplesearch-result:not(.team-result)')
    var data = results.data

    $.each(li, function (index, value) {
      var userdata = prepUserData(data.rows[index])

      var tmpl = $('#team_search_result')
        .html()
        .replace(/\{\{(.+?)\}\}/g, function ($0, $1) {
          return userdata.hasOwnProperty($1) ? userdata[$1] : '' // $0
        })

      $(this).html(tmpl)
      $(this).addClass('team-result')
    })
  }

  // https://stackoverflow.com/a/10772475
  var sanitizeHTML = function (htmlStr) {
    var whitelist = 'b|i|em|strong|a|p|strike|code' // allowed tags
    var blacklist = 'script|object|embed' // completely remove tags
    // /(<(script|object|embed)[^>]*>.*<\/\2>|(?!<[/]?(b|i|em|strong|a|p|strike|code)(\s[^<]*>|[/]>|>))<[^<>]*>|(?!<[^<>\s]+)\\s[^</>]+(?=[/>]))/gi
    var re = new RegExp('(<(' + blacklist + ')[^>]*>.*</\\2>|(?!<[/]?(' + whitelist + ')(\\s[^<]*>|[/]>|>))<[^<>]*>|(?!<[^<>\\s]+)\\\\s[^</>]+(?=[/>]))', 'gi')
    return htmlStr.replace(re, '')
  }

  var prepUserData = function (data) {
    var fields = data

    fields.specialties = data.specialties.join(', ')
    fields.languages = data.languages.join(', ')
    fields.showcases = data.showcases.join(', ')

    for (var f in fields) {
      if (f === 'bio') {
        fields[f] = sanitizeHTML(fields[f])
      } else if (typeof fields[f] === 'string') {
        fields[f] = fields[f].replace(/</g, '&lt;').replace(/>/g, '&gt;')
      }
    }

    var connect = []
    var connecticons = []
    if (fields['github username']) {
      fields['profile icon'] = '<img src="http://github.com/' + fields['github username'] + '.png?size=200" />'
      fields.linkhash = 'g/' + fields['github username']
      connect.push(' <a href="http://www.github.com/' + fields['github username'] + '" target="_blank">Github</a>')
      connecticons.push('<a href="http://www.github.com/' + fields['github username'] + '" title="GitHub" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>')
    }
    if (fields['medium username']) {
      fields.linkhash = fields.linkhash || ('m/' + fields['medium username'])
      connect.push(' <a href="https://medium.com/' + (fields['medium username'].indexOf('@') === -1 ? ('@' + fields['medium username']) : fields['medium username']) + '" target="_blank">Medium</a>')
      connecticons.push('<a href="https://medium.com/' + (fields['medium username'].indexOf('@') === -1 ? ('@' + fields['medium username']) : fields['medium username']) + '" title="Medium" target="_blank"><i class="fa fa-medium" aria-hidden="true"></i></a>')
    }
    if (fields['twitter username']) {
      fields.linkhash = fields.linkhash || ('t/' + fields['twitter username'])
      connect.push(' <a href="http://www.twitter.com/' + fields['twitter username'] + '" target="_blank">' + (fields['twitter username'].indexOf('@') === -1 ? ('@' + fields['twitter username']) : fields['twitter username']) + '</a>')
      connecticons.push('<a href="https://twitter.com/' + fields['twitter username'] + '" title="Twitter" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>')
    }
    if (fields['linkedin url']) {
      connect.push(' <a href="' + fields['linkedin url'] + '" target="_blank">LinkedIn</a>')
      connecticons.push('<a href="' + fields['linkedin url'] + '" title="LinkedIn" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>')
    }
    if (fields['personal blog url']) {
      connect.push(' <a href="' + fields['personal blog url'] + '" target="_blank">Blog</a>')
      connecticons.push('<a href="' + fields['personal blog url'] + '" title="Blog" target="_blank"><i class="fa fa-laptop" aria-hidden="true"></i></a>')
    }
    if (fields['stack overflow user id']) {
      connect.push(' <a href="http://www.stackoverflow.com/users/' + fields['stack overflow user id'] + '" target="_blank">Stack Overflow</a>')
      connecticons.push('<a href="http://www.stackoverflow.com/users/' + fields['stack overflow user id'] + '" title="Stack Overflow" target="_blank"><i class="fa fa-stack-overflow" aria-hidden="true"></i></a>')
    }

    fields.connect = connect
    fields.connecticons = connecticons.join(' ')
    // fields.tldr = [fields.specialties, fields.languages, fields.connect].join(', ')

    return fields
  }

  var teamHashChanged = function () {
    var hash = null
    if (location.hash && location.pathname.indexOf('/team') === 0) {
      hash = location.hash.charAt(1) === '/' ? location.hash.substring(2) : location.hash.substring(1)
      if (hash) {
        $('#team_search').hide()
        $('#team_profile').html('loading...').show()

        var url = null
        if (hash.indexOf('g/') === 0) {
          url = searchuserGithub.replace('{username}', hash.substring(2))
        } else if (hash.indexOf('m/') === 0) {
          url = searchuserMedium.replace('{username}', hash.substring(2))
        } else if (hash.indexOf('t/') === 0) {
          url = searchuserTwitter.replace('{username}', hash.substring(2))
        } else {
          hash = null
        }

        if (url) {
          $.getJSON(url).then(function (data) {
            var advocate = data && data.rows.length ? data.rows[0] : null
            if (advocate) {
              var userdata = prepUserData(advocate)

              var tmpl = $('#team_member_profile')
                .html()
                .replace(/\{\{(.+?)\}\}/g, function ($0, $1) {
                  return userdata.hasOwnProperty($1) ? userdata[$1] : '' // $0
                })

              $('#team_profile').html(tmpl).show()
            } else {
              $('#team_profile').html('<p>nothing to see here</p>').show()
            }
          })
        }
      }
    }

    if (!hash) {
      $('#team_profile').hide()
      $('#team_search').show()
    }
  }

  window.devadvo = {
    onBefore: onBefore,
    onFail: onFail,
    searchOnData: searchOnData,
    searchOnSuccess: searchOnSuccess,
    teamOnSuccess: teamOnSuccess
  }

  if ('onhashchange' in window) {
    window.onhashchange = teamHashChanged
  }

  $('.dropdown-button').dropdown(
    { hover: true }
  )

  $('.button-collapse').sideNav()

  teamHashChanged()
})
