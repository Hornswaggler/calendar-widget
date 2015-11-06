#Calendar-widget

A generic, modular calendar widget being designed to replace the out of the box SharePoint calendar Web Part. While the initial implementation will be backed by a SharePoint list, it's being designed to be modular and use multiple datasources (If i ever have the time). I'm using this project to teach myself best practices (Angular / JavaScript etc...).

## Requirements

-Visual Studio 2010 / 2012 or 2013 (Express version is acceptable)
    -Required to rebuild the Browserify dependency
    -https://www.visualstudio.com/en-us/visual-studio-homepage-vs.aspx

-OS Package Manager (non-linux users...)
    -on OSX install [home brew](http://brew.sh/) and type `brew install node`
    -on Windows install [chocolatey](https://chocolatey.org/)

-Python version 2.x (required to build node-gyp dependency)
    -on OSX
        - `brew install pyenv`
	- `pyenv install 2.7.5`
    -on Windows `choco install python2`
        -set the Python env variable to the exe path

- Install Node
    -on Windows `choco install nodejs`
    - On OSX you can alleviate the need to run as sudo by [following these instructions](http://jpapa.me/nomoresudo). I highly recommend this step on OSX
- Open terminal / cmd
- Type `npm install -g bower gulp`

##Quick Start
```bash
$ npm install    
$ bower install
$ gulp serve-dev
```
- note if using Visual studio > 2010 you must use one of the following swithces to ensure node-gyp is installed properly:
        -2012 `npm install --msvs_version=2012`
        -2013 `npm install --msvs_version=2013`

## Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Serving Development Code

- `gulp serve-dev`

    Serves the development code and launches it in a browser. Bower dependencies are moved to the lib folder and then injected using gulp-inject. The src dir is synchronized w/ the browser and updated in real time as changes are made.
	
### Building Development Code

- `gulp build-dev`

    Moves bower dependencies to src/lib directory and injects them into the index.html	

### Serving Production Code

- `gulp serve-dev`

    Serve the optimized code from the build folder and launch it in a browser.
	
### Building Production Code

- `gulp build-prod`

    Optimize all javascript, move to a build folder, and inject them into the new index.html