$(document).ready(function() {
  $('.modal').modal()

  var onBefore = function(q, options, paging, searchurl) {
    $('.simplesearch-more').prop('disabled', true)
    $('.search-facets').slideUp(500)
  }

  var onFail = function(error) {
    console.error('failed:', error)
    $('.simplesearch-more').prop('disabled', false)
  }

  var searchOnData = function(results) {
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

  var searchOnSuccess = function(results) {
    // turn urls into links
    var dl = $('.simplesearch-result dl:not(.devcenter-result)')
    $.each(dl, function(index, value) {
      var link = $(this).find('.simplesearch-value-url')
      var html = '<a href="' + link.text() + '" target="_blank">' + link.text() + '</a>'
      link.html(html)
      $(this).addClass('devcenter-result')
    })
    $('.simplesearch-more').prop('disabled', false)
  }

  var teamOnSuccess = function(results) {
    var li = $('.simplesearch-result:not(.team-result)'),
    data = results.data

    $.each(li, function(index, value) {
      var name = data.rows[index].name
      var bio = data.rows[index].bio || ''
      var git = data.rows[index]['github username'] || ''
      var twit = data.rows[index]['twitter username'] || ''
      var linked = data.rows[index]['linkedin url'] || ''
      var blog = data.rows[index]['personal blog url'] || ''
      var so = data.rows[index]['stack overflow user id'] || ''

      var specialties = data.rows[index].specialties.join(', ')
      var languages = data.rows[index].languages.join(', ')
      var connect = []

      var html = ''
      
      if (git) {
        html += '<img src="http://github.com/' + git + '.png?size=150" />'
        connect.push(' <a href="http://www.github.com/' + git + '" target="_blank">Github</a>')
      }
      if (twit) {
        connect.push(' <a href="http://www.twitter.com/' + twit + '" target="_blank">' + (twit.indexOf('@') === -1 ? ('@' + twit) : twit) + '</a>')
      }
      if (linked) {
        connect.push(' <a href="' + linked + '" target="_blank">LinkedIn</a>')
      }
      if (blog) {
        connect.push(' <a href="' + blog + '" target="_blank">Blog</a>')
      }
      if (so) {
        connect.push(' <a href="http://www.stackoverflow.com/users/' + so + '" target="_blank">Stack Overflow</a>')
      }

      var tldr = [specialties, languages, connect].join(', ')

      html += '<h3>' + name + '</h3>'
      html += '<p class="specialties">' + tldr + '</p>'
      html += "<div>"
      html += '<p class="bio">' + bio + '</p>'
      html += "</div>"
      html += '<p class="separator">&hellip;</p>'

      $(this).html(html)
      $(this).addClass('team-result')
    })
  }

  window.devadvo = {
    onBefore: onBefore,
    onFail: onFail,
    searchOnData: searchOnData,
    searchOnSuccess: searchOnSuccess,
    teamOnSuccess: teamOnSuccess
  }

  $('.search-input').bind('click', function() {
    $('.search-facets').slideDown(750)
  })
})
          