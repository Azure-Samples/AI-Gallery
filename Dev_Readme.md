# Readme for Devs:

## Setting up:

### Setting up the dev machine:

In order to develop on your local machine, the following must be installed:
1. Ruby 
2. bundler
3. Jekyll

They must be set up in this order, as the latter dependencies are both Ruby Gems.
Ruby can be found and installed here:
1. Windows: <https://rubyinstaller.org/>
2. Others: <https://www.ruby-lang.org/en/documentation/installation/>

You should be able to test that ruby has been installed correctly by running `ruby --version`.

Now that Ruby is installed, we will need to install bundler by running `gem install bundler`
Finally, run `bundle install` to install Jekyll and all other dependencies.

If setting up a new repository, helpful instructions may be found here for initializing <https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/>


### Setting up the repository:

In order to set up the repo, run `npm install`
Important dependencies installed this way include:
1. Jest (testing framework)
2. Webpack (module bundling)


### Local development & Preview:

In order to preview the site locally, navigate to your repository in your terminal and run `bundle exec jekyll serve` which will provide you with a local preview of your site. 


### Testing

In order to test the site, simply run `npm test` to leverage the Jest testing framework and run all of the tests for the site.


### Packaging all Modules

Package and build all modules by running `npm run build` to build the production packages, or `npm run develop` to build and watch for development purposes. These commands are proxies defined in package.json.

# Editing Models/Examples

Models and examples can be edited by editing the JSON contained in the config.js file.


## Updating Snapshots

If the snapshot tests are failing, and you have confirmed that the functionality is working, you may create a new snapshot by running `npm test -- -u`