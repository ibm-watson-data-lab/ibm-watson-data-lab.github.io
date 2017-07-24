# IBM Watson Data Lab 

A Github pages site that showcases our projects, our team, and our code of conduct.

## Local Install 

To preview the site and test changes locally Jekyll will need to be set up.

#### Prerequisites

The following requirements should be in place before trying to launch the site locally.

* Ruby 2.1.0 or higher installed: `ruby --version`
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
  headline: You'll need more than just log data to take your chatbot to the next level.
  story:    In which we use data services to provide a more personal chatbot experience, save money by reducing third-party API calls, and perform analysis on past chatbot conversations.
  links: 
    Medium: https://medium.com/ibm-watson-data-lab/persisting-data-for-a-smarter-chatbot-be599480f7b2
    Github: https://github.com/ibm-watson-data-lab/watson-recipe-bot-python-cloudant
  img:      img/smarter-chatbot.jpg
  thumb:    img/smarter-chatbot-thumb.jpg
  features:   
    - watson-and-data
  strategies: 
    - differentiators
  tags: 
    - Watson Conversation
    - Slack
    - Spoonacular
    - Cloudant
```

Anything added to the projects.yml file will appear on the Projects page, with the most recently added projects appearing at the top of the list.

Projects also appear on the home page, the "featured collections" pages that group projects, and the "topic" pages that articulate our strategies and take users to featured collections and projects.

### Adding projects to featured collections

Using the example above, adding `watson-and-data` to the `features` array of this project automatically associates it to the watson-and-data featured collection on the site. (Note: not every project needs to be associated to a featured collection, just those that are naturally associated to each other.)

To see all the featured collections, check out the _features folder, or visit [help](https://ibm-cds-labs.github.io/help).

### Adding projects to strategies

The project in the example above is associated to the `differentiators` strategy, which associates the project to the "IBM + Data" topic on the site.

In almost all cases, a project should be associated to a strategy. 

To see all the strategies, check out the _strategies folder, or visit [help](https://ibm-cds-labs.github.io/help).


## More Info

* [Jekyll Documentation](https://jekyllrb.com/docs/home/)
* [Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
