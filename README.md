# ⛔️ DEPRECATED

_This site is no longer maintained. Please consider following our [Medium site](https://medium.com/ibm-watson-data-lab) to stay up to date._

---

# IBM Watson Data Lab 

A GitHub pages site that showcases our projects, our team, and our code of conduct.

## Local Install 

To preview the site and test changes locally Jekyll will need to be set up.

#### Prerequisites

The following requirements should be in place before trying to launch the site locally.

* Ruby 2.1.0 or higher installed: `ruby --version`
* [Mac OSX] Install latest version of XCode
    * Ensure CLI tools are installed: run `xcode-select --install`
* Bundler installed: `gem install bundler`
* Clone the GitHub repo

#### Install Jekyll

From the Terminal shell

1. Go into the directory of the cloned repo
2. Run: `bundle install`

#### Launch site

From the Terminal shell

1. Go into the directory of the cloned repo
2. Run: `bundle exec jekyll serve`
3. Open a browser and go to the URL shown in the Terminal shell

## Adding projects to the site

Add projects at the bottom of the projects.yml file in the _data folder. Each project should follow the same yml structure:

```
- title:    Persisting Data for a Smarter Chatbot
  _id: chatbot-persist-data
  date: "2016-12-12"
  lead: mark-watson
  features: 
    - smart-chatbots
  headline: "You'll need more than just log data to take your chatbot to the next level."
  links: 
    GitHub: "https://github.com/ibm-watson-data-lab/watson-recipe-bot-python-cloudant"
    Medium: "https://medium.com/ibm-watson-data-lab/persisting-data-for-a-smarter-chatbot-be599480f7b2"
  strategies: 
    - machine-learning-for-developers
    - get-connected-databases
  tags: 
    - "Watson Conversation"
    - Slack
    - Cloudant
    - Chatbots
```

Anything added to the projects.yml file will appear on the Projects page, with the most recently added projects appearing at the top of the list.

Projects also appear on the home page, the "featured collections" pages that group projects, and the "topic" pages that articulate our strategies and take users to featured collections and projects.

### Adding projects to featured collections

Using the example above, adding `watson-and-data` to the `features` array of this project automatically associates it to the watson-and-data featured collection on the site. (Note: not every project needs to be associated to a featured collection, just those that are naturally associated to each other.)

To see all the featured collections, check out the _features folder, or visit [help](https://ibm-watson-data-lab.github.io/help).

### Adding projects to strategies

The project in the example above is associated to the `differentiators` strategy, which associates the project to the "IBM + Data" topic on the site.

In almost all cases, a project should be associated to a strategy. 

To see all the strategies, check out the _strategies folder, or visit [help](https://ibm-watson-data-lab.github.io/help).


## More Info

* [Jekyll Documentation](https://jekyllrb.com/docs/home/)
* [Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
