/* global $, location, Materialize, owpackageurl */

$(document).ready(function () {
  var searchuserEmail = 'https://wdp-advo-team.mybluemix.net/search?q=email:%22{username}%22&limit=1'

  $('.sign-in-form').hide()
  $('.sign-out').hide()
  $('.spinner').show()

  $('#btn-signout').click(function (e) {
    var url = owpackageurl + '/verify'
    $.ajax({
      url: url,
      type: 'POST',
      data: { logout: true },
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.authToken
      }
    })
    .always(function (dataORxhr, textStatus, xhrORerror) {
      if (window.localStorage) {
        clearAuth()
      }
      location.reload()
    })
  })

  $('#profile-edit-form').on('submit', function (e) {
    e.preventDefault()

    var form = $(this)
    $('#btn-profile-edit').prop('disabled', true)
    $('input, textarea', form).prop('disabled', true)
    $('.edit-msg').empty()

    var action = form.attr('action')
    var type = form.attr('method')
    var data = {}

    form.find('[name]').each(function (i, v) {
      var input = $(this)
      var name = input.attr('name')
      var value = input.val()
      data[name] = value
    })

    console.log('edit', action, type, data)
    $.ajax({
      url: action,
      type: type,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.authToken
      }
    })
    .done(function (result, status, xhr) {
      console.log('put', result)
      $('#btn-profile-edit').prop('disabled', false)
      $('input, textarea', form).prop('disabled', false)
      window.location = '/team/#/g/' + data['github username']
    })
    .fail(function (xhr, status, err) {
      console.log('put', err)
      $('.edit-msg').text('Failed to update profile')
      $('#btn-profile-edit').prop('disabled', false)
      $('input, textarea', form).prop('disabled', false)
    })

    return false
  })

  $('.sign-in-form form').on('submit', function (e) {
    e.preventDefault()

    var form = $(this)
    $('#btn-signin').prop('disabled', true)
    $('input', form).prop('disabled', true)
    $('.sign-in-title').text('')
    $('.spinner').show()

    var action = form.attr('action')
    var type = form.attr('method')
    var data = {}

    form.find('[name]').each(function (i, v) {
      var input = $(this)
      var name = input.attr('name')
      var value = input.val()
      data[name] = value
    })

    $.ajax({
      url: action,
      type: type,
      data: data
    })
    .done(function (result, status, xhr) {
      if (result.error || result.status === 'error') {
        var resp = xhr.responseJSON || xhr.responseText
        $('.sign-in-title').text(resp.message || resp || result.error)
        $('input', form).prop('disabled', false)
        $('#btn-signin').prop('disabled', false)
      } else {
        $('.sign-in-form').hide()
        $('.sign-in-title').text(result.message || result)
      }
    })
    .fail(function (xhr, status, err) {
      var resp = xhr.responseJSON || xhr.responseText
      console.error(resp)
      $('.sign-in-title').text(resp.message || resp)
      $('input', form).prop('disabled', false)
      $('#btn-signin').prop('disabled', false)
    })
    .always(function () {
      $('.spinner').hide()
    })

    return false
  })

  var isLoggedIn = function (done) {
    if (window.localStorage && window.localStorage.authToken) {
      var token = window.localStorage.authToken
      var url = owpackageurl + '/verify'
      $.ajax({
        url: url,
        type: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .done(function (data, status, xhr) {
        if (data.error || data.status === 'error') {
          clearAuth()
          done(false)
        } else {
          done(true)
        }
      })
      .fail(function (xhr, status, err) {
        clearAuth()
        done(false)
      })
    } else {
      done(false)
    }
  }

  var clearAuth = function () {
    delete window.localStorage.authToken
    delete window.localStorage.authUser
  }

  var signinValidate = function (loggedIn) {
    var qs = {}

    location.search.substr(1).split('&').forEach(function (pair) {
      if (pair === '') return
      var parts = pair.split('=')
      qs[parts[0]] = parts[1] && decodeURIComponent(parts[1].replace(/\+/g, ' '))
    })

    if (qs.token) {
      $('input', '.sign-in-form form').prop('disabled', true)
      $('.sign-in-title').text('Signing in...')
      var url = owpackageurl + '/auth'

      $.ajax({
        url: url,
        type: 'POST',
        data: { token: qs.token }
      })
      .done(function (data, status, xhr) {
        console.log('signinValidate', data)
        let token = xhr.getResponseHeader('X-Auth-Token')

        if (data.error || data.status === 'error' || !token) {
          var resp = xhr.responseJSON || xhr.responseText
          $('.sign-in-title').text(resp.message || resp || data.error || 'Invalid login')
          $('input', '.sign-in-form form').prop('disabled', false)
        } else {
          window.localStorage.authToken = token
          window.localStorage.authUser = xhr.getResponseHeader('X-Auth-User')
          window.location = '/signin'
        }
      })
      .fail(function (xhr, status, err) {
        console.error(err)
        var resp = xhr.responseJSON || xhr.responseText
        $('.sign-in-title').text(resp.message || resp)
        $('input', '.sign-in-form form').prop('disabled', false)
      })
    }
  }

  var profileValidate = function (loggedIn) {
    if (!loggedIn) {
      $('#profile-edit-form').html(
        '<div class="row">' +
          '<div class="col s12 valign-wrapper" style="height: 50vh;">' +
            '<a href="/signin" class="btn-flat">Sign In</a>' +
          '</div>' +
        '</div>'
      )
    } else {
      var user = window.localStorage.authUser
      var url = searchuserEmail.replace('{username}', user)

      $.getJSON(url).then(function (data) {
        var advocate = data && data.rows.length ? data.rows[0] : null
        if (advocate) {
          var userdata = advocate

          var tmpl = $('#team_profile_edit')
            .html()
            .replace(/\{\{(.+?)\}\}/g, function ($0, $1) {
              return userdata.hasOwnProperty($1) ? userdata[$1] : '' // $0
            })

          $('#profile-edit-form').html(tmpl)
          $('#bio').val(userdata.bio)
          Materialize.updateTextFields()
        }
      })
    }
  }

  var pageAuth = function (loggedIn) {
    if (location.pathname.indexOf('/signin') === 0) {
      signinValidate(loggedIn)
    } else if (location.pathname.indexOf('/profile') === 0) {
      profileValidate(loggedIn)
    }
  }

  $.sub('/member', function (e, member) {
    if (window.localStorage && window.localStorage.authUser === member.email) {
      $('p.connecticons').prepend('<a href="/profile" title="Edit profile" style="float:left;color:red;opacity:0.75;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>')
    }
  })

  isLoggedIn(function (loggedIn) {
    console.log('isLoggedIn', loggedIn)
    $('.spinner').hide()
    if (loggedIn) {
      $('.sign-in-title').text('Welcome! You\'re signed in')
      $('.sign-out').show()
    } else {
      $('.sign-in-form').show()
      $('.sign-in-title').text('Type your email address and press Enter to sign in.')
    }
    pageAuth(loggedIn)
  })
})
