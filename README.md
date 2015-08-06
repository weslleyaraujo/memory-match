# Memory Match

A fully functional memory match game crafted with javascript + html + css  💪

> You can play it and check it out here: [weslleyaraujo.github.io/memory-match](http://weslleyaraujo.github.io/memory-match)

## Installing

It depends on npm, grunt and bower, and to install just run the following commands:

```
npm install
bower install
```

## Starting

You can run locally using the development grunt task:

```
grunt develop
```

It will generate the necessary assets and run up a server into `http://localhost:8180`

## Building

You can build it using the build task and it requires the `--config` parameter (which is the config file for production/development)

```
grunt build --config=production
```

It will generate the project into a `dist` directory


## Deploy

The deploy task runs the build and upload the `dir` dir into the `gh-pages`

```
grunt deploy --config=production
```


### Contributing

Changes and improvements are more than welcome! Feel free to fork and open a pull request. Please make your changes in a specific branch and request to pull into master! If you can, please make sure the game fully works before sending the PR, as that will help speed up the process.
I'm following [this](https://github.com/netshoes/styleguide/tree/master/scm) styleguide to name branches and pull requests, make sure you follow this too 😁

### License

Memory Match's is licensed under the [Beerware License](https://pt.wikipedia.org/wiki/Beerware).
