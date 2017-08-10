/* global $, location */
$(document).ready(function () {
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

  var prepUserData = function (data) {
    var fields = data

    fields.specialties = data.specialties.join(', ')
    fields.languages = data.languages.join(', ')
    fields.showcases = data.showcases.join(', ')

    var connect = []
    var connecticons = []
    if (fields['github username']) {
      fields['profile icon'] = '<img src="http://github.com/' + fields['github username'] + '.png?size=200" />'
      connect.push(' <a href="http://www.github.com/' + fields['github username'] + '" target="_blank">Github</a>')
      connecticons.push('<a href="http://www.github.com/' + fields['github username'] + '" title="GitHub" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>')
    }
    if (fields['twitter username']) {
      connect.push(' <a href="http://www.twitter.com/' + fields['twitter username'] + '" target="_blank">' + (fields['twitter username'].indexOf('@') === -1 ? ('@' + fields['twitter username']) : fields['twitter username']) + '</a>')
      connecticons.push('<a href="https://twitter.com/' + fields['twitter username'] + '" title="Twitter" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>')
    }
    if (fields['medium url']) {
      connect.push(' <a href="' + fields['medium url'] + '" target="_blank">Medium</a>')
      connecticons.push('<a href="' + fields['medium url'] + '" title="Medium" target="_blank"><i class="fa fa-medium" aria-hidden="true"></i></a>')
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
    fields.connecticons = connecticons.join(' &nbsp; ')
    // fields.tldr = [fields.specialties, fields.languages, fields.connect].join(', ')

    return fields
  }

  window.devadvo = {
    onBefore: onBefore,
    onFail: onFail,
    searchOnData: searchOnData,
    searchOnSuccess: searchOnSuccess,
    teamOnSuccess: teamOnSuccess
  }

  var paths = location.pathname.split('/team/')
  if (paths.length > 1 && paths[1]) {
    $('#team_search').hide()
    $('#team_profile').html('loading...').show()
    var url = 'https://wdp-advo-team.mybluemix.net/search?q=%22github%20username%22:' + paths[1] + '&limit=1'
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
  } else {
    $('#team_profile').hide()
    $('#team_search').show()
  }

  // do not include listed projects
  // must be full name (i.e., 'ibm-watson-data-lab/pipes')
  // var skipRepos = []
  // if (typeof repos !== 'undefined' && repos !== null && repos.length > 0) {
  //   var total = repos.length

  //   // sort by stars
  //   repos.sort(function(a, b) {
  //     if (a.stargazers_count < b.stargazers_count) return 1;
  //     else if (b.stargazers_count < a.stargazers_count) return -1;
  //     else return 0
  //   })

  //   for (var i in repos) {
  //     if (skipRepos.indexOf(repos[i].full_name) === -1) {
  //       html = '<div class="repo">'
  //       html += '<h3>' + repos[i].name + '</h3>'
  //       html += '<a href="' + repos[i].html_url + '" target="_blank">' + repos[i].html_url + '</a>'
  //       html += '<div><p>' + repos[i].description + '</p></div>'
  //       html += '<div class="repo-meta">'
  //       html += '<i class="fa fa-code-fork" aria-hidden="true"></i>' + repos[i].forks_count
  //       html += '<i class="fa fa-star" aria-hidden="true"></i>' + repos[i].stargazers_count
  //       html += '<i class="fa fa-eye" aria-hidden="true"></i>' + repos[i].watchers_count
  //       html += '</div>'
  //       // html += '<div>' + new Date(repos[i].updated_at) + '</div>'
  //       html += '<p class="separator">&hellip;</p>'
  //       html += '</div>'

  //       $('.repos-list').append(html)
  //     }
  //   }

  //   $('.repos-count').html('Showing ' + total + ' of ' + total)
  //   var rows = $('.repo')

  //   $('#repos-search').keyup(function() {
  //     var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$';
  //     var reg = RegExp(val, 'i')
  //     var index = 0;

  //     rows.each(function(i, e) {
  //       if (!reg.test($(this).text().replace(/\s+/g, ' '))) {
  //         $(this).addClass('hidden')
  //       }
  //       else {
  //         $(this).removeClass('hidden')
  //         ++index
  //       }
  //     });

  //     $('.repos-count').html('Showing ' + index + ' of ' + total)
  //   });
  // }

  $(".dropdown-button").dropdown(
    { hover: true }
  );

  $(".button-collapse").sideNav();
})
