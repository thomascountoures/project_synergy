# project_synergy by Thomas Countoures
A web app I've been making from the ground up. Using AngularJS as my front end framework. Sass too (not that horrible inefficient regular CSS) to make it look pretty (eventually). On the server side I'm using Node.js, Express, MySQL. Cutting out some repetitive tasks with Grunt. Using this as a learning experience, and because it's fun. I'm quite literally developing this right now, so if you see a lot of random code comments and console logs, that's probably why.

# important (I guess?) info
I've obviously left out the database information like login, password, tables information, etc. If for some reason you may be interested in cloning this, I plan to write up some simple instructions on setting up a database so you can see this project later on. 

I am using the following bower components: (will continue to update)

* AngularJS
* Angular UI Router
* Angular Cookies
* Bootstrap
* Underscore.js

# development screenshots

Here are some screenshots during development so far.

## October 15, 2015

Working on authentication system.

![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen1.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen2.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen3.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen4.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen5.png)

## October 20, 2015

User information now successfully being transferred between ui router states.

![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen6.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen7.png)

## October 21, 2015

Began adding custom directives to dashboard. Re-styled and marked up app a bit.

![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen8.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen9.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen10.png)

## October 26, 2015

I realized I wasn't going about doing authentication and storing user information properly, so I did a major refactor to the code. From my commit log:

> Major refactoring to authentication. Added new AuthService, new Session factory 
> and global constants to app. Session service now being used to create session
> client side after authentication, on top of still using server sessions. User 
> information now being stored in topmost scope, (but not rootScope), as opposed
> to storing user information inside stateParams (user becomes null after
> changing states this way)."

![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen11.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen12.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen13.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen14.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/screen15.png)




