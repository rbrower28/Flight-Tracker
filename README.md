# Flight Tracker

## [Link to the project's Trello board](https://trello.com/b/Ug6fafC5/wdd-final)

## [Link to the project's production website](https://rbrower28.github.io/Flight-Tracker/)


### Project Setup:

To setup the project in your own environment, please follow the following steps:

1. Please clone the repo to a directory of your choice that you have read/write access to on your computer.
2. Please ensure that package.json, .eslintrc.json, and snowpack.config.js were also cloned to your new repo as well.
3. Please make sure you have npm installed in your environment.
4. Please go into the cloned repo in your command terminal and run 'npm install'.
5. After the installation finishes, please try running 'npm run start'. If the website shows up correctly, your environment should be correctly set up.
6. If you would like, please also try running 'npm run lint' and 'npm run format' to make sure those scripts also work.

### Project Deployment:
1. Please go to the master branch.
2. Please confirm that it works locally by running 
    'npm run start'
3. Please confirm that the build version is working by running the following commands:
    - If on Windows, run:
        - 'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process'
    - then
        - 'serve -s build'
    - If on Mac:
        - run 'serve -s build'
        - contact us with any issues
4. If the build version works, then please run
    'npm run deploy'
5. Finally, please confirm after 10 or so minutes that the live site [(here)](https://rbrower28.github.io/Flight-Tracker/) has updated successfully and is working as intended.